import { FC } from "react";
import {
 View,
 TextInput,
 Modal,
 TouchableOpacity,
 ActivityIndicator,
} from "react-native";
import { PorchFormProps } from "@/Types/PorchTypes";
import Icon from "react-native-vector-icons/Feather";
import { BlurView } from "expo-blur";
import { TextWrapper } from "@/components/Layout";
import { usePorchSubmit, usePorchForm } from "@/lib/hooks";
import { isValidHttpUrl } from "lib/constants";
import { styles } from "@/components/Layout";

export const PorchUpdateForm: FC<PorchFormProps> = ({
 setPorchs,
 setShowForm,
}) => {
 const { text, setText, source, setSource, resetForm } = usePorchForm();
 const { isUploading, responseUpdate, handleSubmit } = usePorchSubmit(
  setPorchs,
  setShowForm,
  resetForm
 );

 return (
  <Modal
   visible={true}
   animationType="fade"
   transparent={true}
   onRequestClose={() => setShowForm(false)}
  >
   <View className="flex-1 items-center justify-center bg-opacity-70">
    <BlurView
     style={styles.updateModalBLur}
     intensity={80}
     tint="dark"
    />
    <View
     className="bg-gray-200 p-4 rounded-xl w-5/6 shadow-lg"
    >
     {responseUpdate ? (
      <ActivityIndicator size="large" color="#0000ff" />
     ) : (
      <View className="border-2 border-gray-400 bg-white rounded-lg p-8 relative">
       <TouchableOpacity
        onPress={() => setShowForm(false)}
        className="absolute right-3 top-3"
       >
        <Icon name="x" size={20} color="gray" />
       </TouchableOpacity>
       <TextWrapper className="mt-6 text-xl font-IBM_boldItalic text-customBlue mb-5 text-center">
        Progress Update
       </TextWrapper>
       <View className="border-b border-gray-300" />
       <View className="bg-gray-200 p-3 rounded-xl my-8">
        <TextInput
         className="text-black font-IBM_italic"
         placeholder="Share your update..."
         placeholderTextColor="gray"
         value={text}
         onChangeText={setText}
         editable={!isUploading}
        />
       </View>
       <View className="p-3 bg-gray-200 rounded-xl mb-8">
        <TextInput
         className={`${
          !isValidHttpUrl(source) && source.length > 0
           ? "bg-red-100"
           : "bg-gray"
         } rounded-md font-IBM_italic`}
         value={source}
         placeholder="Share your learning source..."
         placeholderTextColor="gray"
         onChangeText={setSource}
         editable={!isUploading}
        />
       </View>
       <View className="items-center">
        <TouchableOpacity
         className="bg-customBlue p-2 rounded-xl shadow-xl justify-center items-center mb-4 w-40"
         onPress={() => handleSubmit(text, source)}
         disabled={isUploading}
        >
         <TextWrapper className=" text-lg text-white">
          {isUploading ? "Uploading..." : "Update"}
         </TextWrapper>
        </TouchableOpacity>
       </View>
      </View>
     )}
    </View>
   </View>
  </Modal>
 );
};
