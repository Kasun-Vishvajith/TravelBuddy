"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Info } from 'lucide-react';
import { enabled, phases, type Feature, type Phase } from '@/lib/phases';
import { signOut } from '@/lib/demo';
const PhaseContext = createContext({ phase: 1 as Phase, ready: false, select: (_phase: Phase) => {} });
export function PhaseProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>(1);
  const [ready, setReady] = useState(false);
  useEffect(() => { try { const value = Number(sessionStorage.getItem('tb-client-phase')); if (value === 2 || value === 3) setPhase(value); } catch { setPhase(1); } finally { setReady(true); } }, []);
  function select(value: Phase) { sessionStorage.setItem('tb-client-phase', String(value)); setPhase(value); }
  return <PhaseContext.Provider value={{ phase, ready, select }}>{children}</PhaseContext.Provider>;
}
export function usePhase() { const context = useContext(PhaseContext); return { ...context, has: (feature: Feature) => enabled(context.phase, feature) }; }
export function FeatureGate({ feature, children }: { feature: Feature; children: ReactNode }) { const { has, ready } = usePhase(); return ready && has(feature) ? <>{children}</> : null; }
export function PhaseSelector() {
  const { phase, select } = usePhase();
  return <div className="phase-selector"><div className="phase-selector-label"><span id="phase-label">Client Demo Phase</span><Link className="phase-info-link" href="/login/phases" aria-label="Learn about Phase 1, Phase 2 and Phase 3" title="What does each phase include?"><Info size={17} aria-hidden="true" /></Link></div><div className="phase-segments" role="group" aria-labelledby="phase-label">{phases.map(p => <button type="button" key={p.id} aria-pressed={phase === p.id} className={phase === p.id ? 'selected' : ''} onClick={() => select(p.id)}>Phase {p.id}</button>)}</div><p aria-live="polite">{phases[phase - 1].description}</p></div>;
}
export function PhaseIndicator() { const { phase } = usePhase(); const router = useRouter(); return <button className="phase-indicator" title="Return to sign-in to choose a demo phase" onClick={() => { signOut(); router.push('/login'); }}>Client Demo · Phase {phase}</button>; }
