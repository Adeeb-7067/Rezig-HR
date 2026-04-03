# HRM Rezig - Admin Web Dashboard

This project is a web dashboard for HR and payroll teams. In the browser, you manage employees, attendance, salary, taxes, and reports.

This README is written in simple language so that even a non-technical person can understand the structure.

---

## 1. How to open and run the project (for IT team)

- The project is a React + Vite web application.
- Main commands (run in a terminal):
  - `npm install` - install dependencies (only once on a new machine)
  - `npm run dev` - start the app in development mode
  - `npm run build` - create a production build

You do not need these commands just to read this README.

---

## 2. High-level structure of the app

All main screens live under `src/Pages/`.

Some examples:
- `src/Pages/DashBoard.jsx` - Main dashboard (overview cards and key numbers)
- `src/Pages/Payroll Dashboard/PayrollDashboard.jsx` - Payroll dashboard
- `src/Pages/Employee Dashboard/EmployeeDashboard.jsx` - Employee dashboard
- `src/Pages/EmployeList.jsx` - Employee list (master data)
- `src/Pages/Leave/LeaveConfiguration.jsx` - Leave configuration
- `src/Pages/pfConfiguration.jsx` - PF / ESI / PT / LWF configuration
- `src/Pages/IncomeTaxConfiguration.jsx` - Income tax configuration
- `src/Pages/organizationDetails.jsx` - Organisation information and settings
- `src/Pages/AttendanceRegularisation/AttendanceRegularisation.jsx` - Attendance regularisation
- `src/Pages/fullAndFinal/FullAndFinal.jsx` - Full & Final settlement flow
- `src/Pages/BankBuilder/**` - Bank file and bank report configuration
- `src/Pages/ReportBuilder/**` - Report builder screens

Common building blocks (filters, buttons, fields, toggles, date picker, etc.) are mostly in:
- `src/components/**`
- `src/components/ui/**`

---

## 3. Navigation - how you move around the app

- The left sidebar is defined in `src/Pages/SideBar.jsx`.
- When you click a menu item, the app opens the matching page under `src/Pages/...`.

In simple terms:
- Use the sidebar to choose the area (Dashboard, Configuration, Attendance, Loans, Payroll, Reports, Full & Final).
- Use the buttons, filters, and toggles inside each page to do the work (view, filter, edit, approve, download, etc.).

---

## 4. Primary color and design system

The UI uses one shared primary color token so the brand look stays consistent.

- The main color token is `--color-ds-primary` (set in `src/index.css`).
- It is used through helper classes:
  - `ds-bg-primary` - primary background
  - `ds-text-primary` - primary text color
  - `ds-border-primary` - primary border color

Whenever something is an important "active/ON" state, it uses this primary design color.

---

## 5. Knowledge transfer without the `docs/` folder (self-navigate guide)

The `docs/` folder has been removed and will not come back. You can still understand the UI using the code itself:

- Every screen/page is in `src/Pages/...`.
- Each page contains visible actions:
  - Buttons: find `onClick={...}` in the same page file.
  - Toggles: find `onCheckedChange={...}` in the same page file.

Simple rule:
- If you want to know "what happens when I click this button/toggle", you search for its handler (`onClick` or `onCheckedChange`) in the matching page component.

Also note:
- Toggle/Switch ON styling is set to the primary design color.

---

## 6. Primary color rules (keep the UI consistent)

When you make UI changes, follow these rules so old purple/violet/hex values never return:

- Use DS primary helper classes instead of hard-coded colors.
- For primary brand UI, prefer:
  - `ds-bg-primary`, `ds-text-primary`, `ds-border-primary`
- For dark mode:
  - Prefer `dark:` variants that still use DS primary helpers (not old `dark:purple-*` / `dark:violet-*`).

Quick detection checklist while editing:
- Search for `purple-`, `violet-`, `#` in the changed file.
- If you see a new hard-coded purple/violet/hex that looks like the primary brand color, replace it with the DS primary approach.

---

## 7. Where the common controls live

If you need to change shared control behavior/style, start here:

- Sidebar (navigation): `src/Pages/SideBar.jsx`
- Page screens: `src/Pages/...`
- Shared UI:
  - `src/components/` (helpers, filters, shared layout pieces)
  - `src/components/ui/` (reusable controls like date picker and switches)

Examples:
- Switch/toggle styling is handled in `src/components/ui/switch.jsx` (ON state uses primary DS color).
- Date picker styling is handled in `src/components/ui/datePicker.jsx`.

---

## 8. Quick checklist when you change a UI screen

Before finishing a UI change, confirm:

- Buttons still work and still look correct (no accidental layout changes).
- Toggles still show primary color when ON.
- Dark mode still looks correct for the changed parts.
- No new hard-coded primary purple/violet/hex colors were added.

---

## 9. If you extend the system (new pages/components)

