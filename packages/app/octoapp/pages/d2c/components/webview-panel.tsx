import { createSignal, onCleanup, onMount, Show, type JSX } from "solid-js"

export interface WebviewPanelRef {
  postMessage: (data: unknown) => void
}

interface WebviewPanelProps {
  url: string
  onMessage?: (data: unknown) => void
  class?: string
  style?: JSX.CSSProperties
  ref?: (el: WebviewPanelRef) => void
}

export function WebviewPanel(props: WebviewPanelProps) {
  let iframeRef: HTMLIFrameElement | undefined
  const [loading, setLoading] = createSignal(true)

  function handleMessage(e: MessageEvent) {
    if (e.source !== iframeRef?.contentWindow) return
    props.onMessage?.(e.data)
  }

  onMount(() => {
    window.addEventListener("message", handleMessage)
    onCleanup(() => window.removeEventListener("message", handleMessage))
  })

  const ref: WebviewPanelRef = {
    postMessage: (data: unknown) => {
      iframeRef?.contentWindow?.postMessage(data, "*")
    },
  }

  props.ref?.(ref)

  return (
    <div class={props.class} style={{ position: "relative", ...props.style }}>
      <Show when={loading()}>
        <div
          class="absolute inset-0 flex items-center justify-center"
          style={{ background: "#fff", "z-index": "1" }}
        >
          <div class="octo-spinner" />
        </div>
      </Show>
      <iframe
        ref={iframeRef!}
        src={props.url || "about:blank"}
        style={{ width: "100%", height: "100%", border: "none" }}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
        allow="clipboard-read; clipboard-write"
        onLoad={() => setLoading(false)}
      />
    </div>
  )
}
