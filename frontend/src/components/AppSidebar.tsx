"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { Menu, X, Home, User, Briefcase, Code2, Mail, FileCode2 } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const links = [
        { href: "/", label: "Get Started", icon: Home },
        { href: "/about", label: "About", icon: User },
        { href: "/projects", label: "Projects", icon: Code2 },
        { href: "/skills", label: "Skills", icon: Briefcase },
        { href: "/contact", label: "Contact", icon: Mail },
        { href: "/api", label: "API Docs", icon: FileCode2 },
    ];

    const NavContent = () => (
        <ul className="space-y-2 pt-5">
            {links.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                    <li key={href}>
                        <Link href={href} onClick={() => setIsOpen(false)}>
                            <span
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                                    "hover:bg-accent hover:text-accent-foreground",
                                    isActive ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {label}
                            </span>
                        </Link>
                    </li>
                )
            })}
        </ul>
    );

    return (
        <div className="">
            {/* Mobile Menu Drawer */}
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
                <DrawerTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden fixed top-4 right-4 z-50"
                        aria-label="Menu"
                    >
                        {isOpen ? <X className="h-5 w-5"/> : <Menu className="h-5 w-5"/>}
                    </Button>
                </DrawerTrigger>
                <DialogTitle></DialogTitle>
                <DrawerContent>
                    <DrawerHeader className="border-b pb-2 mb-2">
                        <h3 className="font-semibold text-lg">Menu</h3>
                    </DrawerHeader>
                    <nav className="px-4 pb-4">
                        <NavContent />
                    </nav>
                </DrawerContent>
            </Drawer>

            {/* Sidebar for Larger Screens */}
            <aside className={cn(
                "hidden lg:block w-64 border-r",
                "bg-background fixed h-[calc(100vh-4rem)] top-16"
            )}>
                <div className="flex flex-col p-4">
                    <nav>
                        <NavContent />
                    </nav>
                </div>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="border-t pt-4">
                        <p className="text-xs text-muted-foreground text-center">
                            Built with Next.js & Shadcn
                        </p>
                    </div>
                </div>
            </aside>

            {/* Sidebar Spacing for Content */}
            <div className="hidden lg:block w-64" />
        </div>
    );
};

export default Sidebar;
