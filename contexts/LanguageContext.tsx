import createContextHook from "@nkzw/create-context-hook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useMemo, useState } from "react";

export type Language = "en" | "si" | "ta";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    appName: "Sri Lanka Travel Guide",
    search: "Search districts...",
    home: "Home",
    favorites: "Favorites",
    settings: "Settings",
    provinces: "Provinces",
    topPlaces: "Top Places to Visit",
    hotels: "Where to Stay",
    luxury: "Luxury",
    budget: "Budget",
    history: "Historical Significance",
    food: "Must-Try Local Food",
    route: "Travel Route",
    downloadOffline: "Download for Offline",
    downloaded: "Downloaded",
    removeDownload: "Remove Download",
    language: "Language",
    english: "English",
    sinhala: "Sinhala",
    tamil: "Tamil",
    featured: "Featured Destinations",
    explore: "Explore All Districts",
    noResults: "No districts found",
    addToFavorites: "Add to Favorites",
    removeFromFavorites: "Remove from Favorites",
    viewOnMap: "View on Map",
    bookHotel: "Book Hotel",
  },
  si: {
    appName: "ශ්‍රී ලංකා සංචාරක මාර්ගෝපදේශකය",
    search: "දිස්ත්‍රික්ක සොයන්න...",
    home: "මුල් පිටුව",
    favorites: "ප්‍රියතම",
    settings: "සැකසුම්",
    provinces: "පළාත්",
    topPlaces: "බලන්න ඇති ස්ථාන",
    hotels: "රැඳී සිටීමට ස්ථාන",
    luxury: "අධි සුඛෝපභෝගී",
    budget: "අඩු වියදම්",
    history: "ඓතිහාසික වැදගත්කම",
    food: "අනිවාර්යයෙන් උත්සාහ කළ යුතු ආහාර",
    route: "චාරිකා මාර්ගය",
    downloadOffline: "නොබැඳි සඳහා බාගන්න",
    downloaded: "බාගත කරන ලදී",
    removeDownload: "බාගත කිරීම ඉවත් කරන්න",
    language: "භාෂාව",
    english: "ඉංග්‍රීසි",
    sinhala: "සිංහල",
    tamil: "දෙමළ",
    featured: "විශේෂාංගගත ගමනාන්ත",
    explore: "සියලුම දිස්ත්‍රික්ක ගවේෂණය කරන්න",
    noResults: "දිස්ත්‍රික්ක හමු නොවීය",
    addToFavorites: "ප්‍රියතම වෙත එකතු කරන්න",
    removeFromFavorites: "ප්‍රියතම වෙතින් ඉවත් කරන්න",
    viewOnMap: "සිතියමේ බලන්න",
    bookHotel: "හෝටලය වෙන්කරවා ගන්න",
  },
  ta: {
    appName: "இலங்கை பயண வழிகாட்டி",
    search: "மாவட்டங்களைத் தேடு...",
    home: "முகப்பு",
    favorites: "பிடித்தவை",
    settings: "அமைப்புகள்",
    provinces: "மாகாணங்கள்",
    topPlaces: "பார்க்க வேண்டிய இடங்கள்",
    hotels: "தங்குமிடம்",
    luxury: "சொகுசு",
    budget: "மலிவு",
    history: "வரலாற்று முக்கியத்துவம்",
    food: "கட்டாயம் முயற்சிக்க வேண்டிய உணவு",
    route: "பயண வழி",
    downloadOffline: "ஆஃப்லைனுக்கு பதிவிறக்கு",
    downloaded: "பதிவிறக்கம் செய்யப்பட்டது",
    removeDownload: "பதிவிறக்கத்தை நீக்கு",
    language: "மொழி",
    english: "ஆங்கிலம்",
    sinhala: "சிங்களம்",
    tamil: "தமிழ்",
    featured: "சிறப்பு இடங்கள்",
    explore: "அனைத்து மாவட்டங்களையும் ஆராயுங்கள்",
    noResults: "மாவட்டங்கள் எதுவும் கிடைக்கவில்லை",
    addToFavorites: "பிடித்தவைகளில் சேர்",
    removeFromFavorites: "பிடித்தவைகளிலிருந்து நீக்கு",
    viewOnMap: "வரைபடத்தில் காண்க",
    bookHotel: "ஹோட்டலை முன்பதிவு செய்",
  },
};

export const [LanguageProvider, useLanguage] = createContextHook<LanguageContextType>(() => {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    void AsyncStorage.getItem("language").then((stored) => {
      if (stored && ["en", "si", "ta"].includes(stored)) {
        setLanguageState(stored as Language);
      }
    });
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    void AsyncStorage.setItem("language", lang);
  }, []);

  const t = useCallback((key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  }, [language]);

  return useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);
});

