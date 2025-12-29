const COUNTERPARTIES_STATISTICS_SERIES = [
    {
        key: 'ordersSum',
        color: '#80DEF1',
        name: 'Сумма заказов',
        isSwitch: false,
    },
    {
        key: 'completedOrdersSum',
        color: '#A59ADC',
        name: 'Сумма завершенных заказов',
        isSwitch: false,
    },
    {
        key: 'receipts',
        color: '#70E093',
        name: 'Сумма поступлений на р/с',
        isSwitch: false,
    },
];

const ORDERS_FREQUENCY_SERIES = [
    {
        key: 'executorsOnOrders',
        color: '#80DEF1',
        name: 'Исполнители на заказах',
        isSwitch: true,
    },
    {
        key: 'ordersFrequency',
        color: '#7499E8',
        name: 'Частота заказов',
        isSwitch: true,
        info: 'Количество закрытых заказов в день',
    },
];

export { COUNTERPARTIES_STATISTICS_SERIES, ORDERS_FREQUENCY_SERIES };