When you add new screens or reusable UI:

1. Put screens in `src/Pages/...` and reusable UI in `src/components/...`.
2. Use the primary design token classes:
   - `ds-bg-primary`, `ds-text-primary`, `ds-border-primary`
3. Prefer using existing shared controls from `src/components/ui/...` so the look stays consistent across the app.

---

## 10. CSS Variables Reference

All CSS variables are defined in `src/index.css` inside `:root` and `.dark` blocks.

### Spacing & Border Radius

| Variable | Value | Description |
|---|---|---|
| `--radius` | `0.625rem` | Base border radius |
| `--radius-sm` | `calc(var(--radius) - 4px)` | Small radius |
| `--radius-md` | `calc(var(--radius) - 2px)` | Medium radius |
| `--radius-lg` | `var(--radius)` | Large radius (same as base) |
| `--radius-xl` | `calc(var(--radius) + 4px)` | Extra-large radius |

### Responsive Typography (Fluid / Clamp)

These variables scale text automatically between small and large screens.

| Variable | Value | Use case |
|---|---|---|
| `--text-xs` | `clamp(0.65rem, 0.6rem + 0.2vw, 0.75rem)` | Extra-small labels |
| `--text-sm` | `clamp(0.75rem, 0.7rem + 0.3vw, 0.875rem)` | Small body text |
| `--text-base` | `clamp(0.875rem, 0.8rem + 0.4vw, 1rem)` | Normal body text |
| `--text-lg` | `clamp(1rem, 0.95rem + 0.5vw, 1.125rem)` | Large body / sub-headings |
| `--text-xl` | `clamp(1.125rem, 1rem + 0.6vw, 1.25rem)` | Section headings |
| `--text-2xl` | `clamp(1.25rem, 1.1rem + 0.8vw, 1.5rem)` | Page sub-titles |
| `--text-3xl` | `clamp(1.5rem, 1.3rem + 1vw, 1.875rem)` | Page titles / H1 |

### Design System Color Token

| Variable | Value | Description |
|---|---|---|
| `--color-ds-primary` | `#8629DF` | Brand primary purple — the single source of truth for the brand color |
| `--color-purple-700` | `var(--color-ds-primary)` | Alias for DS primary |
| `--color-text-ds-primary` | `var(--color-ds-primary)` | Text variant alias |

### Semantic Color Variables — Light Mode (`:root`)

These are used by Tailwind utilities and Radix UI components automatically.

| Variable | Light value | Dark value | Purpose |
|---|---|---|---|
| `--background` | `oklch(1 0 0)` | `oklch(0.145 0 0)` | Page/app background |
| `--foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` | Default text color |
| `--card` | `oklch(1 0 0)` | `oklch(0.205 0 0)` | Card surface |
| `--card-foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` | Card text |
| `--popover` | `oklch(1 0 0)` | `oklch(0.205 0 0)` | Popover/dropdown surface |
| `--popover-foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` | Popover text |
| `--primary` | `oklch(0.205 0 0)` | `oklch(0.922 0 0)` | Primary interactive elements |
| `--primary-foreground` | `oklch(0.985 0 0)` | `oklch(0.205 0 0)` | Text on primary elements |
| `--secondary` | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` | Secondary/muted surfaces |
| `--secondary-foreground` | `oklch(0.205 0 0)` | `oklch(0.985 0 0)` | Text on secondary elements |
| `--muted` | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` | Disabled / de-emphasised areas |
| `--muted-foreground` | `oklch(0.556 0 0)` | `oklch(0.708 0 0)` | De-emphasised text |
| `--accent` | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` | Hover highlights |
| `--accent-foreground` | `oklch(0.205 0 0)` | `oklch(0.985 0 0)` | Text on accented surface |
| `--destructive` | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` | Errors / delete actions |
| `--border` | `oklch(0.922 0 0)` | `oklch(1 0 0 / 10%)` | Default border |
| `--input` | `oklch(0.922 0 0)` | `oklch(1 0 0 / 15%)` | Input field border/background |
| `--ring` | `oklch(0.708 0 0)` | `oklch(0.556 0 0)` | Focus ring |

### Chart Color Variables

| Variable | Light value | Use |
|---|---|---|
| `--chart-1` | `oklch(0.646 0.222 41.116)` | Orange — first data series |
| `--chart-2` | `oklch(0.6 0.118 184.704)` | Blue — second data series |
| `--chart-3` | `oklch(0.398 0.07 227.392)` | Purple — third data series |
| `--chart-4` | `oklch(0.828 0.189 84.429)` | Yellow — fourth data series |
| `--chart-5` | `oklch(0.769 0.188 70.08)` | Orange-red — fifth data series |

### Sidebar Color Variables

