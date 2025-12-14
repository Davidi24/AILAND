"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Pencil } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"

const user = {
  paymentMethod: {
    brand: "Visa",
    last4: "4242",
    cardholder: "Klea Haxhiu",
    expires: "04/27",
  },
  invoices: [
    { id: 1001, amount: "€19.99", status: "Paid", date: "2024-09-01" },
    { id: 1002, amount: "€19.99", status: "Paid", date: "2024-10-01" },
    { id: 1003, amount: "€19.99", status: "Paid", date: "2024-11-01" },
  ],
  billingContact: "klea@example.com",
  nextBillingDate: "2025-03-01",
}

export default function BillingPage() {
  const [card, setCard] = useState({
    brand: user.paymentMethod.brand,
    last4: user.paymentMethod.last4,
    cardholder: user.paymentMethod.cardholder,
    expires: user.paymentMethod.expires,
  })

  return (
    <div className="space-y-12">

      {/* PAYMENT METHOD */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">Payment Method</h3>
            <p className="text-sm text-muted-foreground">
              The card used for your active subscription.
            </p>
          </div>

          {/* EDIT BUTTON */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Payment Method</DialogTitle>
              </DialogHeader>

              <div className="space-y-4 pt-2">
                {/* CARDHOLDER */}
                <div>
                  <p className="text-xs text-muted-foreground">Cardholder Name</p>
                  <Input
                    value={card.cardholder}
                    onChange={(e) => setCard({ ...card, cardholder: e.target.value })}
                  />
                </div>

                {/* CARD NUMBER */}
                <div>
                  <p className="text-xs text-muted-foreground">Last 4 Digits</p>
                  <Input
                    maxLength={4}
                    value={card.last4}
                    onChange={(e) => setCard({ ...card, last4: e.target.value })}
                  />
                </div>

                {/* EXPIRATION */}
                <div>
                  <p className="text-xs text-muted-foreground">Expires</p>
                  <Input
                    placeholder="MM/YY"
                    value={card.expires}
                    onChange={(e) => setCard({ ...card, expires: e.target.value })}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button onClick={() => console.log("Updated card:", card)}>
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="text-sm space-y-1">
          <p className="font-medium">
            {card.brand} •••• {card.last4}
          </p>
          <p className="text-muted-foreground">
            Expires {card.expires} — {card.cardholder}
          </p>
        </div>
      </section>

      <Separator />

      {/* BILLING CONTACT — NO EDIT */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Billing Contact</h3>
          <p className="text-sm text-muted-foreground">
            This is the email tied to your account.
          </p>
        </div>

        <p className="font-medium">{user.billingContact}</p>
        <p className="text-xs text-muted-foreground">
          This email cannot be changed here. Update it in your account settings.
        </p>
      </section>

      <Separator />

      {/* NEXT BILLING */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Next Billing</h3>
        <p className="text-sm text-muted-foreground">
          Your next scheduled payment date.
        </p>

        <p className="font-medium">{user.nextBillingDate}</p>
      </section>

      <Separator />

      {/* INVOICE HISTORY — CLEANER */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Invoice History</h3>
        <p className="text-sm text-muted-foreground">
          Your past transactions.
        </p>

        <div className="divide-y border rounded-xl bg-card">
          {user.invoices.map((inv) => (
            <div
              key={inv.id}
              className="flex items-center justify-between p-4 text-sm"
            >
              <div>
                <p className="font-medium">Invoice #{inv.id}</p>
                <p className="text-muted-foreground text-xs">{inv.date}</p>
              </div>

              <p className="font-medium">{inv.amount}</p>

              <span className="text-muted-foreground">{inv.status}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
