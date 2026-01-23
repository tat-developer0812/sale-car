# Skill: Frontend Analysis

**Invocation**: `/analyze` or mention "analyze frontend", "check for problems", "review layout", "is the code good"

**Description**: Analyze existing web interfaces, identify issues categorized by severity (Critical, Major, Minor), and provide detailed assessment reports with file references and priority recommendations.

## Purpose
Analyze existing web interfaces, identify issues, and provide detailed assessment reports.

---

## PART 1: ANALYSIS WORKFLOW

### Step 1: Overview Survey
When receiving a UI-related request, ALWAYS perform:

```
1. List all files in the frontend directory
2. Read package.json to identify tech stack
3. Read main layout files (layout.tsx, _app.tsx, App.tsx)
4. Read global styles (globals.css, index.css)
5. Read key component files related to the request
```

### Step 2: Tech Stack Identification
Determine what's being used:

```
□ Framework: Next.js / React / Vue / Angular / Vanilla
□ Language: TypeScript / JavaScript
□ Styling: Tailwind / CSS Modules / Styled-components / SCSS / Plain CSS
□ UI Library: Shadcn / MUI / Chakra / Ant Design / None
□ State: Redux / Zustand / Jotai / Context / None
```

### Step 3: DOM Structure Analysis

| Criteria | Questions to Answer |
|----------|---------------------|
| **Semantic** | Are semantic tags used? (header, nav, main, section, article, aside, footer) |
| **Nesting** | Is DOM depth reasonable? (max 5-7 levels) |
| **Component** | Can components be split smaller? |
| **Reusability** | Is there repeated code needing abstraction? |

### Step 4: CSS/Styling Analysis

```
□ Layout method: Flexbox or Grid? Is it appropriate?
□ Spacing: Consistent? Using system or random values?
□ Responsive: Are there breakpoints? Mobile-first or desktop-first?
□ Naming: Are class names meaningful? Is there a convention?
□ Specificity: Are selectors overly complex?
□ Duplication: Are there repeated styles to extract?
```

### Step 5: Issue Classification

```
🔴 Critical: Broken layout, not responsive, accessibility failure
🟡 Major: Poor UX, hard to maintain, performance issues
🟢 Minor: Not following best practices, room for improvement
```

---

## PART 2: ANALYSIS CHECKLISTS

### 2.1 Layout Structure Checklist

```
┌─────────────────────────────────────────┐
│ VIEWPORT                                │
│ ┌─────────────────────────────────────┐ │
│ │ HEADER (sticky/fixed/static?)       │ │
│ ├─────────────────────────────────────┤ │
│ │ ┌─────────┐ ┌─────────────────────┐ │ │
│ │ │ SIDEBAR │ │ MAIN CONTENT        │ │ │
│ │ │ (width?)│ │ (flex: 1?)          │ │ │
│ │ │ (fixed?)│ │                     │ │ │
│ │ └─────────┘ └─────────────────────┘ │ │
│ ├─────────────────────────────────────┤ │
│ │ FOOTER                              │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘

□ Container has max-width?
□ Sidebar width: fixed or flexible?
□ Main content has overflow handling?
□ Footer sticky to bottom when content short?
□ Scroll behavior: whole page or per section?
```

### 2.2 Spacing Checklist

```
Outside spacing (margin):
□ Between sections: 48-80px?
□ Between cards/items: 16-24px?

Inside spacing (padding):
□ Container: 16-24px mobile, 24-48px desktop?
□ Cards: 16-24px?
□ Buttons: 8-12px vertical, 16-24px horizontal?

Gap in flex/grid:
□ Consistent values? (8px, 16px, 24px)
□ Using design tokens or random values?
```

### 2.3 Responsive Checklist

```
Breakpoints to verify:
□ 320px - Small mobile
□ 375px - Common mobile
□ 768px - Tablet
□ 1024px - Laptop
□ 1280px - Desktop

Elements to check:
□ Navigation: hamburger on mobile?
□ Sidebar: collapse/overlay/hide?
□ Grid: columns reduce on smaller screens?
□ Font sizes: scale appropriately?
□ Spacing: reduced on mobile?
□ Images: responsive sizing?
□ Tables: horizontal scroll or stack?
```

