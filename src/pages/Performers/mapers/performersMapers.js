const newPerformersData = (data) => {
    if (!data || !data.new_performers) return [];

    const newPerformers = data.new_performers;

    return [
        {
            title: 'добавлены',
            indicator: newPerformers.added?.indicator || 0,
            prevPeriodIndicator:
                newPerformers.added?.prev_period_indicator || 0,
            increase: newPerformers.added?.increase || 0,
        },
        {
            title: 'отправленых приглашений',
            indicator: newPerformers.sended?.indicator || 0,
            prevPeriodIndicator:
                newPerformers.sended?.prev_period_indicator || 0,
            increase: newPerformers.sended?.increase || 0,
        },
        {
            title: 'прошли регистрацию',
            indicator: newPerformers.registered?.indicator || 0,
            prevPeriodIndicator:
                newPerformers.registered?.prev_period_indicator || 0,
            increase: newPerformers.registered?.increase || 0,
        },
        {
            title: 'вышли на первый заказ',
            indicator: newPerformers.first_order?.indicator || 0,
            prevPeriodIndicator:
                newPerformers.first_order?.prev_period_indicator || 0,
            increase: newPerformers.first_order?.increase || 0,
        },
    ];
};

const buildPerformersInAppData = (data) => {
    if (!data || !data.app) return [];

    const app = data.app;

    return [
        {
            title: 'от общего списка',
            indicator: app.percent?.indicator || 0,
            prevPeriodIndicator: app.percent?.prev_period_indicator || 0,
            increase: app.percent?.increase || 0,
            isPercent: true,
        },
        {
            title: 'от общего кол-ва исп. на заказах',
            indicator: app.order_worker_percent?.indicator || 0,
            prevPeriodIndicator:
                app.order_worker_percent?.prev_period_indicator || 0,
            increase: app.order_worker_percent?.increase || 0,
            isPercent: true,
        },
    ];
};

export { newPerformersData, buildPerformersInAppData };
