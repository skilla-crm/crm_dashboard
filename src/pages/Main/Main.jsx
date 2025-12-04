import s from './Main.module.scss';
import { useState } from 'react';
// api
import { useGetDashboardQuery } from '../../redux/dashboardApiActions';
// redux
import { useSelector } from 'react-redux';
// components
import IndicatorsFinance from 'components/IndicatorsFinance/IndicatorsFinance';
import { ReactComponent as IconSettings } from 'assets/icons/iconSettings.svg';
import { ReactComponent as IconSave } from 'assets/icons/iconDoneWhite.svg';
import FinanceDiagram from 'components/indicators/FinanceDiagram/FinanceDiagram';
import UniButton from 'components/ui/UniButton/UniButton';
import PeriodFilter from 'components/filters/PeriodFilter/PeriodFilter';
import DateFilter from 'components/filters/DateFilter/DateFilter';
import TitleWithLink from 'components/ui/UniButton/TitleWithLink/TitleWithLink';
import { createTheme, Grid, ThemeProvider } from '@mui/material';
import Slider from 'components/indicators/Slider/Slider';
import Indicator from 'components/indicators/Indicator/Indicator';
import IndicatorWithList from 'components/indicators/IndicatorWithList/IndicatorWithList';
import HalfCircleDiagram from 'components/indicators/HalfCircleDiagram/HalfCircleDiagram';
// utils
import { getTitleDateDuration } from 'components/filters/DateFilter/DateMenu/utils/date';

// const PERIODS = [
//     { value: 'month', label: 'Месяц' },
//     { value: 'quarter', label: 'Квартал' },
//     { value: 'year', label: 'Год' },
// ];

