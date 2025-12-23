// Dependencies
import { Grid, ThemeProvider, createTheme } from '@mui/material';

// Components
import Indicator from 'components/indicators/Indicator/Indicator';
import IndicatorWithChart from 'components/indicators/IndicatorWithChart/IndicatorWithChart';
import TitleWithLink from 'components/ui/TitleWithLink/TitleWithLink';
import ErrorMessage from 'components/ui/ErrorMessage/ErrorMessage';

// Utils
import { getDatePeriodShort } from 'utils/datePeriodMap';
import classNames from 'classnames';

// Styles
import s from './PerformersBlock.module.scss';

const theme = createTheme({
    spacing: 4,
});

const PerformersBlock = ({
    performersData,
    isLoading,
    datePeriod,
    error,
    refetch,
}) => {
    return (
        <ThemeProvider theme={theme}>
            <Grid
                container
                spacing={3}
                sx={{ flexDirection: 'column' }}
            >
                <Grid
                    item
                    size={12}
                >
                    <TitleWithLink
                        title="Исполнители"
                        navigateTo={'/performers'}
                        state={{ from: '/' }}
                    />
                </Grid>

                <Grid
                    item
                    size={12}
                    className={s.contentWrapper}
                >
                    <ErrorMessage
                        refetch={refetch}
                        error={error}
                        isLoading={isLoading}
                    />

                    <div
                        className={classNames(s.content, {
                            [s.contentBlurred]: error && !isLoading,
                        })}
                    >
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                item
                                size={6}
                            >
                                <IndicatorWithChart
                                    title={'Добавлены'}
                                    indicator={
                                        performersData?.added?.indicator || 0
                                    }
                                    increase={
                                        performersData?.added?.increase || 0
                                    }
                                    prevPeriod={getDatePeriodShort(datePeriod)}
                                    info={null}
                                    prevPeriodIndicator={
                                        performersData?.added
                                            ?.prev_period_indicator || 0
                                    }
                                    reverse={false}
                                    isLoading={isLoading}
                                    chartData={performersData?.graphics || []}
                                    chartConfig={{
                                        color: '#A59ADC',
                                        gradient: ['#A59ADC', '#8B7FD9'],
                                    }}
                                />
                            </Grid>
                            <Grid
                                container
                                spacing={3}
                                item
                                size={6}
                            >
                                <Grid
                                    item
                                    size={6}
                                >
                                    <Indicator
                                        title={'Отправлено приглашений'}
                                        indicator={
                                            performersData?.invitations
                                                ?.indicator || 0
                                        }
                                        increase={
                                            performersData?.invitations
                                                ?.increase || 0
                                        }
                                        prevPeriodIndicator={
                                            performersData?.invitations
                                                ?.prev_period_indicator || 0
                                        }
                                        prevPeriod={getDatePeriodShort(
                                            datePeriod
                                        )}
                                        info={null}
                                        reverse={false}
                                        isLoading={isLoading}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    size={6}
                                >
                                    <Indicator
                                        title={'Прошли регистрацию'}
                                        indicator={
                                            performersData?.registered
                                                ?.indicator || 0
                                        }
                                        prevPeriodIndicator={
                                            performersData?.registered
                                                ?.prev_period_indicator || 0
                                        }
                                        increase={
                                            performersData?.registered
                                                ?.increase || 0
                                        }
                                        prevPeriod={getDatePeriodShort(
                                            datePeriod
                                        )}
                                        info={null}
                                        reverse={false}
                                        isLoading={isLoading}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    size={6}
                                >
                                    <Indicator
                                        title={'Вышли на первый заказ'}
                                        indicator={
                                            performersData?.first_order
                                                ?.indicator || 0
                                        }
                                        increase={
                                            performersData?.first_order
                                                ?.increase || 0
                                        }
                                        prevPeriodIndicator={
                                            performersData?.first_order
                                                ?.prev_period_indicator || 0
                                        }
                                        prevPeriod={getDatePeriodShort(
                                            datePeriod
                                        )}
                                        info={null}
                                        reverse={false}
                                        isLoading={isLoading}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    size={6}
                                >
                                    <Indicator
                                        title={'На заказах'}
                                        indicator={
                                            performersData?.in_orders
                                                ?.indicator || 0
                                        }
                                        prevPeriodIndicator={
                                            performersData?.in_orders
                                                ?.prev_period_indicator || 0
                                        }
                                        increase={
                                            performersData?.in_orders
                                                ?.increase || 0
                                        }
                                        prevPeriod={getDatePeriodShort(
                                            datePeriod
                                        )}
                                        info={null}
                                        reverse={false}
                                        isLoading={isLoading}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default PerformersBlock;
