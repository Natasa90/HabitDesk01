import { FC } from "react";
import { FlatList } from "react-native";
import { FreeSource } from "./FreeSources";
import { FreeSourcesListProps } from "@/types/FreeResourcesTypes";

export const FreeSourcesList: FC<FreeSourcesListProps> = ({ facts }) => {
 return (
  <FlatList
   data={facts}
   keyExtractor={(item) => item.id.toString()}
   renderItem={({ item }) => <FreeSource fact={item} />}
   className="pt-4"
  />
 );
};
