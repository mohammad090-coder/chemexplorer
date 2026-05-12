# Design Brief: ChemisteryX — Premium Glassmorphic Chemistry Platform

## Purpose & Context
Interactive Periodic Table explorer with luxury glassmorphic UI. ChemisteryX brand identity for premium science learning. Dark-mode immersive experience with deep blue/purple gradients. Emotional state: wonder, discovery, premium tech craftsmanship, scientific excellence.

## Tone & Differentiation
**Tone:** Premium luxury tech with organic fluidity. ChemisteryX brand: ultra-deep glassmorphism (25–32px blur) with deep blue/purple gradient backgrounds, translucent, colorful, immersive, refined. Section-based glow system: Periodic (blue), Lab (purple), Reaction (orange), Carbon (green), Practice (cyan). Users instantly recognize sections by glow color without reading labels.

## Color Palette (OKLCH)

| Token | L | C | H | Purpose |
|-------|---|---|---|---------|
| Background | 0.12 | 0 | 0 | Core dark base, deep immersion |
| Card | 0.18 | 0.02 | 0 | Glass card subtle tint |
| Foreground | 0.96 | 0 | 0 | Text, maximum contrast |
| Primary | 0.68 | 0.16 | 258 | Interactive highlights, links |
| Accent | 0.72 | 0.18 | 130 | Active states, focus glow |
| Destructive | 0.65 | 0.19 | 22 | Error, warnings, critical actions |

## Section-Specific Palettes

| Section | Primary | Secondary | Accent | Use Case |
|---------|---------|-----------|--------|----------|
| Reactivity Series | 0.52 0.1 250 | 0.68 0.06 270 | 0.75 0.15 200 | Metallic steel tones, cool chemistry |
| Reaction Lab | 0.6 0.15 200 | 0.65 0.2 250 | 0.72 0.25 50 | Lab blues + warm amber reactions |
| Practice Mode | 0.65 0.18 190 | 0.72 0.2 140 | 0.75 0.28 60 | Bright teal + educational gold |
| Carbon Tab | 0.4 0.02 0 | 0.55 0.08 240 | 0.92 0.02 0 | Deep charcoal + diamond white |

## Animation Tokens (ChemisteryX)

| Animation | Duration | Easing | Purpose |
|-----------|----------|--------|----------|
| Glass transition | 0.5s | cubic-bezier(0.34, 1.56, 0.64, 1) | Smooth glass state changes |
| Glow pulse | 4s | ease-in-out | Section glow breathing effect |
| Hero enter | 0.8s | cubic-bezier(0.34, 1.56, 0.64, 1) | Initial page load with glow-in |
| Magnetic float | 3.5s | ease-in-out | Floating cards with scale |
| Page fade+slide | 400–600ms | ease-out | Content transitions, no hard jumps |
| Hover scale+glow | 0.3s | ease-out | Interactive feedback |

## Section-Specific Glow Colors

| Section | Glow Color | Primary | Usage |
|---------|-----------|---------|--------|
| Periodic Table | Blue (`oklch(0.72 0.22 200 / 0.4)`) | `0.72 0.22 200` | Element explorer, discovery |
| Virtual Lab | Purple (`oklch(0.55 0.2 250 / 0.4)`) | `0.55 0.2 250` | Experiments, reactions |
| Reaction Simulator | Orange (`oklch(0.65 0.22 35 / 0.4)`) | `0.65 0.22 35` | Chemical equations, flames |
| Carbon Tab | Green (`oklch(0.4 0.08 120 / 0.4)`) | `0.4 0.08 120` | Carbon allotropes, depth |
| Practice Mode | Cyan (`oklch(0.68 0.2 190 / 0.4)`) | `0.68 0.2 190` | Learning, quizzes |

## Cursor & Interactive Effects (ChemisteryX)

- **Custom cursor glow**: Radial gradient halo around pointer for visual feedback
- **Magnetic hover**: Elements respond to cursor proximity with subtle scale+translate
- **Glow-border animation**: Pulsing drop-shadow with section-specific colors
- **Hero enter animation**: Scale + fade + blur for dramatic page load reveal

## State-of-Matter Colors

| State | L | C | H | Visual |
|-------|---|---|---|--------|
| Solid | 0.65 | 0.16 | 250 | Cool blue glow, stable presence |
| Liquid | 0.72 | 0.25 | 50 | Warm amber shimmer, flowing |
| Gas | 0.68 | 0.18 | 280 | Purple float, ethereal, light |

## Element Category Gradients

| Category | Gradient Range | Hue | Usage |
|----------|---|---|---|
| Alkali Metals | 0.72→0.65 C:0.22→0.18 | 200-210 | Cyan-blue glass tint |
| Alkaline Earth | 0.72→0.65 C:0.22→0.18 | 330-340 | Magenta glass tint |
| Transition Metals | 0.68→0.60 C:0.20→0.15 | 260-270 | Purple glass tint |
| Halogens | 0.70→0.62 C:0.21→0.18 | 140-150 | Green glass tint |
| Noble Gases | 0.75→0.68 C:0.25→0.20 | 50-60 | Gold glass tint |
| Metalloids | 0.72→0.65 C:0.22→0.18 | 320-330 | Pink glass tint |
| Nonmetals | 0.75→0.68 C:0.25→0.20 | 25-35 | Orange glass tint |

