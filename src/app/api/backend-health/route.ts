import { getBackendHealth } from "@/services/health";
export const dynamic = "force-dynamic";
export async function GET(){
  if (!process.env.API_BASE_URL) return Response.json({status:"NOT_CONFIGURED"},{status:503});
  try { const result = await getBackendHealth(); return Response.json({status:result.status === "UP" ? "UP" : "DOWN"},{status:result.status === "UP" ? 200 : 503}); }
  catch { return Response.json({status:"UNAVAILABLE"},{status:503}); }
}
