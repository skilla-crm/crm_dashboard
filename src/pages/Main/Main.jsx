// Dependencies
import { useState } from "react";
import { createTheme, Grid, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";

// Hooks
import { useMainDashboardData } from "../../hooks/useMainDashboardData";
import { useModal } from "hooks/useModal";

// Components
import FiltersContainer from "components/filters/FiltersContainer/FiltersContainer";

// Icons
import { ReactComponent as IconInfo } from "components/indicators/Indicator/assets/iconinfo.svg";

// Blocks
import FinanceBlock from "./blocks/FinanceBlock/FinanceBlock";
import PerformersBlock from "./blocks/PerformersBlock/PerformersBlock";
import EmployeesBlock from "./blocks/EmployeesBlock/EmployeesBlock";
import CounterpartiesBlock from "./blocks/CounterpartiesBlock/CounterpartiesBlock";
import OrdersBlock from "./blocks/OrdersBlock/OrdersBlock";
import AppBlock from "./blocks/AppBlock/AppBlock";
import ForecastBlock from "./blocks/ForecastBlock/ForecastBlock";
import { forecastingIndicators } from "./blocks/ForecastBlock/forecastingIndicators";

// Styles
import s from "./Main.module.scss";

const Main = () => {

  
  const { datePeriod } = useSelector((state) => state.dateRange || {});
  const { showModal } = useModal();

  const {
    isLoading,
    isFetching,
    data,
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
          {" "}
          <h2>Дашборд</h2>
          <button
            className={s.iconInfo}
            onClick={() => {
              showModal("MAIN_INFO");
            }}
          >
            <IconInfo />
          </button>
        </div>
        <div className={s.headerBtns}>
          <FiltersContainer isFetching={isFetching} isLoading={isLoading} />
          
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
                sx={{ flexDirection: "column" }}
              >
                <Grid item size={12}>
                  <FinanceBlock
                    financeData={financeData}
                    isLoading={isLoadingMap.isLoadingFinance}
                    datePeriod={datePeriod}
                    data={data}
                  />
                </Grid>
                <Grid item size={12}>
                  <PerformersBlock
                    performersData={performersData}
                    isLoading={
                      isLoadingMap.isLoadingPerformers ||
                      isLoadingMap.isLoadingFinance
                    }
                    datePeriod={datePeriod}
                  />
                </Grid>
                <Grid item size={12} container>
                  <EmployeesBlock
                    employeesData={employeesData}
                    isLoading={
                      isLoadingMap.isLoadingEmployees ||
                      isLoadingMap.isLoadingFinance
                    }
                  />
                  <CounterpartiesBlock
                    counterpartiesData={counterpartiesData}
                    isLoading={
                      isLoadingMap.isLoadingCounterparties ||
                      isLoadingMap.isLoadingFinance
                    }
                  />
                </Grid>
              </Grid>
            </ThemeProvider>
          </div>

          <div className={s.rightColumn}>
            <OrdersBlock
              ordersData={ordersData}
              isLoading={
                isLoadingMap.isLoadingOrders || isLoadingMap.isLoadingFinance
              }
              datePeriod={datePeriod}
            />
            <AppBlock
              appData={appData}
              isLoading={
                isLoadingMap.isLoadingApp || isLoadingMap.isLoadingFinance
              }
              datePeriod={datePeriod}
            />
            <ForecastBlock
              forecastsData={forecastsData}
              isLoading={
                isLoadingMap.isLoadingForecasts || isLoadingMap.isLoadingFinance
              }
              forecastingIndicators={forecastingIndicators}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
