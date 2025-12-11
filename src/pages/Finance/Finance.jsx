import { useState } from 'react';
import s from './Finance.module.scss';
import DateFilter from 'components/filters/DateFilter/DateFilter';
import { ReactComponent as IconBackForward } from 'assets/icons/iconBackForwardBlack.svg';
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

const formatCurrency = (value) =>
    typeof value === 'number'
        ? value.toLocaleString('ru-RU', { maximumFractionDigits: 0 })
        : '—';

const Finance = () => {
    const { showModal } = useModal();
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
                <h2 onClick={() => showModal('FINANCE_INFO')}>
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
                <div className={s.leftSide}>
                    <FinanceDiagram
                        data={mapFinanceIndicators(data?.finance_graphics)}
                        title="Финансовая статистика"
                        series={FINANCE_STATISTICS_SERIES}
                        dataMapper={mapFinanceIndicators}
                        tooltipValueFormatter={formatCurrency}
                        modalKey="FINANCE_INFO"
                    />
                    <FinanceDiagram
                        data={mapTransactions(data?.transaction_indicators)}
                        title="Транзакции"
                        series={TRANSACTION_SERIES}
                        dataMapper={mapTransactions}
                        tooltipValueFormatter={formatCurrency}
                    />
                </div>
                <div className={s.rightSide}></div>
            </main>
        </div>
    );
};

export default Finance;
