"use client"

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"
import { NavProjects } from "./nav-projects"
import { NavMain } from "./nav-main"
import { sideBarData } from "@/data/sidebardata"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={sideBarData.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sideBarData.navMain} />
        <NavProjects projects={sideBarData.projects} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={sideBarData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}