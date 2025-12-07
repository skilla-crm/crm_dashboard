import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import classNames from 'classnames';
import s from './CounterpartyDocsDiagram.module.scss';
import TitleWithLink from 'components/ui/TitleWithLink/TitleWithLink';

const ACTIVE_COLORS = {
    signed: '#70E093',
    sent: '#A59ADC',
    notSent: '#C0CADD',
};

const DISABLED_COLORS = {
    signed: '#C0CADD',
    sent: '#C0CADD',
    notSent: '#C0CADD',
};

const CounterpartyDocsDiagram = ({
    title = 'Закрывающие документы',
    data = {
        send: { count: 0, percent: 0 },
        sign: { count: 0, percent: 0 },
        not_send: { count: 0, percent: 0 },
    },
    disabled = false,
}) => {
    const signed = data.sign?.count || 0;
    const sent = data.send?.count || 0;
    const notSent = data.not_send?.count || 0;
    const total = signed + sent + notSent;
    const hasNoData = total === 0;

    const legendData = [
        {
            name: 'Подписаны',
            value: signed,
            percent: data.sign?.percent || 0,
            key: 'signed',
        },
        {
            name: 'Отправлены',
            value: sent,
            percent: data.send?.percent || 0,
            key: 'sent',
        },
        {
            name: 'Не отправлены',
            value: notSent,
            percent: data.not_send?.percent || 0,
            key: 'notSent',
        },
    ];

    //если данных нет, показываем один серый сегмент
    const chartData = hasNoData
        ? [{ name: 'Нет данных', value: 100, key: 'notSent' }]
        : legendData;

    // цвет для диаграммы серые если нет данных или disabled
    const chartColors = disabled || hasNoData ? DISABLED_COLORS : ACTIVE_COLORS;

    // Цвета для легенды всегда активные (кроме disabled)
    const legendColors = disabled ? DISABLED_COLORS : ACTIVE_COLORS;

    return (
        <div className={s.root}>
            <TitleWithLink
                title={title}
                size="small"
                withLink={false}
            />

            <PieChart
                width={222}
                height={90}
            >
                <Pie
                    data={chartData}
                    dataKey="value"
                    cx="50%"
                    cy="100%"
                    startAngle={180}
                    endAngle={0}
                    innerRadius={54}
                    outerRadius={80}
                    cornerRadius={4}
                    paddingAngle={hasNoData ? 0 : 2}
                >
                    {chartData.map((entry) => (
                        <Cell
                            key={entry.name}
                            fill={chartColors[entry.key]}
                        />
                    ))}
                </Pie>
            </PieChart>

            <div className={s.legend}>
                {legendData.map((item) => {
                    const percent = item.percent || 0;
                    const value = `${item.value} (${percent}%)`;

                    return (
                        <div
                            key={item.key}
                            className={classNames(s.legendItem, {
                                [s.disabled]: disabled,
                            })}
                        >
                            <span
                                className={s.legendDot}
                                style={{ background: legendColors[item.key] }}
                            />
                            {`${item.name} ${value} `}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default CounterpartyDocsDiagram;
