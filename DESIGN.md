# Design Brief

## Direction

CareBridge — Clinical health monitoring for rural communities with contextual vital sign feedback.

## Tone

Clinical minimalism — restrained, professional, focused on medical data clarity. Users are healthcare workers under stress; the interface must inspire trust and precision.

## Differentiation

Contextual color-coded vital sign cards (teal=normal, amber=warning, red=critical) provide immediate visual feedback without requiring data interpretation.

## Color Palette

| Token       | OKLCH        | Role                            |
| ----------- | ------------ | ------------------------------- |
| background  | 0.985 0 0    | Light, clinical background      |
| foreground  | 0.12 0 0     | Navy text on light              |
| primary     | 0.52 0.16 176| Teal health accent, interactive |
| accent      | 0.52 0.16 176| Vital sign normal (teal)        |
| destructive | 0.52 0.22 24 | Alert/critical (red)            |
| sidebar     | 0.1 0 0      | Navy authority background       |
| muted       | 0.92 0 0     | Soft section dividers           |

## Typography

- Display: Fraunces — headings, patient names, critical alerts
- Body: DM Sans — form labels, vital values, body copy
- Scale: hero 32px/700, h2 24px/600, label 14px/600, body 16px/400

## Elevation & Depth

Minimal shadows (xs only); depth created through card backgrounds, borders, and navy sidebar contrast. No decorative glows or embossing.

## Structural Zones

| Zone    | Background     | Border                | Notes                                        |
| ------- | -------------- | --------------------- | -------------------------------------------- |
| Sidebar | sidebar (navy) | sidebar-border subtle | Fixed 240px, patient nav, role-based items   |
| Topbar  | card (white)   | border-b              | Title, logout button, alert badge count      |
| Content | background     | —                     | Stat cards, tables, forms; alternating cards |
| Footer  | muted/40       | border-t              | Stats, timestamps                            |

## Spacing & Rhythm

Consistent 16px gutter rhythm: stat cards 24px gap, form fields 16px vertical, table rows 12px padding. Sections separated by 32px top margin for clear grouping.

## Component Patterns

- Buttons: Teal primary (solid), navy secondary, red destructive; 8px rounded
- Cards: 8px roundness, subtle border, white background on light theme
- Badges: Role badges (doctor=teal, volunteer=slate, admin=navy), status badges (stable=teal, alert=red, review=amber)

## Motion

- Entrance: Fade-in 300ms on page load
- Hover: Smooth 200ms background color shift on buttons, table rows
- Decorative: Pulse animation (1s) on active alerts badge

## Constraints

- No gradients or decorative imagery on data-heavy pages
- Sidebar always fixed and visible on desktop; collapsible on mobile
- Vital sign values must be readable at a glance (min 16px, bold 600)
- All links and buttons require visible focus indicator

## Signature Detail

Vital sign cards with inline status color — teal borders for normal, amber for warning, red for critical — create instantaneous clinical assessment without tooltip or modal interaction.
