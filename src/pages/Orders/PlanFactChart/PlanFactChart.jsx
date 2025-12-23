import s from "../Orders.module.scss";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import EmployeesTooltip from "./ui/EmployeesTooltip";

const seriesLabels = {
  fact: "Фактическая сумма заказов",
  plan: "Плановая сумма заказов",
};

const CustomLegend = ({ payload }) => {
  return (
    <div className={s.legend}>
      {payload.map((item) => (
        <div key={item.dataKey} className={s.legendItem}>
          <span
            className={s.legendIcon}
            style={{ backgroundColor: item.color }}
          />
          <span className={s.legendText}>{item.value}</span>
        </div>
      ))}
    </div>
  );
};

const PlanFactChart = ({ data = [] }) => {
  const chartData = data.map((item) => {
    const date = item.date;
    return {
      date,
      dateLabel: new Date(date).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "short",
      }),
      plan: Number(item.plan),
      fact: Number(item.fact),
    };
  });

  return (
    <div className={s.wrapper}>
      <h3 className={s.title}>План-факт по заказам</h3>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData} barGap={4} barCategoryGap={20}>
          <CartesianGrid
            strokeDasharray="4 4"
            vertical={false}
            stroke="#EAEAEA"
            strokeWidth={1}
          />

          <XAxis
            dataKey="dateLabel"
            tick={{ fill: "#8C8C8C", fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            tick={{ fill: "#8C8C8C", fontSize: 12 }}
            tickFormatter={(v) => `${v / 1000} тыс`}
            tickLine={false}
            axisLine={false}
          />

          <Tooltip
            content={<EmployeesTooltip seriesLabels={seriesLabels} />}
            labelFormatter={(_, payload) => payload?.[0]?.payload?.date}
            cursor={{ fill: "transparent" }}
          />

          <Legend verticalAlign="bottom" content={<CustomLegend />} />

          <Bar
            dataKey="fact"
            name={seriesLabels.fact}
            stackId="a"
            fill="#80DEF1"
            radius={[2, 2, 0, 0]}
            barSize={12}
          />

          <Bar
            dataKey="plan"
            name={seriesLabels.plan}
            shape={(props) => {
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
            }}
            fill="#7499E8"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PlanFactChart;
