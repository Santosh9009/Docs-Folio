"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { fetchFromAPI } from "@/lib/api";
import LoadingState from "./LoadingState";

interface Experience {
    title: string;
    company: string;
    duration: string;
    description: string;
    technologies: string[];
}

export function ExperienceTimeline() {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchExperience = async () => {
            try {
                const data = await fetchFromAPI("/experience");
                setExperiences(data);
            } catch (error) {
                console.log("Error fetching experience:");
            } finally {
                setIsLoading(false);
            }
        };

        fetchExperience();
    }, []);

    if (isLoading) return <LoadingState />;
    if (!experiences.length) return <div>No experience data available</div>;

    return (
        <div className="space-y-6">
            {experiences.map((experience, index) => (
                <motion.div
                    key={`${experience.company}-${experience.title}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                >
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-semibold">{experience.title}</h3>
                                    <p className="text-sm text-muted-foreground">{experience.company}</p>
                                </div>
                                <Badge variant="outline">{experience.duration}</Badge>
                            </div>
                            <p className="text-muted-foreground mb-4">{experience.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {experience.technologies.map((tech) => (
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