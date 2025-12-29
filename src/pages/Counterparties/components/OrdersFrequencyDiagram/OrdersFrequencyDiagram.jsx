import { useState } from 'react';
import classNames from 'classnames';
import s from './OrdersFrequencyDiagram.module.scss';
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';
import { ReactComponent as IconInfo } from 'assets/icons/iconInfo.svg';
import { useModal } from 'hooks/useModal';

import FinanceTooltip from '../../../Finance/components/FinanceDiagram/ui/FinanceTooltip';
import Loader from 'components/indicators/Indicator/Loader/Loader';
import TooltipInfo from 'components/indicators/Indicator/Tooltip/Tooltip';

//utils
import { getDateTicks } from 'utils/getDataTicks';
import { formatDateRu } from 'utils/formatDateRu';

const defaultYAxisFormatter = (value) => {
    if (value === 0) return '0';

    if (value < 1000) return value;

    if (value >= 1000000) {
        const millions = (value / 1000000).toFixed(1).replace('.', ',');
        return `${millions} млн.`;
    }

    return `${value / 1000} тыс`;
};

const OrdersFrequencyDiagram = ({
    data = [],
    title,
    height = 330,
    maxXTicks = 7,
    series,
    onInfoClick,
    dataMapper,
    modalKey,

    xTickFormatter = formatDateRu,
    yTickFormatter = defaultYAxisFormatter,
    tooltipValueFormatter,
    isLoading,
}) => {
    const { showModal } = useModal();
    const [disabledKeys, setDisabledKeys] = useState(() => new Set());
    const [hoveredInfo, setHoveredInfo] = useState(null);

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
        series.map((item) => [item.key, item.name])
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
        const shiftRightPx = 27;

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
                <BarChart
                    data={data}
                    barSize={6}
                    barGap={2}
                >
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

                    {series.map((item) => {
                        if (disabledKeys.has(item.key)) return null;

                        return (
                            <Bar
                                key={item.key}
                                dataKey={item.key}
                                fill={item.color}
                                radius={[4, 4, 0, 0]}
                            />
                        );
                    })}

                    <Tooltip
                        cursor={false}
                        content={
                            <FinanceTooltip
                                seriesLabels={seriesLabels}
                                valueFormatter={tooltipValueFormatter}
                            />
                        }
                    />
                </BarChart>
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
                                {item.info && (
                                    <span
                                        className={s.footerDiaItemInfo}
                                        onMouseEnter={() =>
                                            setHoveredInfo(item.key)
                                        }
                                        onMouseLeave={() =>
                                            setHoveredInfo(null)
                                        }
                                    >
                                        <IconInfo />
                                        <TooltipInfo
                                            open={hoveredInfo === item.key}
                                            text={item.info}
                                            top={16}
                                            maxWidth={280}
                                        />
                                    </span>
                                )}
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

export default OrdersFrequencyDiagram;
