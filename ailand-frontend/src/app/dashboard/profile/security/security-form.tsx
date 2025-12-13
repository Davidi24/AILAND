"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

const passwordSchema = z.object({
  currentPassword: z.string().min(4),
  newPassword: z.string().min(6),
  confirmPassword: z.string().min(6),
})

export default function SecurityPage() {
  const form = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  const handleSubmit = form.handleSubmit((data) => {
    console.log("Password updated", data)
  })

  const handleDeleteAccount = () => {
    console.log("Account deleted")
    // Call your backend delete API here
  }

  return (
    <div className="space-y-16">

      {/* ===================================================== */}
      {/* SECTION 1 — CHANGE PASSWORD */}
      {/* ===================================================== */}
      <section className="space-y-6">
        <header className="space-y-1">
          <h3 className="text-lg font-semibold">Change Password</h3>
          <p className="text-sm text-muted-foreground">
            Update your password to keep your account secure.
          </p>
        </header>

        <Separator />

        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-8 max-w-xl">

            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your current password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Choose a new password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Re-enter your new password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-2">
              Save Password
            </Button>
          </form>
        </Form>
      </section>

      {/* ===================================================== */}
      {/* SECTION 2 — TWO-FACTOR AUTHENTICATION */}
      {/* ===================================================== */}
      <section className="space-y-4">
        <header className="space-y-1">
          <h3 className="text-lg font-semibold">Two-Factor Authentication</h3>
          <p className="text-sm text-muted-foreground">
            Add an extra layer of security to your account.
          </p>
        </header>

        <Separator />

        <p className="text-sm text-muted-foreground">Coming soon</p>
      </section>

      {/* ===================================================== */}
      {/* SECTION 3 — ACTIVE SESSIONS */}
      {/* ===================================================== */}
      <section className="space-y-4">
        <header className="space-y-1">
          <h3 className="text-lg font-semibold">Active Sessions</h3>
          <p className="text-sm text-muted-foreground">
            View and manage where your account is currently signed in.
          </p>
        </header>

        <Separator />

        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            You are currently logged in on 1 device.
          </p>

          <Button variant="outline" className="w-fit">
            Log out
          </Button>
        </div>
      </section>

      {/* ===================================================== */}
      {/* SECTION 4 — DELETE ACCOUNT */}
      {/* ===================================================== */}
      <section className="space-y-4">
        <header className="space-y-1">
          <h3 className="text-lg font-semibold">Delete Account</h3>
          <p className="text-sm text-muted-foreground">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
        </header>

        <Separator />

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive" className="w-fit">
              Delete Account
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. All your data will be permanently removed.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>

              <DialogClose asChild>
                <Button variant="destructive" onClick={handleDeleteAccount}>
                  Yes, delete my account
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>

    </div>
  )
}
