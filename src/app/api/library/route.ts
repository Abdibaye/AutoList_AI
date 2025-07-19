import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  // Fetch all listings with related posts and user
  const listings = await prisma.listing.findMany({
    include: {
      user: true,
      posts: true,
    },
  });

  // Map to a flat structure similar to data.json
  const data = listings.map((listing) => ({
    id: listing.id,
    header: listing.title,
    type: listing.tone, // or another field if you want
    status: "Done", // Placeholder, adjust as needed
    target: listing.bedrooms?.toString() ?? "",
    limit: listing.bathrooms?.toString() ?? "",
    reviewer: listing.user?.name || "Unknown",
    // Optionally include posts or other fields
    posts: listing.posts,
    price: listing.price,
    location: listing.location,
    features: listing.features,
  }));

  return NextResponse.json(data);
} 