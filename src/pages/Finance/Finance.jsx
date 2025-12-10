import { useState } from 'react';
import s from './Finance.module.scss';
import DateFilter from 'components/filters/DateFilter/DateFilter';
import { ReactComponent as IconBackForward } from 'assets/icons/iconBackForwardBlack.svg';
// api
import { useGetFinanceQuery } from '../../redux/financeApiActions';
// redux
import { useSelector } from 'react-redux';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
  } from 'recharts';
  
import mapFinanceIndicators from '../../utils/financeChartMapper';



export const formatDateRu = (dateStr) => {
    if (!dateStr) return '';
  
    const date = new Date(dateStr);
  
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'short',
    });
  };
  

const getDateTicks = (data, maxTicks = 7) => {
    if (!data.length) return [];
  
    const step = Math.max(1, Math.floor((data.length - 1) / (maxTicks - 1)));
    const ticks = [];
  
    for (let i = 0; i < data.length; i += step) {
      ticks.push(data[i].date);
      if (ticks.length >= maxTicks - 1) break;
    }
  
    const lastDate = data[data.length - 1].date;
    if (ticks[ticks.length - 1] !== lastDate) {
      ticks.push(lastDate);
    }
  
    return ticks.slice(0, maxTicks);
  };
  
  

const Finance = () => {
    const [activeFilter, setActiveFilter] = useState(null);
    const { dateStartPicker, dateEndPicker } = useSelector(
        (state) => state.dateRange || {}
    );

    const params = {
        'filter[date_start]': dateStartPicker,
        'filter[date_end]': dateEndPicker,
    };

    const { data, isLoading } = useGetFinanceQuery(params, {
        skip: !dateStartPicker || !dateEndPicker,
    });

    const clearActiveFilter = () => {
        setActiveFilter(null);
    };

    return (
        <div className={s.root}>
            <header className={s.header}>
                <h2>
                    Дашборд <IconBackForward /> Финансы
                </h2>

                <div className={s.headerBtns}>
                    <DateFilter
                        isFetching={isLoading}
                        setActiveFilter={setActiveFilter}
                        clearActiveFilter={clearActiveFilter}
                    />
                </div>
            </header>
            <main className={s.main}>
                {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
                <FinanceStatistics data={data?.finance_graphics}/>
            </main>
        </div>
    );
};

export default Finance;

const FinanceStatistics = ({ data =[] }) => {
    const chartData = mapFinanceIndicators(data);
    const xTicks = getDateTicks(chartData , 7);


  
    return (
      <div className={s.rootDia}>
        <div className={s.header}>
          
        </div>
  
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="green" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#70E093" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#7BDCB5" stopOpacity={0} />
              </linearGradient>
  
              <linearGradient id="blue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8ED1FC" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#8ED1FC" stopOpacity={0} />
              </linearGradient>
  
              <linearGradient id="red" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F4978E" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#F4978E" stopOpacity={0} />
              </linearGradient>
            </defs>
  
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="#EAEAEA"
            />
  
            <XAxis
              ticks={xTicks}
              interval={0}
              dataKey="date"
              tick={{ fill: '#71869D', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={formatDateRu}
            />

            <YAxis
              tick={{ fill: '#71869D', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) =>
                value === 0 ? '0 тыс' : `${value / 1000} тыс`
              }
            />

  
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#5CCF9C"
              strokeWidth={2}
              fill="url(#green)"
              dot={false}
            />
  
            <Area
              type="monotone"
              dataKey="marginalProfit"
              stroke="#6EC6FF"
              strokeWidth={2}
              fill="url(#blue)"
              dot={false}
            />
  
            <Area
              type="monotone"
              dataKey="workersSum"
              stroke="#F07167"
              strokeWidth={2}
              fill="url(#red)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  
  