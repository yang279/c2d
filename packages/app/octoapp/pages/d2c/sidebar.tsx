import { createEffect, createSignal } from "solid-js"
import { useLocation } from "@solidjs/router"
import { Icon } from "@opencode-ai/ui/icon"
import { useGlobalSync } from "@/context/global-sync"
import { useProjectDir } from "@/hooks/use-project-dir"
import { AgentSidebar } from "@/components/agent-sidebar"
import type { Session } from "@opencode-ai/sdk/v2/client"

export function D2cSidebar() {
  const location = useLocation()
  const globalSync = useGlobalSync()
  const projectDir = useProjectDir()

  const [resolvedDir, setResolvedDir] = createSignal<string>()

  createEffect(() => {
    const d = projectDir()
    if (d) setResolvedDir(d)
  })

  createEffect(() => {
    if (!globalSync.data.ready) {
      const d = projectDir()
      if (d) setResolvedDir(d)
    }
  })

  return (
    <AgentSidebar
      directory={resolvedDir()}
      agentFilter="octo_d2c"
      buildSessionRoute={(s: Session) => `/d2c/${s.id}`}
      buildNewRoute={() => "/d2c"}
      buildDeleteFallback={() => "/d2c"}
      activeSessionId={() => {
        const m = location.pathname.match(/^\/d2c\/(.+)$/)
        return m?.[1]
      }}
      sectionTitle="Octo D2C"
      sectionIcon={() => (
        <span style={{ "--icon-base": "#0a59f7", display: "inline-flex" }}>
          <Icon name="tab-d2c" size="normal" />
        </span>
      )}
      newButtonText="新建对话"
      trackerModule="d2c"
      sidebarSourceKey="d2c"
    />
  )
}
