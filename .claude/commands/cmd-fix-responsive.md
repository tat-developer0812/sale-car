# Fix Responsive Issues

Analyze and fix responsive design issues in components.

## Arguments
- $1: Component or file path (optional) - if not provided, analyze entire frontend

## Steps

1. **Identify target files**
   - If path provided → analyze that file
   - If not → search for components with layout issues

2. **Check for responsive classes**
   - Search for Tailwind breakpoint usage: `sm:`, `md:`, `lg:`, `xl:`
   - Identify elements missing responsive styles

3. **Common fixes to apply**

### Navigation
```tsx
// ❌ Before: Always visible
<nav className="flex gap-4">

// ✅ After: Hidden on mobile, hamburger menu
<nav className="hidden md:flex gap-4">
<MobileMenu className="md:hidden" />
```

### Sidebar
```tsx
// ❌ Before: Fixed width always
<aside className="w-64">

// ✅ After: Hidden on mobile
<aside className="hidden lg:block w-64">
```

### Grid
```tsx
// ❌ Before: Fixed columns
<div className="grid grid-cols-4 gap-4">

// ✅ After: Responsive columns
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
```

### Flex direction
```tsx
// ❌ Before: Always row
<div className="flex gap-4">

// ✅ After: Column on mobile, row on desktop
<div className="flex flex-col md:flex-row gap-4">
```

### Text sizes
```tsx
// ❌ Before: Large text always
<h1 className="text-5xl font-bold">

// ✅ After: Responsive text
<h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
```

### Padding/Spacing
```tsx
// ❌ Before: Large padding always
<section className="p-12">

// ✅ After: Responsive padding
<section className="p-4 md:p-8 lg:p-12">
```

### Images
```tsx
// ❌ Before: Fixed size
<img className="w-[500px] h-[300px]" />

// ✅ After: Responsive
<img className="w-full max-w-lg h-auto" />

// Or with Next.js Image
<div className="relative aspect-video w-full">
  <Image src="..." fill className="object-cover" />
</div>
```

### Tables
```tsx
// ❌ Before: Overflows on mobile
<table className="w-full">

// ✅ After: Horizontal scroll
<div className="overflow-x-auto">
  <table className="min-w-full">
```

4. **Breakpoint reference**
```
sm:  640px   (mobile landscape)
md:  768px   (tablet)
lg:  1024px  (laptop)
xl:  1280px  (desktop)
2xl: 1536px  (large desktop)
```

5. **Test mentally at each breakpoint**
   - 320px (small mobile)
   - 375px (iPhone)
   - 768px (tablet)
   - 1024px (laptop)
   - 1280px (desktop)

6. **Output**: List all changes made with before/after
