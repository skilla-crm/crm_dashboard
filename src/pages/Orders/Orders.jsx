import { useState } from 'react';
import s from './Orders.module.scss';
import DateFilter from 'components/filters/DateFilter/DateFilter';
import { ReactComponent as IconBackForward } from 'assets/icons/iconBackForwardBlack.svg';
// api
import { useGetOrdersQuery } from '../../redux/ordersApiActions';
// redux
import { useSelector } from 'react-redux';

const Orders = () => {
    const [activeFilter, setActiveFilter] = useState(null);
    const { dateStartPicker, dateEndPicker } = useSelector(
        (state) => state.dateRange || {}
    );

    const params = {
        'filter[date_start]': dateStartPicker,
        'filter[date_end]': dateEndPicker,
    };

    const { data, isLoading } = useGetOrdersQuery(params, {
        skip: !dateStartPicker || !dateEndPicker,
    });

    const clearActiveFilter = () => {
        setActiveFilter(null);
    };

    return (
        <div className={s.root}>
            <header className={s.header}>
                <h2>
                    Дашборд <IconBackForward /> Заказы
                </h2>
                <div className={s.headerBtns}>
                    <DateFilter
                        isFetching={isLoading}
                        setActiveFilter={setActiveFilter}
                        clearActiveFilter={clearActiveFilter}
                    />
                </div>
            </header>
            <main className={s.main}>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </main>
        </div>
    );
};

export default Orders;
