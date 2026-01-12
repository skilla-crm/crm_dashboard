const buildSlides = (data = {}) => {
  const { orders = {}, orders_sum = {}, pay_types = {} } = data;

  const {
    indicator: ordersIndicator = 0,
    increase: ordersIncrease = 0,
    orders_details: ordersDetails = {},
  } = orders;

  const {
    closed = {},
    in_progress = {},
    canceled = {},
    drafts = {},
  } = ordersDetails;

  const {
    indicator: ordersSumIndicator = 0,
    increase: ordersSumIncrease,
    orders_details: ordersSumDetails = {},
  } = orders_sum;

  const safeEntries = (obj) =>
    obj && typeof obj === "object" ? Object.entries(obj) : [];

  return [
    {
      title: "Количество заказов",
      indicator: ordersIndicator,
      increase: ordersIncrease,
      reverse: false,
      data: [
        {
          key: "closed",
          name: "Завершены",
          count: closed.count ?? 0,
          percent: closed.percent ?? 0,
          color: "#70E093",
        },
        {
          key: "in_progress",
          name: "В работе",
          count: in_progress.count ?? 0,
          percent: in_progress.percent ?? 0,
          color: "#7499E8",
        },
        {
          key: "canceled",
          name: "Отменены",
          count: canceled.count ?? 0,
          percent: canceled.percent ?? 0,
          color: "#E38888",
        },
        {
          key: "drafts",
          name: "В черновиках",
          count: drafts.count ?? 0,
          percent: drafts.percent ?? 0,
          color: "#C0CADD",
        },
      ],
    },

    {
      title: "Сумма заказов",
      indicator: ordersSumIndicator,
      increase: ordersSumIncrease,
      reverse: false,
      data: safeEntries(ordersSumDetails).map(([key, value = {}]) => ({
        key,
        name:
          key === "closed"
            ? "Завершены"
            : key === "in_progress"
            ? "В работе"
            : key === "canceled"
            ? "Отменены"
            : "В черновиках",
        count: value.count ?? 0,
        percent: value.percent ?? 0,
        color:
          key === "closed"
            ? "#A9F3C5"
            : key === "in_progress"
            ? "#7499E8"
            : key === "canceled"
            ? "#E38888"
            : "#C0CADD",
      })),
    },

    {
      title: "Способ оплаты",
      indicator: null,
      increase: null,
      reverse: false,
      data: safeEntries(pay_types).map(([key, value = {}]) => ({
        key,
        name:
          key === "nal"
            ? "Наличными"
            : key === "beznal"
            ? "Безнал. расчет"
            : "На карту",
        count: value.count ?? 0,
        percent: value.percent ?? 0,
        color:
          key === "nal" ? "#7499E8" : key === "beznal" ? "#A59ADC" : "#C0CADD",
      })),
    },
  ];
};
export default buildSlides;
