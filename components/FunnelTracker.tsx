"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

const SESSION_KEY = "forge_anonymous_session";

function getSessionId() {
  try {
    const existing = window.sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const created = typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    window.sessionStorage.setItem(SESSION_KEY, created);
    return created;
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

export async function trackFunnelEvent(
  eventName: "page_view" | "diagnostic_started" | "diagnostic_completed" | "action_review_viewed" | "action_review_submitted",
  options: { diagnostic?: string; metadata?: Record<string, unknown> } = {}
) {
  if (typeof window === "undefined") return;
  const path = `${window.location.pathname}${window.location.search}`.slice(0, 300);
  try {
    await supabase.from("funnel_events").insert([{
      session_id: getSessionId(),
      event_name: eventName,
      path,
      diagnostic: options.diagnostic || null,
      metadata: options.metadata || {},
    }]);
  } catch (error) {
    console.error("Forge analytics error:", error);
  }
}

export default function FunnelTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin") || pathname.startsWith("/dashboard") || pathname.startsWith("/login")) return;
    const diagnostic = pathname === "/stress-test" ? "stress_test" : pathname === "/readiness-check" ? "readiness_check" : pathname === "/next-step" ? "action_review" : undefined;
    void trackFunnelEvent("page_view", { diagnostic });
    if (pathname === "/next-step") void trackFunnelEvent("action_review_viewed", { diagnostic: searchParams.get("source") || "direct" });
  }, [pathname, searchParams]);

  return null;
}
