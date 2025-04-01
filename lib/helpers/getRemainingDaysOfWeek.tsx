 export const getRemainingDaysInWeek = (): number => {
  const today = new Date();
  let dayOfWeek = today.getDay();
  dayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
  return 8 - dayOfWeek;
 };