"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

const SESSION_KEY = "forge_anonymous_session";
const ATTRIBUTION_KEY = "forge_validation_attribution";

type Attribution = { source?: string; batch?: string; campaign?: string };
export type FunnelEventName =
  | "page_view"
  | "stress_test_started"
  | "stress_test_progress"
  | "stress_test_completed"
  | "stress_test_result_viewed"
  | "stress_test_next_action"
  | "action_review_viewed"
  | "action_review_submitted";

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

function getAttribution(): Attribution {
  try {
    return JSON.parse(window.localStorage.getItem(ATTRIBUTION_KEY) || "{}");
  } catch {
    return {};
  }
}

function captureAttribution(searchParams: URLSearchParams) {
  const incoming: Attribution = {
    source: searchParams.get("source") || searchParams.get("utm_source") || undefined,
    batch: searchParams.get("batch") || undefined,
    campaign: searchParams.get("campaign") || searchParams.get("utm_campaign") || undefined,
  };
  if (!incoming.source && !incoming.batch && !incoming.campaign) return getAttribution();
  const merged = { ...getAttribution(), ...incoming };
  try { window.localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(merged)); } catch {}
  return merged;
}

export async function trackFunnelEvent(
  eventName: FunnelEventName,
  options: { diagnostic?: string; metadata?: Record<string, unknown> } = {}
) {
  if (typeof window === "undefined") return;
  const path = `${window.location.pathname}${window.location.search}`.slice(0, 300);
  const attribution = getAttribution();
  try {
    await supabase.from("funnel_events").insert([{
      session_id: getSessionId(),
      event_name: eventName,
      path,
      diagnostic: options.diagnostic || null,
      metadata: { ...attribution, ...(options.metadata || {}) },
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
    captureAttribution(new URLSearchParams(searchParams.toString()));
    const diagnostic = pathname === "/stress-test" ? "stress_test" : pathname === "/readiness-check" ? "readiness_check" : pathname === "/next-step" ? "action_review" : undefined;
    void trackFunnelEvent("page_view", { diagnostic, metadata: { referrer: document.referrer || null } });
    if (pathname === "/next-step") void trackFunnelEvent("action_review_viewed", { diagnostic: searchParams.get("source") || "direct" });
  }, [pathname, searchParams]);

  return null;
}
