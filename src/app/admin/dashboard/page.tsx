"use client";
import React, { useState } from "react";
import { StatCard } from "@/components/dashboard/StatCard";
import { ActivityItem } from "@/components/dashboard/ActivityItem";
import { PostPreview } from "@/components/dashboard/PostPreview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip } from "@/components/ui/tooltip";
import { BarChart, Activity, Clock, FileText, Plus, List, Calendar } from "lucide-react";

// Mock data
const stats = [
  { icon: Activity, label: "Total Posts", value: 1240, sublabel: "All time" },
  { icon: Clock, label: "Today", value: 12, sublabel: "Posts generated" },
  { icon: BarChart, label: "This Week", value: 87, sublabel: "Posts generated" },
];

const platformData = [
  { name: "X", value: 40 },
  { name: "LinkedIn", value: 30 },
  { name: "Facebook", value: 20 },
  { name: "Instagram", value: 10 },
];

const activities = [
  { type: "Ad", platform: "X", date: "2m ago" },
  { type: "Announcement", platform: "LinkedIn", date: "10m ago" },
  { type: "Promo", platform: "Facebook", date: "1h ago" },
  { type: "Update", platform: "Instagram", date: "2h ago" },
];

const topPosts = [
  { title: "How AI is Changing Marketing", content: "Discover the latest trends in AI-powered marketing..." },
  { title: "Boost Your Brand on LinkedIn", content: "Tips and tricks to maximize your LinkedIn presence..." },
  { title: "X: The New Frontier", content: "Why X is the hottest platform for engagement..." },
];

export default function DashboardPage() {
  const [loading, setLoading] = useState(false); // Set to true to show skeletons

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
      {/* Quick Actions */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Card className="flex-1 flex flex-row gap-4 items-center p-4 sticky top-0 z-10">
          <Button size="sm" className="gap-2"><Plus className="size-4" />Generate Post</Button>
          <Button size="sm" variant="secondary" className="gap-2"><List className="size-4" />View All Content</Button>
          <Button size="sm" variant="outline" className="gap-2"><Calendar className="size-4" />Schedule</Button>
        </Card>
      </div>
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24 w-full rounded-xl" />)
          : stats.map((stat, i) => <StatCard key={i} {...stat} />)
        }
      </div>
      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Platform Breakdown */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BarChart className="size-5" />Platform Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-40 w-full rounded-xl" />
            ) : (
              <div className="flex flex-col items-center justify-center h-40">
                {/* Simple bar chart mockup */}
                {platformData.map((p) => (
                  <div key={p.name} className="flex items-center w-full gap-2 mb-2">
                    <span className="w-20 text-xs text-muted-foreground">{p.name}</span>
                    <div className="flex-1 bg-primary/10 rounded h-4 relative">
                      <div className="bg-primary h-4 rounded" style={{ width: `${p.value}%` }} />
                    </div>
                    <span className="w-8 text-xs text-muted-foreground text-right">{p.value}%</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        {/* Recent Activity Feed */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Activity className="size-5" />Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-40 w-full rounded-xl" />
            ) : (
              <ScrollArea className="h-40">
                {activities.map((a, i) => (
                  <ActivityItem key={i} {...a} />
                ))}
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </div>
      {/* Top Performing Posts */}
      <div className="mt-8">
        <Tabs defaultValue="top" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="top">Top Performing</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>
          <TabsContent value="top">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading
                ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-32 w-full rounded-xl" />)
                : topPosts.map((post, i) => (
                  <PostPreview
                    key={i}
                    title={post.title}
                    content={post.content}
                    onCopy={() => navigator.clipboard.writeText(post.content)}
                    onView={() => alert("View full post coming soon")}
                  />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="recent">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Could map recent posts here */}
              <Skeleton className="h-32 w-full rounded-xl" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 