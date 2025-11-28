import DonutChart from 'components/indicators/DonutChart/DonutChart';
import s from './CardSlider.module.scss';

const CardSlider = ({ title, total, change, data }) => {
    return (
      <div className={s.root}>
  
       <div className={s.chartContainer}>
         {/* левая чать  диаграмма */}
        <div className={s.chart}>
          <DonutChart data={data} />
        </div>
  
        {/* правая часть  данные */}
        <div className={s.data}>
  
          <div className={s.title}>{title}</div>
  
          {total && (
            <div className={s.totalRow}>
              <div className={s.totalValue}>{total}</div>
              {change && (
                <span className={s.change}>↑ {change}%</span>
              )}
            </div>
          )}
  
          <div className={s.list}>
            {data.map((item, i) => {
              const sum = data.reduce((a, b) => a + b.value, 0)
              const percent = Math.round((item.value / sum) * 100)
  
              return (
                <div key={i} className={s.listItem}>
                  <span
                    className={s.dot}
                    style={{ background: item.color }}
                  />
                  <p>
                    {item.name} {item.value} ({percent}%)
                  </p>
                </div>
              )
            })}
          </div>
  
        </div></div>
      </div>
    )
  };

  export default CardSlider;
  