import { useId, useState } from 'react';
import classNames from 'classnames';
import s from './CounterpartiesDiagram.module.scss';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';
import { ReactComponent as IconInfo } from 'assets/icons/iconInfo.svg';
import { useModal } from 'hooks/useModal';

import CounterpartiesTooltip from './ui/CounterpartiesTooltip';
import Loader from 'components/indicators/Indicator/Loader/Loader';

//utils
import { getDateTicks } from 'utils/getDataTicks';
import { formatDateRu } from 'utils/formatDateRu';

const defaultYAxisFormatter = (value) => {
    if (value === 0) return '0';

    return value;
};

const series = [
    {
        key: 'invitations',
        color: '#80DEF1',
        gradient: ['#80DEF1', '#80DEF1'],
        name: 'Отправленные приглашения',
        isSwitch: false,
    },
    {
        key: 'registrations',
        color: '#7499E8',
        gradient: ['#7499E8', '#7499E8'],
        name: 'Регистрации новых исполинтелей',
        isSwitch: false,
    },
];

const CounterpartiesDiagram = ({
    data,
    title,
    height = 330,
    maxXTicks = 7,
    series: customSeries = series,
    onInfoClick,
    xTickFormatter = formatDateRu,
    yTickFormatter = defaultYAxisFormatter,
    tooltipValueFormatter,
    isLoading = false,
}) => {
    const gradientPrefix = useId().replace(/:/g, '-');
    const { showModal } = useModal();
    const [disabledKeys, setDisabledKeys] = useState(() => new Set());

    const toggleSeries = (key) => {
        setDisabledKeys((prev) => {
            const next = new Set(prev);
            if (next.has(key)) {
                next.delete(key);
            } else {
                next.add(key);
            }
            return next;
        });
    };

    const xTicks = getDateTicks(data, maxXTicks);
    const lastTickValue = xTicks[xTicks.length - 1];
    const firstTickValue = xTicks[0];
    const lastTickIndex = xTicks.length - 1;
    const lastDataDate = data.length > 0 ? data[data.length - 1]?.date : null;

    const seriesLabels = Object.fromEntries(
        customSeries.map((item) => [item.key, item.name])
    );

    const renderCustomTick = ({ x, y, payload, index }) => {
        const currentValue = payload?.value;
        const tickIndex =
            index !== undefined
                ? index
                : xTicks.findIndex(
                      (tick) => String(tick) === String(currentValue)
                  );
        const isLast =
            tickIndex === lastTickIndex ||
            String(currentValue) === String(lastTickValue) ||
            String(currentValue) === String(lastDataDate);
        const isFirst =
            tickIndex === 0 || String(currentValue) === String(firstTickValue);
        const shiftLeftPx = 20;
        const shiftRightPx = 20;

        return (
            <text
                x={isLast ? x - shiftRightPx : isFirst ? x + shiftLeftPx : x}
                y={y + 12}
                dy={10}
                fill="#71869D"
                fontSize={16}
                fontWeight={400}
                textAnchor="middle"
            >
                {xTickFormatter(payload?.value)}
            </text>
        );
    };

    return (
        <div className={s.rootDia}>
            <div className={s.headerDia}>
                <h4 className={s.headerTitle}>{title}</h4>
            </div>

            <ResponsiveContainer
                width="100%"
                height={height}
            >
                <AreaChart data={data}>
                    <defs>
                        {customSeries.map((item) => {
                            const gradientId = `${gradientPrefix}-${item.key}`;

                            if (!item.gradient?.length) return null;

                            const [startColor, endColor] = item.gradient;

                            return (
                                <linearGradient
                                    key={gradientId}
                                    id={gradientId}
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="0%"
                                        stopColor={startColor}
                                        stopOpacity={0.2}
                                    />
                                    <stop
                                        offset="100%"
                                        stopColor={endColor}
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                            );
                        })}
                    </defs>

                    <CartesianGrid
                        strokeDasharray="10 8"
                        height={0.5}
                        vertical={false}
                        stroke="#EAEAEA"
                    />

                    <XAxis
                        ticks={xTicks}
                        interval={0}
                        dataKey="date"
                        tick={renderCustomTick}
                        axisLine={true}
                        stroke="#EAEAEA"
                        tickLine={false}
                    />

                    <YAxis
                        width={80}
                        tickMargin={12}
                        tick={{
                            fill: '#71869D',
                            fontSize: 16,
                            fontWeight: 400,
                            lineHeight: '16px',
                            dx: 0,
                            dy: 0,
                        }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={yTickFormatter}
                    />

                    {customSeries.map((item) => {
                        if (disabledKeys.has(item.key)) return null;

                        return (
                            <Area
                                key={item.key}
                                type="monotone"
                                dataKey={item.key}
                                stroke={item.color}
                                strokeWidth={2}
                                fill="none"
                                dot={false}
                            />
                        );
                    })}

                    <Tooltip
                        content={
                            <CounterpartiesTooltip
                                seriesLabels={seriesLabels}
                                valueFormatter={tooltipValueFormatter}
                            />
                        }
                    />
                </AreaChart>
            </ResponsiveContainer>
            <div className={s.footerDia}>
                {customSeries.map((item) => {
                    const isDisabled = disabledKeys.has(item.key);

                    return (
                        <div
                            key={item.key}
                            className={s.footerDiaItem}
                        >
                            {item.isSwitch ? (
                                <label
                                    className={s.footerDiaSwitch}
                                    style={{ '--switch-color': item.color }}
                                >
                                    <input
                                        type="checkbox"
                                        className={s.footerDiaSwitchInput}
                                        checked={!isDisabled}
                                        onChange={() => toggleSeries(item.key)}
                                    />
                                    <span className={s.footerDiaSwitchSlider} />
                                </label>
                            ) : (
                                <div
                                    className={s.footerDiaItemDot}
                                    style={{
                                        backgroundColor: item.color,
                                        opacity: isDisabled ? 0.35 : 1,
                                    }}
                                ></div>
                            )}
                            <div
                                className={s.footerDiaItemTitle}
                                style={{ opacity: isDisabled ? 0.65 : 1 }}
                            >
                                {item.name}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className={classNames(s.loader, isLoading && s.loader_load)}>
                <Loader />
            </div>
        </div>
    );
};

export default CounterpartiesDiagram;
