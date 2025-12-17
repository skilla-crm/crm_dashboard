const FINANCE_STATISTICS_SERIES = [
  {
    key: "revenue",
    color: "#5CCF9C",
    gradient: ["#70E093", "#7BDCB5"],
    name: "Выручка",
    isSwitch: false,
  },
  {
    key: "marginalProfit",
    color: "#6EC6FF",
    gradient: ["#8ED1FC", "#8ED1FC"],
    name: "Маржинальная прибыль",
    isSwitch: false,
  },
  {
    key: "workersSum",
    color: "#F07167",
    gradient: ["#F4978E", "#F4978E"],
    name: "Выплаты исполнителям",
    isSwitch: false,
  },
];

const TRANSACTION_SERIES = [
  {
    key: "cashlessOrders",
    color: "#5CCF9C",
    gradient: ["#70E093", "#7BDCB5"],
    name: "Входящие",
    isSwitch: false,
  },
  {
    key: "transactionIncome",
    color: "#F07167",
    gradient: ["#F4978E", "#F4978E"],
    name: "Исходящие",
    isSwitch: false,
  },
  {
    key: "transactionOutcome",
    color: "#A59ADC",
    gradient: ["#B8ADEB", "#B8ADEB"],
    name: "Сумма заказов с оплатой на р/с",
    isSwitch: true,
  },
];

const INDICATORS_CONFIG = [
  {
    title: "Выручка",
    dataKey: "revenue",
    reverse: false,
    increaseView: true,
    reverseView: false,
  },
  {
    title: "Упущенная выручка",
    dataKey: "lost_revenue",
    reverse: true,
    increaseView: true,
    reverseView: false,
  },
  {
    title: "Маржинальная прибыль",
    dataKey: "marginal_profit",
    reverse: false,
    increaseView: true,
    reverseView: true,
  },
  {
    title: "Операционная прибыль",
    dataKey: "operating_profit",
    reverse: false,
    increaseView: true,
    reverseView: true,
  },
  {
    title: "Закупки и ручной учет",
    dataKey: "worker_sum",
    reverse: true,
    increaseView: true,
    reverseView: true,
  },
  {
    title: "Прочие расходы",
    dataKey: "other_expenses",
    reverse: false,
    increaseView: true,
    reverseView: true,
  },
  {
    title: "Входящие транзакции",
    dataKey: "transaction_income",
    reverse: (data) =>
      data?.transaction_indicators?.transaction_income?.indicator >
      data?.transaction_indicators?.transaction_income?.prev_period_indicator,
    increaseView: true,
    reverseView: false,
    indicatorFallback: 0,
    increaseFallback: 0,
  },
  {
    title: "Исходящие транзакции",
    dataKey: "transaction_outcome",
    reverse: true,
    increaseView: (data) =>
      data?.transaction_outcome?.increase > data?.transaction_income?.increase,
    reverseView: false,
  },
];

export { FINANCE_STATISTICS_SERIES, TRANSACTION_SERIES, INDICATORS_CONFIG };
