"use client"

import { z } from "zod"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { showSubmittedData } from "@/lib/show-submitted-data"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { Trash2 } from "lucide-react"

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

// ----------------------------
// MOCK USER
// ----------------------------
const mockUser = {
  name: "Klea Haxhiu",
  username: "Klea",
  email: "klea@example.com",
  bio: "I own a computer.",
  urls: [
    { value: "https://ailand.com" },
    { value: "https://instagram.com/ailand" },
  ],
  interests: "AI, XR, Knowledge Graphs",
  companyName: "AILand Innovations",
  companyRole: "Project Manager",
  subscriptionTier: "enterprise" as "free" | "pro" | "enterprise",
}

// ----------------------------
// SCHEMA
// ----------------------------
const profileFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters."),
  username: z.string().min(2).max(30),
  email: z.string().email(),
  bio: z.string().max(160).min(4),
  urls: z
    .array(z.object({ value: z.string().url("Please enter a valid URL.") }))
    .optional(),
  interests: z.string().optional(),
  companyName: z.string().optional(),
  companyRole: z.string().optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema> & {
  avatarFile?: File | null
}

export function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: mockUser.name,
      username: mockUser.username,
      email: mockUser.email,
      bio: mockUser.bio,
      urls: mockUser.urls,
      interests: mockUser.interests,
      companyName: mockUser.companyName,
      companyRole: mockUser.companyRole,
      avatarFile: null,
    },
    mode: "onChange",
  })

  const subscriptionTier = mockUser.subscriptionTier

  const { fields, append, remove } = useFieldArray({
    name: "urls",
    control: form.control,
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => showSubmittedData(data))}
        className="space-y-10"
      >
        {/* ------------------------------------------------ */}
        {/* SECTION: Profile Image */}
        {/* ------------------------------------------------ */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Profile Photo</h3>
          <p className="text-sm text-muted-foreground">
            Upload or change your profile picture.
          </p>

          <div className="flex items-center gap-6">
            <div className="h-24 w-24 rounded-full overflow-hidden border bg-muted">
              <img
                id="profile-img-preview"
                src="/images/default-avatar.png"
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() =>
                    document.getElementById("profile-image-input")?.click()
                  }
                >
                  Upload Image
                </Button>

                <Button
                  variant="destructive"
                  type="button"
                  onClick={() => {
                    const img = document.getElementById(
                      "profile-img-preview"
                    ) as HTMLImageElement
                    img.src = "/images/default-avatar.png"
                    form.setValue("avatarFile", null)
                    const input = document.getElementById(
                      "profile-image-input"
                    ) as HTMLInputElement
                    if (input) input.value = ""
                  }}
                >
                  Remove
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                JPG, PNG or GIF up to 5MB.
              </p>

              <input
                type="file"
                accept="image/*"
                id="profile-image-input"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    const preview = URL.createObjectURL(file)
                    const img = document.getElementById(
                      "profile-img-preview"
                    ) as HTMLImageElement
                    img.src = preview
                    form.setValue("avatarFile", file)
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* ------------------------------------------------ */}
        {/* SECTION: Basic Information */}
        {/* ------------------------------------------------ */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Basic Information</h3>
          <p className="text-sm text-muted-foreground">
            Your core personal details.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    value={field.value}
                    disabled
                    className="bg-muted cursor-not-allowed"
                  />
                </FormControl>
                <FormDescription>
                  This email is tied to your account.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none"
                    placeholder="Tell us about yourself..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* ------------------------------------------------ */}
        {/* SECTION: Professional Details */}
        {/* ------------------------------------------------ */}
        {["pro", "enterprise"].includes(subscriptionTier) && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Professional Details</h3>
            <p className="text-sm text-muted-foreground">
              Information about your work or company.
            </p>

            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyRole"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input placeholder="Your role" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="interests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interests</FormLabel>
                  <FormControl>
                    <Input placeholder="AI, Data Science..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {/* ------------------------------------------------ */}
        {/* SECTION: URLs — INLINE TRASH ICON + POPUP */}
        {/* ------------------------------------------------ */}
        {subscriptionTier !== "free" && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Links</h3>
            <p className="text-sm text-muted-foreground">
              Add your website, portfolio, or any relevant URLs.
            </p>
{fields.map((field, index) => (
  <div key={field.id} className="relative">
    {/* URL Input */}
    <FormField
      control={form.control}
      name={`urls.${index}.value`}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={cn(index !== 0 && "sr-only")}>URL</FormLabel>
          <FormControl>
            <div className="relative">
              <Input {...field} className="pr-10" />
              
              {/* Trash icon inside the input (right aligned) */}
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="
                      absolute right-2 top-1/2 -translate-y-1/2
                      p-1.5 rounded-md
                      text-muted-foreground
                      hover:bg-muted hover:text-foreground
                      transition
                    "
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </DialogTrigger>

                <DialogContent className="max-w-sm">
                  <DialogHeader>
                    <DialogTitle>Remove this URL?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. The link will be permanently removed.
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter className="flex justify-end gap-2">
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>

                    <DialogClose asChild>
                      <Button
                        variant="destructive"
                        onClick={() => remove(index)}
                      >
                        Yes, remove
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
))}


            <Button
              variant="outline"
              size="sm"
              onClick={() => append({ value: "" })}
            >
              Add another URL
            </Button>
          </div>
        )}

        {/* ------------------------------------------------ */}
        {/* SUBMIT BUTTON */}
        {/* ------------------------------------------------ */}
        <Button type="submit" className="mt-4">
          Update Profile
        </Button>
      </form>
    </Form>
  )
}
