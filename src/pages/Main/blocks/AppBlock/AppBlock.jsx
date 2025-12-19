// Components
import IndicatorWithPoints from 'components/indicators/IndicatorWithPoints/IndicatorWithPoints';
import TitleWithLink from 'components/ui/TitleWithLink/TitleWithLink';

// Utils
import { getDatePeriodShort } from 'utils/datePeriodMap';

// Mapers
import buildAppData from '../../mapers/buildAppData';

// Styles
import s from './AppBlock.module.scss';

const AppBlock = ({ appData, isLoading, datePeriod }) => {
    return (
        <div className={s.wrapperWithTitle}>
            <TitleWithLink title="Приложение" />
            <IndicatorWithPoints
                prevPeriod={getDatePeriodShort(datePeriod)}
                isLoading={isLoading}
                data={buildAppData(appData)}
            />
        </div>
    );
};

export default AppBlock;

