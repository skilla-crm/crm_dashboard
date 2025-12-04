import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
} from 'recharts';

import s from './FinanceDiagram.module.scss';
import { addSpaceNumber2 } from 'utils/addSpaceNumber';

const FinanceDiagram = ({ profitData }) => {
    const hasData = profitData != null;
    const defaultTotal = 1000;

    const revenueValue = hasData ? profitData.revenue?.indicator || 0 : 0;
    const marginalProfitValue = hasData
        ? profitData.marginal_profit?.indicator || 0
        : 0;

    const paymentsWorkerValue = hasData
        ? profitData.payments_worker?.indicator || 0
        : 0;
    const manualAccountingValue = hasData
        ? profitData.manual_accounting?.indicator || 0
        : 0;
    const purchasesValue = hasData ? profitData.purchases?.indicator || 0 : 0;
    const operatingProfitValue = hasData
        ? profitData.operating_profit?.indicator !== undefined
            ? profitData.operating_profit.indicator
            : marginalProfitValue -
              paymentsWorkerValue -
              manualAccountingValue -
              purchasesValue
        : 0;

    const revenueReal = hasData ? profitData.revenue?.indicator || 0 : 0;
    const marginalProfitReal = hasData
        ? profitData.marginal_profit?.indicator || 0
        : 0;
    const paymentsWorkerReal = hasData
        ? profitData.payments_worker?.indicator || 0
        : 0;
    const purchasesReal = hasData ? profitData.purchases?.indicator || 0 : 0;
    const manualAccountingReal = hasData
        ? profitData.manual_accounting?.indicator || 0
        : 0;
    const operatingProfitReal = hasData
        ? profitData.operating_profit?.indicator !== undefined
            ? profitData.operating_profit.indicator
            : marginalProfitReal -
              paymentsWorkerReal -
              manualAccountingReal -
              purchasesReal
        : 0;

    let revenue,
        marginalProfit,
        paymentsWorker,
        operatingProfit,
        purchases,
        manualAccounting;

    if (hasData) {
        revenue = profitData.revenue?.indicator || 0;
        marginalProfit = profitData.marginal_profit?.indicator || 0;
        paymentsWorker = profitData.payments_worker?.indicator || 0;
        purchases = profitData.purchases?.indicator || 0;
        manualAccounting = profitData.manual_accounting?.indicator || 0;

        operatingProfit =
            profitData.operating_profit?.indicator !== undefined
                ? profitData.operating_profit.indicator
                : marginalProfit -
                  paymentsWorker -
                  purchases -
                  manualAccounting;
    } else {
        revenue = defaultTotal;
        marginalProfit = defaultTotal / 2;
        paymentsWorker = defaultTotal / 2;
        operatingProfit = defaultTotal / 3;
        purchases = defaultTotal / 3;
        manualAccounting = defaultTotal / 3;
    }

    const profitSegment = hasData ? operatingProfitValue : operatingProfit;
    const purchasesSegment = hasData ? purchasesValue : purchases;
    const manualSegment = hasData ? manualAccountingValue : manualAccounting;

    const empty = paymentsWorker;

    const emptySegment = empty > 0 ? empty : 0;

    const chartData = [
        {
            name: 'Выручка',
            total: revenue,
            main: revenue,
        },
        {
            name: 'Маржинальная прибыль',
            total: revenue,
            margin: marginalProfit,
            payments: paymentsWorker,
        },
        {
            name: 'Операционная прибыль',
            profit: profitSegment,
            purchases: purchasesSegment,
            manual: manualSegment,
            empty: emptySegment,
        },
    ];

    const getBarColor = (value, defaultColor) => {
        if (!hasData || value === 0) {
            return '#ECF2FC';
        }
        return defaultColor;
    };

    const marginalProfitPercent =
        revenueValue > 0
            ? ((marginalProfitValue / revenueValue) * 100).toFixed(1)
            : '0';
    const operatingProfitPercent =
        revenueValue > 0
            ? ((operatingProfitValue / revenueValue) * 100).toFixed(1)
            : '0';

    return (
        <div className={s.root}>
            <Block
                title="Выручка"
                value={addSpaceNumber2(revenueValue)}
                bars={[
                    {
                        dataKey: 'main',
                        color: getBarColor(revenue, '#79E099'),
                        value: revenue,
                    },
                ]}
                data={[chartData[0]]}
            />

            <Block
                title="Маржинальная прибыль"
                value={addSpaceNumber2(marginalProfitValue)}
                percent={marginalProfitPercent}
                bars={[
                    {
                        dataKey: 'margin',
                        color: getBarColor(marginalProfitValue, '#79E099'),
                        value: marginalProfit,
                        realValue: marginalProfitReal,
                    },
                    {
                        dataKey: 'payments',
                        color: getBarColor(paymentsWorker, '#E39C9C'),
                        label: (
                            <>
                                Выплаты
                                <br />
                                исполнителям
                            </>
                        ),
                        value: paymentsWorker,
                        realValue: paymentsWorkerReal,
                    },
                ]}
                data={[chartData[1]]}
            />

            <Block
                title="Операционная прибыль"
                value={addSpaceNumber2(operatingProfitValue)}
                percent={operatingProfitPercent}
                bars={[
                    {
                        dataKey: 'profit',
                        color: getBarColor(operatingProfitValue, '#79E099'),
                        value: profitSegment,
                        realValue: operatingProfitReal,
                    },
                    {
                        dataKey: 'purchases',
                        color: getBarColor(purchasesValue, '#A59ADC'),
                        label: 'Закупки',
                        labelPosition: 'top',
                        value: purchasesSegment,
                        realValue: purchasesReal,
                    },
                    {
                        dataKey: 'manual',
                        color: getBarColor(manualAccountingValue, '#E39C9C'),
                        label: 'Ручной учет',
                        labelPosition: 'bottom',
                        value: manualSegment,
                        realValue: manualAccountingReal,
                    },
                    {
                        dataKey: 'empty',
                        color: 'transparent',
                        value: emptySegment,
                    },
                ]}
                data={[chartData[2]]}
            />
        </div>
    );
};

