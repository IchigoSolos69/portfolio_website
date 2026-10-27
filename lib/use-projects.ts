import { useEffect, useState } from 'react';
import { projects } from '../data/projects';
import snapshot from '../data/project-activity.json';
import { mergeProjectUpdates } from './project-activity';

export function useProjects() {
  const [catalog, setCatalog] = useState(() => mergeProjectUpdates(projects, snapshot));
  useEffect(() => {
    let active = true;
    let request: AbortController | undefined;
    let lastAttempt = 0;
    async function refresh() {
      if (document.hidden || request || Date.now() - lastAttempt < 60_000) return;
      lastAttempt = Date.now();
      request = new AbortController();
      const timeout = window.setTimeout(() => request?.abort(), 25_000);
      try {
        const response = await fetch('/api/projects', { signal: request.signal, headers: { Accept: 'application/json' } });
        if (!response.ok) return;
        const payload = await response.json();
        if (!active) return;
        setCatalog(previous => mergeProjectUpdates(previous, payload, projects));
      } catch {
        // The saved catalog remains available offline and during API failures.
      } finally {
        window.clearTimeout(timeout);
        request = undefined;
      }
    }
    void refresh();
    const timer = window.setInterval(refresh, 15 * 60_000);
    document.addEventListener('visibilitychange', refresh);
    return () => {
      active = false;
      request?.abort();
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', refresh);
    };
  }, []);
  return { catalog };
}
