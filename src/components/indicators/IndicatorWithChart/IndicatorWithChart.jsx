// Dependencies
import classNames from 'classnames';

// Components
import Indicator from '../Indicator/Indicator';
import Loader from './Loader/Loader';
import SmoothChart from './SmoothChart/SmoothChart';

// Styles
import s from './IndicatorWithChart.module.scss';

const IndicatorWithChart = ({
    width,
    chartData,
    chartHeight = 142,
    className,
    chartConfig,
    ...indicatorProps
}) => {
    const { isLoading } = indicatorProps;

    const strokeColor = chartConfig?.color || '#A59ADC';
    const gradientStartColor = chartConfig?.gradient?.[0] || '#8B7CF6';
    const gradientEndColor = chartConfig?.gradient?.[1] || '#A59ADC';
    const dotStrokeColor = chartConfig?.color || '#A59ADC';

    const rootStyle = {
        ...(width !== undefined
            ? { width: typeof width === 'number' ? `${width}px` : width }
            : {}),
    };

    return (
        <div
            className={classNames(s.root, className)}
            style={rootStyle}
        >
            <div className={s.indicatorWrapper}>
                <Indicator {...indicatorProps} />
            </div>
            <div className={s.chartCard}>
                <SmoothChart
                    data={chartData}
                    width="100%"
                    height={chartHeight}
                    className={s.chart}
                    strokeColor={strokeColor}
                    gradientStartColor={gradientStartColor}
                    gradientEndColor={gradientEndColor}
                    dotStrokeColor={dotStrokeColor}
                />
            </div>
            {isLoading && (
                <div className={s.loaderOverlay}>
                    <Loader />
                </div>
            )}
        </div>
    );
};

export default IndicatorWithChart;
