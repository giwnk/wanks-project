import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request);
  const pathname = request.nextUrl.pathname;
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";

  const adminSecretSlug = (process.env.ADMIN_SECRET_PATH || "gatedev-wanks-796").replace(/^\/+|\/+$/g, "");
  const adminSecretPath = `/${adminSecretSlug}`;
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const userEmail = user?.email?.trim().toLowerCase();

  const isAdmin = Boolean(userEmail && adminEmail && userEmail === adminEmail);

  // Helper untuk meneruskan cookies Supabase pada NextResponse rewrite / redirect
  const forwardCookies = (response: NextResponse) => {
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      response.cookies.set(cookie.name, cookie.value, cookie);
    });
    return response;
  };

  // 1. Blokir akses langsung ke URL internal /admin-login -> kembalikan 404
  if (normalizedPath === "/admin-login") {
    const notFoundUrl = new URL("/404", request.url);
    return forwardCookies(NextResponse.rewrite(notFoundUrl, { status: 404 }));
  }

  // 2. Akses melalui secret slug yang dikonfigurasi di .env (misal: /gatedev-wanks-796)
  if (normalizedPath === adminSecretPath) {
    if (isAdmin) {
      // Jika sudah login dan terverifikasi sebagai admin, arahkan langsung ke dashboard
      const dashboardUrl = new URL("/admin-dashboard", request.url);
      return forwardCookies(NextResponse.redirect(dashboardUrl));
    }

    // Jika belum login, rewrite secara internal ke /admin-login (URL browser tetap secret path)
    const loginUrl = new URL("/admin-login", request.url);
    return forwardCookies(
      NextResponse.rewrite(loginUrl, {
        request: {
          headers: request.headers,
        },
      })
    );
  }

  // 3. Proteksi route admin (/admin-dashboard dan semua subpath)
  if (normalizedPath.startsWith("/admin-dashboard")) {
    if (!isAdmin) {
      // Jika bukan admin atau belum login, tampilkan 404 (menyamarkan keberadaan route)
      const notFoundUrl = new URL("/404", request.url);
      return forwardCookies(NextResponse.rewrite(notFoundUrl, { status: 404 }));
    }
    return supabaseResponse;
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
