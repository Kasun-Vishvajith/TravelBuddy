"use client";
import { useEffect, useState } from "react";
import { ImageOff } from "lucide-react";
export function Photo({ src, alt, className = "", priority = false }: { src: string; alt: string; className?: string; priority?: boolean }) { const [failed, setFailed] = useState(false); useEffect(() => setFailed(false),[src]); return failed ? <div className={`photo-fallback ${className}`} role="img" aria-label={alt}><ImageOff size={26} /><span>{alt || "Photo unavailable"}</span></div> : <img src={src} alt={alt} className={className} loading={priority ? "eager" : "lazy"} decoding="async" onError={() => setFailed(true)} />; }
