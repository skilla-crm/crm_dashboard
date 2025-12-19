// Components
import IndicatorForecasting from 'components/indicators/IndicatorForecasting/IndicatorForecasting';
import TitleWithLink from 'components/ui/TitleWithLink/TitleWithLink';

// Styles
import s from './ForecastBlock.module.scss';

const ForecastBlock = ({ forecastsData, isLoading, forecastingIndicators }) => {
    return (
        <div className={s.wrapperWithTitle}>
            <TitleWithLink
                title="Прогноз на конец сентября"
                size="medium"
            />
            <div className={s.forecastGrid}>
                {forecastingIndicators.map((item) => (
                    <IndicatorForecasting
                        key={item.key}
                        title={item.title}
                        value={forecastsData?.[item.key]?.indicator || 0}
                        isLoading={isLoading}
                    />
                ))}
            </div>
        </div>
    );
};

export default ForecastBlock;
