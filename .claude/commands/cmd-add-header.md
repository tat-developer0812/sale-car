# Add Header

Add a responsive header with search, notifications, and user menu.

## Steps

1. **Read current layout** to understand existing structure

2. **Create Header component** at `components/layouts/header.tsx`
```tsx
'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Search, Bell, Menu } from 'lucide-react'
import { MobileSidebar } from './mobile-sidebar'

export function Header() {
  return (
    <header className="h-16 flex items-center justify-between border-b bg-card px-6">
      {/* Left: Mobile menu + Search */}
      <div className="flex items-center gap-4">
        <MobileSidebar />
        
        <div className="hidden md:block w-64 lg:w-80">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-9" />
          </div>
        </div>
      </div>

      {/* Right: Notifications + User */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/avatar.png" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
```

3. **Update layout.tsx** to include header
```tsx
import { Header } from '@/components/layouts/header'
import { Sidebar } from '@/components/layouts/sidebar'

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 overflow-auto p-6 bg-muted/40">
          {children}
        </main>
      </div>
    </div>
  )
}
```

4. **Ensure shadcn components installed**
```bash
npx shadcn@latest add dropdown-menu avatar input
```

5. **Output**: List created/modified files
