// Dependencies
import { Grid, ThemeProvider, createTheme } from '@mui/material';

// Components
import IndicatorWithScroll from 'components/indicators/IndicatorWithScroll/IndicatorWithScroll';
import TitleWithLink from 'components/ui/TitleWithLink/TitleWithLink';

// Mapers
import buildCounterpartiesData from '../../mapers/buildCounterpartiesData';

const theme = createTheme({
    spacing: 4,
});

const CounterpartiesBlock = ({
    counterpartiesData,
    isLoading,
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
                <Grid item size={12}>
                    <TitleWithLink
                        title="Контрагенты"
                        navigateTo={'/counterparties'}
                    />
                </Grid>
                <Grid item size={12}>
                    <IndicatorWithScroll
                        title="Тип должников"
                        leftColumnTitle={'Заказчик'}
                        rightColumnTitle={'Задолженность'}
                        isLoading={isLoading}
                        list={buildCounterpartiesData(counterpartiesData || [])}
                        navigateTo={'/counterparties'}
                    />
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default CounterpartiesBlock;

