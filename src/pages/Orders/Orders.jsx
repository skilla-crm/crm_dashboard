import s from './Orders.module.scss';
import FiltersContainer from 'components/filters/FiltersContainer/FiltersContainer';
import { ReactComponent as IconBackForward } from 'assets/icons/iconBackForwardBlack.svg';
// api
import { useGetOrdersQuery } from '../../redux/ordersApiActions';
// redux
import { useSelector } from 'react-redux';
// hooks
import { useDashboardNavigation } from 'hooks/useDashboardNavigation';

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
} from 'recharts';

const Orders = () => {
    const { dateStartPicker, dateEndPicker } = useSelector(
        (state) => state.dateRange || {}
    );
    const selectedPartnerships = useSelector(
        (state) => state.companies?.selectedPartnerships || []
    );
    const handleDashboardClick = useDashboardNavigation();

    const params = {
        'filter[date_start]': dateStartPicker,
        'filter[date_end]': dateEndPicker,
        'filter.partnership_id': selectedPartnerships,
    };

    const { data, isLoading, isFetching } = useGetOrdersQuery(params, {
        skip: !dateStartPicker || !dateEndPicker,
    });

    return (
        <div className={s.root}>
            <header className={s.header}>
                <h2>
                    <span 
                        onClick={handleDashboardClick}
                        style={{ cursor: "pointer" }}
                    >
                        Дашборд
                    </span>{" "}
                    <IconBackForward />{" "}
                    Заказы
                </h2>
                <div className={s.headerBtns}>
                    <FiltersContainer isFetching={isFetching} isLoading={isLoading} />
                </div>
            </header>
            <main className={s.main}>
                {/* <PlanFactChart graph_plan_fact={data?.graph_plan_fact} /> */}
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </main>
        </div>
    );
};

export default Orders;

const PlanFactChart = ({ graph_plan_fact }) => {
    const data = graph_plan_fact.map((item) => ({
        date: new Date(item.date).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'short',
        }),
        plan: item.plan,
        fact: Number(item.fact),
    }));

    return (
        <div className={s.wrapper}>
            <h3 className={s.title}>План-факт по заказам</h3>

            <ResponsiveContainer
                width="100%"
                height={280}
            >
                <BarChart
                    data={data}
                    barGap={4}
                    barCategoryGap={20}
                >
                    <CartesianGrid
                        strokeDasharray="4 4"
                        vertical={false}
                    />

                    <XAxis
                        dataKey="date"
                        tick={{ fill: '#8C8C8C', fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                    />

                    <YAxis
                        tick={{ fill: '#8C8C8C', fontSize: 12 }}
                        tickFormatter={(v) => `${v / 1000} тыс`}
                        tickLine={false}
                        axisLine={false}
                    />

                    <Tooltip
                        formatter={(value) => value.toLocaleString('ru-RU')}
                        labelFormatter={(label) => `Дата: ${label}`}
                    />

                    <Legend
                        verticalAlign="bottom"
                        height={30}
                    />

                    <Bar
                        dataKey="fact"
                        name="Фактическая сумма заказов"
                        stackId="a"
                        fill="#80DEF1"
                        radius={[2, 2, 0, 0]}
                        barSize={12}
                    />

                    <Bar
                        dataKey="plan"
                        name="Плановая сумма заказов"
                        stackId={undefined}
                        shape={(props) => {
                            const { x, y, width, height, fill } = props;
                            const barWidth = 12;
                            const barHeight = 4;
                            return (
                                <rect
                                    x={x + width / 2}
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
