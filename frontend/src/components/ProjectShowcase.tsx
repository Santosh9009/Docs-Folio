"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Globe } from "lucide-react";
import Link from "next/link";
import { fetchFromAPI } from "@/lib/api";
import LoadingState from "./LoadingState";
import { resumeData } from "@/lib/resumedata";

interface Project {
    id: number;
    name: string;
    description: string;
    technologies: string[];
    github?: string;
    demo?: string;
    image?: string;
}

export function ProjectShowcase() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const API_TIMEOUT = 3000
        
        const fetchProjects = async () => {
            try {
                const data = await Promise.race([
                    fetchFromAPI("/projects"),
                    new Promise((_, reject) =>
                        setTimeout(() => reject(new Error()), API_TIMEOUT)
                    )
                ]);
                setProjects(data);
            } catch {
                const formattedProjects = resumeData.projects.map((project, index) => ({
                    id: index + 1,
                    name: project.name,
                    description: project.achievements[0], 
                    technologies: project.techStack,
                    github: `https://${project.link}`,
                    demo: project.link.includes('vercel.app') ? `https://${project.link}` : null
                }));
                setProjects(formattedProjects);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (isLoading) return <LoadingState />;
    if (!projects.length) return <div>No projects available</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
                <motion.div
                    key={project.id}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                >
                    <Card className="h-full">
                        {project.image && (
                            <div className="relative h-48 overflow-hidden rounded-t-lg">
                                <img 
                                    src={project.image} 
                                    alt={project.name}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        )}
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <CardTitle>{project.name}</CardTitle>
                                <div className="flex gap-2">
                                    {project.github && (
                                        <Link href={project.github} target="_blank">
                                            <Github className="h-5 w-5 hover:text-[var(--color-primary)] transition-colors" />
                                        </Link>
                                    )}
                                    {project.demo && (
                                        <Link href={project.demo} target="_blank">
                                            <Globe className="h-5 w-5 hover:text-[var(--color-primary)] transition-colors" />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-muted-foreground">{project.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech) => (
                                    <Badge key={tech} variant="secondary">
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
}