// Dependencies
import { useState } from 'react';
import { createTheme, Grid, ThemeProvider } from '@mui/material';
import { useSelector } from 'react-redux';

// Hooks
import { useMainDashboardData } from '../../hooks/useMainDashboardData';

// Components
import DateFilter from 'components/filters/DateFilter/DateFilter';
import FunnelChart from 'components/diagrams/FunnelChart/FunnelChart';
import Indicator from 'components/indicators/Indicator/Indicator';
import IndicatorForecasting from 'components/indicators/IndicatorForecasting/IndicatorForecasting';
import IndicatorWithChart from 'components/indicators/IndicatorWithChart/IndicatorWithChart';
import IndicatorWithList from 'components/indicators/IndicatorWithList/IndicatorWithList';
import IndicatorWithPoints from 'components/indicators/IndicatorWithPoints/IndicatorWithPoints';
import Slider from 'components/indicators/Slider/Slider';
import IndicatorWithScroll from 'components/indicators/IndicatorWithScroll/IndicatorWithScroll';
import TitleWithLink from 'components/ui/TitleWithLink/TitleWithLink';
import UniButton from 'components/ui/UniButton/UniButton';

// Utils
import { getDatePeriodShort } from 'utils/datePeriodMap';
import getPercent from 'utils/getPercent';
// Mapers
import buildAppData from './mapers/buildAppData';
import buildBankAccountsData from './mapers/buildBankAccountsData';
import buildCounterpartiesData from './mapers/buildCounterpartiesData';
import buildSupervisorsData from './mapers/buildSupervisorsData';
import buildOperatorsData from './mapers/buildOperatorsData';

// Styles
import s from './Main.module.scss';

