// Dependencies
import { Grid, ThemeProvider, createTheme } from "@mui/material";

// Components
import Indicator from "components/indicators/Indicator/Indicator";
import IndicatorWithChart from "components/indicators/IndicatorWithChart/IndicatorWithChart";
import IndicatorWithScroll from "components/indicators/IndicatorWithScroll/IndicatorWithScroll";
import TitleWithLink from "components/ui/TitleWithLink/TitleWithLink";

// Icons
import { ReactComponent as IconPlusBlue } from "assets/icons/iconPlusBlue.svg";

// Utils
import { getDatePeriodShort } from "utils/datePeriodMap";
import getPercent from "utils/getPercent";
import buildBankAccountsData from "../../mapers/buildBankAccountsData";
import ErrorMessage from "components/ui/ErrorMessage/ErrorMessage";
import classNames from "classnames";

// Styles
import s from "./FinanceBlock.module.scss";

const theme = createTheme({
  spacing: 4,
});

const FinanceBlock = ({ data, isLoading, datePeriod, error, refetch }) => {
  const buttonAddBankAccountConfig = {
    buttonText: "Добавить заказ",
    onButtonClick: () => {
      window.open("https://lk.skilla.ru/new/bank?section=detail", "_blank");
    },
    buttonIcon: IconPlusBlue,
  };
  const buttonAddOrderConfig = {
    buttonText: "Добавить счет",
    onButtonClick: () => {
      window.open("https://lk.skilla.ru/new/orders/create", "_blank");
    },
    buttonIcon: IconPlusBlue,
  };

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

        <Grid item size={12} className={s.contentWrapper}>
          <ErrorMessage refetch={refetch} error={error} isLoading={isLoading} />

          <div
            className={classNames(s.content, {
              [s.contentBlurred]: error && !isLoading,
            })}
          >
            <Grid container spacing={3}>
              <Grid item size={4}>
                <IndicatorWithChart
                  title={"Выручка"}
                  indicator={data?.revenue?.indicator || 0}
                  increaseView={true}
                  increase={data?.revenue?.increase || 0}
                  prevPeriodIndicator={
                    data?.revenue?.prev_period_indicator || 0
                  }
                  prevPeriod={getDatePeriodShort(datePeriod)}
                  info={null}
                  reverse={false}
                  isLoading={isLoading}
                  chartData={data?.revenue?.graphics || []}
                  chartConfig={{
                    color: "#7499E8",
                    gradient: ["#7499E8", "#4A6BC4"],
                  }}
                  buttonConfig={buttonAddOrderConfig}
                />
              </Grid>
              <Grid container spacing={3} item size={8}>
                <Grid item size={6}>
                  <Indicator
                    title={"Комиссия"}
                    prevPeriodIndicator={
                      data?.marginal_profit?.prev_period_indicator || 0
                    }
                    indicator={data?.marginal_profit?.indicator || 0}
                    increaseView={true}
                    increase={data?.marginal_profit?.increase || 0}
                    prevPeriod={getDatePeriodShort(datePeriod)}
                    reverse={true}
                    isLoading={isLoading}
                    percentOf={getPercent(
                      data?.revenue?.indicator,
                      data?.marginal_profit?.indicator
                    )}
                  />
                </Grid>
                <Grid item size={6}>
                  <Indicator
                    title={"Расходы"}
                    prevPeriodIndicator={
                      data?.costs_total?.prev_period_indicator || 0
                    }
                    indicator={data?.costs_total?.indicator || 0}
                    increaseView={true}
                    increase={data?.costs_total?.increase || 0}
                    prevPeriod={getDatePeriodShort(datePeriod)}
                    reverse={true}
                    isLoading={isLoading}
                    percentOf={getPercent(
                      data?.revenue?.indicator,
                      data?.costs_total?.indicator
                    )}
                  />
                </Grid>
                <Grid item size={6}>
                  <Indicator
                    title={"Прибыль"}
                    prevPeriodIndicator={
                      data?.operating_profit?.prev_period_indicator || 0
                    }
                    indicator={data?.operating_profit?.indicator || 0}
                    increaseView={true}
                    increase={data?.operating_profit?.increase || 0}
                    prevPeriod={getDatePeriodShort(datePeriod)}
                    info={null}
                    reverse={false}
                    isLoading={isLoading}
                    percentOf={getPercent(
                      data?.revenue?.indicator,
                      data?.operating_profit?.indicator
                    )}
                  />
                </Grid>
                <Grid item size={6}>
                  <Indicator
                    title={"Упущенная выручка"}
                    prevPeriodIndicator={
                      data?.lost_revenue?.prev_period_indicator || 0
                    }
                    indicator={data?.lost_revenue?.indicator || 0}
                    increaseView={true}
                    increase={data?.lost_revenue?.increase || 0}
                    prevPeriod={getDatePeriodShort(datePeriod)}
                    info={null}
                    reverse={true}
                    isLoading={isLoading}
                    percentOf={getPercent(
                      data?.revenue?.indicator,
                      data?.lost_revenue?.indicator
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3} size={12}>
                <Grid item size={4}>
                  <Grid container spacing={3}>
                    <Grid item size={12}>
                      <Indicator
                        title={"Заказы с оплатой на р/с"}
                        prevPeriodIndicator={
                          data?.orders_sum_beznal?.prev_period_indicator || 0
                        }
                        indicator={data?.orders_sum_beznal?.indicator || 0}
                        increaseView={true}
                        increase={data?.orders_sum_beznal?.increase || 0}
                        prevPeriod={getDatePeriodShort(datePeriod)}
                        info={null}
                        reverse={false}
                        isLoading={isLoading}
                        percentOf={getPercent(
                          data?.revenue?.indicator,
                          data?.orders_sum_beznal?.indicator
                        )}
                      />
                    </Grid>
                    <Grid item size={12}>
                      <Indicator
                        title={"Входящие транзакции"}
                        indicator={data?.transactions_income?.indicator || 0}
                        increaseView={true}
                        increase={data?.transactions_income?.increase || 0}
                        prevPeriod={getDatePeriodShort(datePeriod)}
                        reverse={false}
                        prevPeriodIndicator={
                          data?.transactions_income?.prev_period_indicator || 0
                        }
                        isLoading={isLoading}
                        navigateTo={"https://lk.skilla.ru/new/bank"}
                        navigateToNewTab={true}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item size={8}>
                  <IndicatorWithScroll
                    height={282}
                    title={"Мои банковские счета"}
                    leftColumnTitle={"Счета"}
                    rightColumnTitle={"Дата последней выписки"}
                    isLoading={isLoading}
                    list={buildBankAccountsData(
                      data?.transaction_details || []
                    )}
                    navigateTo={"https://lk.skilla.ru/new/bank?section=detail"}
                    navigateToNewTab={true}
                    buttonConfig={buttonAddBankAccountConfig}
                  />
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default FinanceBlock;
