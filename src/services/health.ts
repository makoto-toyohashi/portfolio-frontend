import { apiFetch } from "@/lib/api/client";
import type { HealthResponse } from "@/types/api";
export function getBackendHealth(){return apiFetch<HealthResponse>("/health");}
