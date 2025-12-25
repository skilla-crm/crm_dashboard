import classNames from 'classnames';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';

// assets
import { ReactComponent as IconBackForward } from 'assets/icons/iconBackForwardBlack.svg';

// components
import FiltersContainer from 'components/filters/FiltersContainer/FiltersContainer';
import Indicator from 'components/indicators/Indicator/Indicator';
import IndicatorWithList from 'components/indicators/IndicatorWithList/IndicatorWithList';

// hooks
import { useModal } from 'hooks/useModal';
import { useDashboardNavigation } from 'hooks/useDashboardNavigation';

// redux
import { useSelector } from 'react-redux';
import { useGetFinanceQuery } from '../../redux/financeApiActions';

// utils
import { getDatePeriodShort } from 'utils/datePeriodMap';
import {
    mapFinanceIndicators,
    mapTransactions,
} from '../../utils/financeChartMapper';

// local components
import FinanceDiagram from './components/FinanceDiagram/FinanceDiagram';

// constants
import {
    FINANCE_STATISTICS_SERIES,
    INDICATORS_CONFIG,
    TRANSACTION_SERIES,
} from './config';

// styles
import s from './Finance.module.scss';

const formatCurrency = (value) =>
    typeof value === 'number'
        ? value.toLocaleString('ru-RU', { maximumFractionDigits: 0 })
        : '—';

const Finance = () => {
      const [anim, setAnim] = useState(false);
    const { showModal } = useModal();
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

    const { data, isLoading, isFetching } = useGetFinanceQuery(params, {
        skip: !dateStartPicker || !dateEndPicker,
    });
    const { finance_indicators, transaction_indicators, finance_graphics } =
        data || {};

    const isLoadingData = isLoading || isFetching;

    useEffect(() => {
        setAnim(true)
        window.scrollTo({
            top: 0,
            left: 0,
        });
    }, []);

    return (
        <div className={classNames(s.root, anim && s.root_anim)}>
            <header className={s.header}>
                <h2>
                    <span
                        onClick={handleDashboardClick}
                        style={{ cursor: 'pointer' }}
                    >
                        Дашборд
                    </span>{' '}
                    <IconBackForward />{' '}
                    <span onClick={() => showModal('FINANCE_INFO')}>
                        Финансы
                    </span>
                </h2>

                <div className={s.headerBtns}>
                    <FiltersContainer
                        isFetching={isFetching}
                        isLoading={isLoading}
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
                        isLoading={isLoadingData}
                    />
                    <FinanceDiagram
                        data={mapTransactions(transaction_indicators)}
                        title="Транзакции"
                        series={TRANSACTION_SERIES}
                        dataMapper={mapTransactions}
                        tooltipValueFormatter={formatCurrency}
                        isLoading={isLoadingData}
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
                        emptyTitle="Нет транзакций"
                        title="Входящие транзакции"
                        isLoading={isLoading}
                        navigateTo="https://lk.skilla.ru/new/bank"
                        navigateToNewTab
                        data={finance_indicators?.last_transactions || []}
                    />
                </div>
            </main>
        </div>
    );
};

export default Finance;
