import { useId, useState } from 'react';
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

import FinanceTooltip from './ui/FinanceTooltip';
import s from './FinanceDiagram.module.scss';

export const formatDateRu = (dateStr) => {
    if (!dateStr) return '';

    const date = new Date(dateStr);
    const parts = new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'short',
    }).formatToParts(date);

    const day = parts.find((p) => p.type === 'day')?.value;
    const month = parts.find((p) => p.type === 'month')?.value.replace('.', '');

    return [day, month].filter(Boolean).join(' ');
};

const getDateTicks = (data, maxTicks = 7) => {
    if (!data.length) return [];

    const step = Math.max(1, Math.floor((data.length - 1) / (maxTicks - 1)));
    const ticks = [];

    for (let i = 0; i < data.length; i += step) {
        ticks.push(data[i].date);
        if (ticks.length >= maxTicks - 1) break;
    }

    const lastDate = data[data.length - 1].date;
    if (ticks[ticks.length - 1] !== lastDate) {
        ticks.push(lastDate);
    }

    return ticks.slice(0, maxTicks);
};

const defaultYAxisFormatter = (value) =>
    value === 0 ? '0 тыс' : `${value / 1000} тыс`;

/**

 * @param {Object} props
 * @param {Array<{date: string, [key: string]: number}>} [props.data=[]] Набор точек графика; ключи должны совпадать с `series.key`.
 * @param {string} [props.title='Финансовая статистика'] Заголовок блока.
 * @param {number} [props.height=330] Высота диаграммы в пикселях.
 * @param {number} [props.maxXTicks=7] Максимум подписей по оси X.
 * @param {Array<{key: string, name: string, color: string, gradient?: string[], isSwitch?: boolean}>} props.series конфигурация рядов графика
 * @param {(modalKey: string) => void} [props.onInfoClick] Кастомный обработчик клика по иконке информации; по умолчанию `showModal`.
 * @param {(rawData: any[]) => Array<object>} [props.dataMapper] Маппер, которым преобразуются данные для графика.
 * @param {string} [props.modalKey] Ключ модалки для кнопки информации.
 * @param {(value: string) => string} [props.xTickFormatter=formatDateRu] Форматтер подписей оси X.
 * @param {(value: number) => string} [props.yTickFormatter=defaultYAxisFormatter] Форматтер подписей оси Y.
 * @param {(value: number) => string} [props.tooltipValueFormatter] Форматтер чисел в тултипе.
 */
const FinanceDiagram = ({
    data = [],
    title = 'Финансовая статистика',
    height = 330,
    maxXTicks = 7,
    series,
    onInfoClick,
    dataMapper,
    modalKey,

    xTickFormatter = formatDateRu,
    yTickFormatter = defaultYAxisFormatter,
    tooltipValueFormatter,
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
    const seriesLabels = Object.fromEntries(
        series.map((item) => [item.key, item.name])
    );

    const renderCustomTick = ({ x, y, payload }) => {
        const isLast = payload?.value === lastTickValue;
        const isFirst = payload?.value === firstTickValue;
        const shiftLeftPx = 20;

        return (
            <text
                x={isFirst ? x + shiftLeftPx : isLast ? x - shiftLeftPx : x}
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
                {modalKey && (
                    <button
                        className={s.headerDiaBtn}
                        onClick={() =>
                            onInfoClick
                                ? onInfoClick(modalKey)
                                : showModal(modalKey)
                        }
                    >
                        <IconInfo />
                    </button>
                )}
            </div>

            <ResponsiveContainer
                width="100%"
                height={height}
            >
                <AreaChart data={data}>
                    <defs>
                        {series.map((item) => {
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
                        strokeDasharray="4 4"
                        vertical={false}
                        stroke="#EAEAEA"
                    />

                    <XAxis
                        ticks={xTicks}
                        interval={0}
                        dataKey="date"
                        tick={renderCustomTick}
                        axisLine={false}
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

                    {series.map((item) => {
                        if (disabledKeys.has(item.key)) return null;

                        const gradientId = `${gradientPrefix}-${item.key}`;
                        const fillValue = item.gradient?.length
                            ? `url(#${gradientId})`
                            : item.color;

                        return (
                            <Area
                                key={item.key}
                                type="monotone"
                                dataKey={item.key}
                                stroke={item.color}
                                strokeWidth={2}
                                fill={fillValue}
                                dot={false}
                            />
                        );
                    })}

                    <Tooltip
                        content={
                            <FinanceTooltip
                                seriesLabels={seriesLabels}
                                valueFormatter={tooltipValueFormatter}
                            />
                        }
                        // cursor={{ stroke: '#DDE3EA', strokeWidth: 1 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
            <div className={s.footerDia}>
                {series.map((item) => {
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
        </div>
    );
};

export default FinanceDiagram;
const data = [{
    "date": "2025-12-09",
    "revenue": 70082.68,
   
  }]