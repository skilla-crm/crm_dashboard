import classNames from "classnames";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";

import FinanceTooltip from "../FinanceTooltip/FinanceTooltip";
import s from "./SmoothChart.module.scss";

const LastDot = ({ cx, cy, index, dataLength, strokeColor = "#A59ADC" }) => {
  if (index !== dataLength - 1) return null;

  return (
    <circle
      cx={cx}
      cy={cy}
      r={5}
      fill="#FFFFFF"
      stroke={strokeColor}
      strokeWidth={3}
      pointerEvents="none"
    />
  );
};

const SmoothChart = ({
  data,
  width = "100%",
  height = 142,
  className,
  strokeColor = "#A59ADC",
  gradientStartColor = "#8B7CF6",
  gradientEndColor = "#A59ADC",
  dotStrokeColor = "#A59ADC",

  tooltipValueFormatter,
  dataKey = "revenue",
  title,
}) => {
  const chartData = data && data.length ? data : [];
  const gradientId = `chartGradient-${Math.random().toString(36).substr(2, 9)}`;

  const seriesLabelsMap = { [dataKey]: title };

  return (
    <div
      className={classNames(s.wrapper, className)}
      style={{ width, height }}
      tabIndex={-1}
      onMouseDown={(e) => e.preventDefault()}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 8, right: 20, bottom: 12, left: 0 }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={gradientStartColor}
                stopOpacity={0.4}
              />
              <stop
                offset="100%"
                stopColor={gradientEndColor}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={strokeColor}
            strokeWidth={3}
            fill={`url(#${gradientId})`}
            dot={(props) => (
              <LastDot
                {...props}
                dataLength={chartData.length}
                strokeColor={dotStrokeColor}
              />
            )}
            activeDot={false}
          />

          <Tooltip
            content={
              <FinanceTooltip
                seriesLabels={seriesLabelsMap}
                valueFormatter={tooltipValueFormatter}
                chartData={chartData}
              />
            }
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SmoothChart;
