import "server-only";
export class ApiError extends Error {
  constructor(public readonly status: number, message: string) { super(message); this.name = "ApiError"; }
}
/** Java APIへのサーバー側通信。接続先は環境変数で管理する。 */
export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const base = process.env.API_BASE_URL;
  if (!base) throw new Error("API_BASE_URL is not configured");
  if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) throw new Error("Invalid API path");
  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");
  if (options.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  const response = await fetch(`${base.replace(/\/$/, "")}${path}`, {...options, headers, cache:"no-store", signal:options.signal ?? AbortSignal.timeout(10000)});
  if (!response.ok) throw new ApiError(response.status, `API request failed (${response.status})`);
  if (response.status === 204) return undefined as T;
  return await response.json() as T;
}
