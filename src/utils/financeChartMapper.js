export const mapFinanceIndicators = (data = []) =>
    data.map((item) => ({
        date: item.date,
        revenue: Number(item.revenue ?? item.indicators?.revenue ?? 0),
        marginalProfit: Number(
            item.marginal_profit ?? item.indicators?.marginal_profit ?? 0
        ),
        workersSum: Number(item.worker_sum ?? item.indicators?.worker_sum ?? 0),
    }));

export const mapTransactions = (data = []) =>
    data.map((item) => ({
        date: item.date,
        cashlessOrders: Number(item.cashless_orders ?? 0),
        transactionIncome: Number(item.transaction_income ?? 0),
        transactionOutcome: Number(item.transaction_outcome ?? 0),
    }));
