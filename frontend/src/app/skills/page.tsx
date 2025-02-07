"use client";

import { SkillsGrid } from "@/components/SkillsGrid";

export default function Skills() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold mb-2">Skills</h1>
                <p className="text-muted-foreground">
                    Technologies and tools I work with.
                </p>
            </div>
            
            <SkillsGrid />
        </div>
    );
}