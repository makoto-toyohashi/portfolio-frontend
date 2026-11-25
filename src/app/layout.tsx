import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { site } from "@/config/site";
import "./globals.css";
export const metadata: Metadata = { title: {default:site.name,template:`%s | ${site.name}`}, description:site.description };
export default function RootLayout({children}:{children:ReactNode}){return <html lang="ja"><body className="flex min-h-screen flex-col"><Header/><main id="main" className="mx-auto w-full max-w-6xl flex-1 px-6 py-14">{children}</main><Footer/></body></html>;}
