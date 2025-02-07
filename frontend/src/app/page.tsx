import CodeBlock from "../components/CodeBlock";
import { ArrowRight, Code2, Terminal, Book } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { endpoints } from "./utils/Apidata";

export default function ApiDocs() {
    const features = [
        {
            icon: Code2,
            title: "Full Stack Developer",
            description: "Experienced in building web applications using modern technologies.",
        },
        {
            icon: Terminal,
            title: "Clean Code Advocate",
            description: "Writing maintainable, scalable, and well-documented code.",
        },
        {
            icon: Book,
            title: "Continuous Learner",
            description: "Always staying up-to-date with the latest technologies.",
        },
    ];

    const quickLinks = [
        { title: "Projects", href: "/projects", description: "View my recent work" },
        { title: "Skills", href: "/skills", description: "Technical expertise" },
        { title: "API Docs", href: "/api", description: "API documentation" },
    ];

    return (
        <div className="container mx-auto px-4 space-y-8">
            {/* Hero Section */}
            <section className="text-center space-y-4">
                <h1 className="text-2xl md:text-4xl font-bold">Welcome to My Portfolio</h1>
                <p className="text-base md:text-xl text-muted-foreground">
                    Full Stack Developer specializing in modern web technologies
                </p>
                <div className="flex justify-center gap-4">
                    <Button asChild size="sm">
                        <Link href="/projects">
                            View Projects <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    <Button variant="outline" asChild size="sm">
                        <Link href="/contact">Contact Me</Link>
                    </Button>
                </div>
            </section>

            {/* Features Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {features.map((feature) => {
                    const Icon = feature.icon;
                    return (
                        <Card key={feature.title} className="w-full">
                            <CardHeader className="items-center text-center">
                                <Icon className="h-8 w-8 text-primary" />
                                <CardTitle className="text-base md:text-xl">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground text-center">{feature.description}</p>
                            </CardContent>
                        </Card>
                    );
                })}
            </section>

            {/* Quick Links */}
            <section>
                <h2 className="text-xl md:text-2xl font-bold mb-4 text-center md:text-left">Quick Links</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {quickLinks.map((link) => (
                        <Link href={link.href} key={link.title} className="w-full">
                            <Card className="hover:bg-muted/50 transition-colors w-full">
                                <CardHeader>
                                    <CardTitle className="text-base md:text-xl">{link.title}</CardTitle>
                                    <CardDescription className="text-sm">{link.description}</CardDescription>
                                </CardHeader>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>

            {/* API Documentation Section */}
            {/* <section className="max-w-xs md:max-w-full">
                <h2 className="text-xl md:text-2xl font-bold mb-4">API Documentation</h2>
                <div className="space-y-4">
                    {endpoints.map((endpoint) => (
                        <Card key={endpoint.id} className="w-full">
                            <CardContent className="p-4">
                                <p className="mb-2">
                                    <strong>{endpoint.method}</strong> {endpoint.path}
                                </p>
                                <p className="text-sm text-muted-foreground mb-2">{endpoint.description}</p>
                                    <CodeBlock 
                                        language="json" 
                                        code={JSON.stringify(endpoint.responses[200].example, null, 2)} 
                                    />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section> */}
        </div>
    );
}