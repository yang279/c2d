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

export function createWebviewListener(
  iframeRef: () => HTMLIFrameElement | undefined,
  handler: WebviewMessageHandler,
) {
  function onMessage(e: MessageEvent) {
    const iframe = iframeRef()
    if (!iframe || e.source !== iframe.contentWindow) return
    handler(e.data as WebviewToD2cMessage)
  }

  window.addEventListener("message", onMessage)
  return () => window.removeEventListener("message", onMessage)
}
