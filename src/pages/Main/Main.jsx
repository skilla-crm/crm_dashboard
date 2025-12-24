// Dependencies
import { useState } from 'react';
import { createTheme, Grid, ThemeProvider } from '@mui/material';
import { useSelector } from 'react-redux';

// Hooks
import { useMainDashboardData } from '../../hooks/useMainDashboardData';
import { useModal } from 'hooks/useModal';

// Components
import FiltersContainer from 'components/filters/FiltersContainer/FiltersContainer';

// Icons
import { ReactComponent as IconInfo } from 'components/indicators/Indicator/assets/iconinfo.svg';

// Blocks
import FinanceBlock from './blocks/FinanceBlock/FinanceBlock';
import PerformersBlock from './blocks/PerformersBlock/PerformersBlock';
import EmployeesBlock from './blocks/EmployeesBlock/EmployeesBlock';
import CounterpartiesBlock from './blocks/CounterpartiesBlock/CounterpartiesBlock';
import OrdersBlock from './blocks/OrdersBlock/OrdersBlock';
import AppBlock from './blocks/AppBlock/AppBlock';
import ForecastBlock from './blocks/ForecastBlock/ForecastBlock';
import { forecastingIndicators } from './blocks/ForecastBlock/forecastingIndicators';

// Styles
import s from './Main.module.scss';

const Main = () => {
    const { datePeriod } = useSelector((state) => state.dateRange || {});
    const { showModal } = useModal();

    const {
        errorMap,
        refetchMap,
        isLoading,
        isFetching,
        ordersData,
        forecastsData,
        financeData,
        appData,
        isLoadingMap,
        performersData,
        counterpartiesData,
        employeesData,
    } = useMainDashboardData();

    const theme = createTheme({
        spacing: 4,
    });
    return (
        <div className={s.root}>
            <header className={s.header}>
                <div className={s.headerTitle}>
                    {' '}
                    <h2>Дашборд</h2>
                    <button
                        className={s.iconInfo}
                        onClick={() => {
                            showModal('MAIN_INFO');
                        }}
                    >
                        <IconInfo />
                    </button>
                </div>
                <div className={s.headerBtns}>
                    <FiltersContainer
                        isFetching={isFetching}
                        isLoading={isLoading}
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
                <div className={s.mainColumns}>
                    <div className={s.leftColumn}>
                        <ThemeProvider theme={theme}>
                            <Grid
                                container
                                size={12}
                                spacing={6}
                                sx={{ flexDirection: 'column' }}
                            >
                                <Grid
                                    item
                                    size={12}
                                >
                                    <FinanceBlock
                                        data={financeData}
                                        isLoading={
                                            isLoadingMap.isLoadingFinance
                                        }
                                        datePeriod={datePeriod}
                                        error={errorMap.financeError}
                                        refetch={refetchMap.refetchFinance}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    size={12}
                                >
                                    <PerformersBlock
                                        performersData={performersData}
                                        isLoading={
                                            isLoadingMap.isLoadingPerformers
                                        }
                                        datePeriod={datePeriod}
                                        error={errorMap.performersError}
                                        refetch={refetchMap.refetchPerformers}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    size={12}
                                    container
                                >
                                    <EmployeesBlock
                                        employeesData={employeesData}
                                        isLoading={
                                            isLoadingMap.isLoadingEmployees
                                        }
                                        datePeriod={datePeriod}
                                        error={errorMap.employeesError}
                                        refetch={refetchMap.refetchEmployees}
                                    />
                                    <CounterpartiesBlock
                                        counterpartiesData={counterpartiesData}
                                        isLoading={
                                            isLoadingMap.isLoadingCounterparties
                                        }
                                        error={errorMap.counterpartiesError}
                                        refetch={
                                            refetchMap.refetchCounterparties
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </ThemeProvider>
                    </div>

                    <div className={s.rightColumn}>
                        <OrdersBlock
                            ordersData={ordersData}
                            isLoading={isLoadingMap.isLoadingOrders}
                            datePeriod={datePeriod}
                            error={errorMap.ordersError}
                            refetch={refetchMap.refetchOrders}
                        />
                        <AppBlock
                            appData={appData}
                            isLoading={isLoadingMap.isLoadingApp}
                            datePeriod={datePeriod}
                            error={errorMap.appError}
                            refetch={refetchMap.refetchApp}
                        />
                        <ForecastBlock
                            forecastsData={forecastsData}
                            isLoading={isLoadingMap.isLoadingForecasts}
                            forecastingIndicators={forecastingIndicators}
                            error={errorMap.forecastsError}
                            refetch={refetchMap.refetchForecasts}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Main;
