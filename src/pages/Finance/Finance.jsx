import { useState } from 'react';
import s from './Finance.module.scss';
import DateFilter from 'components/filters/DateFilter/DateFilter';
import { ReactComponent as IconBackForward } from 'assets/icons/iconBackForwardBlack.svg';
import Grid from '@mui/material/Grid';
// api
import { useGetFinanceQuery } from '../../redux/financeApiActions';
// redux
import { useSelector } from 'react-redux';

import { useModal } from 'hooks/useModal';
import FinanceDiagram from './components/FinanceDiagram/FinanceDiagram';
import {
    mapFinanceIndicators,
    mapTransactions,
} from '../../utils/financeChartMapper';
import Indicator from 'components/indicators/Indicator/Indicator';
import { getDatePeriodShort } from 'utils/datePeriodMap';
import IndicatorWithList from 'components/indicators/IndicatorWithList/IndicatorWithList';

const formatCurrency = (value) =>
    typeof value === 'number'
        ? value.toLocaleString('ru-RU', { maximumFractionDigits: 0 })
        : '—';

const FINANCE_STATISTICS_SERIES = [
    {
        key: 'revenue',
        color: '#5CCF9C',
        gradient: ['#70E093', '#7BDCB5'],
        name: 'Выручка',
        isSwitch: false,
    },
    {
        key: 'marginalProfit',
        color: '#6EC6FF',
        gradient: ['#8ED1FC', '#8ED1FC'],
        name: 'Маржинальная прибыль',
        isSwitch: false,
    },
    {
        key: 'workersSum',
        color: '#F07167',
        gradient: ['#F4978E', '#F4978E'],
        name: 'Выплаты исполнителям',
        isSwitch: false,
    },
];

const TRANSACTION_SERIES = [
    {
        key: 'cashlessOrders',
        color: '#5CCF9C',
        gradient: ['#70E093', '#7BDCB5'],
        name: 'Входящие',
        isSwitch: false,
    },
    {
        key: 'transactionIncome',
        color: '#F07167',
        gradient: ['#F4978E', '#F4978E'],
        name: 'Исходящие',
        isSwitch: false,
    },
    {
        key: 'transactionOutcome',
        color: '#A59ADC',
        gradient: ['#B8ADEB', '#B8ADEB'],
        name: 'Сумма заказов с оплатой на р/с',
        isSwitch: true,
    },
];

const INDICATORS_CONFIG = [
    {
        title: 'Выручка',
        dataKey: 'revenue',
        reverse: false,
        increaseView: true,
        reverseView: false,
    },
    {
        title: 'Упущенная выручка',
        dataKey: 'lost_revenue',
        reverse: true,
        increaseView: true,
        reverseView: false,
    },
    {
        title: 'Маржинальная прибыль',
        dataKey: 'marginal_profit',
        reverse: false,
        increaseView: true,
        reverseView: true,
    },
    {
        title: 'Операционная прибыль',
        dataKey: 'operating_profit',
        reverse: false,
        increaseView: true,
        reverseView: true,
    },
    {
        title: 'Закупки и ручной учет',
        dataKey: 'worker_sum',
        reverse: true,
        increaseView: true,
        reverseView: true,
    },
    {
        title: 'Прочие расходы',
        dataKey: 'other_expenses',
        reverse: false,
        increaseView: true,
        reverseView: true,
    },
    {
        title: 'Входящие транзакции',
        dataKey: 'transaction_income',
        reverse: (data) =>
            data?.transaction_indicators?.transaction_income?.indicator >
            data?.transaction_indicators?.transaction_income
                ?.prev_period_indicator,
        increaseView: true,
        reverseView: false,
        indicatorFallback: 0,
        increaseFallback: 0,
    },
    {
        title: 'Исходящие транзакции',
        dataKey: 'transaction_outcome',
        reverse: true,
        increaseView: (data) =>
            data?.transaction_outcome?.increase >
            data?.transaction_income?.increase,
        reverseView: false,
    },
];

const Finance = () => {
    const { showModal } = useModal();
    const [activeFilter, setActiveFilter] = useState(null);
    const { dateStartPicker, dateEndPicker, datePeriod } = useSelector(
        (state) => state.dateRange || {}
    );
    const prevPeriod = getDatePeriodShort(datePeriod);

    const params = {
        'filter[date_start]': dateStartPicker,
        'filter[date_end]': dateEndPicker,
    };

    const { data, isLoading, isFetching } = useGetFinanceQuery(params, {
        skip: !dateStartPicker || !dateEndPicker,
    });
    const { finance_indicators, transaction_indicators, finance_graphics } =
        data || {};

    const isLoadingData = isLoading || isFetching;

    return (
        <div className={s.root}>
            <header className={s.header}>
                <h2 onClick={() => showModal('FINANCE_INFO')}>
                    Дашборд <IconBackForward /> Финансы
                </h2>

                <div className={s.headerBtns}>
                    <DateFilter
                        isFetching={isLoadingData}
                        setActiveFilter={setActiveFilter}
                        clearActiveFilter={() => setActiveFilter(null)}
                    />
                </div>
            </header>
            <main className={s.main}>
                <div className={s.leftSide}>
                    <FinanceDiagram
                        data={mapFinanceIndicators(finance_graphics)}
                        title="Финансовая статистика"
                        series={FINANCE_STATISTICS_SERIES}
                        dataMapper={mapFinanceIndicators}
                        tooltipValueFormatter={formatCurrency}
                        modalKey="FINANCE_INFO"
                    />
                    <FinanceDiagram
                        data={mapTransactions(transaction_indicators)}
                        title="Транзакции"
                        series={TRANSACTION_SERIES}
                        dataMapper={mapTransactions}
                        tooltipValueFormatter={formatCurrency}
                    />
                </div>
                <div className={s.rightSide}>
                    <Grid
                        container
                        spacing={1.5}
                        className={s.indicators}
                    >
                        {INDICATORS_CONFIG.map((config) => {
                            const indicatorData =
                                finance_indicators?.[config.dataKey];
                            const getValue = (value) =>
                                typeof value === 'function'
                                    ? value(finance_indicators)
                                    : value;

                            return (
                                <Grid
                                    key={config.dataKey}
                                    item
                                    size={6}
                                >
                                    <Indicator
                                        title={config.title}
                                        indicator={
                                            indicatorData?.indicator ??
                                            config.indicatorFallback
                                        }
                                        increase={
                                            indicatorData?.increase ??
                                            config.increaseFallback
                                        }
                                        prevPeriod={prevPeriod}
                                        info={null}
                                        reverse={getValue(config.reverse)}
                                        increaseView={getValue(
                                            config.increaseView
                                        )}
                                        reverseView={config.reverseView}
                                        isLoading={isLoadingData}
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                    <IndicatorWithList
                        title="Входящие транзакции"
                        isLoading={isLoading}
                        data={finance_indicators?.last_transactions || []}
                    />
                </div>
            </main>
        </div>
    );
};

export default Finance;
