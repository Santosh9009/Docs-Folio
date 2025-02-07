"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";

// Define the structure of searchable content
interface SearchableItem {
    title: string;
    description?: string;
    type: 'project' | 'skill' | 'experience' | 'contact';
    href: string;
}

// Sample searchable content - you can fetch this from your API
const searchableContent: SearchableItem[] = [
    {
        title: "About Me",
        description: "Full Stack Developer",
        type: "contact",
        href: "/about",
    },
    {
        title: "Medium-Clone-Blogging-website",
        description: "Developed a full-featured platform with a responsive React.js frontend",
        type: "project",
        href: "/projects",
    },
    {
        title: "Realtime Code Editor using Docker",
        description: "Enabled real-time collaboration with live updates",
        type: "project",
        href: "/projects",
    },
    {
        title: "Threads Clone",
        description: "Created a functional clone with user authentication, posting, and commenting features",
        type: "project",
        href: "/projects",
    },
    {
        title: "Frontend Development",
        description: "HTML, CSS, Tailwind CSS, JavaScript, React.js, Next.js",
        type: "skill",
        href: "/skills",
    },
    {
        title: "Backend Development",
        description: "Node.js, Express",
        type: "skill",
        href: "/skills",
    },
    {
        title: "Databases",
        description: "PostgreSQL, MongoDB, Redis",
        type: "skill",
        href: "/skills",
    },
    {
        title: "DevOps",
        description: "Kubernetes, Docker, Kafka, AWS, Git, GitHub",
        type: "skill",
        href: "/skills",
    },
    {
        title: "Programming Languages",
        description: "JavaScript, Java, C, Python",
        type: "skill",
        href: "/skills",
    },
    {
        title: "Contact Information",
        description: "Get in touch with me",
        type: "contact",
        href: "/contact",
    },
];

export function SearchCommand() {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false);
        command();
    }, []);

    return (
        <>
            <Button
                variant="outline"
                className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
                onClick={() => setOpen(true)}
            >
                <Search className="h-4 w-4 xl:mr-2" />
                <span className="hidden xl:inline-flex">Search...</span>
                <span className="sr-only">Search</span>
                <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <DialogTitle></DialogTitle>
                <CommandInput placeholder="Type to search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Projects">
                        {searchableContent
                            .filter((item) => item.type === "project")
                            .map((item) => (
                                <CommandItem
                                    key={item.title}
                                    onSelect={() => runCommand(() => router.push(item.href))}
                                >
                                    <span>{item.title}</span>
                                </CommandItem>
                            ))}
                    </CommandGroup>
                    <CommandGroup heading="Skills">
                        {searchableContent
                            .filter((item) => item.type === "skill")
                            .map((item) => (
                                <CommandItem
                                    key={item.title}
                                    onSelect={() => runCommand(() => router.push(item.href))}
                                >
                                    <span>{item.title}</span>
                                </CommandItem>
                            ))}
                    </CommandGroup>
                    <CommandGroup heading="Other">
                        {searchableContent
                            .filter((item) => !["project", "skill"].includes(item.type))
                            .map((item) => (
                                <CommandItem
                                    key={item.title}
                                    onSelect={() => runCommand(() => router.push(item.href))}
                                >
                                    <span>{item.title}</span>
                                </CommandItem>
                            ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}