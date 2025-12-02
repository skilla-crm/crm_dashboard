import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
    LabelList
  } from "recharts"

import s from './FinanceDiagram.module.scss';
const data = [
    {
      name: "Выручка",
      total: 1500000,
      main: 1500000
    },
    {
      name: "Маржинальная прибыль",
      total: 1500000,
      margin: 1300000,
      payments: 200000
    },
    {
      name: "Операционная прибыль",
      total: 1500000,
      profit: 1000000,
      purchases: 200000,
      manual: 300000
    }
  ]
  

  
const FinanceDiagram = () => {
    return (
      <div className={s.root}>
  
        {/* ВЫРУЧКА */}
        <Block
          title="Выручка"
          value="1 500 000"
          bars={[
            { dataKey: "main", color: "#B9F5CE" }
          ]}
          data={[data[0]]}
        />
  
        {/* МАРЖИНАЛЬНАЯ ПРИБЫЛЬ */}
        <Block
          title="Маржинальная прибыль"
          value="1 300 000"
          bars={[
            { dataKey: "margin", color: "#B9F5CE" },
            { dataKey: "payments", color: "#F6CACA", label: "Выплаты исполнителям" }
          ]}
          data={[data[1]]}
        />
  
        {/* ОПЕРАЦИОННАЯ ПРИБЫЛЬ */}
        <Block
          title="Операционная прибыль"
          value="1 000 000"
          bars={[
            { dataKey: "profit", color: "#B9F5CE" },
            { dataKey: "purchases", color: "#FFE7A3", label: "Закупки" },
            { dataKey: "manual", color: "#F6CACA", label: "Ручной учет" }
          ]}
          data={[data[2]]}
        />
  
      </div>
    )
};

export default FinanceDiagram;



const Block = ({ title, value, bars, data }) => {
    return (
      <div className={s.block}>
  
        {/* заголовки слева */}
        <div className={s.blockInfo}>
          <div className={s.blockTitle}>{title}</div>
          <div className={s.blockValue}>{value}</div>
        </div>
  
        {/* столбцы  диаграммы */}
        <div className={s.blockChart}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={data}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <XAxis type="number" hide />
              <YAxis type="category" hide />
  
              {bars.map((bar, index) => (
                <Bar
                  key={bar.dataKey}
                  dataKey={bar.dataKey}
                  stackId="a"
                  fill={bar.color}
                  radius={[
                    index === 0 ? 10 : 0,
                    index === bars.length - 1 ? 10 : 0,
                    index === bars.length - 1 ? 10 : 0,
                    index === 0 ? 10 : 0
                  ]}
                >
                  {bar.label && (
                    <LabelList
                      dataKey={bar.dataKey}
                      position="insideRight"
                      formatter={() => bar.label}
                      style={{ fill: "#222", fontSize: 12 }}
                    />
                  )}
                </Bar>
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
  
      </div>
    )
};
  