export const getDatePeriodShort = (datePeriod) => {
    if (!datePeriod) {
        return '';
    }

    const periodMap = {
        Неделя: 'прошлой нед.',
        Месяц: 'прошлого мес.',
        'Предыдущий месяц': 'прошлого мес.',
        Квартал: 'прошлого кв.',
        'пред. периода': 'пред. периода',
    };

    return periodMap[datePeriod] || datePeriod;
};