### 2.4 Accessibility Checklist

```
□ All images have alt text?
□ Form inputs have labels?
□ Color contrast sufficient?
□ Focus states visible?
□ Keyboard navigation works?
□ ARIA labels where needed?
□ Heading hierarchy correct (h1 → h2 → h3)?
```

### 2.5 Performance Checklist

```
□ Images optimized (next/image, srcset)?
□ Components lazy loaded where appropriate?
□ No unnecessary re-renders?
□ Bundle size reasonable?
□ Fonts loaded efficiently?
```

---

## PART 3: RED FLAGS

### Immediate Warning Signs

```
⚠️ Inline styles everywhere → hard to maintain
⚠️ Excessive !important → specificity wars
⚠️ Fixed heights on containers → overflow risk
⚠️ Magic numbers (random px values) → use design tokens
⚠️ Deep nesting (>5 levels) → refactor needed
⚠️ No semantic HTML → accessibility issues
⚠️ No responsive styles → mobile users affected
⚠️ Duplicate code blocks → extract components
⚠️ Mixed styling approaches → inconsistent codebase
⚠️ No error boundaries → poor error handling
```

### Code Smell Patterns

```
❌ <div> soup - divs without semantic meaning
❌ CSS in JS mixed with Tailwind
❌ 'use client' on every component
❌ Prop drilling through many levels
❌ Giant components (>300 lines)
❌ No TypeScript types on props
❌ Hardcoded strings everywhere
```

---

## PART 4: OUTPUT FORMAT

### After analysis, ALWAYS respond using this format:

```markdown
## 📋 Frontend Analysis Report

### Tech Stack Detected
- Framework: [detected]
- Styling: [detected]
- UI Library: [detected]

### Current Structure
[Brief description of layout structure]

### Issues Found

🔴 **Critical**
1. [Issue description]
   - File: `path/to/file`
   - Line: [if applicable]
   - Impact: [why this is critical]

🟡 **Major**
1. [Issue description]
   - File: `path/to/file`
   - Impact: [why this matters]

🟢 **Minor**
1. [Issue description]
   - File: `path/to/file`

### Summary
- Critical: [count]
- Major: [count]
- Minor: [count]

### Recommended Priority
1. [First thing to fix]
2. [Second thing to fix]
3. [Third thing to fix]
```

---

## PART 5: QUESTIONS TO ASK

### When context is missing, ask:

```
About Layout:
- "Does the layout need mobile responsiveness?"
- "Should the sidebar be collapsible?"
- "Should the header be sticky on scroll?"

About Requirements:
- "What browsers need to be supported?"
- "Is dark mode required?"
- "Are there accessibility requirements?"

About Scope:
- "Should I analyze the entire frontend or specific components?"
- "Are there known issues you want me to focus on?"
```

---

## PART 6: ANALYSIS EXAMPLES

### Example 1: User says "check for problems"

**Thinking process**:
```
1. ls -la to see project structure
2. Read package.json → identify Next.js 14 + Tailwind
3. Read app/layout.tsx → check root layout
4. Read app/page.tsx → check main page
5. Read globals.css → check global styles
6. Search for component files
7. Analyze each against checklists
8. Compile issues by severity
9. Output report in standard format
```

### Example 2: User says "is the layout responsive?"

**Thinking process**:
```
1. Search for media queries or responsive classes
2. Check Tailwind breakpoint usage (sm:, md:, lg:)
3. Identify elements that should be responsive
4. Test mental model at each breakpoint
5. List what's missing or broken
6. Report findings
```

### Example 3: User says "analyze the sidebar"

**Thinking process**:
```
1. Find sidebar component file
2. Check positioning (fixed, sticky, relative)
3. Check width handling
4. Check mobile behavior
5. Check scroll behavior
6. Check z-index conflicts
7. Report specific issues
```
