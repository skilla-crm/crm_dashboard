import formatDateToRuLong from 'utils/formatDateToRuLong';

const buildBankAccountsData = (data = []) =>
    data.map((item) => ({
        id: item.id,
        name: item.bank,
        additional: item.rs,
        label: item.is_main === 1 ? 'Основной' : undefined,
        value: formatDateToRuLong(item.last_extract_date),
    }));

export default buildBankAccountsData;
