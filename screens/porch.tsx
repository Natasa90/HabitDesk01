import React from "react";
import { FlatList, View } from "react-native";
import {
  PorchListHeader,
  PorchHeader,
  PorchList,
} from "@/components/PorchElements";
import { usePorchs, usePorchLearningDays } from "@/lib/hooks";
import { useUserInfo } from "@/context/UserInfoContext";
import { TextWrapper } from "@/components/Layout";

export const PorchScreen = () => {
  const { userInfo, loading } = useUserInfo();

  // If the user is not ready yet, you can render a loader
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <TextWrapper className="text-gray-500">Loading...</TextWrapper>
      </View>
    );
  }

  // Fetch porchs and learningDays using user email
  const {
    porchs,
    setPorchs,
    loading: porchsLoading,
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
          <TextWrapper className="font-IBM_italic text-lg">
            You have seen it all!
          </TextWrapper>
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
            buttonTitle={
              isFiltering ? "All Daily Updates" : "Track Your Daily Updates"
            }
            handleFiltering={toggleFilter}
          />
        </>
      }
      ListEmptyComponent={
        !porchsLoading && porchs.length === 0 ? (
          <View className="flex items-center justify-center mt-10">
            <TextWrapper className="text-gray-600">
              No updates available
            </TextWrapper>
          </View>
        ) : null
      }
      ListFooterComponent={renderFooter}
      onEndReached={() => {
        if (!porchsLoading && hasMore) {
          loadMore();
        }
      }}
      onEndReachedThreshold={0.1}
      showsVerticalScrollIndicator={false}
    />
  );
};
