import { getIronSession, type SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export type AdminSession = {
  isAdmin?: boolean;
};

export const adminSessionOptions: SessionOptions = {
  password:
    process.env.ADMIN_SESSION_SECRET ||
    process.env.JWT_SECRET ||
    "dev-only-change-me-32-characters-min!!",
  cookieName: "qdc_admin_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  },
};

export async function getAdminSession() {
  return getIronSession<AdminSession>(await cookies(), adminSessionOptions);
}

export async function isAdminAuthenticated() {
  const session = await getAdminSession();
  return Boolean(session.isAdmin);
}
