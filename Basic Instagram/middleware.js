import { NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({req, res });
    const { 
        data: {user} 
    } = await supabase.auth.getUser();

    if (user && req.nextUrl.pathname === "/login") {
        // goes to account page
        return NextResponse.redirect(new URL("/account", req.url));
    }

    if(!user && req.nextUrl.pathname !== "/login") {
        return NextResponse.redirect(new URL("/login", req.url));
    }
    return res;
    
}

export const config = {
    matcher: ["/", "/login", "/account"],
};