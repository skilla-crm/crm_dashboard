// Components
import Slider from 'components/indicators/Slider/Slider';
import TitleWithLink from 'components/ui/TitleWithLink/TitleWithLink';
import ErrorMessage from 'components/ui/ErrorMessage/ErrorMessage';

// Utils
import { getDatePeriodShort } from 'utils/datePeriodMap';
import classNames from 'classnames';

// Styles
import s from './OrdersBlock.module.scss';

const OrdersBlock = ({ ordersData, isLoading, datePeriod, error, refetch }) => {
    return (
        <div className={s.wrapperWithTitle}>
            <TitleWithLink
                title="Заказы"
                navigateTo={'/orders'}
                state={{ from: '/' }}
            />

            <div className={s.contentWrapper}>
                <ErrorMessage
                    refetch={refetch}
                    error={error}
                    isLoading={isLoading}
                />

                <div
                    className={classNames(s.content, {
                        [s.contentBlurred]: error && !isLoading,
                    })}
                >
                    <Slider
                        data={ordersData}
                        prevPeriod={getDatePeriodShort(datePeriod)}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </div>
    );
};

export default OrdersBlock;
