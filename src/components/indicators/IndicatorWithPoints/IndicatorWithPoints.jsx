import s from './IndicatorWithPoints.module.scss';
import classNames from 'classnames';

import NumberFlow from '@number-flow/react';
import { ReactComponent as IconArrow } from '../Indicator/assets/arrow.svg';
//hooks
import useIncreaseState from 'hooks/useIncreaseState';
//components
import Loader from '../Indicator/Loader/Loader';

const IndicatorItem = ({
    title,
    indicator,
    increase,
    prev_period_indicator,
    isPercent,
    isLoading,
    progress = false
}) => {
    const increaseState = useIncreaseState(false, increase || 0);

    const indicatorValue = Number(indicator) || 0;
    
    const green = indicatorValue >= 80;
    const orange = indicatorValue < 80 && indicatorValue >= 50;
    const red = indicatorValue < 50;

    return (
        <div className={s.item}>
            <div className={s.itemContent}>
                <div className={s.itemInfo}>
                    {progress && (
                        <div className={s.progressContainer}>
                            {green && (
                                <div className={s.progressItem}>
                                    <div className={classNames(s.progressElem, s.green)}></div>
                                    <div className={classNames(s.progressElem, s.green)}></div>
                                    <div className={classNames(s.progressElem, s.green)}></div>
                                </div>
                            )}
                            {orange && (
                                <div className={s.progressItem}>
                                    <div className={s.progressElem}></div>
                                    <div className={classNames(s.progressElem, s.orange)}></div>
                                    <div className={classNames(s.progressElem, s.orange)}></div>
                                </div>
                            )}
                            {red && (
                                <div className={s.progressItem}>
                                    <div className={s.progressElem}></div>
                                    <div className={classNames(s.progressElem)}></div>
                                    <div className={classNames(s.progressElem, s.red)}></div>
                                </div>
                            )}
                        </div>
                    )}
                    <div className={s.itemIndicator}>
                        <NumberFlow value={indicator} />
                        {isPercent && <span>%</span>}
                    </div>
                    <div className={s.itemTitle}>{title}</div>
                    {increase !== undefined && (
                        <div
                            className={classNames(
                                s.itemBottom,
                                isLoading && s.itemBottom_load
                            )}
                        >
                            <p
                                className={classNames(
                                    s.itemIncrease,
                                    increaseState.negaive && s.itemIncrease_red
                                )}
                            >
                                <IconArrow
                                    className={classNames(
                                        increaseState.down && s.arrow_down
                                    )}
                                />
                                {Math.abs(increase)}%
                            </p>
                            {prev_period_indicator !== undefined && (
                                <span>отн. {prev_period_indicator}</span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const IndicatorWithPoints = ({ isLoading, title, data = [] }) => {
    return (
        <div className={s.root}>
            {title && <p className={s.title}>{title}</p>}

            <div className={s.indicatorsList}>
                {data.map((item) => (
                    <IndicatorItem
                        key={item.key}
                        title={item.title}
                        indicator={item.indicator}
                        increase={item.increase}
                        prev_period_indicator={item.prev_period_indicator}
                        isPercent={item.isPercent}
                        isLoading={isLoading}
                        progress={item.progress}
                    />
                ))}
            </div>

            <div className={classNames(s.loader, isLoading && s.loader_load)}>
                <Loader />
            </div>
        </div>
    );
};

export default IndicatorWithPoints;
