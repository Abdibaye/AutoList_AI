import { GenerateFormData } from "./generate-form";

// Mock API call
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

// Future: Replace with real API call
export async function generateContent(form: GenerateFormData) {
  // TODO: Replace with actual API endpoint
  // const response = await fetch('/api/generate-content', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(form)
  // });
  // return response.json();
  
  return mockGenerateContent(form);
} 