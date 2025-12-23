// Components
import IndicatorForecasting from 'components/indicators/IndicatorForecasting/IndicatorForecasting';
import TitleWithLink from 'components/ui/TitleWithLink/TitleWithLink';
import ErrorMessage from 'components/ui/ErrorMessage/ErrorMessage';

// Utils
import classNames from 'classnames';

// Styles
import s from './ForecastBlock.module.scss';

const ForecastBlock = ({
    forecastsData,
    isLoading,
    forecastingIndicators,
    error,
    refetch,
}) => {
    return (
        <div className={s.wrapperWithTitle}>
            <TitleWithLink
                title="Прогноз на конец сентября"
                size="medium"
            />

            <div className={s.contentWrapper}>
                <ErrorMessage
                    refetch={refetch}
                    error={error}
                    isLoading={isLoading}
                    // height={312}
                />

                <div
                    className={classNames(s.content, {
                        [s.contentBlurred]: error && !isLoading,
                    })}
                >
                    <div className={s.forecastGrid}>
                        {forecastingIndicators.map((item) => (
                            <IndicatorForecasting
                                key={item.key}
                                title={item.title}
                                value={
                                    forecastsData?.[item.key]?.indicator || 0
                                }
                                isLoading={isLoading}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForecastBlock;
