const buildOperatorsData = (data) => {
    if (!data) return [];

    return [
        {
            title: 'добавлено контрагентов',
            indicator: Number(data.counterparties_count.indicator.toFixed(0)),
            prevPeriodIndicator: Number(
                data.counterparties_count.prev_period_indicator.toFixed(0)
            ),
            increase: Number(data.counterparties_count.increase.toFixed(0)),
        },
        {
            title: 'добавлено заказов',
            indicator: Number(data.orders_count.indicator.toFixed(0)),
            prevPeriodIndicator: Number(
                data.orders_count.prev_period_indicator.toFixed(0)
            ),
            increase: Number(data.orders_count.increase.toFixed(0)),
        },
        {
            title: 'сумма добавленых заказов',
            indicator: Number(data.orders_summ.indicator.toFixed(1)),
            prevPeriodIndicator: Number(
                data.orders_summ.prev_period_indicator.toFixed(0)
            ),
            increase: Number(data.orders_summ.increase.toFixed(0)),
        },
    ];
};

export default buildOperatorsData;
