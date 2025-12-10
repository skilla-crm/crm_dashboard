
const mapFinanceIndicators = (data = []) =>
  data.map((item) => ({
    date: item.date,
    revenue: Number(item.revenue ?? item.indicators?.revenue ?? 0),
    marginalProfit: Number(item.marginal_profit ?? item.indicators?.marginal_profit ?? 0),
    workersSum: Number(item.worker_sum ?? item.indicators?.worker_sum ?? 0),
  }));

export default mapFinanceIndicators;
