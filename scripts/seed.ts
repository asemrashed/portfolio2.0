import { config } from "dotenv";
config({ path: ".env.local" });
config();

async function main() {
  const { ensureSeeded } = await import("../src/lib/content");
  const result = await ensureSeeded();
  console.log(result);
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
