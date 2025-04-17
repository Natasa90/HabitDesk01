import { CategoryProps } from "@/types/FreeResourcesTypes";

export const FreeResCategories: CategoryProps[] = [
 { name: "all" },
 { name: "FrontEnd" },
 { name: "JavaScript" },
 { name: "TypeScript" },
 { name: "NodeJS" },
 { name: "NextJS" },
 { name: "Git" },
 { name: "DataBase" },
 { name: "Learning" },
 { name: "Science" },
 { name: "News" },
];

export function isValidHttpUrl(urlInput: string) {
 const urlPattern = new RegExp(
  "^(https?:\\/\\/)?" +
   "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
   "((\\d{1,3}\\.){3}\\d{1,3}))" +
   "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
   "(\\?[;&a-z\\d%_.~+=-]*)?" +
   "(\\#[-a-z\\d_]*)?$",
  "i"
 );

 return !!urlPattern.test(urlInput);
}

export function isValidEmail(email: string): boolean {
 return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

