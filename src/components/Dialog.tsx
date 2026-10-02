"use client";
import { useEffect, useRef, type ReactNode } from "react";
export function Dialog({ children, onClose, label, className="small-sheet" }: {children:ReactNode;onClose:()=>void;label:string;className?:string}) {
  const ref = useRef<HTMLElement>(null); const close = useRef(onClose); close.current = onClose;
  useEffect(() => {
    const previous = document.activeElement as HTMLElement|null; const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const elements = () => Array.from(ref.current?.querySelectorAll<HTMLElement>('button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex="0"]') || []).filter((element) => element.getClientRects().length > 0);
    (elements()[0] || ref.current)?.focus();
    function keydown(e:KeyboardEvent) { if (e.key === "Escape") close.current(); if (e.key !== "Tab") return; const targets = elements(); const first = targets[0];const last = targets[targets.length-1]; if (!first) {e.preventDefault();return;} if (e.shiftKey && (document.activeElement === first || document.activeElement === ref.current)) {e.preventDefault();last.focus();} else if (!e.shiftKey && document.activeElement === last) {e.preventDefault();first.focus();} }
    document.addEventListener("keydown",keydown);
    return () => {document.body.style.overflow = overflow;document.removeEventListener("keydown",keydown);previous?.focus();};
  },[]);
  return <div className="sheet-backdrop" onClick={onClose}><section ref={ref} tabIndex={-1} className={className} role="dialog" aria-modal="true" aria-label={label} onClick={(e) => e.stopPropagation()}>{children}</section></div>;
}
