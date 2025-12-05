import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
    LabelList,
    Rectangle,
} from 'recharts';
import s from './FunnelChart.module.scss';
import { useEffect, useRef } from 'react';

const funnelData = [
    { name: 'Показов', value: 1209, color: '#C0CADD' },
    { name: 'Кликов', value: 1100, color: '#A59ADC ' },
    { name: 'Звонков', value: 567, color: '#7499E8' },
    { name: 'Заказов', value: 356, color: '#80DEF1' },
    { name: 'Повторных заказов', value: 12, color: '#70E093' },
];

const CanvasBar = ({ x, y, width, height, fill }) => {
    const ref = useRef(null);

    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = fill;

        const w = width;
        const h = height;

        const r = 8; //  радиус нижних углов
        const rTop = 8; //  радиус верхних углов

        // параметры волны
        const waveTop = 20;
        const leftRise = -20;
        const curveDepth = 10;
        const rightSmooth = 12;

        ctx.beginPath();

        // Нижняя левая с закруглением:
        ctx.moveTo(r, h);
        ctx.quadraticCurveTo(0, h, 0, h - r);

        // Левая сторона вверх до начала закругления верхнего левого угла
        const topLeftY = waveTop + leftRise;
        ctx.lineTo(0, topLeftY + rTop);

        // Верхний левый угол с закруглением:
        ctx.quadraticCurveTo(0, topLeftY, rTop, topLeftY);

        // Верхняя волна (начинается после закругления)
        ctx.bezierCurveTo(
            w * 0.25,
            waveTop,
            w * 0.65,
            waveTop - curveDepth,
            w - rTop,
            waveTop + rightSmooth
        );

        // Верхний правый угол с закруглением:
        const topRightY = waveTop + rightSmooth;
        ctx.quadraticCurveTo(w, topRightY, w, topRightY + rTop);

        // Правая сторона вниз
        ctx.lineTo(w, h - r);

        // Нижняя правая с закруглением:
        ctx.quadraticCurveTo(w, h, w - r, h);

        ctx.closePath();
        ctx.fill();
    }, [width, height, fill]);

    return (
        <foreignObject
            x={x}
            y={y}
            width={width}
            height={height}
        >
            <canvas
                ref={ref}
                style={{ width: '100%', height: '100%' }}
            />
        </foreignObject>
    );
};

const CustomLabel = ({ x, y, width, height, value }) => {
    return (
        <text
            x={x + width / 2}
            y={y + height / 2}
            fill="#121922"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={14}
            fontWeight={500}
        >
            {value.toLocaleString('ru-RU')}
        </text>
    );
};

const FunnelChart = () => {
    return (
        <div className={s.root}>
            <h3 className={s.title}>Конверсия продаж</h3>

            <div className={s.chartContainer}>
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <BarChart
                        data={funnelData}
                        barCategoryGap={10}
                        margin={{ top: 20, left: 0, right: 0, bottom: 20 }}
                    >
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 14, fill: '#121922' }}
                        />
                        <YAxis
                            type="number"
                            domain={[0, 'dataMax']}
                            hide
                        />
                        {/* <Tooltip
                            contentStyle={{
                                backgroundColor: '#fff',
                                border: '1px solid #E5E7EB',
                                borderRadius: '8px',
                                padding: '8px 12px',
                            }}
                            formatter={(value) => value.toLocaleString('ru-RU')}
                        /> */}
                        <Bar
                            dataKey="value"
                            shape={(props) => <CanvasBar {...props} />}
                            isAnimationActive={false}
                        >
                            {funnelData.map((entry, idx) => (
                                <Cell
                                    key={idx}
                                    fill={entry.color}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default FunnelChart;
