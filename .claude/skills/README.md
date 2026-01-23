# Claude Code Skills for Car Sales Website

This directory contains custom skills for the car sales website project.

## Available Skills

### 1. Frontend Analysis (`/analyze`)

**Location**: `.claude/skills/frontend-analyze/`

**Purpose**: Analyze existing web interfaces, identify issues categorized by severity, and provide detailed assessment reports.

**When to use**:
- Analyzing existing layouts and components
- Troubleshooting responsive design issues
- Code quality review
- Performance and accessibility audits
- Identifying architectural problems

**How to invoke**:

1. **Automatic**: Just mention analysis requests:
   - "check for problems"
   - "analyze the frontend"
   - "is the layout responsive?"
   - "review the code quality"

2. **Manual**: Use the slash command:
   ```
   /analyze
   ```

**Features**:
- ✅ DOM structure analysis
- ✅ CSS/styling evaluation
- ✅ Responsive design checks
- ✅ Accessibility audits
- ✅ Performance checks
- ✅ Code smell detection
- ✅ Tech stack identification

**Output Format**: Structured analysis report with:
- Tech stack detection
- Current structure overview
- Issues categorized by severity (🔴 Critical, 🟡 Major, 🟢 Minor)
- Priority recommendations
- File references with line numbers

---

### 2. Frontend Fix Patterns (`/fix`)

**Location**: `.claude/skills/frontend-fix/`

**Purpose**: Provide battle-tested solutions and code patterns to fix common frontend layout and styling issues.

**When to use**:
- Fixing layout problems (overflow, overlapping)
- Solving responsive design issues
- Implementing common patterns (sidebar, sticky header, footer)
- Adding mobile responsiveness
- Z-index conflicts

**How to invoke**:

1. **Automatic**: Just mention fix requests:
   - "fix the sidebar overlap"
   - "footer not sticking to bottom"
   - "content is overflowing"
   - "make it responsive"

2. **Manual**: Use the slash command:
   ```
   /fix
   ```

**Features**:
- ✅ Layout fixes (overflow, positioning)
- ✅ Responsive patterns
- ✅ Component fixes (cards, tables, forms)
- ✅ Common layout patterns (dashboard, auth, landing)
- ✅ Tailwind-specific solutions
- ✅ Quick reference utilities

**Output Format**: Fix solution with:
- Issue description
- Solution explanation
- Code changes with file paths
- Verification checklist
- Additional notes

---

### 3. Next.js Development Guide (`/nextjs`)

**Location**: `.claude/skills/frontend-nextjs/`

**Purpose**: Comprehensive Next.js 16+ patterns, configurations, and best practices with shadcn/ui integration.

**When to use**:
- Creating new components
- Setting up layouts (dashboard, auth, landing)
- Implementing forms with validation
- Data tables and loading states
- Following Next.js best practices

**How to invoke**:

1. **Automatic**: Just mention Next.js requests:
   - "create a dashboard layout"
   - "how to use shadcn components"
   - "show me Next.js pattern"
   - "add a data table"

2. **Manual**: Use the slash command:
   ```
   /nextjs
   ```

**Features**:
- ✅ Project structure guidelines
- ✅ Core configurations (fonts, Tailwind, types)
- ✅ Layout patterns (dashboard, auth, marketing)
- ✅ shadcn/ui component usage
- ✅ Form patterns with React Hook Form + Zod
- ✅ Loading states and error handling
- ✅ Best practices and performance tips

**Output Format**: Code patterns and examples with:
- Full component code
- TypeScript types
- Usage examples
- Best practices notes

---

## How Skills Work

Skills are automatically loaded by Claude Code when:
1. The skill directory exists in `.claude/skills/`
2. The directory contains a `skill.md` file (lowercase)
3. The skill is relevant to your request

## Creating New Skills

To create a new skill:

1. Create a new directory: `.claude/skills/your-skill-name/`
2. Create a `skill.md` file inside
3. Add skill metadata at the top:
   ```markdown
   # Skill Name

   **Invocation**: `/your-command` or automatic trigger description

   **Description**: Brief description of what the skill does

   [Rest of your skill content]
   ```

## Skill Structure Best Practices

A good skill should include:
- Clear invocation methods
- Purpose and use cases
- Step-by-step workflows
- Decision trees or checklists
- Output format specifications
- Examples and templates
- Automatic trigger conditions

---

## Current Project Context

**Project**: Vietnamese Car Sales Website
**Tech Stack**: Next.js 16.1.4, React 19.2.3, TypeScript, Tailwind CSS v4, shadcn/ui
**Focus**: SEO-optimized, mobile-first design for Vietnamese market

These skills are particularly useful for this project because:
- Mobile-first approach is critical (70%+ mobile traffic)
- Need consistent spacing and Vietnamese typography
- Complex layouts with car listings, filters, and lead forms
- Responsive navigation and sidebar requirements
