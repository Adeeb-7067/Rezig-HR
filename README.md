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

