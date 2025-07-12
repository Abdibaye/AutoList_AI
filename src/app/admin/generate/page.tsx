"use client"

import React, { useState } from "react";
import { toast } from "sonner";
import { 
  GenerateForm, 
  ContentTabs, 
  generateContent, 
  type GenerateFormData 
} from "./_component";

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
    } finally {
      setRegenLoading((prev) => ({ ...prev, [platform]: false }));
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl mx-auto">
      <GenerateForm
        form={form}
        loading={loading}
        onSubmit={handleSubmit}
        onChange={handleChange}
        onToneChange={handleToneChange}
      />
      <ContentTabs
        content={content}
        activeTab={activeTab}
        regenLoading={regenLoading}
        onTabChange={setActiveTab}
        onCopy={handleCopy}
        onRegenerate={handleRegenerate}
      />
    </div>
  );
}
