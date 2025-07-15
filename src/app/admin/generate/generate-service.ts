import { GenerateFormData } from "./_component/generate-form";

// Mock API call (fallback for development)
export function mockGenerateContent(form: GenerateFormData) {
  return new Promise<{ [platform: string]: string }>((resolve) => {
    setTimeout(() => {
      resolve({
        instagram: `🏡 ${form.title} in ${form.location}! ${form.bedrooms} bed, ${form.bathrooms} bath. ${form.features}\n#${form.tone}`,
        facebook: `Check out this ${form.tone} listing: ${form.title} - ${form.price} in ${form.location}. ${form.features}`,
        twitter: `${form.title} | ${form.location} | ${form.bedrooms}bd/${form.bathrooms}ba. ${form.features} #${form.tone}`,
        linkedin: `New property: ${form.title} (${form.location}) - ${form.price}. Features: ${form.features}. Tone: ${form.tone}`,
      });
    }, 1500);
  });
}

// Real API call using Google Gemini
export async function generateContent(form: GenerateFormData) {
  try {
    const response = await fetch('/api/generate-content', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(form)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    // Validate the response structure
    const requiredPlatforms = ['instagram', 'facebook', 'twitter', 'linkedin'];
    for (const platform of requiredPlatforms) {
      if (!result[platform] || typeof result[platform] !== 'string') {
        throw new Error(`Invalid response: missing content for ${platform}`);
      }
    }

    return result;
  } catch (error) {
    console.error('API call failed:', error);
    
    // Fallback to mock in development or if API fails
    if (process.env.NODE_ENV === 'development' || !process.env.GEMINI_API_KEY) {
      console.warn('Falling back to mock data due to API error or missing API key');
      return mockGenerateContent(form);
    }
    
    // Re-throw the error in production
    throw error;
  }
} 

// Save Listing API call
export async function saveListing({ userId, form, content }: {
  userId: string;
  form: GenerateFormData;
  content: { [platform: string]: string };
}) {
  // Prepare posts array
  const posts = [
    { platform: 'Instagram', content: content.instagram },
    { platform: 'Facebook', content: content.facebook },
    { platform: 'Twitter', content: content.twitter },
    { platform: 'LinkedIn', content: content.linkedin },
  ];

  const response = await fetch('/api/save-listing', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId,
      title: form.title,
      price: Number(form.price),
      location: form.location,
      bedrooms: form.bedrooms,
      bathrooms: form.bathrooms,
      features: form.features,
      tone: form.tone,
      posts,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
} 