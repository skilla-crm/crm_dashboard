// External
import classNames from 'classnames';
import NumberFlow from '@number-flow/react';

// Hooks
import useIncreaseState from 'hooks/useIncreaseState';

// Components
import Loader from '../Indicator/Loader/Loader';
import { ReactComponent as IconArrow } from '../Indicator/assets/arrow.svg';

// Styles
import s from './IndicatorWithPoints.module.scss';

const IndicatorItem = ({
    title,
    indicator,
    increase,
    prevPeriodIndicator,
    isPercent,
    isLoading,
    progress = false,
}) => {
    const increaseState = useIncreaseState(false, increase || 0);

    const indicatorValue = Number(indicator) || 0;
    const roundedIndicatorValue = Number(indicatorValue.toFixed(1));
    const empty = indicatorValue === 0;
    const green = indicatorValue >= 80;
    const orange = indicatorValue < 80 && indicatorValue >= 50;
    const red = indicatorValue < 50 && !empty;

    return (
        <div className={s.item}>
            <div className={s.itemContent}>
                <div className={s.itemInfo}>
                    <div className={s.itemTopRow}>
                        {' '}
                        {progress && (
                            <div className={s.progressContainer}>
                                {green && (
                                    <div className={s.progressItem}>
                                        <div
                                            className={classNames(
                                                s.progressElem,
                                                s.green
                                            )}
                                        ></div>
                                        <div
                                            className={classNames(
                                                s.progressElem,
                                                s.green
                                            )}
                                        ></div>
                                        <div
                                            className={classNames(
                                                s.progressElem,
                                                s.green
                                            )}
                                        ></div>
                                    </div>
                                )}
                                {orange && (
                                    <div className={s.progressItem}>
                                        <div className={s.progressElem}></div>
                                        <div
                                            className={classNames(
                                                s.progressElem,
                                                s.orange
                                            )}
                                        ></div>
                                        <div
                                            className={classNames(
                                                s.progressElem,
                                                s.orange
                                            )}
                                        ></div>
                                    </div>
                                )}
                                {red && (
                                    <div className={s.progressItem}>
                                        <div className={s.progressElem}></div>
                                        <div
                                            className={classNames(
                                                s.progressElem
                                            )}
                                        ></div>
                                        <div
                                            className={classNames(
                                                s.progressElem,
                                                s.red
                                            )}
                                        ></div>
                                    </div>
                                )}
                                {empty && (
                                    <div className={s.progressItem}>
                                        <div className={s.progressElem}></div>
                                        <div className={s.progressElem}></div>
                                        <div className={s.progressElem}></div>
                                    </div>
                                )}
                            </div>
                        )}
                        <div className={s.itemIndicator}>
                            <NumberFlow value={roundedIndicatorValue} />
                            {isPercent && <span>%</span>}
                        </div>
                    </div>
                    <div className={s.bottomRow}>
                        {' '}
                        <div className={s.itemTitle}>{title}</div>
                        {increase !== undefined &&
                            increase !== 0 &&
                            indicator !== 0 && (
                                <div
                                    className={classNames(
                                        s.itemBottom,
                                        isLoading && s.itemBottom_load
                                    )}
                                >
                                    <p
                                        className={classNames(
                                            s.itemIncrease,
                                            increaseState.negaive &&
                                                s.itemIncrease_red
                                        )}
                                    >
                                        <IconArrow
                                            className={classNames(
                                                increaseState.down &&
                                                    s.arrow_down
                                            )}
                                        />
                                        {Number(
                                            Math.abs(increase || 0).toFixed(1)
                                        )}
                                        %
                                    </p>
                                    {prevPeriodIndicator !== undefined && (
                                        <span>
                                            {/* отн. {prevPeriodIndicator} */}
                                        </span>
                                    )}
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const IndicatorWithPoints = ({
    isLoading,
    title,
    data = [],
    prevPeriod,
    emptyTitle = 'Пока нет данных',
}) => {
    const allIndicatorsZero = data.length === 0;

    return (
        <div className={s.root}>
            {title && <p className={s.title}>{title}</p>}

            {allIndicatorsZero && emptyTitle ? (
                <div className={s.emptyTitle}>{emptyTitle}</div>
            ) : (
                <div className={s.indicatorsList}>
                    {data.map((item) => (
                        <IndicatorItem
                            key={item.key}
                            title={item.title}
                            indicator={item.indicator}
                            increase={item.increase}
                            prevPeriodIndicator={prevPeriod}
                            isPercent={item.isPercent}
                            isLoading={isLoading}
                            progress={item.progress}
                        />
                    ))}
                </div>
            )}
            <div className={classNames(s.loader, isLoading && s.loader_load)}>
                <Loader />
            </div>
        </div>
    );
};

export default IndicatorWithPoints;
