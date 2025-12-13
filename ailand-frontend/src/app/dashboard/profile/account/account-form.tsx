"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

// Mock user
const user = {
  id: 12345,
  email: "klea@example.com",
  subscriptionTier: "enterprise" as "free" | "pro" | "enterprise",
  createdAt: "2024-02-10",
  companyName: "AILand Innovations",
  country: "Germany",
  timezone: "Europe/Berlin",
}

// Email schema
const emailSchema = z.object({
  newEmail: z.string().email("Enter a valid email"),
  confirmEmail: z.string().email("Enter a valid email"),
}).refine(data => data.newEmail === data.confirmEmail, {
  message: "Emails do not match",
  path: ["confirmEmail"],
})

export function AccountForm() {
  const form = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      newEmail: "",
      confirmEmail: "",
    },
  })

  const onSubmit = (data: any) => {
    console.log("Email change request:", data)
    // Later: call API here
  }

  return (
    <div className="space-y-16">

      {/* ===================================================== */}
      {/* SECTION 1 — ACCOUNT OVERVIEW */}
      {/* ===================================================== */}
      <section className="space-y-6">
        <header className="space-y-1">
          <h3 className="text-lg font-semibold">Account Overview</h3>
          <p className="text-sm text-muted-foreground">
            Basic information related to your account identity.
          </p>
        </header>

        <Separator />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-12 text-sm">
          <div>
            <p className="text-muted-foreground text-xs uppercase">Account ID</p>
            <p className="font-medium">{user.id}</p>
          </div>

          <div>
            <p className="text-muted-foreground text-xs uppercase">Member Since</p>
            <p className="font-medium">{user.createdAt}</p>
          </div>

          <div>
            <p className="text-muted-foreground text-xs uppercase">Account Email</p>
            <p className="font-medium">{user.email}</p>
          </div>

          <div>
            <p className="text-muted-foreground text-xs uppercase">Plan</p>
            <p className="capitalize font-medium">{user.subscriptionTier}</p>
          </div>

          {user.subscriptionTier === "enterprise" && (
            <div>
              <p className="text-muted-foreground text-xs uppercase">Company</p>
              <p className="font-medium">{user.companyName}</p>
            </div>
          )}
        </div>
      </section>

      {/* ===================================================== */}
      {/* SECTION 2 — CHANGE LOGIN EMAIL */}
      {/* ===================================================== */}
      <section className="space-y-6">
        <header className="space-y-1">
          <h3 className="text-lg font-semibold">Change Login Email</h3>
          <p className="text-sm text-muted-foreground">
            Update the email address you use to sign in.
          </p>
        </header>

        <Separator />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 max-w-md"
          >
            {/* New Email */}
            <FormField
              control={form.control}
              name="newEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter new email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Email */}
            <FormField
              control={form.control}
              name="confirmEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Re-enter new email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Save Email</Button>
          </form>
        </Form>
      </section>

      {/* ===================================================== */}
      {/* SECTION 3 — CONNECTED ACCOUNTS */}
      {/* ===================================================== */}
      <section className="space-y-6">
        <header className="space-y-1">
          <h3 className="text-lg font-semibold">Connected Accounts</h3>
          <p className="text-sm text-muted-foreground">
            Manage third-party services linked to your account.
          </p>
        </header>

        <Separator />

        <p className="text-sm font-medium">Google – coming soon</p>
      </section>

      {/* ===================================================== */}
      {/* SECTION 4 — REGION & LOCALE */}
      {/* ===================================================== */}
      <section className="space-y-6">
        <header className="space-y-1">
          <h3 className="text-lg font-semibold">Region & Locale</h3>
          <p className="text-sm text-muted-foreground">
            Your region and time zone information.
          </p>
        </header>

        <Separator />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-12 text-sm">
          <div>
            <p className="text-muted-foreground text-xs uppercase">Country</p>
            <p className="font-medium">{user.country}</p>
          </div>

          <div>
            <p className="text-muted-foreground text-xs uppercase">Time Zone</p>
            <p className="font-medium">{user.timezone}</p>
          </div>
        </div>
      </section>

    </div>
  )
}
