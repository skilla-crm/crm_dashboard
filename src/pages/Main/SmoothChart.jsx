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

const LastDot = ({ cx, cy, index, dataLength }) => {
    if (index !== dataLength - 1) return null;

    return (
        <circle
            cx={cx}
            cy={cy}
            r={5}
            fill="#FFFFFF"
            stroke="#A59ADC"
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
}) => {
    const chartData = data && data.length ? data : defaultData;
    return (
        <div
            className={classNames(s.wrapper, className)}
            style={{ width, height }}
        >
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={chartData}
                    margin={{ top: 0, right: 16, bottom: 0, left: 0 }}
                >
                    <defs>
                        <linearGradient
                            id="revenueGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop offset="0%" stopColor="#8B7CF6" stopOpacity={0.35} />
                            <stop offset="100%" stopColor="#A59ADC" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#A59ADC"
                        strokeWidth={3}
                        fill="url(#revenueGradient)"
                        dot={(props) => (
                            <LastDot {...props} dataLength={chartData.length} />
                        )}
                        activeDot={false}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SmoothChart;