| Variable | Description |
|---|---|
| `--sidebar` | Sidebar background surface |
| `--sidebar-foreground` | Sidebar text color |
| `--sidebar-primary` | Active/selected sidebar item background |
| `--sidebar-primary-foreground` | Text on active sidebar item |
| `--sidebar-accent` | Sidebar hover highlight |
| `--sidebar-accent-foreground` | Text on hovered sidebar item |
| `--sidebar-border` | Sidebar divider/border |
| `--sidebar-ring` | Sidebar focus ring |

### Color Wrapper Variables (Tailwind alias layer)

Tailwind utilities read from these `--color-*` aliases so that changing `--background` is enough to update the whole theme.

```
--color-background  → var(--background)
--color-foreground  → var(--foreground)
--color-card        → var(--card)
--color-card-foreground → var(--card-foreground)
--color-popover     → var(--popover)
--color-popover-foreground → var(--popover-foreground)
--color-primary     → var(--primary)
--color-primary-foreground → var(--primary-foreground)
--color-secondary   → var(--secondary)
--color-secondary-foreground → var(--secondary-foreground)
--color-muted       → var(--muted)
--color-muted-foreground → var(--muted-foreground)
--color-accent      → var(--accent)
--color-accent-foreground → var(--accent-foreground)
--color-destructive → var(--destructive)
--color-border      → var(--border)
--color-input       → var(--input)
--color-ring        → var(--ring)
--color-chart-1..5  → var(--chart-1..5)
--color-sidebar-*   → var(--sidebar-*)
```

---

## 11. Custom CSS Class Names Reference

All custom classes below are defined in `src/index.css` unless a different file is noted.

### Typography Classes

| Class | Font size | Weight | Purpose |
|---|---|---|---|
| `.h1` | `var(--text-3xl)` | 700 | Page main title |
| `.h2` | `var(--text-2xl)` | 600 | Section title |
| `.h3` | `var(--text-xl)` | 600 | Sub-section heading |
| `.h4` | `var(--text-lg)` | 500 | Minor heading |
| `.text-body` | `var(--text-base)` | — | Normal body paragraph |
| `.text-Primary` | `0.7rem` | — | Small primary label |
| `.text-Secondary` | `0.8rem` | — | Small secondary label |
| `.text-Header` | `1rem` | — | Section header text |
| `.text-Title` | `1.3rem` | — | Page/panel title |

### Design System Utility Classes

These are the preferred way to apply the brand color. Never use a raw hex or Tailwind `purple-*` class for the primary brand.

| Class | Effect | Example use |
|---|---|---|
| `.ds-text-primary` | `color: var(--color-ds-primary)` | Colored icon/text |
| `.ds-bg-primary` or `.bg-ds-primary` | `background: var(--color-ds-primary)` | Filled buttons, badges |
| `.ds-border-primary` | `border-color: var(--color-ds-primary)` | Outlined buttons, active tabs |
| `.ds-text-xs` | `font-size: 0.7rem` | Tiny labels inside DS components |

### Scrollbar & Overflow Classes

| Class | Description |
|---|---|
| `.no-scrollbar` | Hides all scrollbar chrome (Chrome, Safari, Firefox, IE, Edge) — still scrollable |
| `.table-scroll` | Thin custom scrollbar colored with `--color-ds-primary` on a light gray track; dark-mode aware |
| `.dropdown-scroll` | Thin custom scrollbar with DS primary color — used in select/dropdown lists |

### Form & Input Classes

| Class | Description |
|---|---|
| `.date-input` | Transparent date `<input>` with a text-shadow trick to style the value; removes browser default chrome |
| `.drops` | Styles `<option>` elements inside a `<select>` — aquamarine background, blueviolet on hover |

---

## 12. Reusable Button & Panel Class Patterns

These are not global CSS classes. They are string constants defined at the top of individual component files so the same class string is reused consistently within that file.

### Primary / Secondary Button Pattern

Used in most page forms:

| Pattern | Tailwind classes | Where defined |
|---|---|---|
| Primary (filled) button | `bg-ds-primary text-white font-semibold text-xs py-1 rounded-sm` | Multiple pages |
| Secondary (outline) button | `bg-white border border-ds-primary text-ds-primary font-semibold text-xs py-1 rounded-sm` | Multiple pages |

Specific constants by file:

**`src/Pages/IncomeTaxConfiguration.jsx`**
```
primaryBtnClass   → "bg-ds-primary text-white font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-full sm:w-auto md:w-24"
secondaryBtnClass → "bg-white dark:bg-[#E4E6EB]/10 border border-ds-primary text-ds-primary font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-full sm:w-auto md:w-24"
```

**`src/Pages/fullAndFinal/component/CompliancePayment.jsx`**
```
btnSave     → "font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24 cursor-pointer bg-ds-primary text-white hover:bg-ds-primary/80"
btnPrevReset → "bg-white dark:bg-[#E4E6EB]/10 border border-ds-primary text-ds-primary font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24"
```

