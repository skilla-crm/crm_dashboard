import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import classNames from 'classnames';

import s from './NestedDonutChart.module.scss';
import { addSpaceNumber2 } from 'utils/addSpaceNumber';
import Loader from './ui/Loader/Loader';

const NestedDonutChart = ({ data, isLoading }) => {
    const {
        verified,
        verifiedPercent,
        unverified,
        unverifiedPercent,
        smz,
        smzPercent,
        notSmz,
        notSmzPercent,
    } = data;

    const outerData = [
        { name: 'Проверенные', value: verified, color: '#80DEF1' },
        { name: 'Непроверенные', value: unverified, color: '#C0CADD' },
    ];

    const innerData = [
        { name: 'СМЗ', value: smz, color: '#A59ADC' },
        { name: 'Не СМЗ', value: notSmz, color: '#7EA6F5' },
        {
            name: 'padding',
            value: (smz + notSmz) * 0.025,
            color: 'transparent',
        },
    ];

    const total = verified + unverified;
    const verifiedAngle = total > 0 ? (verified / total) * 360 : 0;

    const legendData = [
        {
            name: 'Проверенные',
            count: verified,
            percent: verifiedPercent || 0,
            color: '#80DEF1',
            isNested: false,
        },
        {
            name: 'СМЗ',
            count: smz,
            percent: smzPercent || 0,
            color: '#A59ADC',
            isNested: true,
        },
        {
            name: 'Не СМЗ',
            count: notSmz,
            percent: notSmzPercent || 0,
            color: '#7EA6F5',
            isNested: true,
        },
        {
            name: 'Непроверенные',
            count: unverified,
            percent: unverifiedPercent || 0,
            color: '#C0CADD',
            isNested: false,
        },
    ];

    return (
        <div className={s.card}>
            <h3 className={s.title}>Среди новых исполнителей</h3>

            <div className={s.content}>
                <div className={s.chart}>
                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >
                        <PieChart>
                            <Pie
                                data={outerData}
                                dataKey="value"
                                cx="50%"
                                cy="50%"
                                innerRadius={36}
                                outerRadius={73}
                                startAngle={90}
                                endAngle={-270}
                                paddingAngle={4}
                                stroke="none"
                                cornerRadius={4}
                            >
                                {outerData.map((item, index) => (
                                    <Cell
                                        key={index}
                                        fill={item.color}
                                    />
                                ))}
                            </Pie>

                            <Pie
                                data={innerData}
                                dataKey="value"
                                cx="50%"
                                cy="50%"
                                innerRadius={55}
                                outerRadius={73}
                                startAngle={90}
                                endAngle={90 - verifiedAngle}
                                stroke="none"
                                cornerRadius={4}
                            >
                                {innerData.map((item, index) => (
                                    <Cell
                                        key={index}
                                        fill={item.color}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className={s.list}>
                    {legendData.map((item, i) => (
                        <div
                            key={i}
                            className={`${s.listItem} ${
                                item.isNested ? s.listItemIndented : ''
                            }`}
                        >
                            <span
                                className={`${s.dot} ${
                                    item.isNested ? s.dotSmall : s.dotLarge
                                }`}
                                style={{ background: item.color }}
                            />
                            <p className={s.text}>
                                {item.name} {addSpaceNumber2(item.count) || 0}
                                {Boolean(item.percent) && (
                                    <span className={s.percent}>
                                        {' '}
                                        ({Number(item.percent.toFixed(1))}%)
                                    </span>
                                )}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className={classNames(s.loader, isLoading && s.loader_load)}>
                <Loader />
            </div>
        </div>
    );
};

export default NestedDonutChart;
