import type {
  AdminDesign,
  AdminDesignCategory,
  AdminLoginResponse,
  AdminMessageResponse,
  AdminPrint,
  AdminTattoo,
  DesignInput,
  DesignUpdate,
  PrintInput,
  PrintUpdate,
  TattooInput,
  TattooUpdate,
  UploadResponse,
} from "../types/admin";

class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function parseError(response: Response): Promise<ApiError> {
  let message = "Error de servidor";

  try {
    const body = (await response.json()) as { message?: string };

    if (typeof body.message === "string" && body.message) {
      message = body.message;
    }
  } catch {
    // keep default message
  }

  return new ApiError(message, response.status);
}

async function requestJson<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(path, {
    credentials: "same-origin",
    ...options,
  });

  if (!response.ok) {
    throw await parseError(response);
  }

  return response.json() as Promise<T>;
}

export function isUnauthorizedError(error: unknown): boolean {
  return error instanceof ApiError && error.status === 401;
}

export async function adminLogin(
  username: string,
  password: string
): Promise<AdminLoginResponse> {
  return requestJson<AdminLoginResponse>("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
}

export async function adminLogout(): Promise<AdminMessageResponse> {
  return requestJson<AdminMessageResponse>("/api/admin/logout", {
    method: "POST",
  });
}

export async function adminGetMe(): Promise<AdminLoginResponse> {
  return requestJson<AdminLoginResponse>("/api/admin/me");
}

export async function adminGetDesignCategories(): Promise<
  AdminDesignCategory[]
> {
  return requestJson<AdminDesignCategory[]>("/api/admin/design-categories");
}

export async function adminUploadImage(
  file: File,
  prefix: string
): Promise<UploadResponse> {
  const formData = new FormData();

  formData.set("file", file);
  formData.set("prefix", prefix);

  return requestJson<UploadResponse>("/api/admin/upload", {
    method: "POST",
    body: formData,
  });
}

export async function adminGetTattoos(): Promise<AdminTattoo[]> {
  return requestJson<AdminTattoo[]>("/api/admin/tattoos");
}

export async function adminCreateTattoo(
  input: TattooInput
): Promise<AdminTattoo> {
  return requestJson<AdminTattoo>("/api/admin/tattoos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
}

export async function adminUpdateTattoo(
  id: number,
  input: TattooUpdate
): Promise<AdminMessageResponse> {
  return requestJson<AdminMessageResponse>(`/api/admin/tattoos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
}

export async function adminDeleteTattoo(
  id: number
): Promise<AdminMessageResponse> {
  return requestJson<AdminMessageResponse>(`/api/admin/tattoos/${id}`, {
    method: "DELETE",
  });
}

export async function adminGetDesigns(): Promise<AdminDesign[]> {
  return requestJson<AdminDesign[]>("/api/admin/designs");
}

export async function adminCreateDesign(
  input: DesignInput
): Promise<AdminDesign> {
  return requestJson<AdminDesign>("/api/admin/designs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
}

export async function adminUpdateDesign(
  id: number,
  input: DesignUpdate
): Promise<AdminMessageResponse> {
  return requestJson<AdminMessageResponse>(`/api/admin/designs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
}

export async function adminDeleteDesign(
  id: number
): Promise<AdminMessageResponse> {
  return requestJson<AdminMessageResponse>(`/api/admin/designs/${id}`, {
    method: "DELETE",
  });
}

export async function adminGetPrints(): Promise<AdminPrint[]> {
  return requestJson<AdminPrint[]>("/api/admin/prints");
}

export async function adminCreatePrint(
  input: PrintInput
): Promise<AdminPrint> {
  return requestJson<AdminPrint>("/api/admin/prints", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
}

export async function adminUpdatePrint(
  id: number,
  input: PrintUpdate
): Promise<AdminMessageResponse> {
  return requestJson<AdminMessageResponse>(`/api/admin/prints/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
}

export async function adminDeletePrint(
  id: number
): Promise<AdminMessageResponse> {
  return requestJson<AdminMessageResponse>(`/api/admin/prints/${id}`, {
    method: "DELETE",
  });
}