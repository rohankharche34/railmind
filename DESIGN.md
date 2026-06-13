# RailMind Design System

Extracted from `designs/stitch-export.jsx` and the approved Control Center screenshot.

## Layout

| Token | Value | Tailwind |
|-------|-------|----------|
| Page background | `#0A0F1E` | `bg-[#0A0F1E]` |
| Sidebar width | `64px` | `w-16` |
| Content columns | `35% / 40% / 25%` | `grid-cols-[35%_40%_25%]` |
| Column gap | `12px` | `gap-3` |
| Content padding | `12px` | `p-3` |
| Header height | `48px` | `h-12` |
| Header horizontal padding | `16px` | `px-4` |

## Surfaces & Backgrounds

| Token | Hex | Tailwind |
|-------|-----|----------|
| Background | `#10131A` | `bg-[#10131A]` |
| Surface dim | `#10131A` | `bg-[#10131A]` |
| Surface container lowest | `#0B0E15` | `bg-[#0B0E15]` |
| Surface container | `#1D2027` | `bg-[#1D2027]` |
| Surface container low | `#191B23` | `bg-[#191B23]` |
| Surface container high | `#272A31` | `bg-[#272A31]` |
| Surface container highest | `#32353C` | `bg-[#32353C]` |
| Surface variant | `#32353C` | `bg-[#32353C]` |
| Panel background | `rgba(17,24,39,0.85)` | `bg-[#111827]/85` |
| Panel header | `rgba(31,41,55,0.5)` | `bg-[#1F2937]/50` |
| Map container | `#0B0F19` | `bg-[#0B0F19]` |
| Global gradient overlay | `#0A0F1E` 80→95% | `from-[#0A0F1E]/80 to-[#0A0F1E]/95` |

## Borders

| Token | Hex | Tailwind |
|-------|-----|----------|
| Panel border | `#1F2937` | `border-[#1F2937]` |
| Outline variant | `#424754` | `border-[#424754]` |
| Outline | `#8C909F` | `border-[#8C909F]` |
| Primary border | `#ADC6FF` at 30–50% | `border-[#ADC6FF]/30` |
| Secondary border | `#D0BCFF` at 30–50% | `border-[#D0BCFF]/30` |

## Brand & Accent Colors

| Token | Hex | Tailwind |
|-------|-----|----------|
| Primary | `#ADC6FF` | `text-[#ADC6FF]` / `bg-[#ADC6FF]` |
| Primary container | `#4D8EFF` | `bg-[#4D8EFF]` |
| Secondary | `#D0BCFF` | `text-[#D0BCFF]` |
| Secondary container | `#571BC1` | `bg-[#571BC1]` |
| Secondary fixed dim | `#D0BCFF` | `text-[#D0BCFF]` |
| Tertiary | `#FFB786` | `text-[#FFB786]` / `border-[#FFB786]` |
| On surface | `#E1E2EC` | `text-[#E1E2EC]` |
| On surface variant | `#C2C6D6` | `text-[#C2C6D6]` |

## Severity Colors

| Level | Text | Border | Background | Left accent |
|-------|------|--------|------------|-------------|
| **Critical** | `text-[#FFB4AB]` or `text-red-400` | `border-red-400/40` → `border-red-400` (pulse) | `bg-red-400/5` | `bg-red-400` |
| **High** | `text-orange-400` | `border-orange-500/30` | `bg-[#1D2027]` | `bg-orange-500` |
| **Medium** | `text-[#FFB786]` | `border-[#FFB786]/30` | `bg-[#1D2027]` | `bg-[#FFB786]` |
| **Low / Normal** | `text-green-500` | `border-green-500` | — | `border-l-green-500` |

### Status dots

| State | Color | Tailwind |
|-------|-------|----------|
| Live / Normal | `#22C55E` | `bg-green-500` |
| Delayed | `#F97316` | `bg-orange-500` |
| Critical | `#FFB4AB` / red | `bg-red-400` |
| REC indicator | `#EF4444` | `bg-red-500` |
| Agent idle | `#D0BCFF` | `bg-[#D0BCFF]` |

## Typography