const Main = () => {
    const [period, setPeriod] = useState('month');
    const [isEditing, setIsEditing] = useState(false);
    const [activeFilter, setActiveFilter] = useState(null);
    const { datePeriod } = useSelector((state) => state.dateRange || {});

    const {
        isLoading,
        data,
        ordersData,
        forecastsData,
        financeData,
        appData,
        isLoadingMap,
        performersData,
        counterpartiesData,
        employeesData,
    } = useMainDashboardData(period);
    console.log(employeesData);

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

    const theme = createTheme({
        spacing: 4,
    });
    return (
        <div className={s.root}>
            <header className={s.header}>
                <h2>Дашборд</h2>
                <div className={s.headerBtns}>
                    <DateFilter
                        isFetching={isLoading}
                        setActiveFilter={setActiveFilter}
                        clearActiveFilter={clearActiveFilter}
                    />

                    {/* <UniButton
                        width={isEditing ? '' : 40}
                        text={isEditing ? 'Сохранить' : ''}
                        type={isEditing ? 'primary' : 'outline'}
                        icon={isEditing ? IconSave : IconSettings}
                        onClick={() => setIsEditing(!isEditing)}
                    /> */}
                </div>
            </header>

            <main className={s.main}>
                <ThemeProvider theme={theme}>
                    <div className={s.mainColumns}>
                        {/* Левая колонка – 9/12 (75%) */}
                        <div className={s.leftColumn}>
                            <div className={s.financeWrapper}>
                                <TitleWithLink
                                    title="Финансы"
                                    navigateTo={'/finance'}
                                />
                                <div className={s.finance}>
                                    <Grid
                                        container
                                        spacing={3}
                                        sx={{
                                            paddingBottom: '12px',
                                        }}
                                    >
                                        {/* Первая строка: слева диаграмма, справа 4 индикатора (2x2) */}
                                        <Grid
                                            item
                                            size={6}
                                        >
                                            <IndicatorWithChart
                                                width={'390px'}
                                                title={'Выручка'}
                                                indicator={
                                                    financeData?.revenue
                                                        ?.indicator || 0
                                                }
                                                increaseView={true}
                                                increase={
                                                    financeData?.revenue
                                                        ?.increase || 0
                                                }
                                                prevPeriod={getDatePeriodShort(
                                                    datePeriod
                                                )}
                                                info={null}
                                                reverse={false}
                                                isLoading={
                                                    isLoadingMap.isLoadingFinance
                                                }
                                                chartData={
                                                    financeData?.revenue
                                                        ?.graphics || []
                                                }
                                                chartConfig={{
                                                    color: '#7499E8',
                                                    gradient: [
                                                        '#7499E8',
                                                        '#4A6BC4',
                                                    ],
                                                }}
                                            />
                                        </Grid>
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
                                                        title={'Комиссия'}
                                                        indicator={
                                                            financeData
                                                                ?.marginal_profit
                                                                ?.indicator || 0
                                                        }
                                                        increaseView={true}
                                                        increase={
                                                            financeData
                                                                ?.marginal_profit
                                                                ?.increase || 0
                                                        }
                                                        prevPeriod={getDatePeriodShort(
                                                            datePeriod
                                                        )}
                                                        reverse={true}
                                                        isLoading={
                                                            isLoadingMap.isLoadingFinance
                                                        }
                                                        percentOf={getPercent(
                                                            financeData?.revenue
                                                                ?.indicator,
                                                            financeData
                                                                ?.marginal_profit
                                                                ?.indicator
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid
                                                    item
                                                    size={6}
                                                >
                                                    <Indicator
                                                        title={'Расходы'}
                                                        indicator={
                                                            financeData?.costs
                                                                ?.total
                                                                ?.indicator || 0
                                                        }
                                                        increaseView={true}
                                                        increase={
                                                            financeData?.costs
                                                                ?.total
                                                                ?.increase || 0
                                                        }
                                                        prevPeriod={getDatePeriodShort(
                                                            datePeriod
                                                        )}
                                                        reverse={true}
                                                        isLoading={
                                                            isLoadingMap.isLoadingFinance
                                                        }
                                                        percentOf={getPercent(
                                                            financeData?.revenue
                                                                ?.indicator,
                                                            financeData?.costs
                                                                ?.total
                                                                ?.indicator
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid
                                                    item
                                                    size={6}
                                                >
                                                    <Indicator
                                                        title={'Прибыль'}
                                                        indicator={
                                                            financeData
                                                                ?.operating_profit
                                                                ?.indicator || 0
                                                        }
                                                        increaseView={true}
                                                        increase={
                                                            financeData
                                                                ?.operating_profit
                                                                ?.increase || 0
                                                        }
                                                        prevPeriod={getDatePeriodShort(
                                                            datePeriod
                                                        )}
                                                        info={null}
                                                        reverse={true}
                                                        isLoading={
                                                            isLoadingMap.isLoadingFinance
                                                        }
                                                        percentOf={getPercent(
                                                            financeData?.revenue
                                                                ?.indicator,
                                                            financeData
                                                                ?.operating_profit
                                                                ?.indicator
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid
                                                    item
                                                    size={6}
                                                >
                                                    <Indicator
                                                        title={
                                                            'Упущенная выручка'
                                                        }
                                                        indicator={
                                                            financeData
                                                                ?.lost_revenue
                                                                ?.indicator || 0
                                                        }
                                                        increaseView={true}
                                                        increase={
                                                            financeData
                                                                ?.lost_revenue
                                                                ?.increase || 0
                                                        }
                                                        prevPeriod={getDatePeriodShort(
                                                            datePeriod
                                                        )}
                                                        info={null}
                                                        reverse={false}
                                                        isLoading={
                                                            isLoadingMap.isLoadingFinance
                                                        }
                                                        percentOf={getPercent(
                                                            financeData?.revenue
                                                                ?.indicator,
                                                            financeData
                                                                ?.lost_revenue
                                                                ?.indicator
                                                        )}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        {/* Вторая строка: слева два индикатора столбиком, справа банковские счета */}
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
                                                    size={12}
                                                >
                                                    <Indicator
                                                        title={
                                                            'Заказы с оплатой а р/с'
                                                        }
                                                        indicator={
                                                            financeData
                                                                ?.orders_sum_beznal
                                                                ?.indicator || 0
                                                        }
                                                        increaseView={true}
                                                        increase={
                                                            financeData
                                                                ?.orders_sum_beznal
                                                                ?.increase || 0
                                                        }
                                                        prevPeriod={getDatePeriodShort(
                                                            datePeriod
                                                        )}
                                                        info={null}
                                                        reverse={false}
                                                        isLoading={
                                                            isLoadingMap.isLoadingFinance
                                                        }
                                                        percentOf={getPercent(
                                                            financeData?.revenue
                                                                ?.indicator,
                                                            financeData
                                                                ?.orders_sum_beznal
                                                                ?.indicator
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid
                                                    item
                                                    size={12}
                                                >
                                                    <Indicator
                                                        title={
                                                            'Входящие транзакции'
                                                        }
                                                        indicator={
                                                            financeData
                                                                ?.transactions_income
                                                                ?.indicator || 0
                                                        }
                                                        increaseView={true}
                                                        increase={
                                                            data?.finance
                                                                ?.orders
                                                                ?.increase || 0
                                                        }
                                                        prevPeriod={getDatePeriodShort(
                                                            datePeriod
                                                        )}
                                                        info={null}
                                                        reverse={false}
                                                        isLoading={
                                                            isLoadingMap.isLoadingFinance
                                                        }
                                                        navigateTo={
                                                            '/transactions'
                                                        }
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid
                                            item
                                            size={6}
                                        >
                                            <IndicatorWithScroll
                                                title={'Мои банковские счета'}
                                                leftColumnTitle={'Счета'}
                                                rightColumnTitle={
                                                    'Дата последней выписки'
                                                }
                                                isLoading={
                                                    isLoadingMap.isLoadingFinance
                                                }
                                                list={buildBankAccountsData(
                                                    financeData?.transaction_details ||
                                                        []
                                                )}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                            <div className={s.wrapperWithTitle}>
                                <TitleWithLink
                                    title="Исполнители"
                                    navigateTo={'/performers'}
                                />
                                <div className={s.finance}>
                                    <IndicatorWithChart
                                        width={'390px'}
                                        title={'Добавлены'}
                                        indicator={
                                            performersData?.added?.indicator ||
                                            0
                                        }
                                        increaseView={true}
                                        increase={
                                            performersData?.added?.increase || 0
                                        }
                                        prevPeriod={getDatePeriodShort(
                                            datePeriod
                                        )}
                                        info={null}
                                        reverse={false}
                                        isLoading={
                                            isLoadingMap.isLoadingPerformers
                                        }
                                        chartData={
                                            performersData?.graphics || []
                                        }
                                        chartConfig={{
                                            color: '#A59ADC',
                                            gradient: ['#A59ADC', '#8B7FD9'],
                                        }}
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
                                                title={'Отправлено приглашений'}
                                                indicator={
                                                    performersData?.invitations
                                                        ?.indicator || 0
                                                }
                                                increaseView={true}
                                                increase={
                                                    performersData?.invitations
                                                        ?.increase || 0
                                                }
                                                prevPeriod={getDatePeriodShort(
                                                    datePeriod
                                                )}
                                                info={null}
                                                reverse={false}
                                                isLoading={
                                                    isLoadingMap.isLoadingPerformers
                                                }
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            size={6}
                                        >
                                            <Indicator
                                                title={'Прошли регистрацию'}
                                                indicator={
                                                    performersData?.registered
                                                        ?.indicator || 0
                                                }
                                                increaseView={true}
                                                increase={
                                                    performersData?.registered
                                                        ?.increase || 0
                                                }
                                                prevPeriod={getDatePeriodShort(
                                                    datePeriod
                                                )}
                                                info={null}
                                                reverse={false}
                                                isLoading={
                                                    isLoadingMap.isLoadingPerformers
                                                }
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            size={6}
                                        >
                                            <Indicator
                                                title={'Вышли на первый заказ'}
                                                indicator={
                                                    performersData?.first_order
                                                        ?.indicator || 0
                                                }
                                                increaseView={true}
                                                increase={
                                                    performersData?.first_order
                                                        ?.increase || 0
                                                }
                                                prevPeriod={getDatePeriodShort(
                                                    datePeriod
                                                )}
                                                info={null}
                                                reverse={false}
                                                isLoading={
                                                    isLoadingMap.isLoadingPerformers
                                                }
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            size={6}
                                        >
                                            <Indicator
                                                title={'На заказах'}
                                                indicator={
                                                    performersData?.in_orders
                                                        ?.indicator || 0
                                                }
                                                increaseView={true}
                                                increase={
                                                    performersData?.in_orders
                                                        ?.increase || 0
                                                }
                                                prevPeriod={getDatePeriodShort(
                                                    datePeriod
                                                )}
                                                info={null}
                                                reverse={false}
                                                isLoading={
                                                    isLoadingMap.isLoadingPerformers
                                                }
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <Grid
                                    container
                                    spacing={3}
                                    sx={{
                                        marginTop: '12px',
                                    }}
                                >
                                    <Grid
                                        item
                                        size={6}
                                    >
                                        <div className={s.wrapperWithTitle}>
                                            <TitleWithLink
                                                title="Сотрудники"
                                                navigateTo={'/employees'}
                                            />
                                            <div
                                                className={s.indicatorsWrapper}
                                            >
                                                {' '}
                                                <IndicatorWithPoints
                                                    title="Менеджеры по персоналу"
                                                    data={buildSupervisorsData(
                                                        employeesData?.employees
                                                            ?.supervisor
                                                    )}
                                                    isLoading={
                                                        isLoadingMap.isLoadingEmployees
                                                    }
                                                />
                                                <IndicatorWithPoints
                                                    title="Клиентские менеджеры"
                                                    data={buildOperatorsData(
                                                        employeesData?.employees
                                                            ?.operator
                                                    )}
                                                    isLoading={
                                                        isLoadingMap.isLoadingEmployees
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid
                                        item
                                        size={6}
                                    >
                                        <div className={s.wrapperWithTitle}>
                                            <TitleWithLink
                                                title="Контрагенты"
                                                navigateTo={'/counterparties'}
                                            />
                                            <IndicatorWithScroll
                                                title="Тип должников"
                                                leftColumnTitle={'Заказчик'}
                                                rightColumnTitle={
                                                    'Задолженность'
                                                }
                                                isLoading={
                                                    isLoadingMap.isLoadingCounterparties
                                                }
                                                list={buildCounterpartiesData(
                                                    counterpartiesData || []
                                                )}
                                                navigateTo={'/counterparties'}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>

                        {/* Правая колонка – 3/12 (25%) */}
                        <div className={s.rightColumn}>
                            <div className={s.wrapperWithTitle}>
                                <TitleWithLink
                                    title="Заказы"
                                    navigateTo={'/orders'}
                                />
                                <Slider
                                    data={ordersData}
                                    prevPeriod={getDatePeriodShort(datePeriod)}
                                    isLoading={isLoadingMap.isLoadingOrders}
                                />
                            </div>
                            <div className={s.wrapperWithTitle}>
                                <TitleWithLink title="Приложение" />
                                <IndicatorWithPoints
                                    prevPeriod={getDatePeriodShort(datePeriod)}
                                    isLoading={isLoading}
                                    data={buildAppData(appData)}
                                />
                            </div>
                            <div className={s.wrapperWithTitle}>
                                <TitleWithLink
                                    title="Прогноз на конец сентября"
                                    size="medium"
                                />
                                <div className={s.forecastGrid}>
                                    {forecastingIndicators.map((item) => (
                                        <IndicatorForecasting
                                            key={item.key}
                                            title={item.title}
                                            value={
                                                forecastsData?.[item.key]
                                                    ?.indicator || 0
                                            }
                                            isLoading={
                                                isLoadingMap.isLoadingForecasts
                                            }
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </ThemeProvider>
            </main>
            {/* <FunnelChart /> */}
            {/* <IndicatorsFinance data={data?.finance} isLoading={isLoading} /> */}
        </div>
    );
};

export default Main;