**`src/Pages/fullAndFinal/component/VariablePayment.jsx`**
```
btnPrevReset → "btn-outline-half"
btnSave      → "font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24 cursor-pointer bg-ds-primary text-white hover:bg-ds-primary/80"
```

**`src/Pages/AttendanceRegularisation/AttendanceRegularisation.jsx`**
```
baseBtn → "font-semibold text-xs py-1 px-4 rounded-sm flex-1 sm:flex-none sm:min-w-[6rem]"
```
Combined with `btn-primary-half` or `btn-outline-half` modifiers.

### Card / Panel Pattern

Used for inner content panels inside pages:

```
cardClass         → "bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 gap-2 p-2 rounded-lg px-3"
sectionTitleClass → "text-base font-semibold mb-2 text-gray-500 dark:text-gray-200 mt-2"
```

### Form Field Pattern

Used in read-only/view sections:

```
labelClass → "block text-gray-500 font-semibold dark:text-gray-50 ds-text-xs mb-1"
inputClass → "w-full h-7.5 ds-text-xs bg-white dark:bg-gray-800 text-gray-600 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-ds-primary focus:ring-inset rounded-sm px-4 py-1.5"
```

### Table Header Pattern

Used in report/data tables:

```
tableHeaderClass      → "bg-ds-primary text-white text-left text-[0.65rem] font-semibold p-2 first:rounded-tl last:rounded-tr"
tableHeaderRightClass → "bg-ds-primary text-white text-right text-[0.65rem] font-semibold p-2"
```

### Tooltip Classes

Defined in `src/Pages/AttendanceRegularisation/components/AttendanceTooltip.jsx`:

```
TOOLTIP_WRAPPER → "fixed z-[999999] pointer-events-none w-[250px]"
TOOLTIP_BOX     → "bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 rounded-[16.26px] overflow-visible"
ARROW_LEFT      → "absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[10px] border-r-white dark:border-r-gray-800"
```

---

## 13. Radix UI Component Variants (`src/components/ui/button.jsx`)

The shared `<Button>` component uses **Class Variance Authority (CVA)** to generate class combinations from props.

### `variant` prop

| Value | Visual effect |
|---|---|
| `default` | Filled with `--primary` color |
| `destructive` | Red fill — for delete/error actions |
| `outline` | Transparent with border |
| `secondary` | Muted/gray fill |
| `ghost` | No background, hover only |
| `link` | Looks like a hyperlink (underline on hover) |

### `size` prop

| Value | Description |
|---|---|
| `default` | Standard padding (`h-9 px-4 py-2`) |
| `sm` | Small (`h-8 rounded-md px-3`) |
| `lg` | Large (`h-10 rounded-md px-6`) |
| `icon` | Square, icon-only (`h-9 w-9`) |

Usage example:
```jsx
<Button variant="outline" size="sm">Cancel</Button>
<Button variant="default" size="default">Save</Button>
```

---

## 14. Color Palette Quick Reference

### Brand & Interactive

| Token / Class | Hex | Use |
|---|---|---|
| `--color-ds-primary` / `bg-ds-primary` | `#8629DF` | Primary brand purple — buttons, active states, focus rings, table headers |

### Status Colors (Tailwind utilities)

| Color | Example class | Use |
|---|---|---|
| Green | `text-green-500`, `bg-green-100` | Success, present, approved |
| Red | `text-red-500`, `bg-red-100` | Error, absent, rejected |
| Amber/Yellow | `text-amber-500`, `bg-yellow-100` | Warning, pending |
| Blue | `text-blue-500`, `bg-blue-100` | Information, in-progress |
| Gray | `text-gray-400`, `bg-gray-100` | Disabled, placeholder |

### Frequently Used Background Shades

| Class | Hex equivalent | Use |
|---|---|---|
| `bg-[#EFEFEF]/70` | `#EFEFEF` at 70% | Panel / card inner background (light mode) |
| `dark:bg-[#E4E6EB]/10` | `#E4E6EB` at 10% | Panel / card inner background (dark mode) |
| `bg-white` | `#FFFFFF` | Form inputs, modal surfaces |
| `dark:bg-gray-800` | `#1F2937` | Dark mode form inputs |
| `dark:bg-gray-900` | `#111827` | Dark mode page background |

---

## 15. Z-Index Layering Guide

Z-index values used across the app — listed from lowest to highest:

| Value | Usage |
|---|---|
| `z-0` | Base content layer |
| `z-10` | Slightly elevated cards |
| `z-20` | Sticky table headers |
| `z-30` | Dropdowns / modals overlay |
| `z-40` | Sidebar on mobile |
| `z-50` | Toast notifications |
| `z-[100]` | Date picker overlays |
| `z-[999999]` | Attendance tooltip (must appear above all other UI) |

