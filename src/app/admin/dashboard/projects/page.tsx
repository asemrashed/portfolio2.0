"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ImageField,
  TextListEditor,
} from "@/components/admin/AdminFormUtils";
import DragList from "@/components/admin/DragList";
import type { Project, ProjectCategory } from "@/lib/types";
import { DEFAULT_PROJECT_CATEGORIES } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const emptyProject = (defaultCategory: string): Project => ({
  name: "",
  description: "",
  category: defaultCategory,
  images: { pc: "", mobile: "" },
  tags: [],
  features: [],
  links: { demo: "", github: "" },
  featured: false,
  showInHomepage: false,
  homeOrder: 0,
  order: 0,
  status: "draft",
});

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>([
    ...DEFAULT_PROJECT_CATEGORIES,
  ]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<"draft" | "publish" | null>(null);
  const [homeSaving, setHomeSaving] = useState(false);
  const [catSaving, setCatSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [homeMessage, setHomeMessage] = useState("");
  const [catMessage, setCatMessage] = useState("");
  const [category, setCategory] = useState<ProjectCategory | "All">("All");
  const [newCategory, setNewCategory] = useState("");
  const [editingCatIndex, setEditingCatIndex] = useState<number | null>(null);
  const [editingCatName, setEditingCatName] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const [projectsRes, contentRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/content?section=projectCategories"),
      ]);
      const projectsData = await projectsRes.json();
      const contentData = await contentRes.json();
      setProjects(projectsData.projects || []);
      if (Array.isArray(contentData.projectCategories) && contentData.projectCategories.length) {
        setCategories(contentData.projectCategories);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const persistCategories = async (
    next: string[],
    opts?: { rename?: { from: string; to: string } }
  ) => {
    setCatSaving(true);
    setCatMessage("");
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "projectCategories", data: next }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCatMessage(data.error || "Failed to save categories");
        return false;
      }
      setCategories(data.projectCategories || next);

      if (opts?.rename && opts.rename.from !== opts.rename.to) {
        const toUpdate = projects.filter((p) => p.category === opts.rename!.from && p._id);
        await Promise.all(
          toUpdate.map((p) =>
            fetch(`/api/projects/${p._id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...p, category: opts.rename!.to }),
            })
          )
        );
        await load();
      }

      setCatMessage("Categories saved");
      return true;
    } catch {
      setCatMessage("Failed to save categories");
      return false;
    } finally {
      setCatSaving(false);
    }
  };

  const addCategory = async () => {
    const name = newCategory.trim();
    if (!name) return;
    if (categories.some((c) => c.toLowerCase() === name.toLowerCase())) {
      setCatMessage("Category already exists");
      return;
    }
    const ok = await persistCategories([...categories, name]);
    if (ok) setNewCategory("");
  };

  const startEditCategory = (index: number) => {
    setEditingCatIndex(index);
    setEditingCatName(categories[index]);
    setCatMessage("");
  };

  const saveEditCategory = async () => {
    if (editingCatIndex === null) return;
    const name = editingCatName.trim();
    if (!name) {
      setCatMessage("Name is required");
      return;
    }
    if (
      categories.some(
        (c, i) => i !== editingCatIndex && c.toLowerCase() === name.toLowerCase()
      )
    ) {
      setCatMessage("Category already exists");
      return;
    }
    const from = categories[editingCatIndex];
    const next = [...categories];
    next[editingCatIndex] = name;
    const ok = await persistCategories(next, { rename: { from, to: name } });
    if (ok) {
      setEditingCatIndex(null);
      setEditingCatName("");
      if (category === from) setCategory(name);
    }
  };

  const deleteCategory = async (index: number) => {
    const name = categories[index];
    const inUse = projects.some((p) => p.category === name);
    if (inUse) {
      setCatMessage(
        `Cannot delete "${name}" — projects still use it. Reassign those projects first.`
      );
      return;
    }
    if (categories.length <= 1) {
      setCatMessage("Keep at least one category");
      return;
    }
    if (!confirm(`Delete category "${name}"?`)) return;
    const next = categories.filter((_, i) => i !== index);
    const ok = await persistCategories(next);
    if (ok && category === name) setCategory("All");
  };

  const selectedInCategory = useMemo(() => {
    const selected = projects
      .filter((p) => p.showInHomepage && p._id && p.status !== "draft")
      .sort((a, b) => (a.homeOrder ?? 0) - (b.homeOrder ?? 0));

    const filtered =
      category === "All"
        ? selected
        : selected.filter((p) => p.category === category);

    return filtered.map((p) => ({ ...p, id: p._id as string }));
  }, [projects, category]);

  const filteredProjects = useMemo(
    () =>
      category === "All"
        ? projects
        : projects.filter((p) => p.category === category),
    [projects, category]
  );

  const filterTabs: Array<ProjectCategory | "All"> = ["All", ...categories];

  const openCreate = () => {
    setEditing({ ...emptyProject(categories[0] || "Full Stack") });
    setMessage("");
    setModalOpen(true);
  };

  const openEdit = (project: Project) => {
    setEditing({ ...project });
    setMessage("");
    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;
    setModalOpen(false);
    setEditing(null);
    setMessage("");
  };

  const save = async (status: "draft" | "published") => {
    if (!editing) return;
    setSaving(status === "draft" ? "draft" : "publish");
    setMessage("");
    try {
      const isNew = !editing._id;
      const payload = {
        ...editing,
        status,
        showInHomepage: status === "draft" ? false : editing.showInHomepage,
      };
      const res = await fetch(isNew ? "/api/projects" : `/api/projects/${editing._id}`, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Save failed");
        return;
      }

      const saved = data.project;
      const savedId = saved?._id ? String(saved._id) : editing._id;

      setMessage(status === "draft" ? "Draft saved" : "Published");
      await load();

      if (status === "draft" && savedId) {
        setEditing({
          ...editing,
          ...payload,
          _id: savedId,
          status: "draft",
        });
      } else {
        setModalOpen(false);
        setEditing(null);
      }
    } catch {
      setMessage("Save failed");
    } finally {
      setSaving(null);
    }
  };

  const remove = async (id?: string) => {
    if (!id || !confirm("Delete this project?")) return;
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (res.ok) await load();
  };

  const toggleHomepage = async (project: Project, checked: boolean) => {
    if (!project._id) return;
    if (project.status === "draft") {
      alert("Publish the project before showing it on the homepage.");
      return;
    }

    const selected = projects.filter((p) => p.showInHomepage && p.status !== "draft");
    const homeOrder = checked
      ? selected.length
        ? Math.max(...selected.map((p) => p.homeOrder ?? 0)) + 1
        : 0
      : 0;

    setProjects((prev) =>
      prev.map((p) =>
        p._id === project._id ? { ...p, showInHomepage: checked, homeOrder } : p
      )
    );

    const res = await fetch(`/api/projects/${project._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...project,
        status: "published",
        showInHomepage: checked,
        homeOrder,
      }),
    });
    if (!res.ok) {
      await load();
      return;
    }
    await load();
  };

  const saveHomepageOrder = async (ordered: Array<Project & { id: string }>) => {
    setHomeSaving(true);
    setHomeMessage("");

    const otherSelected = projects.filter(
      (p) =>
        p.showInHomepage &&
        p.status !== "draft" &&
        p._id &&
        !ordered.some((o) => o.id === p._id)
    );

    const merged = [
      ...ordered.map((p, index) => ({
        id: p.id,
        showInHomepage: true,
        homeOrder: index,
      })),
      ...otherSelected.map((p, index) => ({
        id: p._id as string,
        showInHomepage: true,
        homeOrder: ordered.length + index,
      })),
    ];

    setProjects((prev) =>
      prev.map((p) => {
        const found = merged.find((m) => m.id === p._id);
        if (!found) return p;
        return { ...p, homeOrder: found.homeOrder, showInHomepage: true };
      })
    );

    try {
      const res = await fetch("/api/projects/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: merged }),
      });
      const data = await res.json();
      if (!res.ok) {
        setHomeMessage(data.error || "Failed to save order");
        await load();
        return;
      }
      setHomeMessage("Homepage order saved");
      await load();
    } catch {
      setHomeMessage("Failed to save order");
      await load();
    } finally {
      setHomeSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-3xl font-saira font-bold text-primary">Projects</h1>
        <Button onClick={openCreate}>Add project</Button>
      </div>

      <section className="space-y-3 rounded-xl border border-primary/20 p-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h2 className="text-xl font-semibold">Categories</h2>
            <p className="text-sm text-muted-foreground">
              Add, rename, or delete project categories used on the site.
            </p>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Input
            className="max-w-xs"
            placeholder="New category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addCategory();
              }
            }}
          />
          <Button type="button" onClick={addCategory} disabled={catSaving}>
            Add category
          </Button>
        </div>

        <div className="space-y-2">
          {categories.map((cat, index) => (
            <div
              key={`${cat}-${index}`}
              className="flex flex-col sm:flex-row sm:items-center gap-2 border rounded-lg p-3"
            >
              {editingCatIndex === index ? (
                <>
                  <Input
                    value={editingCatName}
                    onChange={(e) => setEditingCatName(e.target.value)}
                    className="flex-1"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        saveEditCategory();
                      }
                    }}
                  />
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      size="sm"
                      onClick={saveEditCategory}
                      disabled={catSaving}
                    >
                      Save
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setEditingCatIndex(null);
                        setEditingCatName("");
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <p className="flex-1 font-medium">{cat}</p>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => startEditCategory(index)}
                    >
                      Edit
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteCategory(index)}
                      disabled={catSaving}
                    >
                      Delete
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {(catSaving || catMessage) && (
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            {catSaving && <Loader2 className="h-4 w-4 animate-spin" />}
            {catMessage || "Saving…"}
          </p>
        )}
      </section>

      <div className="flex flex-wrap gap-2">
        {filterTabs.map((cat) => (
          <Button
            key={cat}
            type="button"
            size="sm"
            variant={category === cat ? "default" : "outline"}
            onClick={() => setCategory(cat)}
            className={cn(category === cat && "bg-primary text-primary-foreground")}
          >
            {cat}
          </Button>
        ))}
      </div>

      <section className="space-y-3 rounded-xl border border-primary/20 p-4">
        <div>
          <h2 className="text-xl font-semibold">
            Selected for homepage
            {category !== "All" ? ` · ${category}` : " · All"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {category === "All"
              ? "All selected published projects. Drag to change homepage order."
              : `Selected ${category} projects. Drag to reorder within this category.`}
          </p>
        </div>
        {selectedInCategory.length === 0 ? (
          <p className="text-sm text-muted-foreground border rounded-lg p-4">
            No selected projects{category !== "All" ? ` in ${category}` : ""}. Use
            &quot;Show in homepage&quot; below.
          </p>
        ) : (
          <DragList
            items={selectedInCategory}
            onChange={saveHomepageOrder}
            renderItem={(item, index) => (
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium">
                    {index + 1}. {item.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.category}</p>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => toggleHomepage(item, false)}
                >
                  Remove
                </Button>
              </div>
            )}
          />
        )}
        {(homeSaving || homeMessage) && (
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            {homeSaving && <Loader2 className="h-4 w-4 animate-spin" />}
            {homeMessage || "Saving order..."}
          </p>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          All projects{category !== "All" ? ` · ${category}` : ""}
        </h2>

        {filteredProjects.map((project) => (
          <div
            key={project._id || project.name}
            className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-3"
          >
            <div>
              <p className="font-semibold flex items-center gap-2 flex-wrap">
                {project.name || "Untitled draft"}
                {project.status === "draft" && (
                  <span className="text-[10px] uppercase tracking-wide rounded px-1.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Draft
                  </span>
                )}
              </p>
              <p className="text-sm text-muted-foreground">
                {project.category}
                {project.featured ? " · Featured" : ""}
                {project.showInHomepage ? " · On homepage" : ""}
              </p>
              <label
                className={cn(
                  "mt-2 inline-flex items-center gap-2 text-sm",
                  project.status === "draft" && "opacity-50"
                )}
              >
                <input
                  type="checkbox"
                  checked={Boolean(project.showInHomepage)}
                  disabled={project.status === "draft"}
                  onChange={(e) => toggleHomepage(project, e.target.checked)}
                />
                Show in homepage
                {project.status === "draft" ? " (publish first)" : ""}
              </label>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => openEdit(project)}>
                Edit
              </Button>
              <Button variant="ghost" size="sm" onClick={() => remove(project._id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}

        {filteredProjects.length === 0 && (
          <p className="text-sm text-muted-foreground">No projects in this category.</p>
        )}
      </section>

      <Dialog
        open={modalOpen}
        onOpenChange={(open) => {
          if (!open) closeModal();
          else setModalOpen(true);
        }}
      >
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editing?._id ? "Edit project" : "Add project"}
            </DialogTitle>
            <DialogDescription>
              Save as draft anytime. Publish when the project is ready for the site.
            </DialogDescription>
          </DialogHeader>

          {editing && (
            <div className="space-y-4 py-2">
              <Input
                placeholder="Name"
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
              />
              <Textarea
                placeholder="Description"
                value={editing.description}
                onChange={(e) =>
                  setEditing({ ...editing, description: e.target.value })
                }
              />
              <div>
                <label className="text-sm font-medium">Category</label>
                <select
                  className="w-full mt-1 rounded-md border bg-background px-3 py-2"
                  value={editing.category}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      category: e.target.value,
                    })
                  }
                >
                  {!categories.includes(editing.category) && editing.category && (
                    <option value={editing.category}>{editing.category}</option>
                  )}
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <ImageField
                label="PC image"
                value={editing.images.pc}
                onChange={(pc) =>
                  setEditing({ ...editing, images: { ...editing.images, pc } })
                }
              />
              <ImageField
                label="Mobile image"
                value={editing.images.mobile}
                onChange={(mobile) =>
                  setEditing({
                    ...editing,
                    images: { ...editing.images, mobile },
                  })
                }
              />
              <TextListEditor
                label="Tags"
                values={editing.tags}
                onChange={(tags) => setEditing({ ...editing, tags })}
              />
              <TextListEditor
                label="Features"
                values={editing.features || []}
                onChange={(features) => setEditing({ ...editing, features })}
              />
              <Input
                placeholder="Demo URL"
                value={editing.links.demo}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    links: { ...editing.links, demo: e.target.value },
                  })
                }
              />
              <Input
                placeholder="GitHub URL"
                value={editing.links.github}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    links: { ...editing.links, github: e.target.value },
                  })
                }
              />
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={Boolean(editing.featured)}
                  onChange={(e) =>
                    setEditing({ ...editing, featured: e.target.checked })
                  }
                />
                Featured
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={Boolean(editing.showInHomepage)}
                  onChange={(e) =>
                    setEditing({ ...editing, showInHomepage: e.target.checked })
                  }
                />
                Show in homepage (applies when published)
              </label>
              {message && <p className="text-sm text-muted-foreground">{message}</p>}
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-2">
            <Button type="button" variant="ghost" onClick={closeModal} disabled={!!saving}>
              Cancel
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => save("draft")}
              disabled={!!saving}
            >
              {saving === "draft" ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Saving draft...
                </>
              ) : (
                "Save draft"
              )}
            </Button>
            <Button
              type="button"
              onClick={() => save("published")}
              disabled={!!saving}
            >
              {saving === "publish" ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Publishing...
                </>
              ) : (
                "Publish"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
