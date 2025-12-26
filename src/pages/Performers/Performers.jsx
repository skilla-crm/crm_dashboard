import s from './Performers.module.scss';
import FiltersContainer from 'components/filters/FiltersContainer/FiltersContainer';
import { ReactComponent as IconBackForward } from 'assets/icons/iconBackForwardBlack.svg';
import { useDashboardNavigation } from 'hooks/useDashboardNavigation';

import NestedDonutChart from './components/NestedDonutChart/NestedDonutChart';
import CounterpartiesDiagram from './components/CounterpartiesDiagram/CounterpartiesDiagram';
import { useGetMainDashboardPerformersQuery } from '../../redux/dashboardApiActions';
import {
    newPerformersData,
    buildPerformersInAppData,
} from './mapers/performersMapers';
import IndicatorWithPoints from 'components/indicators/IndicatorWithPoints/IndicatorWithPoints';
import { useSelector } from 'react-redux';
import { getDatePeriodShort } from 'utils/datePeriodMap';
const mockData = {
    verified: 12,
    verifiedPercent: 66.7,
    unverified: 6,
    unverifiedPercent: 33.3,
    smz: 10,
    smzPercent: 33.3,
    notSmz: 8,
    notSmzPercent: 66.7,
};

const mock = [
    { date: '2025-01-01', invitations: 45, registrations: 32 },
    { date: '2025-01-02', invitations: 52, registrations: 38 },
    { date: '2025-01-03', invitations: 48, registrations: 35 },
    { date: '2025-01-04', invitations: 61, registrations: 42 },
    { date: '2025-01-05', invitations: 55, registrations: 40 },
];
const Performers = () => {
    const { dateStartPicker, dateEndPicker, datePeriod } = useSelector(
        (state) => state.dateRange || {}
    );
    const selectedPartnerships = useSelector(
        (state) => state.companies?.selectedPartnerships || []
    );
    const handleDashboardClick = useDashboardNavigation();
    const prevPeriod = getDatePeriodShort(datePeriod);

    const params = {
        'filter[date_start]': dateStartPicker,
        'filter[date_end]': dateEndPicker,
        'filter[partnership_id]': selectedPartnerships,
    };

    const { data, isLoading, error } = useGetMainDashboardPerformersQuery(
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
                <div style={{ color: 'red' }}>Моковые данные!</div>
                <div className={s.headerBtns}>
                    <FiltersContainer />
                </div>
            </header>
            <main className={s.main}>
                <div className={s.column}>
                    <CounterpartiesDiagram
                        height={310}
                        data={mock}
                        title="Статистика по исполнителям"
                        isLoading={isLoading}
                    />
                </div>
                <div className={s.column}>
                    <NestedDonutChart data={mockData} />
                </div>
                <div className={s.column}>
                    <IndicatorWithPoints
                        data={newPerformersData(data)}
                        title="Новые исполнители"
                        isLoading={isLoading}
                        prevPeriod={prevPeriod}
                    />
                    <IndicatorWithPoints
                        data={buildPerformersInAppData(data)}
                        title="Исполнители с приложением"
                        isLoading={isLoading}
                        prevPeriod={prevPeriod}
                    />
                </div>
            </main>
        </div>
    );
};

export default Performers;
