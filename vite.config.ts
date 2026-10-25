import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { handleProjectsRequest } from './server/project-api.mjs';

function projectApi(env: Record<string, string>): Plugin {
  const middleware = async (request, response, next) => {
    if (request.url?.split('?')[0] !== '/api/projects') return next();
    try {
      const result = await handleProjectsRequest(new Request('http://localhost/api/projects', { method: request.method || 'GET' }), env);
      response.statusCode = result.status;
      result.headers.forEach((value, key) => response.setHeader(key, value));
      response.end(await result.text());
    } catch {
      response.statusCode = 503;
      response.setHeader('Content-Type', 'application/json');
      response.end('{"error":"Project updates are temporarily unavailable."}');
    }
  };
  return {
    name: 'project-api',
    configureServer(server) { server.middlewares.use(middleware); },
    configurePreviewServer(server) { server.middlewares.use(middleware); },
  };
}

export default defineConfig(({ mode }) => ({
  server: { port: 3000, host: '127.0.0.1' },
  plugins: [react(), projectApi({ ...loadEnv(mode, process.cwd(), ''), ...process.env })],
}));
