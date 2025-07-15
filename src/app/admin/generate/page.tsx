"use client"

import React, { useState } from "react";
import { toast } from "sonner";
import { 
  GenerateForm, 
  ContentTabs, 
  generateContent, 
  type GenerateFormData 
} from ".";
import { saveListing } from "./generate-service";
import { authClient } from "@/lib/auth-client";

export default function GenerateContentPage() {
  // Form state
  const [form, setForm] = useState<GenerateFormData>({
    title: "",
    price: "",
    location: "",
    bedrooms: 1,
    bathrooms: 1,
    features: "",
    tone: "professional",
  });
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<{ [platform: string]: string } | null>(null);
  const [activeTab, setActiveTab] = useState("instagram");
  const [regenLoading, setRegenLoading] = useState<{ [platform: string]: boolean }>({});

  // Session state
  const [session, setSession] = useState<any>(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [sessionError, setSessionError] = useState<string | null>(null);

  React.useEffect(() => {
    authClient.getSession()
      .then(({ data, error }) => {
        if (error) {
          setSessionError(error.message || "Failed to load session");
        } else {
          setSession(data);
        }
        setSessionLoading(false);
      })
      .catch((err) => {
        setSessionError(err.message || "Failed to load session");
        setSessionLoading(false);
      });
  }, []);

  const userId = session?.user?.id;

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "number" ? Number(value) : value }));
  };

  const handleToneChange = (value: string) => {
    setForm((prev) => ({ ...prev, tone: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setContent(null);
    
    try {
      const result = await generateContent(form);
      setContent(result);
      toast.success("Content generated successfully!");
    } catch (error) {
      console.error('Generation failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate content';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const handleRegenerate = async (platform: string) => {
    setRegenLoading((prev) => ({ ...prev, [platform]: true }));
    try {
      const result = await generateContent(form);
      setContent((prev) => ({ ...prev, [platform]: result[platform] }));
      toast.success(`${platform.charAt(0).toUpperCase() + platform.slice(1)} content regenerated!`);
    } catch (error) {
      console.error('Regeneration failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to regenerate content';
      toast.error(errorMessage);
    } finally {
      setRegenLoading((prev) => ({ ...prev, [platform]: false }));
    }
  };

  // Add save handler
  const handleSaveListing = async () => {
    if (!content) {
      toast.error("Generate content before saving.");
      return;
    }
    if (!userId) {
      toast.error("User not authenticated.");
      return;
    }
    try {
      const result = await saveListing({ userId, form, content });
      toast.success("Listing and posts saved!");
      // Optionally, redirect or update UI
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save listing';
      toast.error(errorMessage);
    }
  };

  if (sessionLoading) return <div>Loading session...</div>;
  if (sessionError) return <div>Failed to load session: {sessionError}</div>;

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl mx-auto">
      <GenerateForm
        form={form}
        loading={loading}
        onSubmit={handleSubmit}
        onChange={handleChange}
        onToneChange={handleToneChange}
      />
      <div className="flex flex-col gap-4 w-full">
        <ContentTabs
          content={content}
          activeTab={activeTab}
          regenLoading={regenLoading}
          onTabChange={setActiveTab}
          onCopy={handleCopy}
          onRegenerate={handleRegenerate}
        />
        {/* Save Listing Button */}
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          onClick={handleSaveListing}
          disabled={!content || loading}
        >
          Save Listing & Posts
        </button>
      </div>
    </div>
  );
}
