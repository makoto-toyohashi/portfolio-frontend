import { auth0 } from '@/lib/auth0';
export const dynamic = 'force-dynamic';
export async function GET() {
  const session = await auth0.getSession();
  const headers = {'Cache-Control':'private, no-store'};
  if (!session) return Response.json({message:'Unauthorized'}, {status:401,headers});
  const {sub,name,email,email_verified} = session.user;
  return Response.json({sub,name,email,email_verified}, {headers});
}
