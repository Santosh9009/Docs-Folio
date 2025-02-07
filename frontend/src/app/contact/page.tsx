"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, MapPin } from "lucide-react";
import Link from "next/link";

export default function Contact() {
  const [contactData, setContactData] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const fetchContactData = async () => {
      const response = await fetch("http://localhost:5001/contact");
      const data = await response.json();
      setContactData(data);
    };
    fetchContactData();
  }, []);

  if (!contactData)
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );

  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-6 max-w-4xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Contact</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Let's connect! Here's how you can reach me.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:gap-4">
        {[
          {
            icon: Mail,
            title: "Email",
            value: contactData.email,
            href: `mailto:${contactData.email}`,
          },
          {
            icon: Github,
            title: "GitHub",
            value: contactData.github.split("github.com/")[1],
            href: contactData.github,
          },
          {
            icon: Linkedin,
            title: "LinkedIn",
            value: contactData.linkedin.split("linkedin.com/")[1],
            href: contactData.linkedin,
          },
        ].map((item) => (
          <Card key={item.title} className="shadow-sm">
            <CardHeader className="py-3">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm sm:text-base text-primary hover:underline"
              >
                {item.value}
              </a>
            </CardContent>
          </Card>
        ))}
      </div>

      <Link
        className="block w-full mt-4 sm:mt-6"
        href="https://drive.google.com/file/d/16bCqPkXmLtYHWTc54IvoTdTr4ezIa-wF/view?usp=drive_link"
      >
        <Button className="w-full py-4 text-sm sm:text-base">
          Download Resume
        </Button>
      </Link>
    </div>
  );
}
