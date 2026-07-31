import type { WebviewPanelRef } from "../components/webview-panel"

export type D2cToWebviewMessage =
  | { type: "session-update"; sessionId: string }
  | { type: "artifact-update"; data: unknown }
  | { type: "command"; command: string; payload?: unknown }

export type WebviewToD2cMessage =
  | { type: "action-result"; data: unknown }
  | { type: "request-info"; data: unknown }
  | { type: "send-message"; text: string; payload?: unknown }

export function postToWebview(ref: WebviewPanelRef | null | undefined, data: D2cToWebviewMessage) {
  if (!ref) return
  ref.postMessage(data)
}

export type WebviewMessageHandler = (msg: WebviewToD2cMessage) => void

export const IPC_CHANNEL = "d2c-bridge"
