import s from './IndicatorForecasting.module.scss';
import classNames from 'classnames';

const IndicatorForecasting = ({ title, value, direction }) => {
    const actualDirection = value > 0 ? 'up' : 'down';

    return (
        <div className={s.root}>
            <p className={s.title}>{title}</p>
            <div className={s.valueContainer}>
                <div className={s.value}>{`~${value}`}</div>
                <div
                    className={classNames(
                        s.direction,
                        s[`direction_${actualDirection}`]
                    )}
                >
                    {value > 0 && '↑'}
                    {value <= 0 && '↓'}
                </div>
            </div>
        </div>
    );
};

export default IndicatorForecasting;
