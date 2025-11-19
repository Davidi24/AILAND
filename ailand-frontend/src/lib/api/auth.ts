export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}


export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
 

  if (payload.email !== "test@test.com" || payload.password !== "123456") {
    const err: any = new Error("Invalid credentials");
    err.status = 401;
    throw err;
  }

  return {
    token: "mock_jwt_token_123456",
    user: {
      id: "1",
      name: "Mock User",
      email: "test@test.com",
    },
  };
}



export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export async function registerUser(
  payload: RegisterPayload
): Promise<LoginResponse> {
  await new Promise((r) => setTimeout(r, 400));

  if (!payload.email.includes("@")) {
    const err: any = new Error("Invalid email");
    err.status = 400;
    throw err;
  }

  return {
    token: "mock_register_token_123456",
    user: {
      id: "2",
      name: payload.name,
      email: payload.email,
    },
  };
}
