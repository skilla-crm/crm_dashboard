import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import classNames from "classnames";

import s from "./DonutChart.module.scss";
import Loader from "components/indicators/Indicator/Loader/Loader";

const DonutChart = ({ title, data, isLoading }) => {
  const allData = Object.values(data);
  const chartData = allData.filter((item) => item.count > 0);

  return (
    <div className={s.root}>
      <h3 className={s.title}>{title}</h3>

      <div className={s.chart}>
        <ResponsiveContainer width={146} height={146}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="percent"
              innerRadius={50}
              outerRadius={70}
              paddingAngle={4}
              cornerRadius={4}
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <ul className={s.legend}>
        {allData.map((item, index) => (
          <li key={index} className={s.legendItem}>
            <span className={s.dot} style={{ backgroundColor: item.color }} />
            <span className={s.label}>
              {item.title} {item.count}
              {item.count > 0 && ` (${Math.round(item.percent)}%)`}
            </span>
          </li>
        ))}
      </ul>

      <div className={classNames(s.loader, isLoading && s.loader_load)}>
        <Loader />
      </div>
    </div>
  );
};

export default DonutChart;
