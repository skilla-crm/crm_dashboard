// Dependencies
import { useState } from "react";
import { createTheme, Grid, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";

// Hooks
import { useMainDashboardData } from "../../hooks/useMainDashboardData";

// Components
import DateFilter from "components/filters/DateFilter/DateFilter";
import FunnelChart from "components/diagrams/FunnelChart/FunnelChart";
import Indicator from "components/indicators/Indicator/Indicator";
import IndicatorForecasting from "components/indicators/IndicatorForecasting/IndicatorForecasting";
import IndicatorWithChart from "components/indicators/IndicatorWithChart/IndicatorWithChart";
import IndicatorWithList from "components/indicators/IndicatorWithList/IndicatorWithList";
import IndicatorWithPoints from "components/indicators/IndicatorWithPoints/IndicatorWithPoints";
import Slider from "components/indicators/Slider/Slider";
import TitleWithLink from "components/ui/TitleWithLink/TitleWithLink";
import UniButton from "components/ui/UniButton/UniButton";

// Assets
import { ReactComponent as IconSave } from "assets/icons/iconDoneWhite.svg";
import { ReactComponent as IconSettings } from "assets/icons/iconSettings.svg";

// Utils
import { getDatePeriodShort } from "utils/datePeriodMap";
import buildAppData from "./mapers/buildAppData";

// Styles
import s from "./Main.module.scss";
import getPercent from "utils/getPercent";
import IndicatorWithScroll from "components/indicators/IndicatorWithScroll/IndicatorWithScroll";

const mockAppData = {
  registered_percent: {
    indicator: 75,
    prev_period_indicator: 44.44,
    increase: 40.74,
  },
  completed_order_percent: {
    indicator: 400,
    prev_period_indicator: 200,
    increase: 50,
  },
  smz_percent: {
    indicator: 0,
    prev_period_indicator: 0,
    increase: 0,
  },
  smz_pay_percent: {
    indicator: 0,
    prev_period_indicator: 0,
    increase: 0,
  },
};
const Main = () => {
  const [period, setPeriod] = useState("month");
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
  } = useMainDashboardData(period);
  console.log(financeData);

  const clearActiveFilter = () => {
    setActiveFilter(null);
  };

  const forecastingIndicators = [
    {
      key: "marginal_profit",
      title: "Маржинальная прибыль",
    },
    {
      key: "operating_profit",
      title: "Операционная прибыль",
    },
    {
      key: "orders_count",
      title: "Количество заказов",
    },
    {
      key: "revenue",
      title: "Выручка",
    },
    {
      key: "expenses_costs",
      title: "Выплаты исполнителям",
    },
    {
      key: "permanent_costs",
      title: "Закупки и ручной учет",
    },
  ];

  // const performersNewData = [
  //     {
  //         key: 'added',
  //         title: 'добавлены',
  //         indicator: newPerformers?.added?.indicator || 0,
  //         increase: newPerformers?.added?.increase || 0,
  //         prev_period_indicator:
  //             newPerformers?.added?.prev_period_indicator || 0,
  //         isPercent: false,
  //     },
  //     {
  //         key: 'invitations',
  //         title: 'отправлено приглашений',
  //         indicator: newPerformers?.invitations?.indicator || 0,
  //         increase: newPerformers?.invitations?.increase || 0,
  //         prev_period_indicator:
  //             newPerformers?.invitations?.prev_period_indicator || 0,
  //         isPercent: false,
  //     },
  //     {
  //         key: 'registered',
  //         title: 'прошли регистрацию',
  //         indicator: newPerformers?.registered?.indicator || 0,
  //         increase: newPerformers?.registered?.increase || 0,
  //         prev_period_indicator:
  //             newPerformers?.registered?.prev_period_indicator || 0,
  //         isPercent: false,
  //     },
  //     {
  //         key: 'first_login',
  //         title: 'вышли на первый заказ',
  //         indicator: newPerformers?.first_login?.indicator || 0,
  //         increase: newPerformers?.first_login?.increase || 0,
  //         prev_period_indicator:
  //             newPerformers?.first_login?.prev_period_indicator || 0,
  //         isPercent: false,
  //     },
  // ];

  // const performersAppData = [
  //     {
  //         key: 'total_percentage_workers',
  //         title: 'от общего списка',
  //         indicator: appPerformers?.total_percentage_workers?.indicator || 0,
  //         increase: appPerformers?.total_percentage_workers?.increase || 0,
  //         prev_period_indicator:
  //             appPerformers?.total_percentage_workers
  //                 ?.prev_period_indicator || 0,
  //         isPercent: true,
  //     },
  //     {
  //         key: 'total_percentage_order_workers',
  //         title: 'от общего кол-ва исп. на заказах',
  //         indicator:
  //             appPerformers?.total_percentage_order_workers?.indicator || 0,
  //         increase:
  //             appPerformers?.total_percentage_order_workers?.increase || 0,
  //         prev_period_indicator:
  //             appPerformers?.total_percentage_order_workers
  //                 ?.prev_period_indicator || 0,
  //         isPercent: true,
  //     },
  // ];

  // const employeesData = [
  //     {
  //         key: 'plan_fact',
  //         title: 'план-факт по заказам',
  //         indicator: employees?.plan_fact?.indicator || 0,
  //         increase: employees?.plan_fact?.increase || 0,
  //         prev_period_indicator:
  //             employees?.plan_fact?.prev_period_indicator || 0,
  //         isPercent: true,
  //         progress: true,
  //     },
  //     {
  //         key: 'supervisor_sum',
  //         title: 'комиссии',
  //         indicator: employees?.supervisor_sum?.indicator || 0,
  //         increase: employees?.supervisor_sum?.increase || 0,
  //         prev_period_indicator:
  //             employees?.supervisor_sum?.prev_period_indicator || 0,
  //         isPercent: false,
  //     },
  //     {
  //         key: 'operator',
  //         title: 'операторы',
  //         indicator: employees?.operator?.indicator || 0,
  //         increase: employees?.operator?.increase || 0,
  //         prev_period_indicator:
  //             employees?.operator?.prev_period_indicator || 0,
  //         isPercent: true,
  //     },
  // ];

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
                <TitleWithLink title="Финансы" navigateTo={"/finance"} />
                <div className={s.finance}>
                  <IndicatorWithChart
                    width={"390px"}
                    title={"Выручка"}
                    indicator={financeData?.revenue?.indicator || 0}
                    increaseView={true}
                    increase={financeData?.revenue?.increase || 0}
                    prevPeriod={getDatePeriodShort(datePeriod)}
                    info={null}
                    reverse={false}
                    isLoading={isLoadingMap.isLoadingFinance}
                    chartData={financeData?.revenue?.graphics || []}
                    chartConfig={{
                      color: "#7499E8",
                      gradient: ["#7499E8", "#4A6BC4"],
                    }}
                  />
                  <Grid
                    container
                    spacing={3}
                    // className={s.financeGrid}
                  >
                    <Grid item size={6}>
                      <Indicator
                        title={"Комиссия"}
                        indicator={financeData?.marginal_profit?.indicator || 0}
                        increaseView={true}
                        increase={financeData?.marginal_profit?.increase || 0}
                        prevPeriod={getDatePeriodShort(datePeriod)}
                        reverse={true}
                        isLoading={isLoadingMap.isLoadingFinance}
                        percentOf={getPercent(
                          financeData?.revenue?.indicator,
                          financeData?.marginal_profit?.indicator
                        )}
                      />
                    </Grid>
                    <Grid item size={6}>
                      <Indicator
                        title={"Расходы"}
                        indicator={financeData?.costs?.total?.indicator || 0}
                        increaseView={true}
                        increase={financeData?.costs?.total?.increase || 0}
                        prevPeriod={getDatePeriodShort(datePeriod)}
                        reverse={true}
                        isLoading={isLoadingMap.isLoadingFinance}
                        percentOf={getPercent(
                          financeData?.revenue?.indicator,
                          financeData?.costs?.total?.indicator
                        )}
                      />
                    </Grid>
                    <Grid item size={6}>
                      <Indicator
                        title={"Прибыль"}
                        indicator={
                          financeData?.operating_profit?.indicator || 0
                        }
                        increaseView={true}
                        increase={financeData?.operating_profit?.increase || 0}
                        prevPeriod={getDatePeriodShort(datePeriod)}
                        info={null}
                        reverse={true}
                        isLoading={isLoadingMap.isLoadingFinance}
                        percentOf={getPercent(
                          financeData?.revenue?.indicator,
                          financeData?.operating_profit?.indicator
                        )}
                      />
                    </Grid>
                    <Grid item size={6}>
                      <Indicator
                        title={"Упущенная выручка"}
                        indicator={financeData?.lost_revenue?.indicator || 0}
                        increaseView={true}
                        increase={financeData?.lost_revenue?.increase || 0}
                        pprevPeriod={getDatePeriodShort(datePeriod)}
                        info={null}
                        reverse={false}
                        isLoading={isLoadingMap.isLoadingFinance}
                        percentOf={getPercent(
                          financeData?.revenue?.indicator,
                          financeData?.lost_revenue?.indicator
                        )}
                      />
                    </Grid>
                    <Grid item size={12}>
                      <IndicatorWithScroll
                        title={"Мои банковские счета"}
                        leftColumnTitle={"Счета"}
                        rightColumnTitle={"Дата последней выписки"}
                        isLoading={isLoadingMap.isLoadingFinance}
                      />
                    </Grid>
                    <Grid item size={6}>
                      <Indicator
                        title={"Заказы с оплатой а р/с"}
                        indicator={
                          financeData?.orders_sum_beznal?.indicator || 0
                        }
                        increaseView={true}
                        increase={financeData?.orders_sum_beznal?.increase || 0}
                        prevPeriod={getDatePeriodShort(datePeriod)}
                        info={null}
                        reverse={false}
                        isLoading={isLoadingMap.isLoadingFinance}
                        percentOf={getPercent(
                          financeData?.revenue?.indicator,
                          financeData?.orders_sum_beznal?.indicator
                        )}
                      />
                    </Grid>
                    <Grid item size={6}>
                      <Indicator
                        title={"Входящие транзакции"}
                        indicator={
                          financeData?.transactions_income?.indicator || 0
                        }
                        increaseView={true}
                        increase={data?.finance?.orders?.increase || 0}
                        prevPeriod={getDatePeriodShort(datePeriod)}
                        info={null}
                        reverse={false}
                        isLoading={isLoadingMap.isLoadingFinance}
                      />
                    </Grid>
                  </Grid>
                </div>
              </div>
              <Grid container spacing={5} sx={{ mt: "12px" }}></Grid>
            </div>

            {/* Правая колонка – 3/12 (25%) */}
            <div className={s.rightColumn}>
              <div className={s.wrapperWithTitle}>
                <TitleWithLink title="Заказы" navigateTo={"/orders"} />
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
                <Grid container spacing={3}>
                  {forecastingIndicators.map((item) => (
                    <Grid item size={6} key={item.key}>
                      <IndicatorForecasting
                        title={item.title}
                        value={forecastsData?.[item.key]?.indicator || 0}
                      />
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </main>
      <FunnelChart />
      {/* <IndicatorsFinance data={data?.finance} isLoading={isLoading} /> */}
    </div>
  );
};

export default Main;
//  <Grid
//                                             item
//                                             size={12}
//                                         >
//                                             <TitleWithLink
//                                                 title="Контрагенты"
//                                                 navigateTo={'/counterparties'}
//                                             />
//                                             <Grid
//                                                 spacing={3}
//                                                 container
//                                                 size={12}
//                                             >
//                                                 {' '}
//                                                 <Grid
//                                                     item
//                                                     size={6}
//                                                 >
//                                                     <IndicatorCounterparties
//                                                         title={'Выручка'}
//                                                         data={
//                                                             data?.counterparties
//                                                         }
//                                                         isLoading={isLoading}
//                                                     />
//                                                 </Grid>
//                                                 <Grid
//                                                     item
//                                                     size={6}
//                                                 >
//                                                     <HalfCircleDiagram
//                                                         title="Закрывающие документы"
//                                                         data={
//                                                             data?.counterparties
//                                                                 ?.docs
//                                                         }
//                                                         isLoading={isLoading}
//                                                     />
//                                                 </Grid>
//                                             </Grid>
//                                         </Grid>
{
  /* <Grid item size={6}>
  <Grid container spacing={5} sx={{ flexDirection: "column" }}>
    <Grid item size={12}>
      <TitleWithLink
        title="Исполнители"
        navigateTo={"/performers"}
        size="medium"
      />
      <div className={s.indicatorsWrapper}>
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
</Grid>; */
}
{
  /* <Grid item size={6}>
  <Grid container spacing={5} sx={{ flexDirection: "column" }}>
    <Grid item size={12}>
      <TitleWithLink title="Реклама" navigateTo={"/advertising"} />
      <Grid container spacing={3}>
        <Grid item size={6}>
          <Indicator
            title={"CTR"}
            indicator={data?.advertising?.ctr?.indicator || 0}
            increaseView={true}
            increase={data?.advertising?.ctr?.increase || 0}
            prevPeriod={"авг"}
            info={null}
            reverse={false}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item size={6}>
          <Indicator
            title={"Средняя цена клика"}
            indicator={data?.advertising?.average_price_click?.indicator || 0}
            increaseView={true}
            increase={data?.advertising?.average_price_click?.increase || 0}
            prevPeriod={"авг"}
            info={null}
            reverse={true}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item size={6}>
          <Indicator
            title={"Конверсия клик→звонок"}
            indicator={
              data?.advertising?.conversion_click_to_call?.indicator || 0
            }
            increaseView={true}
            increase={
              data?.advertising?.conversion_click_to_call?.increase || 0
            }
            prevPeriod={"авг"}
            info={null}
            reverse={false}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item size={6}>
          <Indicator
            title={"Средняя цена звонка"}
            indicator={data?.advertising?.average_price_call?.indicator || 0}
            increaseView={true}
            increase={data?.advertising?.average_price_call?.increase || 0}
            prevPeriod={"авг"}
            info={null}
            reverse={true}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item size={6}>
          <Indicator
            title={"Конверсия звонок→заказ"}
            indicator={
              data?.advertising?.conversion_call_to_order?.indicator || 0
            }
            increaseView={true}
            increase={
              data?.advertising?.conversion_call_to_order?.increase || 0
            }
            prevPeriod={"авг"}
            info={null}
            reverse={false}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item size={6}>
          <Indicator
            title={"Средняя цена заказа"}
            indicator={data?.advertising?.average_price_order?.indicator || 0}
            increaseView={true}
            increase={data?.advertising?.average_price_order?.increase || 0}
            prevPeriod={"авг"}
            info={null}
            reverse={true}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </Grid>
    <Grid item size={12}>
      <div className={s.employees}>
        <TitleWithLink
          title="Сотрудники"
          navigateTo={"/employees"}
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
</Grid>; */
}
