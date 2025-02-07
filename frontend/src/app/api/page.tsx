"use client";

import { useState } from "react";
import CodeBlock from "@/components/CodeBlock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { endpoints } from "../utils/Apidata";

export default function ApiDocs() {
  const [activeEndpoint, setActiveEndpoint] = useState("about");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">API Documentation</h1>
        <p className="text-muted-foreground">
          Explore the available endpoints to access my portfolio data
          programmatically.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <nav className="space-y-2">
            {endpoints.map((endpoint) => (
              <button
                key={endpoint.id}
                onClick={() => setActiveEndpoint(endpoint.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeEndpoint === endpoint.id
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-muted"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      endpoint.method === "GET" ? "secondary" : "default"
                    }
                  >
                    {endpoint.method}
                  </Badge>
                  {endpoint.path}
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {endpoints.map((endpoint) => {
            if (activeEndpoint !== endpoint.id) return null;

            return (
              <div key={endpoint.id} className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      variant={
                        endpoint.method === "GET" ? "secondary" : "default"
                      }
                    >
                      {endpoint.method}
                    </Badge>
                    <code className="text-lg">{endpoint.path}</code>
                  </div>
                  <p className="text-muted-foreground">
                    {endpoint.description}
                  </p>
                </div>

                <Tabs defaultValue="200" className="w-full">
                  <TabsList>
                    {Object.keys(endpoint.responses).map((status) => (
                      <TabsTrigger key={status} value={status}>
                        {status} Response
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {Object.entries(endpoint.responses).map(
                    ([status, response]) => (
                      <TabsContent key={status} value={status}>
                        <Card>
                          <CardHeader>
                            <CardDescription>
                              {response.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <CodeBlock
                              language="json"
                              code={JSON.stringify(response.example, null, 2)}
                            />
                          </CardContent>
                        </Card>
                      </TabsContent>
                    )
                  )}
                </Tabs>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
