const buildSupervisorData = (data) => {
    if (!data) return [];

    return [
        {
            title: 'план-факт по заказам',
            indicator: Number(data.plan_fact.indicator.toFixed(0)),
            prevPeriodIndicator: Number(
                data.plan_fact.prev_period_indicator.toFixed(0)
            ),
            increase: Number(data.plan_fact.increase.toFixed(0)),
            isPercent: true,
        },
        {
            title: 'комиссии',
            indicator: Number(data.supervisor_sum.indicator.toFixed(0)),
            prevPeriodIndicator: Number(
                data.supervisor_sum.prev_period_indicator.toFixed(0)
            ),
            increase: Number(data.supervisor_sum.increase.toFixed(0)),
        },
    ];
};

export default buildSupervisorData;
