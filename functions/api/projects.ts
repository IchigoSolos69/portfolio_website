import { handleProjectsRequest } from '../../server/project-api.mjs';

type Environment = {
  GITHUB_TOKEN?: string;
  GH_TOKEN?: string;
  PRIVATE_PROJECT_REPOS?: string;
};

type RequestContext = {
  request: Request;
  env: Environment;
};

export const onRequest = ({ request, env }: RequestContext) => {
  const edgeCache = (globalThis as typeof globalThis & { caches?: { default?: Cache } }).caches?.default;
  return handleProjectsRequest(request, env, edgeCache ? { cache: edgeCache } : {});
};
