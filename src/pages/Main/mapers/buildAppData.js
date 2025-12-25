const buildAppData = (data = {}) => {
    const config = {
        registered_percent: 'прошли регистрацию',
        smz_percent: 'оформили самозанятость',
        completed_order_percent: 'выполнили заказ',
        smz_pay_percent: 'оплата СМЗ',
        autoselect_orders_percent: 'заказов с автоподбором'
    };

    return Object.entries(config).map(([key, title]) => {
        const item = data[key] ?? {};

        return {
            key,
            title,
            indicator: item.indicator ?? 0,
            increase: item.increase ?? 0,
            prev_period_indicator: item.prev_period_indicator ?? 0,
            isPercent: true,
            progress: true,
        };
    });
};

export default buildAppData;
