import s from './Main.module.scss';
import { useState } from 'react';
// api
import { useGetDashboardQuery } from '../../redux/dashboardApiActions';
// components
import IndicatorsFinance from 'components/IndicatorsFinance/IndicatorsFinance';
import { ReactComponent as IconSettings } from 'assets/icons/iconSettings.svg';
import { ReactComponent as IconSave } from 'assets/icons/iconDoneWhite.svg';
import FinanceDiagram from 'components/indicators/FinanceDiagram/FinanceDiagram';
import UniButton from 'components/ui/UniButton/UniButton';
import PeriodFilter from 'components/filters/PeriodFilter/PeriodFilter';
import TitleWithLink from 'components/ui/UniButton/TitleWithLink/TitleWithLink';
import { createTheme, Grid, ThemeProvider } from '@mui/material';
import Slider from 'components/indicators/Slider/Slider';
import Indicator from 'components/indicators/Indicator/Indicator';
import IndicatorWithList from 'components/indicators/IndicatorWithList/IndicatorWithList';
import HalfCircleDiagram from 'components/indicators/HalfCircleDiagram/HalfCircleDiagram';

const PERIODS = [
    { value: 'month', label: 'Месяц' },
    { value: 'quarter', label: 'Квартал' },
    { value: 'year', label: 'Год' },
];

// const SECTION_COMPONENTS = {
//   FINANCE: FinanceSection,
//   ADVERTISING: AdvertisingSection,
//   ORDERS: OrdersSection,
//   COUNTERPARTIES: CounterpartiesSection,
//   FORECAST: ForecastSection,
//   EMPLOYEES: EmployeesSection,
//   PERFORMERS: PerformersSection,
// };

// const BLOCK_COMPONENTS = {
//   FINANCE_REVENUE: FinanceRevenue,
//   FINANCE_EXPENSES: FinanceExpenses,
//   FINANCE_TRANSACTION_INCOME: FinanceTransactionIncome,
//   FINANCE_PAYMENTS_WORKER: FinancePaymentsWorker,
//   FINANCE_LOST_REVENUE: FinanceLostRevenue,
//   FINANCE_DIAGRAM: FinanceDiagram,

//   ADVERTISING_AVERAGE_PRICE_CLICK: AdvertisingPpcClick,
//   ADVERTISING_AVERAGE_PRICE_ORDER: AdvertisingPpcOrder,
//   ADVERTISING_AVERAGE_PRICE_CALL: AdvertisingPpcCall,
//   ADVERTISING_CTR: AdvertisingCtr,

//   QUANTITY_ORDERS: QuantityOrders,
//   SUM_ORDERS: SumOrders,
//   PAY_TYPES: PayTypes,

//   COUNTERPARTIES_DEBTS: CounterpartiesDebts,
//   CLOSING_DOCS: ClosingDocs,

//   MARGINAL_PROFIT: ForecastMarginalProfit,
//   OPERATION_PROFIT: ForecastOperationProfit,
//   REVENUE: ForecastRevenue,
//   ORDERS_COUNT: ForecastOrdersCount,
//   PAYMENTS_TO_PERFORMERS: ForecastPayments,
//   PURCHASES_AND_ACCOUNTING: ForecastPurchases,
// };

// const Dashboard = ({ grid, data }) => {
//   return (
//     <div className="dashboard-grid">
//       {grid
//         .filter(section => !section.disabled)
//         .map(section => {
//           const SectionComponent = SECTION_COMPONENTS[section.indicator];
//           if (!SectionComponent) return null;

//           return (
//             <SectionComponent key={section.indicator}>
//               {/* если у секции есть блоки */}
//               {section.blocks?.length > 0 && (
//                 <div className="section-blocks">
//                   {section.blocks
//                     .filter(block => !block.disabled)
//                     .map(block => {
//                       const BlockComponent = BLOCK_COMPONENTS[block.indicator];
//                       if (!BlockComponent) return null;

//                       const blockData = block.data || data[block.indicator] || {};

//                       return (
//                         <div
//                           key={block.indicator}
//                           style={{ gridColumn: `span ${block.size || 2}` }}
//                         >
//                           <BlockComponent data={blockData} />
//                         </div>
//                       );
//                     })}
//                 </div>
//               )}

//               {/* если секция без blocks то просто одиночный компонент */}
//               {!section.blocks && <SectionComponent data={section.data} />}
//             </SectionComponent>
//           );
//         })}
//     </div>
//   );
// };

const Main = () => {
    const [period, setPeriod] = useState('month');
    const [isEditing, setIsEditing] = useState(false);
    const params = {
        'filter[period]': period,
    };
    const { data, isLoading } = useGetDashboardQuery(params);

    const theme = createTheme({
        spacing: 4,
    });
    return (
        <div className={s.root}>
            <header className={s.header}>
                <h2>
                    Дашборд за{' '}
                    {PERIODS.find(
                        (p) => p.value === period
                    )?.label.toLowerCase() || 'Месяц'}
                </h2>
                <div className={s.headerBtns}>
                    {!isEditing && (
                        <PeriodFilter
                            period={period}
                            setPeriod={setPeriod}
                            isLoading={isLoading}
                            periods={PERIODS}
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
                                <TitleWithLink title="Финансы" />
                                <FinanceDiagram />

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
                                    <TitleWithLink title="Реклама" />
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
                                    <TitleWithLink title="Контрагенты" />
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
                                    <TitleWithLink title="Заказы" />
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