const Main = () => {
    const [period, setPeriod] = useState('month');
    const [isEditing, setIsEditing] = useState(false);
    const [activeFilter, setActiveFilter] = useState(null);
    const { dateStartPicker, dateEndPicker } = useSelector(
        (state) => state.dateRange || {}
    );
    const params = {
        'filter[period]': period,
    };
    const { data, isLoading } = useGetDashboardQuery(params);

    const clearActiveFilter = () => {
        setActiveFilter(null);
    };

    const theme = createTheme({
        spacing: 4,
    });
    return (
        <div className={s.root}>
            <header className={s.header}>
                <h2>Дашборд</h2>
                <div className={s.headerBtns}>
                    {/* {!isEditing && (
                        <PeriodFilter
                            period={period}
                            setPeriod={setPeriod}
                            isLoading={isLoading}
                            periods={PERIODS}
                        />
                    )} */}

                    {!isLoading && (
                        <DateFilter
                            isFetching={isLoading}
                            setActiveFilter={setActiveFilter}
                            clearActiveFilter={clearActiveFilter}
                        />
                    )}
                    <UniButton
                        text={isEditing ? 'Сохранить' : 'Настройка'}
                        type={isEditing ? 'primary' : 'outline'}
                        icon={isEditing ? IconSave : IconSettings}
                        onClick={() => setIsEditing(!isEditing)}
                    />
                </div>
            </header>

            <main className={s.main}>
                <ThemeProvider theme={theme}>
                    <Grid
                        container
                        spacing={10}
                        sx={{ flexWrap: 'nowrap' }}
                    >
                        {/* Левая колонка – 8/12 */}
                        <Grid
                            item
                            size={8}
                        >
                            <div className={s.finance}>
                                <TitleWithLink
                                    title="Финансы"
                                    navigateTo={'/finance'}
                                />
                                <FinanceDiagram
                                    profitData={data?.finance?.profit || {}}
                                />

                                <Grid
                                    container
                                    spacing={5}
                                    sx={{ mt: '12px' }}
                                >
                                    {/* Левая колонка - 4 элемента в двух столбцах */}
                                    <Grid
                                        item
                                        size={6}
                                    >
                                        <Grid
                                            container
                                            spacing={3}
                                        >
                                            {Array.from({ length: 4 }).map(
                                                (_, index) => (
                                                    <Grid
                                                        item
                                                        size={6}
                                                        key={index}
                                                    >
                                                        <Indicator
                                                            title={'Выручка'}
                                                            indicator={67}
                                                            increaseView={true}
                                                            increase={67}
                                                            prevPeriod={'авг'}
                                                            info={null}
                                                            reverse={true}
                                                        />
                                                    </Grid>
                                                )
                                            )}
                                        </Grid>
                                    </Grid>

                                    {/* Правая колонка - FinanceDiagram */}
                                    <Grid
                                        item
                                        size={6}
                                    >
                                        <IndicatorWithList
                                            title={'Входящие транзакции'}
                                            indicator={5345}
                                            increaseView={true}
                                            increase={67}
                                            prevPeriod={'авг'}
                                            info={null}
                                            reverse={true}
                                        />
                                    </Grid>
                                </Grid>
                            </div>
                            <Grid
                                container
                                spacing={5}
                                sx={{ mt: '12px' }}
                            >
                                {/* Левая колонка - 4 элемента в двух столбцах */}

                                <Grid
                                    item
                                    size={6}
                                >
                                    <TitleWithLink
                                        title="Реклама"
                                        navigateTo={'/advertising'}
                                    />
                                    <Grid
                                        container
                                        spacing={3}
                                    >
                                        {Array.from({ length: 4 }).map(
                                            (_, index) => (
                                                <Grid
                                                    item
                                                    size={6}
                                                    key={index}
                                                >
                                                    <Indicator
                                                        title={'Выручка'}
                                                        indicator={67}
                                                        increaseView={true}
                                                        increase={67}
                                                        prevPeriod={'авг'}
                                                        info={null}
                                                        reverse={true}
                                                    />
                                                </Grid>
                                            )
                                        )}
                                    </Grid>
                                </Grid>

                                {/* Правая колонка - FinanceDiagram */}

                                <Grid
                                    item
                                    size={6}
                                >
                                    <TitleWithLink
                                        title="Контрагенты"
                                        navigateTo={'/counterparties'}
                                    />
                                    <Grid
                                        spacing={3}
                                        container
                                        size={12}
                                    >
                                        {' '}
                                        <Grid
                                            item
                                            size={6}
                                        >
                                            <Indicator
                                                title={'Выручка'}
                                                indicator={67}
                                                increaseView={true}
                                                increase={67}
                                                prevPeriod={'авг'}
                                                info={null}
                                                reverse={true}
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            size={6}
                                        >
                                            <HalfCircleDiagram
                                                title="Закрывающие документы"
                                                signed={10}
                                                sent={20}
                                                notSent={80}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* Правая колонка – 4/12 */}
                        <Grid
                            container
                            size={4}
                            sx={{ flexDirection: 'column', gap: '12px' }}
                        >
                            <Grid
                                item
                                size={12}
                            >
                                <div className={s.orders}>
                                    <TitleWithLink
                                        title="Заказы"
                                        navigateTo={'/orders'}
                                    />
                                    <Slider />
                                </div>
                            </Grid>

                            <Grid
                                item
                                size={12}
                            >
                                <Indicator
                                    title={'Выручка'}
                                    indicator={67}
                                    increaseView={true}
                                    increase={67}
                                    prevPeriod={'авг'}
                                    info={null}
                                    reverse={true}
                                />
                            </Grid>
                            <Grid
                                item
                                size={12}
                            >
                                <TitleWithLink
                                    title="Проноз на конец сентября"
                                    size="medium"
                                    withLink={false}
                                />
                                <Grid
                                    container
                                    spacing={3}
                                >
                                    {Array.from({ length: 6 }).map(
                                        (_, index) => (
                                            <Grid
                                                item
                                                size={6}
                                                key={index}
                                            >
                                                <Indicator
                                                    title={'Выручка'}
                                                    indicator={67}
                                                    increaseView={true}
                                                    increase={67}
                                                    prevPeriod={'авг'}
                                                    info={null}
                                                    reverse={true}
                                                />
                                            </Grid>
                                        )
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </ThemeProvider>
            </main>

            {/* <IndicatorsFinance data={data?.finance} isLoading={isLoading} /> */}
        </div>
    );
};

export default Main;
