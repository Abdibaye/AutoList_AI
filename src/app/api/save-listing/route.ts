import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { SaveListingSchema } from '@/lib/validation';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = SaveListingSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json({ error: 'Validation error', details: parseResult.error.flatten() }, { status: 400 });
    }
    const {
      userId,
      title,
      price,
      location,
      bedrooms,
      bathrooms,
      features,
      tone,
      posts,
    } = parseResult.data;

    // features is a string in the schema, so join if array
    const featuresString = Array.isArray(features) ? features.join(', ') : features;

    const listing = await prisma.listing.create({
      data: {
        userId,
        title,
        price,
        location,
        bedrooms,
        bathrooms,
        features: featuresString,
        tone,
        posts: {
          create: posts, // expects array of { platform, content }
        },
      },
      include: { posts: true },
    });

    return NextResponse.json(listing, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
