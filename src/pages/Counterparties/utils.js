// Утилиты для страницы контрагентов

/**
 * Форматирует число в валютный формат
 */
export const formatCurrency = (value) =>
    typeof value === 'number'
        ? value.toLocaleString('ru-RU', { maximumFractionDigits: 0 })
        : '—';

/**
 * Форматирует дату договора
 */
export const formatContractDate = (dateTimeString) => {
    if (!dateTimeString) {
        return '';
    }
    try {
        const date = new Date(dateTimeString);
        if (isNaN(date.getTime())) {
            return '';
        }

        return date.toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    } catch {
        return '';
    }
};

/**
 * Формирует номер договора из префикса и номера
 */
export const formatContractNumber = (prefix, number) => {
    if (prefix && number) {
        return `${prefix}${number}`;
    }
    return prefix || number || 'Без номера';
};

/**
 * Проверяет, является ли поле валидным (не null, не undefined, не пустая строка, не 0)
 */
const isValidField = (field) => {
    if (field === null || field === undefined) {
        return false;
    }
    const stringValue = String(field).trim();
    return stringValue !== '' && stringValue !== '0';
};

export const formatCounterpartyDetails = (counterparty) => {
    if (!counterparty) return '';

    const parts = [];

    if (isValidField(counterparty.inn)) {
        parts.push(`ИНН ${counterparty.inn}`);
    }

    if (isValidField(counterparty.kpp)) {
        parts.push(`КПП ${counterparty.kpp}`);
    }

    if (isValidField(counterparty.ogrn)) {
        const innLength = String(counterparty.inn || '').length;
        if (innLength === 10) {
            parts.push(`ОГРН ${counterparty.ogrn}`);
        } else if (innLength === 12) {
            parts.push(`ОГРНИП ${counterparty.ogrn}`);
        } else {
            parts.push(`ОГРН ${counterparty.ogrn}`);
        }
    }

    return parts.join(' ');
};
