import dayjs from 'dayjs';
import 'dayjs/locale/ru';

export const formatDateToRuLong = (dateString) => {
    if (!dateString) return '—';

    const date = dayjs(dateString.replace(' ', 'T'));
    if (!date.isValid()) return '—';

    return date.locale('ru').format('D MMMM YYYY');
};

export default formatDateToRuLong;
