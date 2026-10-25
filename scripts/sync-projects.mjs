import { access } from 'node:fs/promises';
import { CATALOG_PATH, syncProjects } from './sync-projects-lib.mjs';

const result = await syncProjects();
if (result.updated) {
  console.log(`Saved ${result.count} public repositories. Curated project descriptions were preserved.`);
} else {
  console.warn(`Project refresh skipped: ${result.error}`);
  const savedCatalogExists = await access(CATALOG_PATH).then(() => true, () => false);
  if (savedCatalogExists) console.warn('Using the last successful catalog.');
  else process.exitCode = 1;
}
