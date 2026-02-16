// Константы для фильтров контрагентов
export const FILTER_VALUES = {
    ALL: 'all',
    NOT_SELECTED: 'not_selected',
};

export const DEFAULT_COUNTERPARTY = {
    id: FILTER_VALUES.ALL,
    name: 'Все',
};

export const DEFAULT_CONTRACT = {
    id: FILTER_VALUES.NOT_SELECTED,
    name: 'Договор не выбран',
};
