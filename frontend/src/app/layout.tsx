import React from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/AppSidebar";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata = {
    title: "Documentation",
    description: "A well-organized documentation page for your portfolio or API.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="min-h-screen bg-background text-foreground">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="flex flex-col min-h-screen">
                        {/* Header */}
                        <Header />

                        <div className="flex flex-1">
                            {/* Sidebar */}
                            <Sidebar />

                            {/* Main Content */}
                            <main className="flex-1 p-6 lg:p-8 max-w-4xl mx-auto mt-10">
                                {children}
                            </main>
                        </div>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
