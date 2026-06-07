import type {
  ApiErrorResponse,
  AuthResponse,
  LoginData,
  RegisterData,
  User,
} from '@/types';

async function authRequest(path: string, body?: unknown): Promise<Response> {
  const response = await fetch(`/api/auth/${path}`, {
    method: 'POST',
    credentials: 'include',
    headers: body !== undefined ? { 'Content-Type': 'application/json' } : undefined,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorData = (await response
      .json()
      .catch(() => null)) as ApiErrorResponse | null;

    throw new Error(
      errorData?.message ?? `Request failed with status ${response.status}`
    );
  }

  return response;
}

export async function register(data: RegisterData): Promise<User> {
  const response = await authRequest('register', data);
  const { user } = (await response.json()) as AuthResponse;
  return user;
}

export async function login(data: LoginData): Promise<User> {
  const response = await authRequest('login', data);
  const { user } = (await response.json()) as AuthResponse;
  return user;
}

export async function refresh(): Promise<void> {
  await authRequest('refresh');
}

export async function logout(): Promise<void> {
  await authRequest('logout');
}
