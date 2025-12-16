import classNames from 'classnames';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

import s from './SmoothChart.module.scss';

const defaultData = [
    {
        date: '2025-12-09',
        revenue: 70082.68,
    },
    {
        date: '2025-12-10',
        revenue: 92000,
    },
    {
        date: '2025-12-11',
        revenue: 86000,
    },
    {
        date: '2025-12-12',
        revenue: 110000,
    },
];

const LastDot = ({ cx, cy, index, dataLength, strokeColor = '#A59ADC' }) => {
    if (index !== dataLength - 1) return null;

    return (
        <circle
            cx={cx}
            cy={cy}
            r={5}
            fill="#FFFFFF"
            stroke={strokeColor}
            strokeWidth={3}
            pointerEvents="none"
        />
    );
};

const SmoothChart = ({
    data,
    width = '100%',
    height = 142,
    className,
    strokeColor = '#A59ADC',
    gradientStartColor = '#8B7CF6',
    gradientEndColor = '#A59ADC',
    dotStrokeColor = '#A59ADC',
}) => {
    const chartData = data && data.length ? data : defaultData;
    const gradientId = `chartGradient-${Math.random()
        .toString(36)
        .substr(2, 9)}`;

    return (
        <div
            className={classNames(s.wrapper, className)}
            style={{ width, height }}
        >
            <ResponsiveContainer
                width="100%"
                height="100%"
            >
                <AreaChart
                    data={chartData}
                    margin={{ top: 0, right: 16, bottom: 12, left: 0 }}
                >
                    <defs>
                        <linearGradient
                            id={gradientId}
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="0%"
                                stopColor={gradientStartColor}
                                stopOpacity={0.4}
                            />
                            <stop
                                offset="100%"
                                stopColor={gradientEndColor}
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>

                    <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke={strokeColor}
                        strokeWidth={3}
                        fill={`url(#${gradientId})`}
                        dot={(props) => (
                            <LastDot
                                {...props}
                                dataLength={chartData.length}
                                strokeColor={dotStrokeColor}
                            />
                        )}
                        activeDot={false}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SmoothChart;
