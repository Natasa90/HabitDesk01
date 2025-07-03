import { FC, useState, useContext } from 'react';
import {
  View,
  Alert,
  Modal,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { TextWrapper } from '@/components/Layout';
import DateTimePicker from '@react-native-community/datetimepicker';
import { UserInfoContext } from '@/context/UserInfoContext';
import { LearningTimePickerProps } from '@/types/NotificationTypes';
import { getIsFinalDateInPastOrNow } from '@/lib/helpers';
import { useSaveLearningTime } from '@/lib/hooks';

export const LearningTimePicker: FC<LearningTimePickerProps> = ({ onSaveSuccess }) => {
  const { userInfo } = useContext(UserInfoContext);

  const [finalDate, setFinalDate] = useState(new Date());
  const [tempDate, setTempDate] = useState(new Date());
  const [hasPickedDate, setHasPickedDate] = useState(false);
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [showPicker, setShowPicker] = useState(false);

  const resetDates = () => {
    const now = new Date();
    setFinalDate(now);
    setTempDate(now);
    setHasPickedDate(false);
  };

	const { saveLearningTime, isSaving } = useSaveLearningTime({
    finalDate,
    userEmail: userInfo?.email,
    onSaveSuccess,
    resetDates,
    setHasPickedDate,
  });


  const openPicker = () => {
    setTempDate(finalDate);
    setMode('date');
    setShowPicker(true);
  };

  const onPickerChange = (_event: any, selectedValue?: Date) => {
    if (selectedValue) {
      setTempDate(selectedValue);
    }
  };

  const onConfirm = () => {
    if (mode === 'date') {
      setMode('time');
    } else {
      if (getIsFinalDateInPastOrNow(tempDate)) {
        Alert.alert(
          'Oops!',
          "Please pick another time — you can't schedule a reminder for the past or this exact minute ⏰"
        );
        return; 
      }
      setFinalDate(tempDate);
      setHasPickedDate(true);
      setShowPicker(false);
    }
  };

  const onCancel = () => {
    setShowPicker(false);
  };

  return (
    <View className="flex-1 px-4 py-4">
      <TouchableOpacity
        onPress={openPicker}
        className="bg-customBlue rounded-lg mb-4 self-center w-60"
      >
        <TextWrapper className="font-IBM_medium text-white text-lg text-center px-2 py-4">
          Set Learning Reminder
        </TextWrapper>
      </TouchableOpacity>

      {hasPickedDate && (
        <View className="bg-white shadow-md rounded-xl p-4 mx-4 mt-4 border border-gray-200">
          <TextWrapper className="text-base font-semibold text-gray-700 text-center mb-1">
            Selected Time:
          </TextWrapper>
          <TextWrapper className="text-lg font-IBM_medium text-center text-customBlue">
            {finalDate.toLocaleString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })}
          </TextWrapper>
          <TouchableOpacity
            onPress={saveLearningTime}
            disabled={isSaving || getIsFinalDateInPastOrNow(finalDate)}
            className={`rounded-lg py-3 px-6 mt-4 self-center w-60 ${
              isSaving || getIsFinalDateInPastOrNow(finalDate) ? 'bg-gray-300' : 'bg-green-600'
            }`}
          >
            <TextWrapper className="text-white text-center text-lg font-semibold text-base">
              {isSaving ? 'Setting Reminder...' : 'Confirm Reminder'}
            </TextWrapper>
          </TouchableOpacity>
        </View>
      )}

      {Platform.OS === 'ios' && showPicker && (
        <Modal transparent animationType="slide">
          <View className="flex-1 justify-end bg-black/30">
            <View className="bg-white pt-2">
              <DateTimePicker
                value={tempDate}
                mode={mode}
                display="spinner"
                onChange={onPickerChange}
              />

              <View className="flex-row justify-end px-8 pb-8">
                <TouchableOpacity onPress={onCancel}>
                  <TextWrapper className="text-red-500 mr-6 text-lg">Cancel</TextWrapper>
                </TouchableOpacity>
                <TouchableOpacity onPress={onConfirm}>
                  <TextWrapper className="font-bold text-blue-500 text-lg">
                    {mode === 'date' ? 'Next' : 'Done'}
                  </TextWrapper>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};
