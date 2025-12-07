import s from './Main.module.scss';
import { useState } from 'react';
// api
import { useGetDashboardQuery } from '../../redux/dashboardApiActions';
// redux
import { useSelector } from 'react-redux';
// components
import IndicatorsFinance from 'components/IndicatorsFinance/IndicatorsFinance';
import { ReactComponent as IconSettings } from 'assets/icons/iconSettings.svg';
import { ReactComponent as IconSave } from 'assets/icons/iconDoneWhite.svg';
import FinanceDiagram from 'components/diagrams/FinanceDiagram/FinanceDiagram';
import UniButton from 'components/ui/UniButton/UniButton';
import PeriodFilter from 'components/filters/PeriodFilter/PeriodFilter';
import DateFilter from 'components/filters/DateFilter/DateFilter';
import TitleWithLink from 'components/ui/TitleWithLink/TitleWithLink';
import { createTheme, Grid, ThemeProvider } from '@mui/material';
import Slider from 'components/indicators/Slider/Slider';
import Indicator from 'components/indicators/Indicator/Indicator';
import IndicatorWithList from 'components/indicators/IndicatorWithList/IndicatorWithList';
import IndicatorWithPoints from 'components/indicators/IndicatorWithPoints/IndicatorWithPoints';
import HalfCircleDiagram from 'components/diagrams/CounterpartyDocsDiagram/CounterpartyDocsDiagram';
import IndicatorForecasting from 'components/indicators/IndicatorForecasting/IndicatorForecasting';
// utils
import { getTitleDateDuration } from 'components/filters/DateFilter/DateMenu/utils/date';
import FunnelChart from 'components/diagrams/FunnelChart/FunnelChart';
import IndicatorCounterparties from 'components/indicators/IndicatorCounterparties/IndicatorCounterparties';

// const PERIODS = [
//     { value: 'month', label: 'Месяц' },
//     { value: 'quarter', label: 'Квартал' },
//     { value: 'year', label: 'Год' },
// ];

