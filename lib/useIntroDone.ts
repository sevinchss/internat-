"use client";

import { useSyncExternalStore } from "react";

/** true once the first-visit intro overlay has finished (or was already played this session). */
function subscribe(cb: () => void) {
  window.addEventListener("ils:intro-done", cb);
  return () => window.removeEventListener("ils:intro-done", cb);
}
const getSnapshot = () => document.documentElement.classList.contains("intro-done");

export function useIntroDone() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
