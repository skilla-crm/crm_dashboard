import { useState } from "react";
import Grid from "@mui/material/Grid";

// assets
import { ReactComponent as IconBackForward } from "assets/icons/iconBackForwardBlack.svg";

// components
import DateFilter from "components/filters/DateFilter/DateFilter";
import Indicator from "components/indicators/Indicator/Indicator";
import IndicatorWithList from "components/indicators/IndicatorWithList/IndicatorWithList";

// hooks
import { useModal } from "hooks/useModal";

// redux
import { useSelector } from "react-redux";
import { useGetFinanceQuery } from "../../redux/financeApiActions";

// utils
import { getDatePeriodShort } from "utils/datePeriodMap";
import {
  mapFinanceIndicators,
  mapTransactions,
} from "../../utils/financeChartMapper";

// local components
import FinanceDiagram from "./components/FinanceDiagram/FinanceDiagram";

// constants
import {
  FINANCE_STATISTICS_SERIES,
  INDICATORS_CONFIG,
  TRANSACTION_SERIES,
} from "./config";

// styles
import s from "./Finance.module.scss";

const formatCurrency = (value) =>
  typeof value === "number"
    ? value.toLocaleString("ru-RU", { maximumFractionDigits: 0 })
    : "—";

const Finance = () => {
  const { showModal } = useModal();
  const [activeFilter, setActiveFilter] = useState(null);
  const { dateStartPicker, dateEndPicker, datePeriod } = useSelector(
    (state) => state.dateRange || {}
  );
  const prevPeriod = getDatePeriodShort(datePeriod);

  const params = {
    "filter[date_start]": dateStartPicker,
    "filter[date_end]": dateEndPicker,
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
        <h2 onClick={() => showModal("FINANCE_INFO")}>
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
          <Grid container spacing={1.5} className={s.indicators}>
            {INDICATORS_CONFIG.map((config) => {
              const indicatorData = finance_indicators?.[config.dataKey];
              const getValue = (value) =>
                typeof value === "function" ? value(finance_indicators) : value;

              return (
                <Grid key={config.dataKey} item size={6}>
                  <Indicator
                    title={config.title}
                    indicator={
                      indicatorData?.indicator ?? config.indicatorFallback
                    }
                    increase={
                      indicatorData?.increase ?? config.increaseFallback
                    }
                    prevPeriod={prevPeriod}
                    info={null}
                    reverse={getValue(config.reverse)}
                    increaseView={getValue(config.increaseView)}
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
            navigateTo="https://lk.skilla.ru/new/bank"
            data={finance_indicators?.last_transactions || []}
          />
        </div>
      </main>
    </div>
  );
};

export default Finance;
