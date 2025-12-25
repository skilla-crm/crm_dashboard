const PLAN_FACT_SERIES = [
  {
    key: "fact",
    dataKey: "fact",
    color: "#80DEF1",
    name: "Фактическая сумма заказов",
    isSwitch: false,
    type: "bar", // обычный столбец
    stackId: "a",
    radius: [2, 2, 0, 0],
    barSize: 12,
  },
  {
    key: "plan",
    dataKey: "plan",
    color: "#7499E8",
    name: "Плановая сумма заказов",
    isSwitch: false,
    type: "line", // линия отображается как горизонтальная полоса
    shape: "horizontalBar",
  },
];

const CLOSED_ORDERS_SERIES = [
  {
    key: "orders",
    dataKey: "orders",
    color: "#80DEF1",
    name: "Завершенные заказы",
    isSwitch: false,
    type: "bar",
    radius: [2, 2, 0, 0],
    barSize: 12,
  },
];
const PERFORMERS_ON_ORDERS_SERIES = [
  {
    key: "workers_in_orders",
    dataKey: "workers_in_orders",
    color: "#7499E8",
    name: "Исполнители на заказах",
    isSwitch: false,
    type: "bar",
    radius: [2, 2, 0, 0],
    barSize: 12,
  },
];

const addTitlesToProcessOrders = (processOrders) => {
  const map = {
    orders_closed: {
      title: "Завершенные",
      color: "#70E093",
    },
    orders_inwork: {
      title: "В работе",
      color: "#80DEF1",
    },
    orders_canceled: {
      title: "Отмененные",
      color: "#E38888",
    },
  };

  const result = Object.keys(map).reduce((acc, key) => {
    acc[key] = {
      ...(processOrders[key] || { count: 0, percent: 0 }),
      title: map[key]?.title || key,
      color: map[key]?.color || "#ccc",
    };
    return acc;
  }, {});

  const allZero = Object.values(result).every((item) => item.count === 0);
  if (allZero) {
    const firstKey = Object.keys(map)[0];
    return {
      [firstKey]: {
        count: 1,
        percent: 100,
        title: map[firstKey]?.title || firstKey,
        color: "#ECF2FC",
      },
    };
  }

  return result;
};

const addTitlesToPaymentOrders = (paymentOrders) => {
  const map = {
    nal: {
      title: "Наличными",
      color: "#7499E8",
    },
    beznal: {
      title: "Безнал. расчет",
      color: "#A59ADC",
    },
    to_card: {
      title: "На карту",
      color: "#80DEF1",
    },
  };

  const result = Object.keys(map).reduce((acc, key) => {
    acc[key] = {
      ...(paymentOrders[key] || { count: 0, percent: 0 }),
      title: map[key]?.title || key,
      color: map[key]?.color || "#ccc",
    };
    return acc;
  }, {});

  const allZero = Object.values(result).every((item) => item.count === 0);
  if (allZero) {
    const firstKey = Object.keys(map)[0];
    return {
      [firstKey]: {
        count: 1,
        percent: 100,
        title: map[firstKey]?.title || firstKey,
        color: "#ECF2FC",
      },
    };
  }

  return result;
};

export {
  PLAN_FACT_SERIES,
  CLOSED_ORDERS_SERIES,
  PERFORMERS_ON_ORDERS_SERIES,
  addTitlesToProcessOrders,
  addTitlesToPaymentOrders,
};
