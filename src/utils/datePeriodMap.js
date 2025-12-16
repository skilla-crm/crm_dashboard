export const getDatePeriodShort = (datePeriod) => {
    if (!datePeriod) {
        return '';
    }

    const periodMap = {
        Неделя: 'пред. нед.',
        Месяц: 'пред. мес.',
        'Предыдущий месяц': 'пред. мес.',
        Квартал: 'пред. кв-л',
        'пред. периода': 'пред. периода',
    };

    return periodMap[datePeriod] || datePeriod;
};
