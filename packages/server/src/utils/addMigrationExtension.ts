/**
 * This script is called by the `typeorm:migration:add-extension` script, which is called by
 * `typeorm:migration:generate:src`.
 * It identifies all migrations that do not include a `.migration.ts` file extension
 * (which TypeORM is configured to use to identify migrations) and adds the extension.
 */
import { join } from "path";
import { readdirSync, renameSync } from "fs";

const exclude = new RegExp(".migration.ts");
const match = new RegExp(".ts");
const dir = "src/migrations";
const files = readdirSync(dir);

files
  .filter((file) => !file.match(exclude))
  .forEach((file) => {
    const filePath = join(dir, file);
    const newFilePath = join(dir, file.replace(match, ".migration.ts"));

    renameSync(filePath, newFilePath);
  });
