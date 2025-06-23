import { FC, useState } from 'react';
import {
  Platform,
  Modal,
  View,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextWrapper } from '@/components/Layout';

type DateTimeSelectorProps = {
  visible: boolean;
  initialDate: Date;
  onClose: () => void;
  onConfirm: (selectedDate: Date) => void;
};

export const DateTimeSelector: FC<DateTimeSelectorProps> = ({
  visible,
  initialDate,
  onClose,
  onConfirm,
}) => {
  const [tempDate, setTempDate] = useState(initialDate);
  const [mode, setMode] = useState<'date' | 'time'>('date');

  const handleChange = (_: any, selected?: Date) => {
    if (selected) setTempDate(selected);
  };

  const handleConfirm = () => {
    if (mode === 'date') {
      setMode('time');
    } else {
      onConfirm(tempDate);
      resetPicker();
    }
  };

  const handleCancel = () => {
    resetPicker();
    onClose();
  };

  const resetPicker = () => {
    setMode('date');
    setTempDate(initialDate);
  };

  if (!visible) return null;

  if (Platform.OS === 'ios') {
    return (
      <Modal transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/30">
          <View className="bg-white pt-2">
            <DateTimePicker
              value={tempDate}
              mode={mode}
              display="spinner"
              onChange={handleChange}
            />
            <View className="flex-row justify-end px-8 pb-8">
              <TouchableOpacity onPress={handleCancel}>
                <TextWrapper className="text-red-500 mr-6 text-lg">Cancel</TextWrapper>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleConfirm}>
                <TextWrapper className="font-bold text-blue-500 text-lg">
                  {mode === 'date' ? 'Next' : 'Done'}
                </TextWrapper>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
  return (
    <DateTimePicker
      value={tempDate}
      mode="datetime"
      display="default"
      onChange={(e, selectedDate) => {
        if (selectedDate) {
          onConfirm(selectedDate);
        }
        onClose();
      }}
    />
  );
};
