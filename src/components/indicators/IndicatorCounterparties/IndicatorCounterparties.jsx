import s from './IndicatorCounterparties.module.scss';
import classNames from 'classnames';

import NumberFlow from '@number-flow/react';

//components
import Loader from './Loader/Loader';

const IndicatorCounterparties = ({ isLoading, title, data }) => {
    return (
        <div className={s.root}>
            <p className={s.title}>{title}</p>

            <div className={s.indicator}>
                <NumberFlow value={Math.floor(data?.debt_to_us) || 0} />
                <div className={s.greenText}>Нам должны</div>
            </div>
            <div className={s.indicator}>
                <NumberFlow value={Math.floor(data?.our_debt) || 0} />
                <div className={s.redText}>Мы должны</div>
            </div>

            <div className={classNames(s.loader, isLoading && s.loader_load)}>
                <Loader />
            </div>
        </div>
    );
};

export default IndicatorCounterparties;
