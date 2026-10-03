// Choices for the WhatsApp message writer, shared by the server and the browser.

export const waLanguages = {
  hinglish: "Hinglish (Hindi in English letters)",
  hindi: "Hindi (हिंदी)",
  english: "English",
  marathi: "Marathi (मराठी)",
  gujarati: "Gujarati (ગુજરાતી)",
  bengali: "Bengali (বাংলা)",
  punjabi: "Punjabi (ਪੰਜਾਬੀ)",
  tamil: "Tamil (தமிழ்)",
  telugu: "Telugu (తెలుగు)",
  kannada: "Kannada (ಕನ್ನಡ)",
  malayalam: "Malayalam (മലയാളം)",
  odia: "Odia (ଓଡ଼ିଆ)",
} as const;
export type WaLanguage = keyof typeof waLanguages;

export const waOccasions = {
  new: "New stock arrived",
  festive: "Festive season",
  wedding: "Wedding season",
  school: "School reopening",
  restock: "Bestsellers back in stock",
} as const;
export type WaOccasion = keyof typeof waOccasions;
