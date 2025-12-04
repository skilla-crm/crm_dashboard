const data = {
    success: true,
    data: {
        finance: {
            orders: {
                indicator: 63,
                prev_period_indicator: 58,
                increase: 7.94,
            },
            revenue: {
                indicator: 314482.28,
                prev_period_indicator: 384420.36,
                increase: 81.81,
            },
            costs: {
                total: {
                    indicator: 132864.25,
                    prev_period_indicator: 463159.25,
                    increase: -248.6,
                },
                purchase: {
                    indicator: 0,
                    prev_period_indicator: 0,
                    increase: 0,
                },
                worker_sum: {
                    indicator: 132864.25,
                    prev_period_indicator: 463159.25,
                    increase: -248.6,
                },
            },
            profit: {
                revenue: {
                    indicator: 314482.28,
                    prev_period_indicator: 384420.36,
                    increase: 81.81,
                },
                marginal_profit: {
                    indicator: 181618.03,
                    prev_period_indicator: -78738.89,
                    increase: 143.35,
                },
                operating_profit: {
                    indicator: 181618.03,
                    prev_period_indicator: -78738.89,
                    increase: 143.35,
                },

                //числа и зеленый столбец
                payments_worker: {
                    indicator: 132864.25,
                    prev_period_indicator: 463159.25,
                    increase: -248.6,
                },
                payments_deal: {
                    indicator: 0,
                    prev_period_indicator: 0,
                    increase: 0,
                },
                purchases: {
                    indicator: 0,
                    prev_period_indicator: 0,
                    increase: 0,
                },
                manual_accounting: {
                    indicator: 0,
                    prev_period_indicator: 0,
                    increase: 0,
                },
            },
            transactions_income: {
                indicator: 471559.2,
                prev_period_indicator: 10800,
                increase: 97.71,
                last_transactions_income: [
                    {
                        id: 1629119,
                        type: 'income',
                        company_name: 'ИП Филимонова Виктория Валерьевна',
                        sum: '4900.00',
                        date: '2025-12-03',
                    },
                    {
                        id: 1629111,
                        type: 'income',
                        company_name: 'ООО "СК "ИНТЕГРА"',
                        sum: '75000.00',
                        date: '2025-12-03',
                    },
                    {
                        id: 1629117,
                        type: 'income',
                        company_name: 'ГАУЗ ККДЦ ИМЕНИ И.А. КОЛПИНСКОГО',
                        sum: '16575.00',
                        date: '2025-12-03',
                    },
                    {
                        id: 1629118,
                        type: 'income',
                        company_name: 'ГАУЗ ККДЦ ИМЕНИ И.А. КОЛПИНСКОГО',
                        sum: '17700.00',
                        date: '2025-12-03',
                    },
                ],
            },
            transactions_outcome: {
                indicator: 498924.06,
                prev_period_indicator: 433793.91,
                increase: 115.01,
                last_transactions_outcome: [
                    {
                        id: 1629114,
                        type: 'outcome',
                        company_name: 'ИП Осадчий Евгений Гаврилович',
                        sum: '10000.00',
                        date: '2025-12-03',
                    },
                    {
                        id: 1629121,
                        type: 'outcome',
                        company_name: 'ООО "СКИЛЛА ИННОВАЦИИ"',
                        sum: '95000.00',
                        date: '2025-12-03',
                    },
                    {
                        id: 1629122,
                        type: 'outcome',
                        company_name: 'ООО "СКИЛЛА ИННОВАЦИИ"',
                        sum: '83000.00',
                        date: '2025-12-03',
                    },
                    {
                        id: 1629124,
                        type: 'outcome',
                        company_name: 'ООО "Банк Точка"',
                        sum: '3500.00',
                        date: '2025-12-03',
                    },
                ],
            },
            payment_workers: {
                indicator: 132864.25,
                prev_period_indicator: 463159.25,
                increase: -248.6,
            },
            payments_worker_smz: {
                indicator: 0,
                prev_period_indicator: 0,
                increase: 0,
            },
            lost_revenue: {
                indicator: 20280,
                prev_period_indicator: 18200,
                increase: 10.26,
            },
            cost_total: {
                indicator: 132864.25,
                prev_period_indicator: 463159.25,
                increase: -248.6,
            },
        },
        forecasting: {
            orders_count: {
                indicator: 515,
            },
            revenue: {
                indicator: 1886137.91,
            },
            expenses_costs: {
                indicator: 1155425.99,
            },
            permanent_costs: {
                indicator: 0,
            },
            marginal_profit: {
                indicator: 730711.92,
            },
            operating_profit: {
                indicator: 730711.92,
            },
        },
        orders: {
            total: {
                indicator: 81,
                prev_period_indicator: 65,
                increase: 19.75,
            },
            orders_detail: {
                closed: {
                    count: 63,
                    percent: 77.778,
                },
                in_progress: {
                    count: 10,
                    percent: 12.346,
                },
                canceled: {
                    count: 6,
                    percent: 7.407,
                },
                drafts: {
                    count: 2,
                    percent: 2.469,
                },
            },
            orders_sum: {
                total: {
                    indicator: 350862.28,
                    prev_period_indicator: 405020.36,
                    increase: -15.44,
                },
                orders_details: {
                    closed: {
                        count: 314482.28,
                        percent: 89.631,
                    },
                    in_progress: {
                        count: 16100,
                        percent: 4.589,
                    },
                    canceled: {
                        count: 16080,
                        percent: 4.583,
                    },
                    drafts: {
                        count: 4200,
                        percent: 1.197,
                    },
                },
            },
            pay_types: {
                beznal: {
                    count: 0,
                    percent: 0,
                },
                nal: {
                    count: 67,
                    percent: 82.716,
                },
                to_card: {
                    count: 14,
                    percent: 17.284,
                },
            },
            orders_with_app_worker: {
                indicator: 90.48,
                prev_period_indicator: 96.55,
                increase: -6.72,
            },
        },
        employees: {
            plan_fact: {
                indicator: 2.28,
                prev_period_indicator: 2.71,
                increase: -19.08,
            },
            supervisor_sum: {
                indicator: 10534.75,
                prev_period_indicator: 10534.75,
                increase: 0,
            },
            operator: {
                indicator: 63,
                prev_period_indicator: 58,
                increase: 7.94,
            },
        },
        performers: {
            new: {
                invitations: {
                    indicator: 1,
                    prev_period_indicator: 0,
                    increase: 0,
                },
                added: {
                    indicator: 7,
                    prev_period_indicator: 0,
                    increase: 0,
                },
                registered: {
                    indicator: 7,
                    prev_period_indicator: 2,
                    increase: 71.43,
                },
            },
            app: {
                total_percentage_workers: {
                    indicator: 41.23,
                    prev_period_indicator: 41.23,
                    increase: 0,
                },
                total_percentage_order_workers: {
                    indicator: 93.15,
                    prev_period_indicator: 98.28,
                    increase: -5.5,
                },
            },
        },
        counterparties: {
            debt_to_us: 1099512.81,
            our_debt: 203472.13,
            docs: {
                send: {
                    count: 22,
                    percent: 95.652,
                },
                sign: {
                    count: 0,
                    percent: 0,
                },
                not_send: {
                    count: 0,
                    percent: 0,
                },
            },
        },
        grids_list: [
            {
                indicator: 'FINANCE',
                blocks: [
                    {
                        indicator: 'ORDERS',
                        type_block: 3,
                    },
                    {
                        indicator: 'REVENUE',
                        type_block: 3,
                    },
                    {
                        indicator: 'COSTS',
                        type_block: 3,
                    },
                    {
                        indicator: 'PAYMENTS_WORKER',
                        type_block: 1,
                    },
                    {
                        indicator: 'PAYMENT_WORKER_SMZ',
                        type_block: 1,
                    },
                    {
                        indicator: 'CONTRIBUTION_MARGIN',
                        type_block: 1,
                    },
                    {
                        indicator: 'OPERATION_INCOME',
                        type_block: 1,
                    },
                    {
                        indicator: 'LOST_REVENUE',
                        type_block: 3,
                    },
                    {
                        indicator: 'TRANSACTION_INCOME',
                        type_block: 2,
                    },
                    {
                        indicator: 'TRANSACTION_OUTCOME',
                        type_block: 2,
                    },
                ],
            },
        ],
        grid: [],
    },
    message: 'Data loaded successfully!',
};
