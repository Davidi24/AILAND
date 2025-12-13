"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const user = {
  subscriptionTier: "pro" as "free" | "pro" | "enterprise",
}

export default function SubscriptionPage() {
  return (
    <div className="space-y-10">

      <div className="rounded-2xl border bg-card shadow-sm p-6 space-y-2">
        <p className="text-lg font-semibold">Manage Subscription</p>
        <Separator />

        {user.subscriptionTier === "free" && (
          <div className="flex flex-col gap-3 pt-2">
            <Button>Upgrade to Pro</Button>
            <Button variant="outline">Upgrade to Enterprise</Button>
          </div>
        )}

        {user.subscriptionTier === "pro" && (
          <div className="flex flex-col gap-3 pt-2">
            <Button variant="outline">Cancel Subscription</Button>
            <Button>Upgrade to Enterprise</Button>
          </div>
        )}

        {user.subscriptionTier === "enterprise" && (
          <div className="flex flex-col gap-3 pt-2">
            <Button>Manage Enterprise Plan</Button>
            <Button variant="outline">Contact Support</Button>
          </div>
        )}
      </div>

    </div>
  )
}
