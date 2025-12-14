import React from 'react'

import { Main } from '@/components/layout/main'
import { Separator } from '@/components/ui/separator'
import { SidebarNav } from '../../../components/sidebar-nav'

import {
  UserCog,
  Wrench,
  Palette,
  CreditCard,
  ShieldCheck,
  EyeOff,
} from 'lucide-react'

// mock user (replace with real auth)
const user = {
  subscriptionTier: "pro" as "free" | "pro" | "enterprise",
}

function getSidebarItems() {
  const items = [
    {
      title: 'Profile',
      href: '/dashboard/profile/user_profile',
      icon: <UserCog size={18} />,
    },
    {
      title: 'Account',
      href: '/dashboard/profile/account',
      icon: <Wrench size={18} />,
    },
    {
      title: 'Appearance',
      href: '/dashboard/profile/apperance',
      icon: <Palette size={18} />,
    },
    {
      title: 'Security',
      href: '/dashboard/profile/security',
      icon: <ShieldCheck size={18} />,
    },
  
  ]

  // Only show Billing for PRO or ENTERPRISE
  if (user.subscriptionTier !== "free") {
    items.splice(3, 0, {
      title: 'Billing',
      href: '/dashboard/profile/billing',
      icon: <CreditCard size={18} />,
    })
  }

  return items
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const sidebarNavItems = getSidebarItems()

  return (
    <Main fixed>
      <div className="space-y-0.5">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <Separator className="my-4 lg:my-6" />

      <div className="flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12">
        <aside className="top-0 lg:sticky lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>

        <div className="flex w-full overflow-y-hidden p-1">
          {children}
        </div>
      </div>
    </Main>
  )
}
