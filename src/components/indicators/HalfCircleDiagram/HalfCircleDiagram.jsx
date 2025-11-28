import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import classNames from "classnames";
import s from "./HalfCircleDiagram.module.scss";
import TitleWithLink from "pages/Main/ui/TitleWithLink/TitleWithLink";

const ACTIVE_COLORS = {
  signed: "#A8F0C8",
  sent: "#BFC9FF",
  notSent: "#ECBEBE"
};

const DISABLED_COLORS = {
  signed: "#EFF2F8",
  sent: "#EFF2F8",
  notSent: "#EFF2F8"
};


const HalfCircleDiagram = ({  title = "Закрывающие документы",
    signed = 10,
    sent = 20,
    notSent = 80,
    disabled = false}) => {
  const total = signed + sent + notSent;
  const hasNoData = total === 0;
  
  // Для описания всегда показываем все три элемента
  const legendData = [
    { name: "Подписаны", value: signed, key: "signed" },
    { name: "Отправлены", value: sent, key: "sent" },
    { name: "Не отправлены", value: notSent, key: "notSent" }
  ];
  
  // Для диаграммы если данных нет, показываем один серый сегмент
  const chartData = hasNoData
    ? [{ name: "Нет данных", value: 100, key: "notSent" }]
    : legendData;

  // цвет для диаграммы серые если нет данных или disabled
  const chartColors = (disabled || hasNoData) ? DISABLED_COLORS : ACTIVE_COLORS;
  
  // Цвета для легенды всегда активные (кроме disabled)
  const legendColors = disabled ? DISABLED_COLORS : ACTIVE_COLORS;

  return (
    <div className={s.root}>
    <TitleWithLink title={title}  size="small" withLink={false}/>

      <PieChart width={222} height={90}>
        <Pie
          data={chartData}
          dataKey="value"
          cx="50%"
          cy="100%"
          startAngle={180}
          endAngle={0}
          innerRadius={45}
          outerRadius={80}
          cornerRadius={4}
          paddingAngle={hasNoData ? 0 : 2}
        >
          {chartData.map((entry) => (
            <Cell key={entry.name} fill={chartColors[entry.key]} />
          ))}
        </Pie>
      </PieChart>

      <div className={s.legend}>
        {legendData.map((item) => {
          const percent = total > 0 ? Math.round((item.value / total) * 100) : 0;
          const value = `${item.value} (${percent}%)`;

          return (
            <div
              key={item.key}
              className={classNames(s.legendItem, { [s.disabled]: disabled })}
            >
              <span
                className={s.legendDot}
                style={{ background: legendColors[item.key] }}
              />
              {`${item.name} ${value} `}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default HalfCircleDiagram;