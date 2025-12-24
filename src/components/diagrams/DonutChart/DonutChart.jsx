import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import s from './DonutChart.module.scss';
 const  DonutChart = ({ data }) => {
  console.log('диаграмма', data)
    return (
        <div className={s.root}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={25}
            outerRadius={50}
            paddingAngle={5}
            dataKey="value"
            cornerRadius={4}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
};

export default DonutChart;