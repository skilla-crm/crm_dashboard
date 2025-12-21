import s from './EmployeesTooltip.module.scss';

const formatTooltipDateParts = (dateStr) => {
    if (!dateStr) {
        return {
            dateText: '',
            weekday: '',
        };
    }

    const date = new Date(dateStr);
    const dateText = date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: 'long',
    });
    const weekdayRaw = date.toLocaleDateString('ru-RU', {
        weekday: 'long',
    });

    const weekday =
        weekdayRaw?.length > 0
            ? `${weekdayRaw[0].toUpperCase()}${weekdayRaw.slice(1)}`
            : '';

    return { dateText, weekday };
};
const formatCurrency = (value) => {
    if (typeof value !== 'number') return '—';

    return value.toLocaleString('ru-RU', {
        maximumFractionDigits: 0,
    });
};

/**
 * Рендер тултипа для финансовых графиков.
 * @param {Object} props
 * @param {boolean} props.active Нужно ли показывать тултип (управляется recharts).
 * @param {Array<{dataKey: string, color: string, name: string, value: number}>} props.payload Данные точек от recharts.
 * @param {string} props.label Значение оси X (ожидается дата в ISO).
 * @param {Record<string, string>} [props.seriesLabels={}] Соответствие ключей рядов их отображаемым названиям.
 * @param {(value: number) => string} [props.valueFormatter=formatCurrency] Форматтер числовых значений.
 */
const EmployeesTooltip = ({
    active,
    payload,
    label,
    seriesLabels = {},
    valueFormatter = formatCurrency,
}) => {
    if (!active || !payload?.length) return null;

    const { dateText, weekday } = formatTooltipDateParts(label);

    return (
        <div className={s.tooltip}>
            <div className={s.tooltipDate}>
                {dateText}
                {weekday && (
                    <span className={s.tooltipDateWeekday}>{weekday}</span>
                )}
            </div>

            <ul className={s.tooltipList}>
                {payload.map((item) => (
                    <li
                        key={item.key}
                        className={s.tooltipItem}
                    >
                        <div className={s.tooltipItemContent}>
                            {' '}
                            <div
                                className={s.tooltipDot}
                                style={{ backgroundColor: item.color }}
                            />
                            <div className={s.tooltipLabel}>
                                {seriesLabels[item.dataKey] || item.name}
                            </div>
                        </div>
                        <div className={s.tooltipValue}>
                            {valueFormatter(item.value)}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeesTooltip;
