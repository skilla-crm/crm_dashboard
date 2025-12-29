export const mapCounterpartiesIndicators = (data = []) =>
    data.map((item) => ({
        date: item.date,
        ordersSum: Number(
            item.orders_sum ?? item.indicators?.orders_sum ?? 0
        ),
        completedOrdersSum: Number(
            item.completed_orders_sum ?? item.indicators?.completed_orders_sum ?? 0
        ),
        receipts: Number(item.receipts ?? item.indicators?.receipts ?? 0),
    }));

