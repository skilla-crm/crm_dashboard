// Components
import IndicatorWithPoints from 'components/indicators/IndicatorWithPoints/IndicatorWithPoints';
import TitleWithLink from 'components/ui/TitleWithLink/TitleWithLink';
import ErrorMessage from 'components/ui/ErrorMessage/ErrorMessage';

// Utils
import { getDatePeriodShort } from 'utils/datePeriodMap';
import classNames from 'classnames';

// Mapers
import buildAppData from '../../mapers/buildAppData';

// Styles
import s from './AppBlock.module.scss';

const AppBlock = ({ appData, isLoading, datePeriod, error, refetch }) => {
    return (
        <div className={s.wrapperWithTitle}>
            <TitleWithLink title="Приложение" />

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
                    <IndicatorWithPoints
                        prevPeriod={getDatePeriodShort(datePeriod)}
                        isLoading={isLoading}
                        data={buildAppData(appData)}
                    />
                </div>
            </div>
        </div>
    );
};

export default AppBlock;
