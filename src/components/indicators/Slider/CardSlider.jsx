import DonutChart from 'components/diagrams/DonutChart/DonutChart';
import s from './CardSlider.module.scss';
import TitleWithLink from 'components/ui/TitleWithLink/TitleWithLink';
import NumberFlow from '@number-flow/react';
import classNames from 'classnames';
import { ReactComponent as IconArrow } from './assets/arrow.svg';
import useIncreaseState from 'hooks/useIncreaseState';
import { addSpaceNumber2 } from 'utils/addSpaceNumber';

const CardSlider = ({
    title,
    indicator,
    increase,
    data,
    prevPeriod,
    isLoading,
    reverse = false,
}) => {
    const increaseState = useIncreaseState(reverse, increase);
    const chartData = data.map((item) => ({
        ...item,
        value: item.count || 0,
    }));

    return (
        <div className={s.root}>
 
               


            {indicator !== null && (
                <div className={s.indicator}>
                    {title === 'Количество заказов' ? (
                        <div>
                            <NumberFlow
                                value={Number((indicator || 0).toFixed(1))}
                            />{' '}
                            <span>создано</span>
                        </div>
                    ) : (
                        <NumberFlow
                            value={Number((indicator || 0).toFixed(1))}
                        />
                    )}
                    {increase && (
                        <div
                            className={classNames(
                                s.bottom,
                                isLoading && s.bottom_load
                            )}
                        >
                            <p
                                className={classNames(
                                    s.increase,
                                    increaseState.negaive && s.increase_red
                                )}
                            >
                                <IconArrow
                                    className={classNames(
                                        increaseState.down && s.arrow_down
                                    )}
                                />
                                {Number(Math.abs(increase || 0).toFixed(1))}%
                            </p>
                            <span>отн. {prevPeriod}</span>
                        </div>
                    )}
                </div>
            )}
            <div
                className={classNames(
                    s.chartContainer,
                    indicator === null && s.chartContainerPadding
                )}
            >
                <div className={s.data}>
                    <div className={s.chart}>
                        <DonutChart data={chartData} />
                    </div>
                    <div className={s.list}>
                        {data.map((item, i) => (
                            <div
                                key={item.key || i}
                                className={s.listItem}
                            >
                                <span
                                    className={s.dot}
                                    style={{ background: item.color }}
                                />
                                <p className={s.text}>
                                    {item.name}{' '}
                                    {addSpaceNumber2(item.count) || 0}
                                    {item.percent ? (
                                        <span className={s.percent}>
                                            {' '}
                                            {Number(
                                                (item.percent || 0).toFixed(1)
                                            )}
                                            %
                                        </span>
                                    ) : ''}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardSlider;
