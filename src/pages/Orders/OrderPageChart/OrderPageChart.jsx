import s from "./OrderPageChart.module.scss";
import classNames from "classnames";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import EmployeesTooltip from "./ui/EmployeesTooltip";
import { getDateTicks } from "utils/getDataTicks";
import { formatDateRu } from "utils/formatDateRu";
import Loader from "components/indicators/Indicator/Loader/Loader";

const OrderPageChart = ({
  data = [],
  series = [],
  title = "",
  dateKey = "date",
  yAxisFormatter = (v) => `${v / 1000} тыс`,
  valueFormatter,
  height = 220,
  maxXTicks = 7,
  xTickFormatter = formatDateRu,
  isLoading,
}) => {
  const seriesLabels = series.reduce((acc, item) => {
    acc[item.dataKey] = item.name;
    return acc;
  }, {});

  const chartData = data.map((item) => {
    const date = item[dateKey];
    const transformedItem = {
      date,
      dateLabel: new Date(date).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "short",
      }),
    };

    series.forEach((serie) => {
      const value = item[serie.dataKey];
      transformedItem[serie.dataKey] =
        value !== undefined && value !== null ? Number(value) : 0;
    });

    return transformedItem;
  });

  const xTicks = getDateTicks(chartData, maxXTicks);
  const lastTickValue = xTicks[xTicks.length - 1];
  const firstTickValue = xTicks[0];
  const lastTickIndex = xTicks.length - 1;
  const lastDataDate =
    chartData.length > 0 ? chartData[chartData.length - 1]?.date : null;

  const renderCustomTick = ({ x, y, payload, index }) => {
    const currentValue = payload?.value;
    const tickIndex =
      index !== undefined
        ? index
        : xTicks.findIndex((tick) => String(tick) === String(currentValue));
    const isLast =
      tickIndex === lastTickIndex ||
      String(currentValue) === String(lastTickValue) ||
      String(currentValue) === String(lastDataDate);
    const isFirst =
      tickIndex === 0 || String(currentValue) === String(firstTickValue);
    const shiftLeftPx = 20;
    const shiftRightPx = 20;

    return (
      <text
        x={isLast ? x - shiftRightPx : isFirst ? x + shiftLeftPx : x}
        y={y + 12}
        dy={10}
        fill="#71869D"
        fontSize={16}
        fontWeight={400}
        textAnchor="middle"
      >
        {xTickFormatter(payload?.value)}
      </text>
    );
  };

  const renderHorizontalBarShape = (props) => {
    const { x, y, fill } = props;
    const barWidth = 12;
    const barHeight = 4;
    return (
      <rect
        x={x - 16}
        y={y - barHeight / 2}
        width={barWidth}
        height={barHeight}
        fill={fill}
        rx={2}
      />
    );
  };

  return (
    <div className={s.rootDia}>
      {title && (
        <div className={s.headerDia}>
          <h4 className={s.headerTitle}>{title}</h4>
        </div>
      )}

      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={chartData}
          barGap={4}
          barCategoryGap={20}
          margin={{ left: 10, right: 10, top: 10, bottom: 10 }}
        >
          <CartesianGrid
            strokeDasharray="10 8"
            height={0.5}
            vertical={false}
            stroke="#EAEAEA"
          />

          <XAxis
            ticks={xTicks}
            interval={0}
            dataKey="date"
            tick={renderCustomTick}
            axisLine={true}
            stroke="#EAEAEA"
            tickLine={false}
          />

          <YAxis
            width={100}
            tickMargin={12}
            tick={{
              fill: "#71869D",
              fontSize: 16,
              fontWeight: 400,
              lineHeight: "16px",
            }}
            axisLine={false}
            tickLine={false}
            tickFormatter={yAxisFormatter}
            allowDecimals={false}
          />

          <Tooltip
            content={
              <EmployeesTooltip
                seriesLabels={seriesLabels}
                valueFormatter={valueFormatter}
              />
            }
            labelFormatter={(_, payload) => payload?.[0]?.payload?.date}
            cursor={{ fill: "transparent" }}
          />

          {series.map((serie) => (
            <Bar
              key={serie.key}
              dataKey={serie.dataKey}
              name={serie.name}
              fill={serie.color}
              stackId={serie.stackId}
              radius={serie.radius}
              barSize={serie.barSize || 12}
              shape={
                serie.shape === "horizontalBar"
                  ? renderHorizontalBarShape
                  : undefined
              }
            />
          ))}
        </BarChart>
      </ResponsiveContainer>

      <div className={s.footerDia}>
        {series.map((item) => (
          <div key={item.key || item.dataKey} className={s.footerDiaItem}>
            <div
              className={s.footerDiaItemDot}
              style={{
                backgroundColor: item.color,
              }}
            ></div>
            <div className={s.footerDiaItemTitle}>{item.name}</div>
          </div>
        ))}
      </div>

      <div className={classNames(s.loader, isLoading && s.loader_load)}>
        <Loader />
      </div>
    </div>
  );
};

export default OrderPageChart;
