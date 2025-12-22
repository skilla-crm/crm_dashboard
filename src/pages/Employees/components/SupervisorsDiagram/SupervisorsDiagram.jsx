import s from "./SupervisorsDiagram.module.scss";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
//components
import FinanceTooltip from "pages/Employees/ui/EmployeesTooltip";
//utils
import { getDateTicks } from "utils/getDataTicks";
import { formatDateRu } from "utils/formatDateRu";

const SupervisorsDiagram = ({ data, series }) => {
  const seriesLabels = Object.fromEntries(
    series.map((item) => [item.key, item.name])
  );
  /*     const yTickFormatter = defaultYAxisFormatter */
  const xTicks = getDateTicks(data);
  const lastTickValue = xTicks[xTicks.length - 1];
  const firstTickValue = xTicks[0];

  const renderCustomTick = ({ x, y, payload }) => {
    const isLast = payload?.value === lastTickValue;
    const isFirst = payload?.value === firstTickValue;
    const shiftLeftPx = 20;

    return (
      <text
        x={isFirst ? x + shiftLeftPx : isLast ? x - shiftLeftPx : x}
        y={y + 12}
        dy={10}
        fill="#71869D"
        fontSize={16}
        fontWeight={400}
        textAnchor="middle"
      >
        {formatDateRu(payload?.value)}
      </text>
    );
  };

  return (
    <div className={s.root}>
      {/*  <ResponsiveContainer
                width="100%"
                height={336}
            > */}
      <BarChart
        style={{
          width: "100%",
          maxHeight: "336px",
          aspectRatio: 1.618,
          outline: "none",
        }}
        responsive
        data={data?.map((el) => {
          return { name: el.date, indicator: el.indicator };
        })}
      >
        <Bar
          dataKey="indicator"
          fill="#80DEF1"
          barSize={20}
          radius={6}
          activeBar={{
            fill: "#80DEF1",
          }}
        />

        <XAxis
          ticks={xTicks}
          interval={0}
          dataKey="name"
          tick={renderCustomTick}
          axisLine={true}
          stroke="#EAEAEA"
          tickLine={false}
        />

        <YAxis
          width={80}
          tickMargin={12}
          tick={{
            fill: "#71869D",
            fontSize: 16,
            fontWeight: 400,
            lineHeight: "16px",
            dx: 0,
            dy: 0,
          }}
          axisLine={false}
          tickLine={false}
        />

        <Tooltip
          cursor={{ fill: "transparent" }}
          content={<FinanceTooltip seriesLabels={seriesLabels} />}
        />

        <CartesianGrid
          strokeDasharray="10 8"
          height={0.5}
          vertical={false}
          stroke="#EAEAEA"
        />
      </BarChart>
      <div className={s.footerDia}>
        <div className={s.footerDiaItem}>
          <div className={s.footerDiaItemDot}></div>

          <div className={s.footerDiaItemTitle}>
            Фактическое кол-во исп. на заказах
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupervisorsDiagram;
