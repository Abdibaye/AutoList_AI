import { z } from 'zod';

export const SaveListingSchema = z.object({
  userId: z.string().min(1, 'userId is required'),
  title: z.string().min(1, 'title is required'),
  price: z.preprocess((val) => typeof val === 'string' ? Number(val) : val, z.number().min(0, 'price is required')),
  location: z.string().min(1, 'location is required'),
  bedrooms: z.preprocess((val) => typeof val === 'string' ? Number(val) : val, z.number().int().min(0, 'bedrooms is required')),
  bathrooms: z.preprocess((val) => typeof val === 'string' ? Number(val) : val, z.number().int().min(0, 'bathrooms is required')),
  features: z.string().min(1, 'features is required'),
  tone: z.string().min(1, 'tone is required'),
  posts: z.array(z.object({
    platform: z.string().min(1),
    content: z.string().min(1)
  })).min(1, 'At least one post is required'),
}); 