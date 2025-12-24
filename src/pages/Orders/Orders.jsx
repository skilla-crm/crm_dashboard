import s from "./Orders.module.scss";
import FiltersContainer from "components/filters/FiltersContainer/FiltersContainer";
import { ReactComponent as IconBackForward } from "assets/icons/iconBackForwardBlack.svg";
// api
import { useGetOrdersQuery } from "../../redux/ordersApiActions";
// redux
import { useSelector } from "react-redux";
// hooks
import { useDashboardNavigation } from "hooks/useDashboardNavigation";

const Orders = () => {
  const { dateStartPicker, dateEndPicker } = useSelector(
    (state) => state.dateRange || {}
  );
  const selectedPartnerships = useSelector(
    (state) => state.companies?.selectedPartnerships || []
  );
  const handleDashboardClick = useDashboardNavigation();

  const params = {
    "filter[date_start]": dateStartPicker,
    "filter[date_end]": dateEndPicker,
    "filter.partnership_id": selectedPartnerships,
  };

  const { data, isLoading, isFetching } = useGetOrdersQuery(params, {
    skip: !dateStartPicker || !dateEndPicker,
  });

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
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </main>
    </div>
  );
};

export default Orders;
