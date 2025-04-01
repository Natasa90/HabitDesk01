import React, { useContext } from "react";
import {
 FlatList,
 View,
 ActivityIndicator,
 TouchableOpacity,
} from "react-native";
import {
 PorchListHeader,
 PorchHeader,
 PorchList,
} from "@/components/PorchElements";
import { usePorchs, usePorchLearningDays } from "@/lib/hooks";
import { UserInfoContext } from "@/context/UserInfoContext";
import { TextWrapper } from "@/components/Layout";

export const PorchScreen = () => {
 const { userInfo } = useContext(UserInfoContext);
 const {
  porchs,
  setPorchs,
  loading,
  hasMore,
  loadMore,
  toggleFilter,
  isFiltering,
 } = usePorchs(userInfo?.email);

 const learningDays = usePorchLearningDays(userInfo?.email);

 const renderItem = ({ item }: any) => (
  <PorchList porchs={[item]} setPorchs={setPorchs} />
 );

 const renderFooter = () => {
    if (!hasMore) {
      return (
        <View className="items-center justify-center mb-8">
          <TextWrapper className="font-IBM_italic text-lg">You have seen it all!</TextWrapper>
        </View>
      );
    }
    return null;
  };


 return (
  <FlatList
   className="p-5"
   data={porchs}
   renderItem={renderItem}
   keyExtractor={(item) => item.new_id}
   ListHeaderComponent={
    <>
     <PorchHeader />
     <PorchListHeader
      learningDays={learningDays}
      buttonTitle={isFiltering ? "All Daily Updates" : "Track Your Daily Updates"}
      handleFiltering={toggleFilter}
     />
    </>
   }
   ListEmptyComponent={
    !loading && porchs.length === 0 ? (
     <View className="flex items-center justify-center mt-10">
      <TextWrapper className="text-gray-600">No updates available</TextWrapper>
     </View>
    ) : null
   }
  ListFooterComponent={renderFooter}
   onEndReached={() => {
    if (!loading && hasMore) {
     loadMore();
    }
   }}
   onEndReachedThreshold={0.1}
   showsVerticalScrollIndicator={false}
  />
 );
};
