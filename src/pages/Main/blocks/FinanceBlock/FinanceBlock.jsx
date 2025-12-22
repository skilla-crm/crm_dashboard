// Dependencies
import { Grid, ThemeProvider, createTheme } from "@mui/material";

// Components
import Indicator from "components/indicators/Indicator/Indicator";
import IndicatorWithChart from "components/indicators/IndicatorWithChart/IndicatorWithChart";
import IndicatorWithScroll from "components/indicators/IndicatorWithScroll/IndicatorWithScroll";
import TitleWithLink from "components/ui/TitleWithLink/TitleWithLink";

// Utils
import { getDatePeriodShort } from "utils/datePeriodMap";
import getPercent from "utils/getPercent";
import buildBankAccountsData from "../../mapers/buildBankAccountsData";

const theme = createTheme({
  spacing: 4,
});

const FinanceBlock = ({ financeData, isLoading, datePeriod, data }) => {
  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={3} sx={{ flexDirection: "column" }}>
        <Grid item size={12}>
          <TitleWithLink 
            title="Финансы" 
            navigateTo={"/finance"}
            state={{ from: "/" }}
          />
        </Grid>
        <Grid container item size={12}>
          <Grid item size={4} spacing={3}>
            <IndicatorWithChart
              title={"Выручка"}
              indicator={financeData?.revenue?.indicator || 0}
              increaseView={true}
              increase={financeData?.revenue?.increase || 0}
              prevPeriod={getDatePeriodShort(datePeriod)}
              info={null}
              reverse={false}
              isLoading={isLoading}
              chartData={financeData?.revenue?.graphics || []}
              chartConfig={{
                color: "#7499E8",
                gradient: ["#7499E8", "#4A6BC4"],
              }}
            />
          </Grid>
          <Grid container spacing={3} item size={8}>
            <Grid item size={6}>
              <Indicator
                title={"Комиссия"}
                indicator={financeData?.marginal_profit?.indicator || 0}
                increaseView={true}
                increase={financeData?.marginal_profit?.increase || 0}
                prevPeriod={getDatePeriodShort(datePeriod)}
                reverse={true}
                isLoading={isLoading}
                percentOf={getPercent(
                  financeData?.revenue?.indicator,
                  financeData?.marginal_profit?.indicator
                )}
              />
            </Grid>
            <Grid item size={6}>
              <Indicator
                title={"Расходы"}
                indicator={financeData?.costs_total?.indicator || 0}
                increaseView={true}
                increase={financeData?.costs_total?.increase || 0}
                prevPeriod={getDatePeriodShort(datePeriod)}
                reverse={true}
                isLoading={isLoading}
                percentOf={getPercent(
                  financeData?.revenue?.indicator,
                  financeData?.costs_total?.indicator
                )}
              />
            </Grid>
            <Grid item size={6}>
              <Indicator
                title={"Прибыль"}
                indicator={financeData?.operating_profit?.indicator || 0}
                increaseView={true}
                increase={financeData?.operating_profit?.increase || 0}
                prevPeriod={getDatePeriodShort(datePeriod)}
                info={null}
                reverse={true}
                isLoading={isLoading}
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
                prevPeriod={getDatePeriodShort(datePeriod)}
                info={null}
                reverse={false}
                isLoading={isLoading}
                percentOf={getPercent(
                  financeData?.revenue?.indicator,
                  financeData?.lost_revenue?.indicator
                )}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item container size={12}>
          <Grid container spacing={3} size={4}>
            <Grid item size={12}>
              <Indicator
                title={"Заказы с оплатой а р/с"}
                indicator={financeData?.orders_sum_beznal?.indicator || 0}
                increaseView={true}
                increase={financeData?.orders_sum_beznal?.increase || 0}
                prevPeriod={getDatePeriodShort(datePeriod)}
                info={null}
                reverse={false}
                isLoading={isLoading}
                percentOf={getPercent(
                  financeData?.revenue?.indicator,
                  financeData?.orders_sum_beznal?.indicator
                )}
              />
            </Grid>
            <Grid item size={12}>
              <Indicator
                title={"Входящие транзакции"}
                indicator={financeData?.transactions_income?.indicator || 0}
                increaseView={true}
                increase={data?.finance?.orders?.increase || 0}
                prevPeriod={getDatePeriodShort(datePeriod)}
                info={null}
                reverse={false}
                isLoading={isLoading}
                navigateTo={"https://lk.skilla.ru/new/bank"}
                navigateToNewTab={true}
              />
            </Grid>
          </Grid>
          <Grid item size={8}>
            <IndicatorWithScroll
              title={"Мои банковские счета"}
              leftColumnTitle={"Счета"}
              rightColumnTitle={"Дата последней выписки"}
              isLoading={isLoading}
              list={buildBankAccountsData(
                financeData?.transaction_details || []
              )}
              navigateTo={"https://lk.skilla.ru/new/bank?section=detail"}
              navigateToNewTab={true}
            />
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default FinanceBlock;