## Typography

| Layer | Font | Weight | Size | Role |
|-------|------|--------|------|------|
| Display | General Sans | 700 | 32-48px | Headlines, element names |
| Body | DM Sans | 400-500 | 14-16px | Descriptions, labels |
| Mono | JetBrains Mono | 400-600 | 12-14px | Atomic numbers, data tables |

## Structural Zones

| Zone | Background | Blur | Border | Details |
|------|---|---|---|---|
| Nav | `glass` | 32px | gradient (2–5% rgba) | Top fixed, semi-transparent, reflection highlight |
| Main Content | `bg-background` | N/A | None | Full dark immersion |
| Element Cards | `glass` + category gradient | 32px | gradient-border per category | Hover: scale 1.02, lift -4px, reflection glow |
| Section Panels | `glass-[section]` | 32px | gradient-border-[section] | Reactivity/Reaction/Practice/Carbon specific |
| Dock | `glass` rounded-full | 32px | gradient-border (2–5% rgba) | Fixed bottom-center, active state glow, reflection |
| Modal/Popover | `glass-elevated` | 40px | gradient-border | Deep shadow, inset highlight, premium depth |

## Component Patterns

- **Glass Cards**: `glass` class—32px backdrop blur, 40% card bg, 30% border with subtle color tint, inset reflection highlight
- **Element Tiles**: `.element-card`—gradient border per category, hover scale+translate, glass-glow shadow with reflection
- **Section Panels**: `.glass-[reactivity|reaction|practice|carbon]`—section-specific background tint, gradient border, inset reflection
- **Temperature Slider**: `.glass` container with state-of-matter color indicators (solid/liquid/gas), shadow glow per state
- **Navbar**: Fixed top `nav-glass`, 32px blur, semantic links with underline accent on hover
- **Dock**: Fixed bottom-center `dock-glass`, pill-shaped, icons with active state glow pulse and reflection
- **Buttons**: Primary (filled accent), secondary (glass outline), sizes sm/md/lg, all with reflection highlights

## Motion & Animation

| Effect | Keyframe | Duration | Easing | Purpose |
|--------|----------|----------|--------|---------|
| Float Particles | 0→-100vh, fade in/out | 8s | linear | Ambient background animation |
| Glow Pulse | shadow opacity 0.3→0.5 | 3s | ease-in-out | Active element breathing |
| Shimmer | -1000px→1000px | 2s | linear | Liquid state indicator animation |
| Float | translateY ±10px | 3s | ease-in-out | Gas state floating motion |
| Glow Reactive | shadow spread 15px→25px | 2s | ease-in-out | Reactivity indicator pulse |
| Scale In | scale 0.95→1, fade | 0.3s | ease-out | Card entrance |
| Fade In Up | translateY 10px→0 | 0.5s | ease-out | Content reveal |

## Constraints & Rules

- **No raw colors**: All colors via `oklch()` with CSS variables only
- **Glass hierarchy**: Nav/Cards 32px, Modal 40px (stronger effect closer to focus)
- **Gradient borders**: 2–5% rgba transparency via gradient tokens—never opaque
- **Reflection highlights**: Inset highlights (`oklch(1 0 0 / 0.08)`) on all glass surfaces for light reflection
- **Glow intensity**: Max 32px shadow spread; opacity <0.5 to avoid wash-out
- **Reduced motion on mobile**: Scale animations reduced to 1.01, shorter durations, no shimmer on low-end devices

## Signature Details

1. **Ultra-deep glassmorphism**: 32–40px blur creates immersive, layered depth. No flat surfaces.
2. **Section-coded glass**: Reactivity Series (cool metallics), Reaction Lab (lab blue+amber), Practice Mode (bright teal+gold), Carbon Tab (charcoal+white) — each with unique glass tint and gradient border.
3. **Subtle light reflection**: Inset highlights on every glass surface suggest light bouncing off premium frosted glass.
4. **State-of-matter indicators**: Temperature slider shows solid (cool blue glow), liquid (warm amber shimmer), gas (purple float) — visual chemistry feedback.
5. **Category-coded gradients**: Element tiles inherit category hues embedded in glass—instant visual language without legend.

## Responsive & Accessibility

- Mobile-first grid: 4 cols → 6 cols → 8 cols at sm/md/lg
- Touch targets: 44px min height for dock icons, 48px for buttons
- Color contrast: AA+ verified (L diff >0.7 foreground-on-background)
- Reduced motion: `prefers-reduced-motion` disables particle animation and scales
- Dark mode: Primary design approach; light mode opt-in if needed
