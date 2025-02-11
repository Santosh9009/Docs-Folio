"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { fetchFromAPI } from "@/lib/api";
import LoadingState from "./LoadingState";
import { resumeData } from "@/lib/resumedata";

interface SkillsData {
    frontend: string[];
    backend: string[];
    databases: string[];
    devops: string[];
    languages: string[];
}

export function SkillsGrid() {
    const [skillsData, setSkillsData] = useState<SkillsData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const API_TIMEOUT = 3000; // 

        const fetchSkills = async () => {
            try {
                const data = await Promise.race([
                    fetchFromAPI("/skills"),
                    new Promise((_, reject) =>
                        setTimeout(() => reject(new Error()), API_TIMEOUT)
                    )
                ]);
                setSkillsData(data);
            } catch {
                setSkillsData({
                    frontend: resumeData.skills.frontend,
                    backend: resumeData.skills.backend,
                    databases: resumeData.skills.databases,
                    devops: resumeData.skills.devops,
                    languages: resumeData.skills.languages
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchSkills();
    }, []);

    if (isLoading) return <LoadingState />;
    if (!skillsData) return <div>No skills data available</div>;

    const skillCategories = [
        { title: "Frontend", skills: skillsData.frontend },
        { title: "Backend", skills: skillsData.backend },
        { title: "Databases", skills: skillsData.databases },
        { title: "DevOps & Cloud", skills: skillsData.devops },
        { title: "Programming Languages", skills: skillsData.languages }
    ];

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skillCategories.map((category, index) => (
                    <motion.div
                        key={category.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>{category.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill) => (
                                        <Badge variant='secondary' key={skill}>
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}