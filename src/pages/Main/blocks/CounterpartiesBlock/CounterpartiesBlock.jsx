// Dependencies
import { Grid, ThemeProvider, createTheme } from '@mui/material';

// Components
import IndicatorWithScroll from 'components/indicators/IndicatorWithScroll/IndicatorWithScroll';
import TitleWithLink from 'components/ui/TitleWithLink/TitleWithLink';
import ErrorMessage from 'components/ui/ErrorMessage/ErrorMessage';

// Mapers
import buildCounterpartiesData from '../../mapers/buildCounterpartiesData';
import classNames from 'classnames';

// Styles
import s from './CounterpartiesBlock.module.scss';

const theme = createTheme({
    spacing: 4,
});

const CounterpartiesBlock = ({
    counterpartiesData,
    isLoading,
    error,
    refetch,
}) => {
    return (
        <ThemeProvider theme={theme}>
            <Grid
                container
                spacing={3}
                sx={{ flexDirection: 'column' }}
                item
                size={6}
            >
                <Grid
                    item
                    size={12}
                >
                    <TitleWithLink
                        title="Контрагенты"
                        navigateTo={'/counterparties'}
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
                        <IndicatorWithScroll
                            title="Тoп должников"
                            leftColumnTitle={'Заказчик'}
                            rightColumnTitle={'Задолженность'}
                            isLoading={isLoading}
                            list={buildCounterpartiesData(
                                counterpartiesData || []
                            )}
                            navigateTo={'https://lk.skilla.ru/new/debts'}
                            navigateToNewTab={true}
                            emptyDataTitle="Нет ни одного должника"
                        />
                    </div>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default CounterpartiesBlock;
