import s from "./Orders.module.scss";
import FiltersContainer from "components/filters/FiltersContainer/FiltersContainer";
import { ReactComponent as IconBackForward } from "assets/icons/iconBackForwardBlack.svg";
// api
import { useGetOrdersQuery } from "../../redux/ordersApiActions";
// redux
import { useSelector } from "react-redux";
// hooks
import { useDashboardNavigation } from "hooks/useDashboardNavigation";
// components
import Indicator from "components/indicators/Indicator/Indicator";
// utils
import { getDatePeriodShort } from "utils/datePeriodMap";

import OrderPageChart from "./OrderPageChart/OrderPageChart";
import {
  PLAN_FACT_SERIES,
  CLOSED_ORDERS_SERIES,
  PERFORMERS_ON_ORDERS_SERIES,
  addTitlesToProcessOrders,
  addTitlesToPaymentOrders,
} from "./config";
import { getDateTicks } from "utils/getDataTicks";
import DonutChart from "./DonutChart/DonutChart";

const closed_orders = {
  indicator: 12,
  prev_period_indicator: 0,
  increase: 2334,
};
const orders_sum = {
  indicator: 0,
  prev_period_indicator: 0,
  increase: 0,
};
const average_workers_in_order_count = {
  indicator: 0,
  prev_period_indicator: 0,
  increase: 0,
};

const Orders = () => {
  const { dateStartPicker, dateEndPicker, datePeriod } = useSelector(
    (state) => state.dateRange || {}
  );
  const selectedPartnerships = useSelector(
    (state) => state.companies?.selectedPartnerships || []
  );
  const handleDashboardClick = useDashboardNavigation();
  const prevPeriod = getDatePeriodShort(datePeriod);

  const params = {
    "filter[date_start]": dateStartPicker,
    "filter[date_end]": dateEndPicker,
    "filter.partnership_id": selectedPartnerships,
  };

  const { data, isLoading, isFetching } = useGetOrdersQuery(params, {
    skip: !dateStartPicker || !dateEndPicker,
  });

  const paymentData = addTitlesToPaymentOrders(data?.payment_orders || {});
  const processData = addTitlesToProcessOrders(data?.process_orders || {});

  return (
    <div className={s.root}>
      <header className={s.header}>
        <h2>
          <span onClick={handleDashboardClick} style={{ cursor: "pointer" }}>
            Дашборд
          </span>{" "}
          <IconBackForward /> Заказы
        </h2>
        <div className={s.headerBtns}>
          <FiltersContainer isFetching={isFetching} isLoading={isLoading} />
        </div>
      </header>
      <main className={s.main}>
        <div className={s.leftSide}>
          <OrderPageChart
            data={data?.graph_orders}
            series={CLOSED_ORDERS_SERIES}
            title="Завершенные заказы"
            yAxisFormatter={(v) => v.toString()}
            isLoading={isLoading || isFetching}
          />
          <OrderPageChart
            data={data?.graph_plan_fact}
            series={PLAN_FACT_SERIES}
            title="План-факт по заказам"
            isLoading={isLoading || isFetching}
          />
          <OrderPageChart
            data={data?.average_workers_in_order}
            series={PERFORMERS_ON_ORDERS_SERIES}
            title="Исполнители на заказах"
            yAxisFormatter={(v) => v.toString()}
            isLoading={isLoading || isFetching}
          />
        </div>
        <div className={s.rightSide}>
          <Indicator
            title={"Завершенные заказы"}
            indicator={data?.closed_orders?.indicator || 0}
            increase={data?.closed_orders?.increase || 0}
            prevPeriod={prevPeriod}
            prevPeriodIndicator={
              data?.closed_orders?.prev_period_indicator || 0
            }
            info={null}
            isLoading={isLoading || isFetching}
          />
          <Indicator
            title={"Сумма заказов"}
            indicator={data?.orders_sum?.indicator || 0}
            increase={data?.orders_sum?.increase || 0}
            prevPeriod={prevPeriod}
            prevPeriodIndicator={data?.orders_sum?.prev_period_indicator || 0}
            info={null}
            isLoading={isLoading || isFetching}
          />
          <Indicator
            title={"Чел/смены"}
            indicator={data?.average_workers_in_order_count?.indicator || 0}
            increase={data?.average_workers_in_order_count?.increase || 0}
            prevPeriod={prevPeriod}
            prevPeriodIndicator={
              data?.average_workers_in_order_count?.prev_period_indicator || 0
            }
            info={null}
            isLoading={isLoading || isFetching}
          />

          <DonutChart
            title="Способ оплаты заказов"
            data={paymentData}
            isLoading={isLoading || isFetching}
          />

          <DonutChart
            title="Статус заказов"
            data={processData}
            isLoading={isLoading || isFetching}
          />
        </div>
      </main>
    </div>
  );
};

export default Orders;
