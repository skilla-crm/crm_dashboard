import s from './FinanceTooltip.module.scss';

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

const FinanceTooltip = ({
    active,
    payload,
    label,
    seriesLabels = {},
    valueFormatter = formatCurrency,
}) => {
    if (!active || !payload?.length) return null;

    const dateFromPayload = payload[0]?.payload?.date;
    const dateToFormat = dateFromPayload || label;
    const { dateText, weekday } = formatTooltipDateParts(dateToFormat);

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
                        key={item.dataKey}
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

export default FinanceTooltip;
