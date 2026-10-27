import { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';

export default function CopyButton({ value, label }: { value: string; label: string }) {
  const [status, setStatus] = useState('');
  const timer = useRef<number>(undefined);
  useEffect(() => () => { window.clearTimeout(timer.current); }, []);
  async function copy() {
    window.clearTimeout(timer.current);
    try { await navigator.clipboard.writeText(value); setStatus('Copied'); }
    catch { setStatus('Copy unavailable — select the text below.'); }
    timer.current = window.setTimeout(() => setStatus(''), 4000);
  }
  return <span className="copy-control"><button className="text-link" type="button" onClick={copy}>{status === 'Copied' ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}{label}</button><span className="copy-status" role="status">{status}</span>{status.startsWith('Copy unavailable') && <input className="copy-fallback" aria-label={label} value={value} readOnly onFocus={event => event.currentTarget.select()} />}</span>;
}
