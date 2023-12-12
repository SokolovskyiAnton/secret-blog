export function useDateFormat() {
    const format = (date) => {
        return new Date(date).toUTCString().split(' ').slice(0, 4).join(' ')
	};
	return { format };
}