const Main = () => {
    const [period, setPeriod] = useState('month');
    const [isEditing, setIsEditing] = useState(false);
    const [activeFilter, setActiveFilter] = useState(null);
    const { dateStartPicker, dateEndPicker } = useSelector(
        (state) => state.dateRange || {}
    );
    const params = {
        'filter[period]': period,
    };
    const { data, isLoading } = useGetDashboardQuery(params);
    const { employees, performers, counterparties, forecasting } = data || {};
    const { new: newPerformers, app: appPerformers } = performers || {};

    const clearActiveFilter = () => {
        setActiveFilter(null);
    };

    const forecastingIndicators = [
        {
            key: 'marginal_profit',
            title: 'Маржинальная прибыль',
        },
        {
            key: 'operating_profit',
            title: 'Операционная прибыль',
        },
        {
            key: 'orders_count',
            title: 'Количество заказов',
        },
        {
            key: 'revenue',
            title: 'Выручка',
        },
        {
            key: 'expenses_costs',
            title: 'Выплаты исполнителям',
        },
        {
            key: 'permanent_costs',
            title: 'Закупки и ручной учет',
        },
    ];

    const performersNewData = [
        {
            key: 'added',
            title: 'добавлены',
            indicator: newPerformers?.added?.indicator || 0,
            increase: newPerformers?.added?.increase || 0,
            prev_period_indicator:
                newPerformers?.added?.prev_period_indicator || 0,
            isPercent: false,
        },
        {
            key: 'invitations',
            title: 'отправлено приглашений',
            indicator: newPerformers?.invitations?.indicator || 0,
            increase: newPerformers?.invitations?.increase || 0,
            prev_period_indicator:
                newPerformers?.invitations?.prev_period_indicator || 0,
            isPercent: false,
        },
        {
            key: 'registered',
            title: 'прошли регистрацию',
            indicator: newPerformers?.registered?.indicator || 0,
            increase: newPerformers?.registered?.increase || 0,
            prev_period_indicator:
                newPerformers?.registered?.prev_period_indicator || 0,
            isPercent: false,
        },
        {
            key: 'first_login',
            title: 'вышли на первый заказ',
            indicator: newPerformers?.first_login?.indicator || 0,
            increase: newPerformers?.first_login?.increase || 0,
            prev_period_indicator:
                newPerformers?.first_login?.prev_period_indicator || 0,
            isPercent: false,
        },
    ];

    const performersAppData = [
        {
            key: 'total_percentage_workers',
            title: 'от общего списка',
            indicator: appPerformers?.total_percentage_workers?.indicator || 0,
            increase: appPerformers?.total_percentage_workers?.increase || 0,
            prev_period_indicator:
                appPerformers?.total_percentage_workers
                    ?.prev_period_indicator || 0,
            isPercent: true,
        },
        {
            key: 'total_percentage_order_workers',
            title: 'от общего кол-ва исп. на заказах',
            indicator:
                appPerformers?.total_percentage_order_workers?.indicator || 0,
            increase:
                appPerformers?.total_percentage_order_workers?.increase || 0,
            prev_period_indicator:
                appPerformers?.total_percentage_order_workers
                    ?.prev_period_indicator || 0,
            isPercent: true,
        },
    ];

    const employeesData = [
        {
            key: 'plan_fact',
            title: 'план-факт по заказам',
            indicator: employees?.plan_fact?.indicator || 0,
            increase: employees?.plan_fact?.increase || 0,
            prev_period_indicator:
                employees?.plan_fact?.prev_period_indicator || 0,
            isPercent: true,
        },
        {
            key: 'supervisor_sum',
            title: 'комиссии',
            indicator: employees?.supervisor_sum?.indicator || 0,
            increase: employees?.supervisor_sum?.increase || 0,
            prev_period_indicator:
                employees?.supervisor_sum?.prev_period_indicator || 0,
            isPercent: false,
        },
        {
            key: 'operator',
            title: 'операторы',
            indicator: employees?.operator?.indicator || 0,
            increase: employees?.operator?.increase || 0,
            prev_period_indicator:
                employees?.operator?.prev_period_indicator || 0,
            isPercent: true,
        },
    ];

    const theme = createTheme({
        spacing: 4,
    });
    return (
        <div className={s.root}>
            <header className={s.header}>
                <h2>Дашборд</h2>
                <div className={s.headerBtns}>
                    {/* {!isEditing && (
                        <PeriodFilter
                            period={period}
                            setPeriod={setPeriod}
                            isLoading={isLoading}
                            periods={PERIODS}
                        />
                    )} */}

                    {!isLoading && (
                        <DateFilter
                            isFetching={isLoading}
                            setActiveFilter={setActiveFilter}
                            clearActiveFilter={clearActiveFilter}
                        />
                    )}
                    <UniButton
                        text={isEditing ? 'Сохранить' : 'Настройка'}
                        type={isEditing ? 'primary' : 'outline'}
                        icon={isEditing ? IconSave : IconSettings}
                        onClick={() => setIsEditing(!isEditing)}
                    />
                </div>
            </header>

            <main className={s.main}>
                <ThemeProvider theme={theme}>
                    <Grid
                        container
                        spacing={10}
                        sx={{ flexWrap: 'nowrap' }}
                    >
                        {/* Левая колонка – 8/12 */}
                        <Grid
                            item
                            size={8}
                        >
                            <div className={s.finance}>
                                <TitleWithLink
                                    title="Финансы"
                                    navigateTo={'/finance'}
                                />
                                <FinanceDiagram
                                    profitData={data?.finance?.profit || {}}
                                />

                                <Grid
                                    container
                                    spacing={5}
                                    sx={{ mt: '12px' }}
                                >
                                    {/* Левая колонка - 4 элемента в двух столбцах */}
                                    <Grid
                                        item
                                        size={6}
                                    >
                                        <Grid
                                            container
                                            spacing={3}
                                        >
                                            <Grid
                                                item
                                                size={6}
                                            >
                                                <Indicator
                                                    title={'Выручка'}
                                                    indicator={
                                                        data?.finance?.revenue
                                                            ?.indicator || 0
                                                    }
                                                    increaseView={true}
                                                    increase={
                                                        data?.finance?.revenue
                                                            ?.increase || 0
                                                    }
                                                    prevPeriod={'авг'}
                                                    info={null}
                                                    reverse={false}
                                                    isLoading={isLoading}
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                size={6}
                                            >
                                                <Indicator
                                                    title={
                                                        'Заказы с оплатой а р/с'
                                                    }
                                                    indicator={
                                                        data?.finance?.orders
                                                            ?.indicator || 0
                                                    }
                                                    increaseView={true}
                                                    increase={
                                                        data?.finance?.orders
                                                            ?.increase || 0
                                                    }
                                                    prevPeriod={'авг'}
                                                    info={null}
                                                    reverse={false}
                                                    isLoading={isLoading}
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                size={6}
                                            >
                                                <Indicator
                                                    title={'Расходы'}
                                                    indicator={
                                                        data?.finance?.costs
                                                            ?.total
                                                            ?.indicator || 0
                                                    }
                                                    increaseView={true}
                                                    increase={
                                                        data?.finance?.costs
                                                            ?.total?.increase ||
                                                        0
                                                    }
                                                    prevPeriod={'авг'}
                                                    info={null}
                                                    reverse={true}
                                                    isLoading={isLoading}
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                size={6}
                                            >
                                                <Indicator
                                                    title={'Упущенная выручка'}
                                                    indicator={
                                                        data?.finance
                                                            ?.lost_revenue
                                                            ?.indicator || 0
                                                    }
                                                    increaseView={true}
                                                    increase={
                                                        data?.finance
                                                            ?.lost_revenue
                                                            ?.increase || 0
                                                    }
                                                    prevPeriod={'авг'}
                                                    info={null}
                                                    reverse={false}
                                                    isLoading={isLoading}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    {/* Правая колонка - FinanceDiagram */}
                                    <Grid
                                        item
                                        size={6}
                                    >
                                        <IndicatorWithList
                                            title={'Входящие транзакции'}
                                            indicator={
                                                data?.finance
                                                    ?.transactions_income
                                                    ?.indicator || 0
                                            }
                                            increaseView={
                                                (data?.finance
                                                    ?.transactions_income
                                                    ?.increase || 0) > 0
                                            }
                                            increase={
                                                data?.finance
                                                    ?.transactions_income
                                                    ?.increase || 0
                                            }
                                            prevPeriod={'авг'}
                                            info={null}
                                            reverse={
                                                (data?.finance
                                                    ?.transactions_income
                                                    ?.increase || 0) > 0
                                                    ? false
                                                    : true
                                            }
                                            isLoading={isLoading}
                                            data={
                                                data?.finance
                                                    ?.transactions_income
                                                    ?.last_transactions_income ||
                                                []
                                            }
                                        />
                                    </Grid>
                                </Grid>
                            </div>
                            <Grid
                                container
                                spacing={5}
                                sx={{ mt: '12px' }}
                            >
                                {/* Левая колонка - 6 элемента в двух столбцах */}

                                <Grid
                                    item
                                    size={6}
                                >
                                    <Grid
                                        container
                                        spacing={5}
                                        sx={{ flexDirection: 'column' }}
                                    >
                                        <Grid
                                            item
                                            size={12}
                                        >
                                            <TitleWithLink
                                                title="Реклама"
                                                navigateTo={'/advertising'}
                                            />
                                            <Grid
                                                container
                                                spacing={3}
                                            >
                                                <Grid
                                                    item
                                                    size={6}
                                                >
                                                    <Indicator
                                                        title={'CTR'}
                                                        indicator={
                                                            data?.advertising
                                                                ?.ctr
                                                                ?.indicator || 0
                                                        }
                                                        increaseView={true}
                                                        increase={
                                                            data?.advertising
                                                                ?.ctr
                                                                ?.increase || 0
                                                        }
                                                        prevPeriod={'авг'}
                                                        info={null}
                                                        reverse={false}
                                                        isLoading={isLoading}
                                                    />
                                                </Grid>
                                                <Grid
                                                    item
                                                    size={6}
                                                >
                                                    <Indicator
                                                        title={
                                                            'Средняя цена клика'
                                                        }
                                                        indicator={
                                                            data?.advertising
                                                                ?.average_price_click
                                                                ?.indicator || 0
                                                        }
                                                        increaseView={true}
                                                        increase={
                                                            data?.advertising
                                                                ?.average_price_click
                                                                ?.increase || 0
                                                        }
                                                        prevPeriod={'авг'}
                                                        info={null}
                                                        reverse={true}
                                                        isLoading={isLoading}
                                                    />
                                                </Grid>
                                                <Grid
                                                    item
                                                    size={6}
                                                >
                                                    <Indicator
                                                        title={
                                                            'Конверсия клик→звонок'
                                                        }
                                                        indicator={
                                                            data?.advertising
                                                                ?.conversion_click_to_call
                                                                ?.indicator || 0
                                                        }
                                                        increaseView={true}
                                                        increase={
                                                            data?.advertising
                                                                ?.conversion_click_to_call
                                                                ?.increase || 0
                                                        }
                                                        prevPeriod={'авг'}
                                                        info={null}
                                                        reverse={false}
                                                        isLoading={isLoading}
                                                    />
                                                </Grid>
                                                <Grid
                                                    item
                                                    size={6}
                                                >
                                                    <Indicator
                                                        title={
                                                            'Средняя цена звонка'
                                                        }
                                                        indicator={
                                                            data?.advertising
                                                                ?.average_price_call
                                                                ?.indicator || 0
                                                        }
                                                        increaseView={true}
                                                        increase={
                                                            data?.advertising
                                                                ?.average_price_call
                                                                ?.increase || 0
                                                        }
                                                        prevPeriod={'авг'}
                                                        info={null}
                                                        reverse={true}
                                                        isLoading={isLoading}
                                                    />
                                                </Grid>
                                                <Grid
                                                    item
                                                    size={6}
                                                >
                                                    <Indicator
                                                        title={
                                                            'Конверсия звонок→заказ'
                                                        }
                                                        indicator={
                                                            data?.advertising
                                                                ?.conversion_call_to_order
                                                                ?.indicator || 0
                                                        }
                                                        increaseView={true}
                                                        increase={
                                                            data?.advertising
                                                                ?.conversion_call_to_order
                                                                ?.increase || 0
                                                        }
                                                        prevPeriod={'авг'}
                                                        info={null}
                                                        reverse={false}
                                                        isLoading={isLoading}
                                                    />
                                                </Grid>
                                                <Grid
                                                    item
                                                    size={6}
                                                >
                                                    <Indicator
                                                        title={
                                                            'Средняя цена заказа'
                                                        }
                                                        indicator={
                                                            data?.advertising
                                                                ?.average_price_order
                                                                ?.indicator || 0
                                                        }
                                                        increaseView={true}
                                                        increase={
                                                            data?.advertising
                                                                ?.average_price_order
                                                                ?.increase || 0
                                                        }
                                                        prevPeriod={'авг'}
                                                        info={null}
                                                        reverse={true}
                                                        isLoading={isLoading}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid
                                            item
                                            size={12}
                                        >
                                            <div className={s.employees}>
                                                <TitleWithLink
                                                    title="Сотрудники"
                                                    navigateTo={'/employees'}
                                                    size="medium"
                                                />
                                                <IndicatorWithPoints
                                                    title="Сотрудники"
                                                    data={employeesData}
                                                    isLoading={isLoading}
                                                />
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                {/* Правая колонка - FinanceDiagram */}

                                <Grid
                                    item
                                    size={6}
                                >
                                    <Grid
                                        container
                                        spacing={5}
                                        sx={{ flexDirection: 'column' }}
                                    >
                                        <Grid
                                            item
                                            size={12}
                                        >
                                            <TitleWithLink
                                                title="Контрагенты"
                                                navigateTo={'/counterparties'}
                                            />
                                            <Grid
                                                spacing={3}
                                                container
                                                size={12}
                                            >
                                                {' '}
                                                <Grid
                                                    item
                                                    size={6}
                                                >
                                                    <IndicatorCounterparties
                                                        title={'Выручка'}
                                                        data={
                                                            data?.counterparties
                                                        }
                                                        isLoading={isLoading}
                                                    />
                                                </Grid>
                                                <Grid
                                                    item
                                                    size={6}
                                                >
                                                    <HalfCircleDiagram
                                                        title="Закрывающие документы"
                                                        data={
                                                            data?.counterparties
                                                                ?.docs
                                                        }
                                                        isLoading={isLoading}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid
                                            item
                                            size={12}
                                        >
                                            <TitleWithLink
                                                title="Исполнители"
                                                navigateTo={'/performers'}
                                                size="medium"
                                            />
                                            <div
                                                className={s.indicatorsWrapper}
                                            >
                                                <IndicatorWithPoints
                                                    title="Новые исполнители"
                                                    data={performersNewData}
                                                    isLoading={isLoading}
                                                />
                                                <IndicatorWithPoints
                                                    title="Исполнители с приложением"
                                                    data={performersAppData}
                                                    isLoading={isLoading}
                                                />
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* Правая колонка – 4/12 */}
                        <Grid
                            container
                            size={4}
                            sx={{ flexDirection: 'column', gap: '12px' }}
                        >
                            <Grid
                                item
                                size={12}
                            >
                                <div className={s.orders}>
                                    <TitleWithLink
                                        title="Заказы"
                                        navigateTo={'/orders'}
                                    />
                                    <Slider />
                                </div>
                            </Grid>

                            <Grid
                                item
                                size={12}
                            >
                                <Indicator
                                    title={'Выручка'}
                                    indicator={67}
                                    increaseView={true}
                                    increase={67}
                                    prevPeriod={'авг'}
                                    info={null}
                                    reverse={true}
                                />
                            </Grid>
                            <Grid
                                item
                                size={12}
                            >
                                <TitleWithLink
                                    title="Прогноз на конец сентября"
                                    size="medium"
                                    withLink={false}
                                />
                                <Grid
                                    container
                                    spacing={3}
                                >
                                    {forecastingIndicators.map((item) => (
                                        <Grid
                                            item
                                            size={6}
                                            key={item.key}
                                        >
                                            <IndicatorForecasting
                                                title={item.title}
                                                value={
                                                    data?.forecasting?.[
                                                        item.key
                                                    ]?.indicator || 0
                                                }
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </ThemeProvider>
            </main>
            <FunnelChart />
            {/* <IndicatorsFinance data={data?.finance} isLoading={isLoading} /> */}
        </div>
    );
};

export default Main;
