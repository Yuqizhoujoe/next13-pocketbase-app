import { withAuth } from "next-auth/middleware";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.SECRET;

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret });
  console.log("JSON Web Token", token);
  // const token = request.cookies.get("next-auth.session-token");
  if (!token) return NextResponse.redirect(new URL("/auth/login", request.url));
  return NextResponse.next();
}

export const config = {
  matcher: ["/nfts/:path*", "/api/openAI/:path*", "/api/pb/:path*"],
};
