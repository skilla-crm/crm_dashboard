const newPerformersData = (data) => {
    // if (!data) return [];

    return [
        {
            title: 'добавлены',
            indicator: 20,
            prevPeriodIndicator: 12,
            increase: 15,
        },
        {
            title: 'отправленых приглашений',
            indicator: 16,
            prevPeriodIndicator: 5,
            increase: 12,
        },
        {
            title: 'прошли регистрацию',
            indicator: 12,
            prevPeriodIndicator: 12,
            increase: -20,
        },
        {
            title: 'вышли на первый заказ',
            indicator: 8,
            prevPeriodIndicator: 4,
            increase: 10,
        },
    ];
};

const buildPerformersInAppData = (data) => {
    // if (!data) return [];
    return [
        {
            title: 'от общего списка',
            indicator: 20,
            prevPeriodIndicator: 15,
            increase: 20,
            isPercent: true,
        },
        {
            title: 'от общего кол-ва исп. на заказах',
            indicator: 75,
            prevPeriodIndicator: 15,
            increase: -30,
            isPercent: true,
        },
    ];
};

export { newPerformersData, buildPerformersInAppData };