| Role | Font | Size | Weight | Line-height | Tailwind |
|------|------|------|--------|-------------|----------|
| Display lg | Inter | 30px | 700 | 38px | `text-[30px] font-bold leading-[38px] tracking-tight` |
| Headline md | Inter | 20px | 600 | 28px | `text-xl font-semibold` |
| Headline sm (alerts) | Inter | 13px | 600 | — | `text-[13px] font-semibold` |
| Body sm | Inter | 13px | 400 | 18px | `text-[13px] leading-[18px]` |
| Body xs | Inter | 11px | 400 | — | `text-[11px]` |
| Label caps | Inter | 11px | 700 | 14px | `text-[11px] font-bold uppercase tracking-widest` |
| Label caps sm | Inter | 9–10px | 700 | — | `text-[9px] font-bold uppercase tracking-wider` |
| Data mono | JetBrains Mono | 12px | 500 | 16px | `font-mono text-xs font-medium` |
| Data mono sm | JetBrains Mono | 10px | 500 | — | `font-mono text-[10px] font-medium` |
| Data mono xs | JetBrains Mono | 9px | 500 | — | `font-mono text-[9px] font-medium` |
| Stat value | JetBrains Mono | 24px | 500 | — | `font-mono text-2xl font-medium` |

**Font usage rules:**
- Headers, labels, body → Inter (`font-sans`)
- Timestamps, stats, camera IDs, commands → JetBrains Mono (`font-mono`)

## Spacing & Shape

| Token | Value | Tailwind |
|-------|-------|----------|
| Panel border radius | `0.25rem` (4px) | `rounded` |
| Button / input radius | `0.25rem` | `rounded` |
| Badge radius | `rounded-full` or `rounded` | context-dependent |
| Panel header padding | `8px 12px` | `px-3 py-2` |
| Panel content padding | `8–12px` | `p-2` / `p-3` |
| Stat card height | `96px` | `h-24` |
| Gap between panels | `12px` | `gap-3` |
| Gap between stat cards | `8px` | `gap-2` |

## Panel Pattern

```html
<!-- Standard panel -->
<div class="bg-[#111827]/85 backdrop-blur-sm border border-[#1F2937] rounded flex flex-col overflow-hidden">
  <div class="px-3 py-2 border-b border-[#1F2937] bg-[#1F2937]/50 flex justify-between items-center">
    <!-- header -->
  </div>
  <!-- body -->
</div>
```

## Animations

| Name | Usage | CSS class |
|------|-------|-----------|
| `pulse-critical` | Critical alerts, critical train dot | `animate-pulse-critical` |
| `blink` | REC dot, live indicators | `animate-blink` |
| `slide-in` | Alert feed items (staggered) | `animate-slide-in` |
| `ping` | Map train dots | `animate-ping` (Tailwind built-in on pseudo) |

### Keyframes (defined in `dashboard/src/app/globals.css`)

- **pulse-critical**: border + box-shadow pulse red every 2s
- **blink**: opacity 1 → 0 → 1 every 1s
- **slide-in**: translateX(20px) + opacity 0 → visible, 0.3s ease-out

## Component-Specific Patterns

### DashboardHeader
- `bg-[#10131A]/80 backdrop-blur border-b border-[#424754]`
- Phase badge: `bg-[#272A31] px-2 py-1 rounded border border-[#424754]`
- Live dot: green `animate-blink`

### CctvFeed
- Camera tabs: active `bg-[#ADC6FF]/20 text-[#ADC6FF] border-[#ADC6FF]/50`
- Video overlay REC: red dot + `REC` mono label
- Detection boxes: `border-red-400/70 bg-red-400/10`, defect label `bg-red-400 text-white text-[8px]`

### StatCards
- Left accent borders: primary `border-l-[#ADC6FF]`, risk `border-l-green-500`, delay `border-l-orange-500`
- Hover: `hover:bg-[#32353C]`

### RiskAlertPanel (Alert Feed)
- Critical card: `border border-red-400 bg-red-400/5 animate-pulse-critical`
- Left stripe: `absolute left-0 w-1` in severity color
- Action buttons: primary `bg-red-400 text-white`, secondary `border border-[#424754]`

### AgentReasoningPanel
- Top border accent: `border-t-2 border-t-[#571BC1]`
- Header: `bg-[#571BC1]/10`
- Timeline: left border `border-l border-[#424754]/50`, dot markers
- RAG box: `bg-[#D0BCFF]/10 border border-[#D0BCFF]/20 text-[#D0BCFF]`
- Proposal box: `bg-[#272A31] border border-[#D0BCFF]/30`
- Execute button: `bg-[#D0BCFF]/20 text-[#D0BCFF] border border-[#D0BCFF]/50`

### Railway Digital Twin (center map)
- Height: `55%` of center column
- Map tabs: RISK (active primary), HEALTH (muted), PROPAGATION (orange)
- Train dots: 10px circle, critical 14px with pulse
- Grid overlay: 40px cells at `rgba(255,255,255,0.02)`

## Scrollbar

| Part | Color |
|------|-------|
| Width | `4px` |
| Thumb | `#32353C` |
| Thumb hover | `#424754` |
