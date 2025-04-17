import { FC, useState } from "react";
import { PorchCalendarProps } from "@/types/PorchTypes";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";

export const UserCalendar: FC<PorchCalendarProps> = ({ learningDates }) => {
 const [selectedMonth, setSelectedMonth] = useState<number>(
  new Date().getMonth() + 1
 );
 const [selectedYear, setSelectedYear] = useState<number>(
  new Date().getFullYear()
 );

 const getMarkedDates = () => {
  const markedDates: { [key: string]: { marked: boolean; dotColor?: string } } =
   {};
  learningDates.forEach((ld) => {
   const [year, month, day] = ld.date.split("-").map(Number);
   if (year === selectedYear && month === selectedMonth) {
    markedDates[ld.date] = {
     marked: true,
     dotColor: ld.count === 1 ? "green" : "blue",
    };
   }
  });

  return markedDates;
 };

 return (
  <View className="rounded-lg">
   <Calendar
    monthFormat={"MMMM yyyy"}
    onMonthChange={(month: any) => {
     setSelectedMonth(month.month);
     setSelectedYear(month.year);
    }}
    markedDates={getMarkedDates()}
    theme={{

     selectedDayBackgroundColor: "#3498db",
     todayTextColor: "#e74c3c",
     arrowColor: "#3498db",
     textMonthFontWeight: "bold",
    }}
    className="rounded-lg shadow-md"
   />
  </View>
 );
};
