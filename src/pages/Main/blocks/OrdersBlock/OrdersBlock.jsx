// Components
import Slider from 'components/indicators/Slider/Slider';
import TitleWithLink from 'components/ui/TitleWithLink/TitleWithLink';

// Utils
import { getDatePeriodShort } from 'utils/datePeriodMap';

// Styles
import s from './OrdersBlock.module.scss';

const OrdersBlock = ({ ordersData, isLoading, datePeriod }) => {
    return (
        <div className={s.wrapperWithTitle}>
            <TitleWithLink
                title="Заказы"
                navigateTo={'/orders'}
                state={{ from: "/" }}
            />
            <Slider
                data={ordersData}
                prevPeriod={getDatePeriodShort(datePeriod)}
                isLoading={isLoading}
            />
        </div>
    );
};

export default OrdersBlock;
