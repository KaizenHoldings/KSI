"use client";

import { useSyncExternalStore } from "react";

/** The value never changes after mount, so nothing ever needs to notify us. */
const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * True only once the client has taken over. Guards any render that depends on
 * persisted state, which would otherwise disagree with the server output.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}
