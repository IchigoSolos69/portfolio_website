import { access, writeFile, rename, unlink } from 'node:fs/promises';
import { CATALOG_PATH, syncProjects } from './sync-projects-lib.mjs';

const result = await syncProjects();
if (result.updated) {
  console.log(`Saved ${result.count} public repositories. Curated project descriptions were preserved.`);
  const activityPath = new URL('../data/project-activity.json', import.meta.url);
  const temporaryPath = new URL(`../data/project-activity.${process.pid}.tmp`, import.meta.url);
  try {
    const { fetchProjectUpdates } = await import('../server/project-api.mjs');
    const activity = await fetchProjectUpdates(process.env);
    await writeFile(temporaryPath, `${JSON.stringify(activity, null, 2)}\n`, 'utf8');
    await rename(temporaryPath, activityPath);
    console.log('Saved commit dates and public README excerpts; unavailable fields retain their saved values.');
  } catch {
    await unlink(temporaryPath).catch(() => {});
    console.warn('Activity refresh unavailable. Keeping saved project dates and descriptions.');
  }
} else {
  console.warn(`Project refresh skipped: ${result.error}`);
  const savedCatalogExists = await access(CATALOG_PATH).then(() => true, () => false);
  if (savedCatalogExists) console.warn('Using the last successful catalog.');
  else process.exitCode = 1;
}
