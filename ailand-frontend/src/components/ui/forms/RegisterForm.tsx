import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldDescription,
    FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type RegisterFormProps = {
    className?: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    error?: string;
    clearError: () => void;
};

export function RegisterForm({
    className,
    onSubmit,
    error,
    clearError,
}: RegisterFormProps) {
    const [show, setShow] = useState(false);
    return (
        <div className={cn("flex flex-col gap-6", className)}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form className="p-6 md:p-8" onSubmit={onSubmit} autoComplete="off">
                        <FieldGroup className="gap-5">
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">Create an account</h1>
                                <p className="text-muted-foreground text-balance">
                                    Register to access AILand
                                </p>
                            </div>

                            <Field>
                                <FieldLabel htmlFor="name">Name</FieldLabel>
                                <Input
                                    name="name"
                                    id="name"
                                    type="text"
                                    placeholder="James"
                                    required
                                    onChange={clearError}
                                    autoComplete="off"
                                />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    name="email"
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    onChange={clearError}
                                    autoComplete="off"
                                />
                            </Field>

                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                </div>
                                <div className="relative">
                                    <Input
                                        name="password"
                                        id="password"
                                        type={show ? "text" : "password"}
                                        placeholder="*******"
                                        required
                                        autoComplete="new-password"
                                        onChange={clearError}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShow(!show)}
                                        className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                    >
                                        {show ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </Field>

                            <Field>
                                <Button type="submit" className="cursor-pointer">Create account</Button>
                            </Field>
                            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                Or continue with
                            </FieldSeparator>
                            <Field className="grid grid-cols-2 gap-4">

                                <Button variant="outline" type="button" className="cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path
                                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    <span className="sr-only">Login with Google</span>
                                </Button>
                                <Button variant="outline" type="button" className="cursor-pointer">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        className="h-4 w-4"
                                        fill="currentColor"
                                    >
                                        <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.41 7.86 10.94.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.35-1.29-1.71-1.29-1.71-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.72 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.45.11-3.02 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.57.23 2.73.11 3.02.74.81 1.18 1.84 1.18 3.1 0 4.45-2.68 5.42-5.24 5.71.42.36.8 1.08.8 2.18 0 1.57-.02 2.84-.02 3.22 0 .31.21.68.79.56A10.51 10.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
                                    </svg>

                                    <span className="sr-only">Login with GitHub</span>
                                </Button>



                            </Field>
                            <FieldDescription className="text-center">
                                Already have an account? <a href="/login">Login</a>
                            </FieldDescription>
                        </FieldGroup>
                    </form>

                    <div className="bg-muted relative hidden md:block">
                        <img
                            src="/assets/icons/login.png"
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
