const grid = [
    {
        indicator: 'FINANCE',
        disabled: false,
        blocks: [
            {
                indicator: 'FINANCE_DIAGRAM',
                size: 8,
                disabled: true,
                data: {},
            },
            {
                indicator: 'FINANCE_TRANSACTION_INCOME',
                size: 4,
                disabled: false,
                data: {},
            },
            {
                indicator: 'FINANCE_REVENUE',
                disabled: false,
                data: {},
                size: 2,
            },
            {
                indicator: 'FINANCE_EXPENSES',
                size: 2,
                disabled: false,
                data: {},
            },
            {
                indicator: 'FINANCE_PAYMENTS_WORKER',
                size: 2,
                disabled: false,
                data: {},
            },
            {
                indicator: 'FINANCE_LOST_REVENUE',
                size: 2,
                disabled: false,
                data: {},
            },
        ],
    },
    {
        indicator: 'ADVERTISING',
        disabled: true,
        blocks: [
            {
                indicator: 'ADVERTISING_AVERAGE_PRICE_CLICK',
                size: 2,
                disabled: false,
                data: {},
            },
            {
                indicator: 'ADVERTISING_AVERAGE_PRICE_ORDER',
                size: 2,
                disabled: false,
                data: {},
            },
            {
                indicator: 'ADVERTISING_AVERAGE_PRICE_CALL',
                size: 2,
                disabled: false,
                data: {},
            },
            {
                indicator: 'ADVERTISING_CTR',
                size: 2,
                disabled: false,
                data: {},
            },
        ],
    },
    {
        indicator: 'ORDERS',
        blocks: [
            {
                indicator: 'QUANTITY_ORDERS',
                size: 2,
                disabled: true,
                data: {},
            },
            {
                indicator: 'SUM_ORDERS',
                size: 2,
                disabled: true,
                data: {},
            },
            {
                indicator: 'PAY_TYPES',
                size: 2,
                disabled: true,
                data: {},
            },
        ],
    },
    {
        indicator: 'COUNTERPARTIES',
        disabled: true,
        blocks: [
            {
                indicator: 'COUNTERPARTIES_DEBTS',
                size: 2,
                disabled: true,
                data: {},
            },
            {
                indicator: 'CLOSING_DOCS',
                size: 2,
                disabled: true,
                data: {},
            },
        ],
    },
    {
        indicator: 'FORECAST',
        disabled: true,
        blocks: [
            {
                indicator: 'MARGINAL_PROFIT',
                disabled: true,
                data: {},
                type_block: 3,
            },
            {
                indicator: 'OPERATION_PROFIT',
                disabled: true,
                data: {},
                type_block: 3,
            },
            {
                indicator: 'REVENUE',
                disabled: true,
                data: {},
                type_block: 3,
            },
            {
                indicator: 'ORDERS_COUNT',
                disabled: true,
                data: {},
                type_block: 3,
            },
            {
                indicator: 'PAYMENTS_TO_PERFORMERS',
                disabled: true,
                data: {},
                type_block: 3,
            },
            {
                indicator: 'PURCHASES_AND_ACCOUNTING',
                disabled: true,
                data: {},
                type_block: 3,
            },
        ],
    },
    {
        indicator: 'EMPLOYEES',
        disabled: true,
        size: 4,
        data: {},
    },
    {
        indicator: 'PERFORMERS',
        disabled: true,
        size: 4,
        data: {},
    },
];
