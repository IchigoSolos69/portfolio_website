import { mkdir, rename, unlink, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const OWNER = 'IchigoSolos69';
export const CATALOG_PATH = fileURLToPath(new URL('../data/repositories.json', import.meta.url));

export async function fetchPublicRepositories(fetchImpl = fetch) {
  const repositories = new Map();
  for (let page = 1; ; page += 1) {
    const response = await fetchImpl(
      `https://api.github.com/users/${OWNER}/repos?type=owner&per_page=100&page=${page}`,
      { headers: { Accept: 'application/vnd.github+json' }, signal: AbortSignal.timeout(15000) },
    );
    if (!response.ok) throw new Error(`GitHub returned HTTP ${response.status}.`);
    const rows = await response.json();
    if (!Array.isArray(rows)) throw new Error('GitHub returned an invalid repository list.');

    for (const row of rows) {
      // Only deliberately public, owner-matched records can reach the saved catalog.
      if (row.private !== false || row.visibility === 'private') continue;
      if (row.owner?.login?.toLowerCase() !== OWNER.toLowerCase()) continue;
      if (!Number.isSafeInteger(row.id) || row.id <= 0
        || typeof row.name !== 'string' || !/^[\w.-]+$/.test(row.name)) {
        throw new Error('GitHub returned malformed repository metadata.');
      }
      repositories.set(row.id, {
        id: row.id,
        name: row.name,
        fullName: `${OWNER}/${row.name}`,
        url: `https://github.com/${OWNER}/${encodeURIComponent(row.name)}`,
        defaultBranch: typeof row.default_branch === 'string' ? row.default_branch : 'main',
        archived: row.archived === true,
        description: typeof row.description === 'string' ? row.description : null,
        language: typeof row.language === 'string' ? row.language : null,
        topics: Array.isArray(row.topics) ? row.topics.filter(topic => typeof topic === 'string') : [],
      });
    }
    if (rows.length < 100) break;
  }
  if (!repositories.size) throw new Error('GitHub returned no public repositories; keeping the saved catalog.');
  return [...repositories.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export async function syncProjects({ outputPath = CATALOG_PATH, fetchImpl = fetch, now = new Date() } = {}) {
  const temporaryPath = `${outputPath}.${process.pid}.tmp`;
  try {
    const repositories = await fetchPublicRepositories(fetchImpl);
    const snapshot = { syncedAt: now.toISOString(), owner: OWNER, repositories };
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(temporaryPath, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');
    await rename(temporaryPath, outputPath);
    return { updated: true, count: repositories.length };
  } catch (error) {
    await unlink(temporaryPath).catch(() => {});
    return { updated: false, error: error instanceof Error ? error.message : 'Catalog refresh failed.' };
  }
}
