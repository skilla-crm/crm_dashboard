import formatDateToRuLong from 'utils/formatDateToRuLong';

const buildBankAccountsData = (data = []) =>
    data.map((item, index) => ({
        id: item.id || index,
        name: item.bank,
        additional: item.rs,
        label: item.is_main === 1 ? 'Основной' : undefined,
        value: formatDateToRuLong(item.last_extract_date),
    }));

export default buildBankAccountsData;
