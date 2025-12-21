export const formatDateRu = (dateStr) => {
    if (!dateStr) return '';

    const date = new Date(dateStr);
    const parts = new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'short',
    }).formatToParts(date);

    const day = parts.find((p) => p.type === 'day')?.value;
    const month = parts.find((p) => p.type === 'month')?.value.replace('.', '');

    return [day, month].filter(Boolean).join(' ');
};