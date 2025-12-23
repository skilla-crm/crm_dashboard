// Dependencies
import classNames from 'classnames';

// Components
import Indicator from '../Indicator/Indicator';

import SmoothChart from './ui/SmoothChart/SmoothChart';

import { ReactComponent as IconEmptyData } from './assets/EmptyData.svg';
import { ReactComponent as IconPlusBlue } from 'assets/icons/iconPlus.svg';

// Styles
import s from './IndicatorWithChart.module.scss';
import Loader from './ui/Loader/Loader';
import UniButton from 'components/ui/UniButton/UniButton';

const IndicatorWithChart = ({
    width,
    chartData,
    chartHeight = 142,
    className,
    chartConfig,
    buttonConfig,
    ...indicatorProps
}) => {
    const { isLoading, title } = indicatorProps;
    const { buttonText, onButtonClick, buttonIcon } = buttonConfig || {};
    const hasButtonConfig =
        buttonConfig && Object.keys(buttonConfig || {}).length > 0;
    const isEmptyData = !chartData || chartData.length === 0;
    const strokeColor = chartConfig?.color || '#A59ADC';
    const gradientStartColor = chartConfig?.gradient?.[0] || '#8B7CF6';
    const gradientEndColor = chartConfig?.gradient?.[1] || '#A59ADC';
    const dotStrokeColor = chartConfig?.color || '#A59ADC';

    console.log(isEmptyData);
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
                {isEmptyData ? (
                    <div className={s.emptyState}>
                        <div className={s.emptyStateContent}>
                            <IconEmptyData />
                            <p className={s.emptyStateText}>
                                Недостаточно данных для отображения графика
                            </p>
                        </div>
                        {hasButtonConfig && (
                            <UniButton
                                type="outline"
                                text={buttonText}
                                onClick={onButtonClick}
                                icon={buttonIcon}
                                iconPosition="left"
                            />
                        )}
                    </div>
                ) : (
                    <SmoothChart
                        title={title}
                        data={chartData}
                        width="100%"
                        height={chartHeight}
                        className={s.chart}
                        strokeColor={strokeColor}
                        gradientStartColor={gradientStartColor}
                        gradientEndColor={gradientEndColor}
                        dotStrokeColor={dotStrokeColor}
                    />
                )}
            </div>
            <div className={classNames(s.loader, isLoading && s.loader_load)}>
                <Loader />
            </div>
        </div>
    );
};

export default IndicatorWithChart;
