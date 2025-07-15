import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      userId,
      title,
      price,
      location,
      bedrooms,
      bathrooms,
      features,
      tone,
      posts, // Array of { platform, content }
    } = body;

    if (userId === undefined || userId === null || userId === "") {
      return NextResponse.json({ error: 'Missing required field: userId' }, { status: 400 });
    }
    if (!title) {
      return NextResponse.json({ error: 'Missing required field: title' }, { status: 400 });
    }
    if (price === undefined || price === null || price === "") {
      return NextResponse.json({ error: 'Missing required field: price' }, { status: 400 });
    }
    if (!location) {
      return NextResponse.json({ error: 'Missing required field: location' }, { status: 400 });
    }
    if (bedrooms === undefined || bedrooms === null || bedrooms === "") {
      return NextResponse.json({ error: 'Missing required field: bedrooms' }, { status: 400 });
    }
    if (bathrooms === undefined || bathrooms === null || bathrooms === "") {
      return NextResponse.json({ error: 'Missing required field: bathrooms' }, { status: 400 });
    }
    if (!features) {
      return NextResponse.json({ error: 'Missing required field: features' }, { status: 400 });
    }
    if (!tone) {
      return NextResponse.json({ error: 'Missing required field: tone' }, { status: 400 });
    }
    if (!posts) {
      return NextResponse.json({ error: 'Missing required field: posts' }, { status: 400 });
    }

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
