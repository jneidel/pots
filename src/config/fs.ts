import fs from "fs/promises";
import { DATA_DIR } from "./env";

export async function createDataDir() {
  await fs.mkdir( DATA_DIR, { recursive: true } );
}
