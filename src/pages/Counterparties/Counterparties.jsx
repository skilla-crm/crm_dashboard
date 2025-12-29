import s from './Counterparties.module.scss';
import FiltersContainer from 'components/filters/FiltersContainer/FiltersContainer';
import { ReactComponent as IconBackForward } from 'assets/icons/iconBackForwardBlack.svg';
import { useDashboardNavigation } from 'hooks/useDashboardNavigation';
import TitleWithLink from 'components/ui/TitleWithLink/TitleWithLink';
import Indicator from 'components/indicators/Indicator/Indicator';
import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetCounterpartiesQuery } from '../../redux/counterpartiesApiActions';
import { getDatePeriodShort } from 'utils/datePeriodMap';
import CounterpartiesDiagram from './components/CounterpartiesDiagram/CounterpartiesDiagram';
import OrdersFrequencyDiagram from './components/OrdersFrequencyDiagram/OrdersFrequencyDiagram';
import {
    COUNTERPARTIES_STATISTICS_SERIES,
    ORDERS_FREQUENCY_SERIES,
} from './config';
import { mapCounterpartiesIndicators } from '../../utils/counterpartiesChartMapper';

const formatCurrency = (value) =>
    typeof value === 'number'
        ? value.toLocaleString('ru-RU', { maximumFractionDigits: 0 })
        : '—';

const mockCounterpartiesGraphics = [
    {
        date: '2024-01-01',
        orders_sum: 300000,
        completed_orders_sum: 180000,
        receipts: 120000,
    },
    {
        date: '2024-01-08',
        orders_sum: 320000,
        completed_orders_sum: 200000,
        receipts: 140000,
    },
    {
        date: '2024-01-15',
        orders_sum: 350000,
        completed_orders_sum: 220000,
        receipts: 1600,
    },
    {
        date: '2024-01-22',
        orders_sum: 330000,
        completed_orders_sum: 210000,
        receipts: 150000,
    },
    {
        date: '2024-01-29',
        orders_sum: 380000,
        completed_orders_sum: 240000,
        receipts: 180000,
    },
    {
        date: '2024-02-05',
        orders_sum: 40020,
        completed_orders_sum: 260000,
        receipts: 200000,
    },
    {
        date: '2024-02-12',
        orders_sum: 390000,
        completed_orders_sum: 250000,
        receipts: 190000,
    },
    {
        date: '2024-02-19',
        orders_sum: 420000,
        completed_orders_sum: 280000,
        receipts: 220000,
    },
    {
        date: '2024-02-26',
        orders_sum: 450000,
        completed_orders_sum: 300000,
        receipts: 240000,
    },
    // {
    //     date: '2024-03-05',
    //     orders_sum: 470000,
    //     completed_orders_sum: 320000,
    //     receipts: 260000,
    // },
];

const mockOrdersFrequencyGraphics = [
    {
        date: '2024-01-01',
        executorsOnOrders: 15,
        ordersFrequency: 25,
    },
    {
        date: '2024-01-08',
        executorsOnOrders: 18,
        ordersFrequency: 28,
    },
    {
        date: '2024-01-15',
        executorsOnOrders: 20,
        ordersFrequency: 32,
    },
    {
        date: '2024-01-22',
        executorsOnOrders: 17,
        ordersFrequency: 30,
    },
    {
        date: '2024-01-29',
        executorsOnOrders: 22,
        ordersFrequency: 35,
    },
    {
        date: '2024-02-05',
        executorsOnOrders: 25,
        ordersFrequency: 38,
    },
    {
        date: '2024-02-12',
        executorsOnOrders: 23,
        ordersFrequency: 36,
    },
    {
        date: '2024-02-19',
        executorsOnOrders: 26,
        ordersFrequency: 40,
    },
    {
        date: '2024-02-26',
        executorsOnOrders: 28,
        ordersFrequency: 42,
    },
];

