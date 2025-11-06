export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Real backend (use later)
    // const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(body),
    // });
    // const data = await res.json();
    // return new Response(JSON.stringify(data), {
    //   status: res.status,
    //   headers: { "Content-Type": "application/json" },
    // });

    // Mock backend (for now)
    if (email === "test@ailand.com" && password === "123456") {
      return new Response(
        JSON.stringify({
          token: "mock-token-12345",
          user: { email, name: "Test User" },
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return new Response(
        JSON.stringify({ message: "Invalid credentials" }),
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Mock login error:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    );
  }
}
