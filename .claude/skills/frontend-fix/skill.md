# Skill: Frontend Fix Patterns

**Invocation**: `/fix` or mention "fix layout", "solve responsive issue", "sidebar overlapping", "footer not sticky", "content overflow"

**Description**: Provide battle-tested solutions and code patterns to fix common frontend layout and styling issues. Includes minimal, focused changes that preserve existing functionality.

## Purpose
Provide solutions and code patterns to fix common frontend layout and styling issues.

---

## PART 1: FIX WORKFLOW

### Before Making Changes
```
1. Confirm the issue from analysis or user description
2. Identify the exact file(s) to modify
3. Understand current implementation
4. Choose the minimal change that fixes the issue
5. Consider side effects on other components
6. Implement fix
7. Verify fix doesn't break other things
```

### Fix Principles
```
✅ Minimal changes - don't refactor unrelated code
✅ Match existing code style
✅ Preserve existing functionality
✅ Add comments only if complex logic
✅ Test at multiple breakpoints (mental model)
```

---

## PART 2: LAYOUT FIXES

### 2.1 Broken Layout / Content Overflow

**Symptoms**: Content spills out, elements overlap

**Solutions**:
```css
/* Fix flex item overflow */
.flex-child {
  min-width: 0;  /* Allow shrinking below content size */
}

/* Fix text overflow */
.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Multi-line text truncate */
.text-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Container overflow */
.container {
  overflow: hidden; /* or overflow: auto */
}
```

**Tailwind**:
```jsx
<div className="min-w-0">           {/* Allow flex shrink */}
<p className="truncate">            {/* Single line truncate */}
<p className="line-clamp-3">        {/* Multi-line truncate */}
<div className="overflow-hidden">   {/* Hide overflow */}
<div className="overflow-auto">     {/* Scroll overflow */}
```

### 2.2 Sidebar Overlapping Content

**Cause**: Sidebar is fixed/absolute but main content doesn't account for it

**Solution**:
```jsx
// ❌ Wrong
<div>
  <aside className="fixed w-64">Sidebar</aside>
  <main>Content</main>  {/* No margin, goes under sidebar */}
</div>

// ✅ Correct - Using flex
<div className="flex">
  <aside className="w-64 flex-shrink-0">Sidebar</aside>
  <main className="flex-1 min-w-0">Content</main>
</div>

// ✅ Correct - Using margin (if sidebar is fixed)
<div>
  <aside className="fixed w-64">Sidebar</aside>
  <main className="ml-64">Content</main>
</div>
```

### 2.3 Footer Not Sticking to Bottom

**Cause**: Content shorter than viewport, footer floats up

**Solution**:
```jsx
// ✅ Flexbox method
<div className="flex flex-col min-h-screen">
  <header>Header</header>
  <main className="flex-1">Content</main>
  <footer>Footer</footer>  {/* Pushed to bottom */}
</div>

// ✅ Grid method
<div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
  <header>Header</header>
  <main>Content</main>
  <footer>Footer</footer>
</div>
```

### 2.4 Sticky Header Not Working

**Cause**: Parent has overflow hidden, or missing top value

**Solution**:
```jsx
// ❌ Wrong - parent has overflow
<div className="overflow-hidden">
  <header className="sticky top-0">Won't work</header>
</div>

// ✅ Correct
<div className="overflow-visible"> {/* or remove overflow */}
  <header className="sticky top-0 z-50 bg-white">
    Works now
  </header>
</div>

// Also need: background color + z-index
<header className="sticky top-0 z-50 bg-background border-b">
```

### 2.5 Elements Overlapping (z-index issues)

**Solution - Establish z-index system**:
```css
:root {
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-fixed: 300;
  --z-modal-backdrop: 400;
  --z-modal: 500;
  --z-popover: 600;
  --z-tooltip: 700;
}
```

**Tailwind**:
```jsx
<header className="z-40">       {/* Sticky header */}
<aside className="z-30">        {/* Sidebar */}
<div className="z-50">          {/* Dropdown */}
<div className="z-[100]">       {/* Modal */}
```

---

## PART 3: RESPONSIVE FIXES

### 3.1 Add Mobile Responsiveness

**Pattern**:
```jsx
// Sidebar - hide on mobile, show on desktop
<aside className="hidden lg:block w-64">
  Sidebar
</aside>

// Or collapse to icons
<aside className="w-16 lg:w-64">
  <span className="hidden lg:inline">Dashboard</span>
</aside>

// Grid columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

### 3.2 Mobile Navigation (Sheet/Drawer)

```jsx
// components/mobile-nav.tsx
'use client'

import { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'

export function MobileNav({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        {children}
      </SheetContent>
    </Sheet>
  )
}
```

### 3.3 Responsive Table

```jsx
// Option 1: Horizontal scroll
<div className="overflow-x-auto">
  <table className="min-w-full">...</table>
</div>

// Option 2: Card layout on mobile
<div className="hidden md:block">
  <Table>...</Table>
</div>
<div className="md:hidden space-y-4">
  {data.map(item => (
    <Card key={item.id}>
      <CardContent>
        <div><strong>Name:</strong> {item.name}</div>
        <div><strong>Email:</strong> {item.email}</div>
      </CardContent>
    </Card>
  ))}
</div>
```

### 3.4 Responsive Text/Spacing

```jsx
// Responsive font sizes
<h1 className="text-2xl md:text-3xl lg:text-4xl">

// Responsive padding
<section className="px-4 md:px-8 lg:px-16">

// Responsive gap
<div className="grid gap-4 md:gap-6 lg:gap-8">
```

---

## PART 4: COMPONENT FIXES

### 4.1 Card Grid Layout

```jsx
// Auto-fit responsive grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {items.map(item => (
    <Card key={item.id}>...</Card>
  ))}
</div>

// Or auto-fill (min 280px per card)
<div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
```

### 4.2 Centering Content

```jsx
// Flex center (both axes)
<div className="flex items-center justify-center min-h-screen">

// Grid center
<div className="grid place-items-center min-h-screen">

// Horizontal center with max-width
<div className="max-w-4xl mx-auto px-4">
```

### 4.3 Equal Height Cards in Row

```jsx
// Flex stretch (default)
<div className="flex gap-4">
  <Card className="flex-1">Short</Card>
  <Card className="flex-1">Much longer content here</Card>
</div>

// Grid (auto equal)
<div className="grid grid-cols-3 gap-4">
  <Card>Short</Card>
  <Card>Much longer content</Card>
  <Card>Medium</Card>
</div>
```

### 4.4 Aspect Ratio Containers

```jsx
// Fixed aspect ratio
<div className="aspect-video">      {/* 16:9 */}
<div className="aspect-square">     {/* 1:1 */}
<div className="aspect-[4/3]">      {/* 4:3 */}

// Image with aspect ratio
<div className="relative aspect-video">
  <Image
    src="/image.jpg"
    alt="..."
    fill
    className="object-cover"
  />
</div>
```

---

## PART 5: COMMON PATTERNS

### 5.1 Dashboard Layout

```jsx
export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r bg-card">
        <div className="h-16 border-b flex items-center px-6">
          <Logo />
        </div>
        <nav className="flex-1 p-4">
          <NavItems />
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b flex items-center px-6">
          <MobileNav />
          <div className="flex-1" />
          <UserMenu />
        </header>
        <main className="flex-1 overflow-auto p-6 bg-muted/40">
          {children}
        </main>
      </div>
    </div>
  )
}
```

### 5.2 Auth Layout

```jsx
export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-sm">{children}</div>
      </div>
      <div className="hidden lg:flex bg-primary items-center justify-center">
        <BrandingContent />
      </div>
    </div>
  )
}
```

### 5.3 Landing Page Sections

```jsx
// Hero
<section className="py-20 lg:py-32">
  <div className="container max-w-4xl text-center">
    <h1 className="text-4xl lg:text-6xl font-bold">...</h1>
    <p className="mt-6 text-xl text-muted-foreground">...</p>
    <div className="mt-10 flex justify-center gap-4">
      <Button size="lg">Get Started</Button>
      <Button size="lg" variant="outline">Learn More</Button>
    </div>
  </div>
</section>

// Features grid
<section className="py-20 bg-muted/40">
  <div className="container">
    <h2 className="text-3xl font-bold text-center">Features</h2>
    <div className="mt-12 grid md:grid-cols-3 gap-8">
      {features.map(f => <FeatureCard key={f.id} {...f} />)}
    </div>
  </div>
</section>
```

---

## PART 6: OUTPUT FORMAT

### When providing fixes, use this format:

```markdown
## 🔧 Fix Applied

### Issue
[Brief description of the problem]

### Solution
[Explanation of the fix]

### Changes Made

**File: `path/to/file.tsx`**
```tsx
// Code changes here
```

### Verification
- [ ] Layout displays correctly
- [ ] Responsive at all breakpoints
- [ ] No side effects on other components

### Notes
[Any additional context or warnings]
```

---

## PART 7: QUICK REFERENCE

### Flexbox Utilities
```
flex          → display: flex
flex-1        → flex: 1 1 0%
flex-auto     → flex: 1 1 auto
flex-none     → flex: none
flex-shrink-0 → flex-shrink: 0
flex-grow     → flex-grow: 1
min-w-0       → min-width: 0
```

### Grid Utilities
```
grid                    → display: grid
grid-cols-{n}           → n columns
grid-rows-{n}           → n rows
col-span-{n}            → span n columns
gap-{n}                 → gap spacing
place-items-center      → center both axes
```

### Position Utilities
```
relative    → position: relative
absolute    → position: absolute
fixed       → position: fixed
sticky      → position: sticky
inset-0     → top/right/bottom/left: 0
```

### Overflow Utilities
```
overflow-hidden   → hide overflow
overflow-auto     → scroll when needed
overflow-x-auto   → horizontal scroll
overflow-y-auto   → vertical scroll
```
