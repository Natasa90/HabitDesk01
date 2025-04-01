import { FC } from "react";
import { CategoryTags } from "../CategoryTags";
import { FreeResCategories } from "@/lib/constants";
import { CategoryFilterProps } from "@/types/FreeResourcesTypes";

export const FreeResCats: FC<CategoryFilterProps> = ({
 currentCategory,
 setCurrentCategory,
}) => {
 const handleCategoryClick = (category: string) => {
  setCurrentCategory(category);
 };

 const isActive = (category: string) => currentCategory === category;

 return (
   <CategoryTags
    categories={FreeResCategories}
    handleCategoryClick={handleCategoryClick}
    isActive={isActive}
   />
 );
};
