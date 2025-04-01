import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { TextWrapper } from "@/components/Layout";
import quotesData from "../../../data/quotes.json";

export const Quotes = () => {
 const [currentIndex, setCurrentIndex] = useState<number>(0);
 const [loadingState, setLoadingState] = useState<"loading" | "loaded" | null>(
  null
 );

 useEffect(() => {
  setLoadingState("loaded");

  const interval = setInterval(() => {
   setCurrentIndex((prevIndex) => (prevIndex + 1) % quotesData.length);
  }, 8000);

  return () => clearInterval(interval);
 }, []);

 const currentQuote = quotesData[currentIndex];

 return (
  <View className="mt-6 mb-6">
   {loadingState === "loading" ? (
    <ActivityIndicator size="large" color="#0000ff" />
   ) : loadingState === "loaded" && currentQuote ? (
    <View className="text-center">
     <TextWrapper className="font-IBM_italic text-lg text-center">
      "{currentQuote.quote}"
     </TextWrapper>
     <TextWrapper className="text-sm font-IBM_extraLight text-center">
      - {currentQuote.author}
     </TextWrapper>
    </View>
   ) : (
    <TextWrapper className="text-center text-red-500">
     Failed to load quote
    </TextWrapper>
   )}
  </View>
 );
};