export default FinanceDiagram;

const Block = ({ title, value, percent, bars, data, maxValue }) => {
    const calculateSegmentStart = (index) => {
        let start = 0;
        for (let i = 0; i < index; i++) {
            const barValue =
                bars[i].value !== undefined
                    ? bars[i].value
                    : data[0]?.[bars[i].dataKey] || 0;
            start += barValue;
        }
        return start;
    };

    const totalWidth = bars.reduce((sum, bar) => {
        const barValue =
            bar.value !== undefined ? bar.value : data[0]?.[bar.dataKey] || 0;
        return sum + barValue;
    }, 0);

    return (
        <div className={s.block}>
            <div className={s.blockInfo}>
                <div className={s.blockTitle}>{title}</div>
                <div className={s.blockValue}>
                    {percent !== undefined ? `${value} (${percent}%)` : value}
                </div>
            </div>

            <div className={s.blockChart}>
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <BarChart
                        layout="vertical"
                        data={data}
                        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                    >
                        <XAxis
                            type="number"
                            hide
                            domain={maxValue ? [0, maxValue] : undefined}
                        />
                        <YAxis
                            type="category"
                            hide
                        />

                        {bars.map((bar, index) => {
                            const realValue =
                                bar.realValue !== undefined
                                    ? bar.realValue
                                    : data[0]?.[bar.dataKey] || 0;
                            const shouldShowLabel = bar.label && realValue > 0;

                            const lastVisibleIndex =
                                bars
                                    .map((b, i) => {
                                        const bValue =
                                            b.value !== undefined
                                                ? b.value
                                                : data[0]?.[b.dataKey] || 0;
                                        const bRealValue =
                                            b.realValue !== undefined
                                                ? b.realValue
                                                : data[0]?.[b.dataKey] || 0;
                                        const isVisible =
                                            b.color !== 'transparent' &&
                                            (bValue > 0 || bRealValue > 0);
                                        return { index: i, isVisible };
                                    })
                                    .filter((item) => item.isVisible)
                                    .pop()?.index ?? bars.length - 1;

                            const isFirst = index === 0;
                            const isLastVisible = index === lastVisibleIndex;

                            return (
                                <Bar
                                    key={bar.dataKey}
                                    dataKey={bar.dataKey}
                                    stackId="a"
                                    fill={bar.color}
                                    radius={[
                                        isFirst ? 10 : 0,
                                        isLastVisible ? 10 : 0,
                                        isLastVisible ? 10 : 0,
                                        isFirst ? 10 : 0,
                                    ]}
                                />
                            );
                        })}
                    </BarChart>
                </ResponsiveContainer>

                <div className={s.labelsContainer}>
                    {bars.map((bar, index) => {
                        const realValue =
                            bar.realValue !== undefined
                                ? bar.realValue
                                : data[0]?.[bar.dataKey] || 0;
                        const shouldShowLabel = bar.label && realValue > 0;

                        if (!shouldShowLabel) return null;

                        const segmentStart = calculateSegmentStart(index);
                        const segmentStartPercent =
                            totalWidth > 0
                                ? (segmentStart / totalWidth) * 100
                                : 0;

                        const labelPosition = bar.labelPosition || 'top';

                        const isMultiLine = typeof bar.label !== 'string';

                        return (
                            <div
                                key={`label-${bar.dataKey}`}
                                className={`${s.label} ${s[labelPosition]} ${
                                    isMultiLine ? s.multiLine : ''
                                }`}
                                style={{
                                    left: `${segmentStartPercent}%`,
                                }}
                            >
                                {bar.label}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
