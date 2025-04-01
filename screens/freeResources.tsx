import { FlatList, View, ActivityIndicator } from "react-native";
import { TextWrapper } from "@/components/Layout";
import { FreeResHeader, LearningSource } from "@/components/FreeResElements";
import { useFetchSources } from "@/lib/hooks";

export const FreeResourcesScreen = () => {

 const { sources, loading, error } = useFetchSources();

 if (loading) {
  return (
   <View className="flex-1 justify-center items-center">
    <ActivityIndicator size="large" color="#0000ff" />
    <TextWrapper className="mt-4 text-center">Loading resources...</TextWrapper>
   </View>
  );
 }

 if (error) {
  return (
   <View className="flex-1 justify-center items-center bg-gray-100">
    <TextWrapper className="text-red-500">{error}</TextWrapper>
   </View>
  );
 }

 return (
  <FlatList
   data={sources}
   keyExtractor={(item) => item.id.toString()}
   renderItem={null}
   ListHeaderComponent={
    <>
     <FreeResHeader />
     <LearningSource sources={sources} />
    </>
   }
   className="p-5"
  />
 );
};
