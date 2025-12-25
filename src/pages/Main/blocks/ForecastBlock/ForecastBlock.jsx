// Components
import IndicatorForecasting from 'components/indicators/IndicatorForecasting/IndicatorForecasting';
import TitleWithLink from 'components/ui/TitleWithLink/TitleWithLink';
import ErrorMessage from 'components/ui/ErrorMessage/ErrorMessage';

// Utils
import classNames from 'classnames';
import dayjs from 'dayjs';

// Styles
import s from './ForecastBlock.module.scss';

const ForecastBlock = ({
    forecastsData,
    isLoading,
    forecastingIndicators,
    error,
    refetch,
}) => {

    console.log(forecastingIndicators)

    const currentMonth = dayjs().format('D MMMM')?.split(' ')?.pop()
    return (
        <div className={s.wrapperWithTitle}>
            <TitleWithLink
                title={`Прогноз на конец ${currentMonth}`}
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
                                title={item.title === 'Маржинальная прибыль' ? 'Комиссия' : item.title === 'Операционная прибыль' ? 'Прибыль' : item.title}
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
