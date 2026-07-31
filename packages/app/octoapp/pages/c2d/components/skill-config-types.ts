export type PanelSkill = {
  label: string
  description?: string
  path?: string
  enable?: boolean
  id?: number
}

export type SkillConfigEntry = { description?: string; import?: boolean; type?: string }

export type SkillConfig = {
  skill?: Record<string, SkillConfigEntry>
  agent?: Record<string, string[]>
  panel?: {
    octo_insight?: PanelSkill[]
    octo_c2d?: PanelSkill[]
    octo_studio?: PanelSkill[]
    common?: PanelSkill[]
  }
}