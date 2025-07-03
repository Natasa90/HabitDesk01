export const getIsFinalDateInPastOrNow = (date: Date) => {
	const now = new Date();
	const trimmedNow = new Date(now);
	trimmedNow.setSeconds(0, 0);
	const trimmedDate = new Date(date);
	trimmedDate.setSeconds(0, 0);
	return trimmedDate.getTime() <= trimmedNow.getTime();
};