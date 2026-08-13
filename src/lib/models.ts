import mongoose, { Schema, models, model } from "mongoose";

const SiteContentSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, default: "main" },
    settings: {
      siteName: String,
      logoUrl: String,
      footerText: String,
      showSocialInFooter: { type: Boolean, default: true },
    },
    hero: {
      greeting: String,
      displayName: String,
      titles: [String],
      heroImage: String,
      heroBgImage: String,
      hireCtaLabel: String,
      hireCtaHref: String,
    },
    about: {
      body: String,
      paragraphs: [String], // legacy; migrated to body in getSiteContent
      aboutImage: String,
      socialLinks: [
        {
          platform: String,
          url: String,
        },
      ],
      education: [
        {
          title: String,
          institution: String,
          period: String,
          description: String,
        },
      ],
      courses: [
        {
          title: String,
          provider: String,
          period: String,
          description: String,
        },
      ],
      offerings: [
        {
          title: String,
          description: String,
          icon: String,
        },
      ],
    },
    skills: [
      {
        category: String,
        items: [
          {
            name: String,
            icon: String,
          },
        ],
      },
    ],
    contact: {
      email: String,
      phone: String,
      linkedin: String,
      github: String,
      facebook: String,
      intro: String,
      formTitle: String,
    },
    cta: {
      title: String,
      body: String,
      buttonLabel: String,
      buttonHref: String,
    },
    homeLayout: {
      sections: [
        {
          key: { type: String, required: true },
          label: String,
          enabled: { type: Boolean, default: true },
        },
      ],
    },
    projectCategories: [String],
  },
  { timestamps: true, strict: false }
);

export const SiteContentModel =
  models.SiteContent || model("SiteContent", SiteContentSchema);

const ProjectSchema = new Schema(
  {
    name: { type: String, default: "Untitled draft" },
    images: {
      pc: { type: String, default: "" },
      mobile: { type: String, default: "" },
    },
    description: { type: String, default: "" },
    category: {
      type: String,
      default: "Full Stack",
    },
    tags: [String],
    features: [String],
    links: {
      demo: { type: String, default: "" },
      github: { type: String, default: "" },
    },
    featured: { type: Boolean, default: false },
    showInHomepage: { type: Boolean, default: false },
    homeOrder: { type: Number, default: 0 },
    order: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
  },
  { timestamps: true }
);

export const ProjectModel = models.Project || model("Project", ProjectSchema);

export type SiteContentDoc = mongoose.InferSchemaType<typeof SiteContentSchema>;
export type ProjectDoc = mongoose.InferSchemaType<typeof ProjectSchema>;
