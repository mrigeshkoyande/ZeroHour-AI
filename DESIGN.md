# 🎨 ZeroHour AI — Design System & UI Architecture Spec

> **Tagline:** *"When Every Minute Matters."*  
> **Brand Persona:** Visionary, Precise, Weightless, and Authoritative.  
> **Inspirations:** Apple (Tactile hardware details), Linear (Speed & Keyboard-first command layout), Vercel (Minimal clean developers' aesthetics), Arc Browser (Fluid navigation & structural sidebar), Notion AI (Weightless clean contextual prompts).

---

## 🎨 1. Design Philosophy & System Core

ZeroHour AI is designed to look like a high-end operating system dashboard rather than a typical SaaS app. It employs a "whitespace-first" layout, prioritizing cognitive breathing room over information packing. The overall style is a premium hybrid of **Light-Mode Minimalism** and **Tactile Glassmorphism**.

```
   Level 3: Contextual Overlays (AI Blobs, Search Modals) - Backdrop blur 12px, soft border, shadow-2xl
     ▲
   Level 2: Interactive Cards (Bento Boxes, Sliders) - bg-white, border-gray-200/80, shadow-sm
     ▲
   Level 1: System Containers (Sidebar, Header, Bottom Nav) - bg-[#F8F9FA], border-r/b
     ▲
   Level 0: Workspace Canvas (Global background) - bg-[#FFFFFF] / bg-gray-50
```

---

## 🎨 2. Color Palette & Semantic Tokens

ZeroHour AI utilizes HSL-tailored emerald and warm slate tones to present a calm, growth-centric interface.

| Token | Hex Value | Application | Role |
| :--- | :--- | :--- | :--- |
| `primary` | `#006C49` | Logo, primary headers, active text icons | Dark Emerald |
| `primary-container` | `#10B981` | Primary buttons, active markers, status signals | Emerald Green |
| `secondary-container`| `#64F9BC` | Highlight cards, inline tags, focus markers | Light Mint |
| `accent-orange` | `#FB923C` | Highlight metrics, priority warnings | Soft Orange |
| `accent-amber` | `#F59E0B` | Medium risk highlights, warning borders | Amber Alert |
| `accent-red` | `#EF4444` | High risk indicators, SOS buttons, collisions | Crimson Red |
| `background` | `#F8F9FA` | Global layouts background, sidebar, header input | Cool Gray-50 |
| `surface` | `#FFFFFF` | Bento card backgrounds, modal panels, inputs | Pure White |
| `outline-variant` | `#BBCABF` | Subtle borders, graph grids, timeline lines | Mint Slate |
| `text-main` | `#111827` | Main headings, statistics numbers | Charcoal Slate |
| `text-muted` | `#6B7280` | Card descriptors, timestamps, helper tags | Steel Gray |

---

## ✍️ 3. Typography Hierarchy

The typeface strategy is split between **Sora** (headlines and stats) for a geometric, futuristic character and **Inter** (tables, copy, body text) for legibility.

* **Display Hero Titles:** `font-family: 'Sora'`, `font-size: 72px`, `line-height: 84px`, `letter-spacing: -0.02em`, `font-weight: 800`.
* **Section Headers (h2):** `font-family: 'Sora'`, `font-size: 48px`, `line-height: 56px`, `letter-spacing: -0.01em`, `font-weight: 700`.
* **Card Headlines (h3):** `font-family: 'Sora'`, `font-size: 24px`, `line-height: 32px`, `font-weight: 600`.
* **Metadata Labels:** `font-family: 'Inter'`, `font-size: 11px`, `font-weight: 700`, `text-transform: uppercase`, `letter-spacing: 0.05em`.
* **Body / Copy:** `font-family: 'Inter'`, `font-size: 14px`, `line-height: 20px`, `font-weight: 400`, `color: #4B5563`.

---

## 📐 4. Layout, Spacing & Breakpoints

The spacing rhythm is calculated around an **8px base unit** (8, 16, 24, 32, 48, 64) to form a proportional grid.

* **Layout Container:** Center aligned, `max-width: 1440px` (`max-w-7xl`).
* **Bento Grid Spacing:** Cards are spaced using `gap-6` (24px) for desktop and `gap-4` (16px) for mobile.
* **Responsive Breakpoints:**
  * **Desktop (`lg` / `xl`):** Left-aligned persistent sidebar (`w-72`), top nav bar, and three-column bento grids.
  * **Mobile / Tablet (Below `md`):** Sidebar hidden. Collapsed search bar button in the header. Interactive bottom navigation drawer anchored to the screen with `pb-24` main content offset.

---

## 🧱 5. Component Style Guide

### A. The "Glass-Card" Container
Standard cards utilize a pure white container accented by subtle depth shadows and micro-borders:
```css
.glass-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(187, 202, 191, 0.3); /* border-[#bbcabf]/30 */
  border-radius: 24px; /* rounded-2xl */
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.03);
}
```

### B. Circular Risk Gauges
Renders risk levels using clean vector gauges powered by circular track strokes and dash-offsets:
* **Gauge Base Track:** `#f3f4f5` (Gray-100).
* **Gauge Stroke Gradient:** `url(#riskGradient)` from `#f59e0b` (Amber) to `#ef4444` (Red) to signify deadline threats visually.
* **Gauge Text:** Large Sora bold number in the center showing percentage, accompanied by high-contrast status text labels.

### C. Live AI Orb Assistant
Touchnpoints where the AI is processing schedule optimizations feature an animated neurology orb:
* Pulses gently via a `pulse` loop.
* Outlined with a slow-spinning dashed circle (`animate-spin-slow`) in `#10B981` (primary-container) to simulate processor threads.

---

## ⚡ 6. Interaction, Micro-Animations & State Transitions

1. **Button Scale Compression ("Squishy Buttons"):**
   Action triggers slightly scale down on mouse click (`active:scale-95`) and transition smoothly to hover states to increase tactile feedback:
   ```css
   transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
   ```
2. **Graph Hover Tooltips:**
   Bars on the productivity charts transition heights dynamically and reveal custom dark tooltips (`bg-gray-900 text-white`) when hovered.
3. **Pulsing State Indicators:**
   Connection and sync indicators (e.g., "Gemini Connected", "Twin Online") display a green breathing dot using:
   ```css
   @keyframes pulse {
     0%, 100% { opacity: 1; transform: scale(1); }
     50% { opacity: 0.5; transform: scale(0.92); }
   }
   ```
