import s from "./FinanceTooltip.module.scss";

const capitalizeFirst = (str) =>
  str ? `${str[0].toUpperCase()}${str.slice(1)}` : "";

const checkShouldShowMonthOnly = (chartData) => {
  if (!chartData?.length) return false;

  const dates = chartData
    .map((item) => item.date)
    .filter(Boolean)
    .map((date) => new Date(date))
    .filter((date) => !isNaN(date.getTime()))
    .sort((a, b) => a - b);

  return dates.some(
    (date, i) => i > 0 && (date - dates[i - 1]) / (1000 * 60 * 60 * 24) > 12
  );
};

const formatTooltipDateParts = (dateStr, showMonthOnly = false) => {
  if (!dateStr) return { dateText: "", weekday: "" };

  const date = new Date(dateStr);
  const locale = "ru-RU";

  if (showMonthOnly) {
    const month = date.toLocaleDateString(locale, { month: "long" });
    return { dateText: capitalizeFirst(month), weekday: "" };
  }

  const dateText = date.toLocaleDateString(locale, {
    day: "2-digit",
    month: "long",
  });
  const weekday = date.toLocaleDateString(locale, { weekday: "long" });

  return { dateText, weekday: capitalizeFirst(weekday) };
};

const formatCurrency = (value) => {
  if (typeof value !== "number") return "—";
  return value.toLocaleString("ru-RU", { maximumFractionDigits: 0 });
};

const FinanceTooltip = ({
  active,
  payload,
  label,
  seriesLabels = {},
  valueFormatter = formatCurrency,
  chartData = [],
}) => {
  if (!active || !payload?.length) return null;

  const shouldShowMonthOnly = checkShouldShowMonthOnly(chartData);
  const dateToFormat = payload[0]?.payload?.date || label;
  const { dateText, weekday } = formatTooltipDateParts(
    dateToFormat,
    shouldShowMonthOnly
  );

  return (
    <div className={s.tooltip}>
      <div className={s.tooltipDate}>
        {dateText}
        {weekday && <span className={s.tooltipDateWeekday}>{weekday}</span>}
      </div>

      <ul className={s.tooltipList}>
        {payload.map((item) => (
          <li key={item.dataKey} className={s.tooltipItem}>
            <div className={s.tooltipItemContent}>
              <div
                className={s.tooltipDot}
                style={{ backgroundColor: item.color }}
              />
              <div className={s.tooltipLabel}>
                {seriesLabels[item.dataKey] || item.name}
              </div>
            </div>
            <div className={s.tooltipValue}>{valueFormatter(item.value)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FinanceTooltip;
