import s from './IndicatorForecasting.module.scss';
import classNames from 'classnames';
import Loader from './Loader/Loader';
//utils
import { addSpaceNumber } from 'utils/addSpaceNumber';

const IndicatorForecasting = ({ title, value, direction, isLoading }) => {
    const actualDirection = value > 0 ? 'up' : 'down';

    return (
        <div className={s.root}>
            <p className={s.title}>{title}</p>
            <div className={s.valueContainer}>
                <div className={s.value}>{`~${addSpaceNumber(value.toFixed())}`}</div>
                {/* <div
                    className={classNames(
                        s.direction,
                        s[`direction_${actualDirection}`]
                    )}
                >
                    {value > 0 && '↑'}
                    {value <= 0 && '↓'}
                </div> */}
            </div>
            <div className={classNames(s.loader, isLoading && s.loader_load)}>
                <Loader />
            </div>
        </div>
    );
};

export default IndicatorForecasting;
