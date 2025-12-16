import classNames from 'classnames';

import s from './IndicatorWithChart.module.scss';
import Indicator from '../Indicator/Indicator';
import SmoothChart from '../../../pages/Main/SmoothChart';

const IndicatorWithChart = ({
    width,
    chartData,
    chartHeight = 142,
    className,
    ...indicatorProps
}) => {
    const { isLoading } = indicatorProps;

    const rootStyle =
        width !== undefined
            ? { width: typeof width === 'number' ? `${width}px` : width }
            : undefined;

    return (
        <div className={classNames(s.root, className)} style={rootStyle}>
            <div className={s.indicatorWrapper}>
                <Indicator {...indicatorProps} />
            </div>
            <div className={s.chartCard}>
                <SmoothChart
                    data={chartData}
                    width="100%"
                    height={chartHeight}
                    className={s.chart}
                />
                {/* Лоадер можно вернуть при необходимости
                <div
                    className={classNames(
                        s.chartLoader,
                        isLoading && s.chartLoader_show
                    )}
                /> */}
            </div>
        </div>
    );
};

export default IndicatorWithChart;

