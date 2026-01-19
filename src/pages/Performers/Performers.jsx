import s from './Performers.module.scss';
import FiltersContainer from 'components/filters/FiltersContainer/FiltersContainer';
import { ReactComponent as IconBackForward } from 'assets/icons/iconBackForwardBlack.svg';
import { useDashboardNavigation } from 'hooks/useDashboardNavigation';

import NestedDonutChart from './components/NestedDonutChart/NestedDonutChart';
import CounterpartiesDiagram from './components/CounterpartiesDiagram/CounterpartiesDiagram';
import { useGetPerformersQuery } from '../../redux/performersApiActions';
import {
    newPerformersData,
    buildPerformersInAppData,
} from './mapers/performersMapers';
import IndicatorWithPoints from 'components/indicators/IndicatorWithPoints/IndicatorWithPoints';
import { useSelector } from 'react-redux';
import { getDatePeriodShort } from 'utils/datePeriodMap';
import { PERFORMERS_STATISTICS_SERIES } from './config';

// преобразование данных для графика так как с бэка приходят 2 массива
const transformGraphicsData = (graphics) => {
    if (!graphics) return [];

    const dateMap = new Map();

    (graphics.sended_invitation || []).forEach((item) => {
        if (!dateMap.has(item.date)) {
            dateMap.set(item.date, {
                date: item.date,
                invitations: 0,
                registrations: 0,
            });
        }
        dateMap.get(item.date).invitations = item.count || 0;
    });

    (graphics.registered || []).forEach((item) => {
        if (!dateMap.has(item.date)) {
            dateMap.set(item.date, {
                date: item.date,
                invitations: 0,
                registrations: 0,
            });
        }
        dateMap.get(item.date).registrations = item.count || 0;
    });

    return Array.from(dateMap.values()).sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );
};

const Performers = () => {
    const { dateStartPicker, dateEndPicker, datePeriod } = useSelector(
        (state) => state.dateRange || {}
    );
    const selectedPartnerships = useSelector(
        (state) => state.companies?.selectedPartnerships || []
    );
    const handleDashboardClick = useDashboardNavigation();
    const prevPeriod = getDatePeriodShort(datePeriod);

    console.log(selectedPartnerships);
    const params = {
        'filter[date_start]': dateStartPicker,
        'filter[date_end]': dateEndPicker,
        'filter[partnership_id]': selectedPartnerships,
    };

    const { data, isLoading, error, isFetching } = useGetPerformersQuery(
        params,
        {
            skip: !dateStartPicker || !dateEndPicker,
        }
    );

    return (
        <div className={s.root}>
            <header className={s.header}>
                <h2>
                    <span
                        onClick={handleDashboardClick}
                        style={{ cursor: 'pointer' }}
                    >
                        Дашборд
                    </span>{' '}
                    <IconBackForward /> Исполнители
                </h2>
                <div className={s.headerBtns}>
                    <FiltersContainer />
                </div>
            </header>
            <main className={s.main}>
                <div className={s.column}>
                    <CounterpartiesDiagram
                        height={310}
                        data={transformGraphicsData(data?.graphics)}
                        title="Статистика по исполнителям"
                        isLoading={isLoading || isFetching}
                        series={PERFORMERS_STATISTICS_SERIES}
                    />
                </div>
                <div className={s.column}>
                    <NestedDonutChart
                        data={data?.chart}
                        isLoading={isLoading || isFetching}
                    />
                </div>
                <div className={s.column}>
                    <IndicatorWithPoints
                        data={newPerformersData(data)}
                        title="Новые исполнители"
                        isLoading={isLoading || isFetching}
                        prevPeriod={prevPeriod}
                    />
                    <IndicatorWithPoints
                        data={buildPerformersInAppData(data)}
                        title="Исполнители с приложением"
                        isLoading={isLoading || isFetching}
                        prevPeriod={prevPeriod}
                    />
                </div>
            </main>
        </div>
    );
};

export default Performers;
