import { FC } from "react";
import { View, Pressable } from "react-native";
import { TextWrapper } from "@/components/Layout";
import { CategoryTagsProps } from "@/types/FreeResourcesTypes";
import { MaterialIcons } from "@expo/vector-icons";

export const CategoryTags: FC<CategoryTagsProps> = ({
 categories,
 handleCategoryClick,
 isActive,
}) => {
 return (
  <View className="mt-4">
   <View className="flex-row justify-center gap-2">
    <MaterialIcons name="category" size={24} color="#FF6347" />
    <TextWrapper className="text-xl text-center color-gray-700">
     Categories
    </TextWrapper>
   </View>
   <View className="flex-row flex-wrap gap-4 justify-center mt-1 mb-6">
    {categories.map((category) => {
     const categoryName =
      typeof category === "string" ? category : category.name;
     const isActiveCategory = isActive(categoryName);

     return (
      <Pressable
       key={categoryName}
       onPress={() => handleCategoryClick(categoryName)}
       className={`border border-indigo-300 rounded-full px-2.5 py-1 ${
        isActive(categoryName)
         ? "bg-blue-500 text-white"
         : "bg-indigo-50 text-indigo-600"
       }`}
      >
       <TextWrapper
        className={`text-xs font-semibold ${
         isActiveCategory ? "text-white" : "text-indigo-700"
        }`}
       >
        {categoryName === "all" ? "ALL" : categoryName}
       </TextWrapper>
      </Pressable>
     );
    })}
   </View>
  </View>
 );
};
