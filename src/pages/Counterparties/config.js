const COUNTERPARTIES_STATISTICS_SERIES = [
    {
        key: 'order_closed_summ',

        color: '#80DEF1',
        name: 'Сумма заказов',
        isSwitch: false,
    },
    {
        key: 'order_created_summ',
        color: '#A59ADC',
        name: 'Сумма завершенных заказов',
        isSwitch: false,
    },
    {
        key: 'transaction_income',
        color: '#70E093',
        name: 'Сумма поступлений на р/с',
        isSwitch: false,
    },
];

const ORDERS_FREQUENCY_SERIES = [
    {
        key: 'orders_freq',
        color: '#80DEF1',
        name: 'Исполнители на заказах',
        isSwitch: true,
    },
    {
        key: 'workers_shift',
        color: '#7499E8',
        name: 'Частота заказов',
        isSwitch: true,
        info: 'Количество закрытых заказов в день',
    },
];

export { COUNTERPARTIES_STATISTICS_SERIES, ORDERS_FREQUENCY_SERIES };