const Counterparties = () => {
    const handleDashboardClick = useDashboardNavigation();
    const { dateStartPicker, dateEndPicker, datePeriod } = useSelector(
        (state) => state.dateRange || {}
    );
    const selectedPartnerships = useSelector(
        (state) => state.companies?.selectedPartnerships || []
    );
    const prevPeriod = getDatePeriodShort(datePeriod);

    const params = {
        'filter[date_start]': dateStartPicker,
        'filter[date_end]': dateEndPicker,
        'filter[partnership_id]': selectedPartnerships,
    };

    const { data, isLoading, isFetching } = useGetCounterpartiesQuery(params, {
        skip: !dateStartPicker || !dateEndPicker,
    });

    const isLoadingData = isLoading || isFetching;
    const { counterparties_graphics } = data || {};

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
        });
    }, []);

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
                    <IconBackForward /> Контрагенты
                </h2>
                <div style={{ color: 'red' }}>Моковые данные!</div>
                <div className={s.headerBtns}>
                    <FiltersContainer
                        isFetching={isFetching}
                        isLoading={isLoading}
                    />
                </div>
            </header>
            <main className={s.main}>
                <div className={s.leftSide}>
                    <CounterpartiesDiagram
                        data={mapCounterpartiesIndicators(
                            counterparties_graphics ||
                                mockCounterpartiesGraphics
                        )}
                        title="Заказы и поступления"
                        series={COUNTERPARTIES_STATISTICS_SERIES}
                        dataMapper={mapCounterpartiesIndicators}
                        tooltipValueFormatter={formatCurrency}
                        isLoading={isLoadingData}
                    />
                    <OrdersFrequencyDiagram
                        data={mockOrdersFrequencyGraphics}
                        title="Частота заказов и исполнители"
                        series={ORDERS_FREQUENCY_SERIES}
                        isLoading={isLoadingData}
                    />
                </div>
                <div className={s.rightSide}>
                    <TitleWithLink
                        title="Данные по всем контрагентам"
                        size="medium"
                    />
                    <Indicator
                        isLoading={isLoadingData}
                        title="Сумма завершенных заказов"
                        indicator={data?.completed_orders_sum?.indicator || 0}
                        increase={data?.completed_orders_sum?.increase || 0}
                        prevPeriod={prevPeriod}
                        info={null}
                        reverse={false}
                    />
                    <Grid
                        container
                        spacing={1.5}
                    >
                        <Grid
                            item
                            size={6}
                        >
                            {' '}
                            <Indicator
                                isLoading={isLoadingData}
                                title="Поступления на р/с"
                                indicator={data?.receipts?.indicator || 0}
                                increase={data?.receipts?.increase || 0}
                                prevPeriod={prevPeriod}
                                info={null}
                                reverse={false}
                            />
                        </Grid>
                        <Grid
                            item
                            size={6}
                        >
                            {' '}
                            <Indicator
                                isLoading={isLoadingData}
                                title="Выплаты"
                                indicator={data?.payments?.indicator || 0}
                                increase={data?.payments?.increase || 0}
                                prevPeriod={prevPeriod}
                                info={null}
                                reverse={false}
                            />
                        </Grid>
                        <Grid
                            item
                            size={6}
                        >
                            {' '}
                            <Indicator
                                isLoading={isLoadingData}
                                title="Нам должны"
                                indicator={data?.we_owe?.indicator || 0}
                                increase={data?.we_owe?.increase || 0}
                                prevPeriod={prevPeriod}
                                info={null}
                                reverse={false}
                            />
                        </Grid>
                        <Grid
                            item
                            size={6}
                        >
                            {' '}
                            <Indicator
                                isLoading={isLoadingData}
                                title="Мы должны"
                                indicator={data?.they_owe?.indicator || 0}
                                increase={data?.they_owe?.increase || 0}
                                prevPeriod={prevPeriod}
                                info={null}
                                reverse={false}
                            />
                        </Grid>
                    </Grid>
                </div>
            </main>
        </div>
    );
};

export default Counterparties;
