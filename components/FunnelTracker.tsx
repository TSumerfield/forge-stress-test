"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

const SESSION_KEY = "forge_anonymous_session";
const ATTRIBUTION_KEY = "forge_validation_attribution";
const READINESS_STARTED_KEY = "forge_readiness_started";
const READINESS_COMPLETED_KEY = "forge_readiness_completed";

type Attribution = { source?: string; batch?: string; campaign?: string; prospect?: string };
export type FunnelEventName = "page_view" | "stress_test_started" | "stress_test_progress" | "stress_test_completed" | "stress_test_result_viewed" | "stress_test_next_action" | "readiness_check_started" | "readiness_check_completed" | "readiness_check_result_viewed" | "readiness_check_next_action" | "action_review_viewed" | "action_review_submitted" | "pulse_started" | "pulse_completed";

function getSessionId() {
  try {
    const existing = window.sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const created = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    window.sessionStorage.setItem(SESSION_KEY, created);
    return created;
  } catch { return `${Date.now()}-${Math.random().toString(36).slice(2)}`; }
}

export function getFunnelAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(window.localStorage.getItem(ATTRIBUTION_KEY) || "{}"); } catch { return {}; }
}

function captureAttribution(searchParams: URLSearchParams) {
  const incoming: Attribution = {
    source: searchParams.get("source") || searchParams.get("utm_source") || undefined,
    batch: searchParams.get("batch") || undefined,
    campaign: searchParams.get("campaign") || searchParams.get("utm_campaign") || undefined,
    prospect: searchParams.get("prospect") || undefined,
  };
  if (!incoming.source && !incoming.batch && !incoming.campaign && !incoming.prospect) return getFunnelAttribution();
  const merged = { ...getFunnelAttribution(), ...incoming };
  try { window.localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(merged)); } catch {}
  return merged;
}

export async function trackFunnelEvent(eventName: FunnelEventName, options: { diagnostic?: string; metadata?: Record<string, unknown> } = {}) {
  if (typeof window === "undefined") return;
  const path = `${window.location.pathname}${window.location.search}`.slice(0, 300);
  try {
    await supabase.from("funnel_events").insert([{ session_id: getSessionId(), event_name: eventName, path, diagnostic: options.diagnostic || null, metadata: { ...getFunnelAttribution(), ...(options.metadata || {}) } }]);
  } catch (error) { console.error("Forge analytics error:", error); }
}

export default function FunnelTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin") || pathname.startsWith("/dashboard") || pathname.startsWith("/login")) return;
    captureAttribution(new URLSearchParams(searchParams.toString()));
    const diagnostic = pathname === "/stress-test" ? "stress_test" : pathname === "/pulse" ? "pulse_001" : pathname === "/readiness-check" ? "readiness_check" : pathname === "/next-step" ? "action_review" : undefined;
    void trackFunnelEvent("page_view", { diagnostic, metadata: { referrer: document.referrer || null } });
    if (pathname === "/next-step") void trackFunnelEvent("action_review_viewed", { diagnostic: searchParams.get("source") || "direct" });
  }, [pathname, searchParams]);

  useEffect(() => {
    if (pathname !== "/stress-test" && pathname !== "/readiness-check") return;
    const onClick = (event: MouseEvent) => {
      const element = event.target as HTMLElement | null;
      const anchor = element?.closest("a");
      if (anchor?.textContent?.includes("VIEW THE RESEARCH PROTOTYPE")) {
        const readiness = pathname === "/readiness-check";
        void trackFunnelEvent(readiness ? "readiness_check_next_action" : "stress_test_next_action", { diagnostic: readiness ? "readiness_check" : "stress_test", metadata: { label: "VIEW THE RESEARCH PROTOTYPE" } });
      }
      if (pathname === "/readiness-check") {
        const button = element?.closest("button");
        if (button?.textContent?.includes("CHECK YOUR READINESS")) {
          try { window.sessionStorage.setItem(READINESS_STARTED_KEY, "1"); } catch {}
          void trackFunnelEvent("readiness_check_started", { diagnostic: "readiness_check", metadata: { total_questions: 18 } });
        }
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/readiness-check") return;
    try { window.sessionStorage.removeItem(READINESS_COMPLETED_KEY); } catch {}
    const recordCompletionIfVisible = () => {
      const resultsVisible = document.body.textContent?.includes("READINESS RESULTS");
      if (!resultsVisible) return;
      let alreadyCompleted = false;
      try { alreadyCompleted = window.sessionStorage.getItem(READINESS_COMPLETED_KEY) === "1"; } catch {}
      if (alreadyCompleted) return;
      try { window.sessionStorage.setItem(READINESS_COMPLETED_KEY, "1"); } catch {}
      void trackFunnelEvent("readiness_check_completed", { diagnostic: "readiness_check", metadata: { total_questions: 18 } });
      void trackFunnelEvent("readiness_check_result_viewed", { diagnostic: "readiness_check" });
    };
    recordCompletionIfVisible();
    const observer = new MutationObserver(recordCompletionIfVisible);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
