"use client"

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { IconLoader } from "@tabler/icons-react";

export interface GenerateFormData {
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  features: string;
  tone: string;
}

interface GenerateFormProps {
  form: GenerateFormData;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onToneChange: (value: string) => void;
}

const TONES = [
  { value: "professional", label: "Professional" },
  { value: "hype", label: "Hype" },
  { value: "chill", label: "Chill" },
  { value: "luxury", label: "Luxury" },
];

export function GenerateForm({ form, loading, onSubmit, onChange, onToneChange }: GenerateFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="md:w-1/2 w-full bg-background rounded-xl shadow-sm p-6 flex flex-col gap-6 border"
    >
      <h2 className="text-xl font-semibold mb-2">Generate Content</h2>
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="title">Title</label>
          <Input 
            name="title" 
            id="title" 
            value={form.title} 
            onChange={onChange} 
            required 
            placeholder="e.g. Modern 2BR Apartment" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="price">Price</label>
          <Input 
            name="price" 
            id="price" 
            value={form.price} 
            onChange={onChange} 
            required 
            placeholder="$2000/mo" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="location">Location</label>
          <Input 
            name="location" 
            id="location" 
            value={form.location} 
            onChange={onChange} 
            required 
            placeholder="e.g. Downtown LA" 
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1" htmlFor="bedrooms">Bedrooms</label>
            <Input 
              name="bedrooms" 
              id="bedrooms" 
              type="number" 
              min={0} 
              value={form.bedrooms} 
              onChange={onChange} 
              required 
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1" htmlFor="bathrooms">Bathrooms</label>
            <Input 
              name="bathrooms" 
              id="bathrooms" 
              type="number" 
              min={0} 
              value={form.bathrooms} 
              onChange={onChange} 
              required 
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="features">Features / Description</label>
          <Textarea 
            name="features" 
            id="features" 
            value={form.features} 
            onChange={onChange} 
            placeholder="e.g. Pool, gym, pet-friendly, etc." 
            rows={3} 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="tone">Tone</label>
          <Select value={form.tone} onValueChange={onToneChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              {TONES.map((tone) => (
                <SelectItem key={tone.value} value={tone.value}>
                  {tone.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button type="submit" className="mt-2 w-full" disabled={loading}>
        {loading ? <IconLoader className="animate-spin mr-2" /> : null}
        {loading ? "Generating..." : "Generate"}
      </Button>
    </form>
  );
} 