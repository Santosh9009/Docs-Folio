"use client";

import { ProjectShowcase } from "@/components/ProjectShowcase";
import { AnimatedCard } from "@/components/AnimatedCard";

export default function Projects() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold mb-2">Projects</h1>
                <p className="text-muted-foreground">
                    A collection of my recent work and side projects.
                </p>
            </div>
            
            <ProjectShowcase />
        </div>
    );
} 