// Dependencies
import { Grid, ThemeProvider, createTheme } from '@mui/material';

// Components
import IndicatorWithPoints from 'components/indicators/IndicatorWithPoints/IndicatorWithPoints';
import TitleWithLink from 'components/ui/TitleWithLink/TitleWithLink';
import ErrorMessage from 'components/ui/ErrorMessage/ErrorMessage';

// Mapers
import buildSupervisorsData from '../../mapers/buildSupervisorsData';
import buildOperatorsData from '../../mapers/buildOperatorsData';
import { getDatePeriodShort } from 'utils/datePeriodMap';
import classNames from 'classnames';

// Styles
import s from './EmployeesBlock.module.scss';

const theme = createTheme({
    spacing: 4,
});

const EmployeesBlock = ({
    employeesData,
    isLoading,
    datePeriod,
    error,
    refetch,
}) => {
    return (
        <ThemeProvider theme={theme}>
            <Grid
                size={6}
                item
                container
                spacing={3}
                sx={{ flexDirection: 'column' }}
            >
                <Grid
                    item
                    size={12}
                >
                    <TitleWithLink
                        title="Сотрудники"
                        navigateTo={'/employees'}
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
                                size={12}
                            >
                                <IndicatorWithPoints
                                    title="Менеджеры по персоналу"
                                    data={buildSupervisorsData(
                                        employeesData?.employees?.supervisor
                                    )}
                                    isLoading={isLoading}
                                    prevPeriod={getDatePeriodShort(datePeriod)}
                                />
                            </Grid>
                            <Grid
                                item
                                size={12}
                            >
                                <IndicatorWithPoints
                                    title="Клиентские менеджеры"
                                    data={buildOperatorsData(
                                        employeesData?.employees?.operator
                                    )}
                                    isLoading={isLoading}
                                    prevPeriod={getDatePeriodShort(datePeriod)}
                                />
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default EmployeesBlock;
