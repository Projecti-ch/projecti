"use client";

import { useSyncExternalStore } from "react";

/**
 * Analytics consent, stored client-side.
 *
 * Nothing that sets a cookie may run until this reads "granted". That covers
 * Google Analytics (_ga, _ga_*) and the Mux player (muxData), both of which
 * previously fired on first paint with no choice offered.
 */

export type Consent = "granted" | "denied";

const KEY = "projecti-consent";
const EVENT = "projecti-consent-change";

export function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    // Private mode or storage disabled. Treat as undecided, which means
    // nothing loads. Failing closed is the correct direction here.
    return null;
  }
}

/**
 * Withdrawing consent has to remove cookies that were already set, otherwise
 * "Ablehnen" only stops future tracking and leaves the visitor identified by
 * the _ga client id they were given earlier.
 */
function clearAnalyticsCookies() {
  const names = document.cookie
    .split("; ")
    .map((c) => c.split("=")[0])
    .filter((n) => n.startsWith("_ga") || n === "_gid" || n === "muxData");

  // The cookie must be expired against the same domain and path it was set
  // with. GA sets on the registrable domain, so walk the host upward.
  const host = window.location.hostname;
  const parts = host.split(".");
  const domains = [undefined, host];
  for (let i = 0; i < parts.length - 1; i++) {
    domains.push("." + parts.slice(i).join("."));
  }

  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${
        domain ? `; domain=${domain}` : ""
      }`;
    }
  }
}

export function writeConsent(value: Consent) {
  try {
    window.localStorage.setItem(KEY, value);
  } catch {
    // Ignore: the in-memory event below still applies for this page view.
  }
  if (value === "denied") clearAnalyticsCookies();
  window.dispatchEvent(new CustomEvent(EVENT, { detail: value }));
}

/**
 * `undefined` means "not yet read from storage" and is the state during SSR and
 * the first client render. Callers must treat it as not-granted so no tracking
 * fires before hydration, and must not render the banner on it either, which
 * would flash the banner for visitors who already chose.
 */
function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  // Keep tabs in sync when the choice is made in another one.
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function useConsent(): Consent | null | undefined {
  // useSyncExternalStore rather than setState-in-an-effect: the value lives in
  // localStorage, which is an external store. The server snapshot is
  // `undefined`, so during SSR and hydration nothing tracks and the banner
  // stays hidden. React swaps to the real value right after hydration, which
  // avoids flashing the banner at visitors who already chose.
  // Snapshots are primitives, so no referential-stability problem.
  return useSyncExternalStore(
    subscribe,
    readConsent,
    () => undefined
  );
}
