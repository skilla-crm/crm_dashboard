// styles
import s from './Counterparties.module.scss';
import classNames from 'classnames';

// dependencies
import { useEffect, useState, useMemo, useCallback } from 'react';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';

// dssets
import { ReactComponent as IconBackForward } from 'assets/icons/iconBackForwardBlack.svg';

// Components
import FiltersContainer from 'components/filters/FiltersContainer/FiltersContainer';
import TitleWithLink from 'components/ui/TitleWithLink/TitleWithLink';
import Indicator from 'components/indicators/Indicator/Indicator';
import Dropdown from 'components/ui/Dropdown/Dropdown';

// Hooks
import { useDashboardNavigation } from 'hooks/useDashboardNavigation';

// Redux
import { useGetCounterpartiesQuery } from '../../redux/counterpartiesApiActions';

// Utils
import { getDatePeriodShort } from 'utils/datePeriodMap';

// Local components
import CounterpartiesDiagram from './components/CounterpartiesDiagram/CounterpartiesDiagram';
import OrdersFrequencyDiagram from './components/OrdersFrequencyDiagram/OrdersFrequencyDiagram';

// Local config
import {
    COUNTERPARTIES_STATISTICS_SERIES,
    ORDERS_FREQUENCY_SERIES,
} from './config';

// Local constants
import {
    FILTER_VALUES,
    DEFAULT_COUNTERPARTY,
    DEFAULT_CONTRACT,
} from './constants';

// Local utils
import {
    formatCurrency,
    formatContractDate,
    formatContractNumber,
    formatCounterpartyDetails,
} from './utils';
import Loader from 'components/indicators/Indicator/Loader/Loader';

const Counterparties = () => {
    const handleDashboardClick = useDashboardNavigation();
    const [selectedCounterparty, setSelectedCounterparty] =
        useState(DEFAULT_COUNTERPARTY);
    const [selectedContract, setSelectedContract] = useState(null);
    const { dateStartPicker, dateEndPicker, datePeriod } = useSelector(
        (state) => state.dateRange || {}
    );
    const selectedPartnerships = useSelector(
        (state) => state.companies?.selectedPartnerships || []
    );
    const prevPeriod = getDatePeriodShort(datePeriod);

    const params = useMemo(
        () => ({
            'filter[date_start]': dateStartPicker,
            'filter[date_end]': dateEndPicker,
            'filter[partnership_id]': selectedPartnerships,
            'filter[type_company]':
                selectedCounterparty?.id &&
                selectedCounterparty.id !== FILTER_VALUES.ALL
                    ? selectedCounterparty.id
                    : undefined,
            'filter[contract_id]':
                selectedContract?.id &&
                selectedContract.id !== FILTER_VALUES.NOT_SELECTED
                    ? selectedContract.id
                    : undefined,
        }),
        [
            dateStartPicker,
            dateEndPicker,
            selectedPartnerships,
            selectedCounterparty,
            selectedContract,
        ]
    );

    const { data, isLoading, isFetching } = useGetCounterpartiesQuery(params, {
        skip: !dateStartPicker || !dateEndPicker,
    });

    const isLoadingData = isLoading || isFetching;
    const { orders_receipts, performers_order_frequency, counterparties } =
        data || {};

    const handleCounterpartyChange = useCallback((counterparty) => {
        setSelectedCounterparty(counterparty);
        if (
            counterparty?.id &&
            counterparty.id !== FILTER_VALUES.ALL &&
            counterparty?.contracts &&
            counterparty.contracts.length > 0
        ) {
            setSelectedContract(DEFAULT_CONTRACT);
        } else {
            setSelectedContract(null);
        }
    }, []);

    const renderOption = useCallback((item, isSpecial = false) => {
        const details = formatCounterpartyDetails(item);
        return (
            <div className={s.optionCompany}>
                <div className={isSpecial ? s.companyNameAll : s.companyName}>
                    {item.name ?? ''}
                </div>
                {details && <div className={s.companyDetails}>{details}</div>}
            </div>
        );
    }, []);

    // отображение договора в Dropdown
    const renderContractOption = useCallback((contract) => {
        if (contract?.id === FILTER_VALUES.NOT_SELECTED) {
            return renderOption(contract, true);
        }

        const contractNumber = formatContractNumber(
            contract.prefix,
            contract.number
        );
        const contractDate = formatContractDate(contract.created_at);

        return (
            <div className={s.optionCompany}>
                <div className={s.companyName}>
                    {contractNumber}
                    {contractDate && (
                        <span className={s.contractDate}>
                            {' '}
                            ({contractDate})
                        </span>
                    )}
                </div>
            </div>
        );
    }, []);

    const renderCounterpartyOption = useCallback(
        (counterparty) =>
            renderOption(counterparty, counterparty?.id === FILTER_VALUES.ALL),
        [renderOption]
    );

    const renderCounterpartyValue = useCallback(
        (counterparty) => {
            if (!counterparty) return null;
            return renderOption(
                counterparty,
                counterparty.id === FILTER_VALUES.ALL
            );
        },
        [renderOption]
    );

    const counterpartiesWithAll = useMemo(
        () => [DEFAULT_COUNTERPARTY, ...(counterparties || [])],
        [counterparties]
    );

    // Получение опций для договоров
    const contractOptions = useMemo(() => {
        if (
            selectedCounterparty?.id === FILTER_VALUES.ALL ||
            !selectedCounterparty ||
            selectedCounterparty?.contracts?.length === 0
        ) {
            return [];
        }
        return [DEFAULT_CONTRACT, ...(selectedCounterparty?.contracts || [])];
    }, [selectedCounterparty]);

    // должен ли быть disabled dropdown договоров
    const isContractDisabled = useMemo(
        () =>
            !selectedCounterparty ||
            selectedCounterparty?.id === FILTER_VALUES.ALL ||
            selectedCounterparty?.contracts?.length === 0,
        [selectedCounterparty]
    );

    // Конфигурация индикаторов для Grid
    const gridIndicators = useMemo(
        () => [
            {
                key: 'transaction_income',
                title: 'Поступления на р/с',
                dataKey: 'transaction_income',
            },
            {
                key: 'transaction_outcome',
                title: 'Выплаты',
                dataKey: 'transaction_outcome',
            },
            {
                key: 'their_debts',
                title: 'Нам должны',
                dataKey: 'their_debts',
            },
            {
                key: 'our_debts',
                title: 'Мы должны',
                dataKey: 'our_debts',
            },
        ],
        []
    );

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0 });
    }, []);

    useEffect(() => {
        if (!selectedCounterparty || !counterparties) return;
        if (selectedCounterparty.id === FILTER_VALUES.ALL) return;

        const counterpartyExists = counterparties.some(
            (cp) => cp.id === selectedCounterparty.id
        );
        if (!counterpartyExists) {
            setSelectedCounterparty(DEFAULT_COUNTERPARTY);
            setSelectedContract(null);
        }
    }, [counterparties, selectedCounterparty]);

    useEffect(() => {
        if (!selectedContract || !selectedCounterparty?.contracts) return;
        if (selectedContract.id === FILTER_VALUES.NOT_SELECTED) return;

        const contractExists = selectedCounterparty.contracts.some(
            (contract) => contract.id === selectedContract.id
        );
        if (!contractExists) {
            if (
                selectedCounterparty?.id &&
                selectedCounterparty.id !== FILTER_VALUES.ALL &&
                selectedCounterparty.contracts.length > 0
            ) {
                setSelectedContract(DEFAULT_CONTRACT);
            } else {
                setSelectedContract(null);
            }
        }
    }, [selectedCounterparty, selectedContract]);

    useEffect(() => {
        if (
            selectedCounterparty?.id &&
            selectedCounterparty.id !== FILTER_VALUES.ALL &&
            selectedCounterparty?.contracts &&
            selectedCounterparty.contracts.length > 0 &&
            !selectedContract
        ) {
            setSelectedContract(DEFAULT_CONTRACT);
        }
    }, [selectedCounterparty, selectedContract]);

    // Сброс выбранного договора, если у контрагента нет договоров
    useEffect(() => {
        if (
            selectedCounterparty?.id &&
            selectedCounterparty.id !== FILTER_VALUES.ALL &&
            selectedContract &&
            (!selectedCounterparty?.contracts ||
                selectedCounterparty.contracts.length === 0)
        ) {
            setSelectedContract(null);
        }
    }, [selectedCounterparty, selectedContract]);

    return (
        <div className={s.root}>
            <header className={s.header}>
                <h2>
                    <span
                        onClick={handleDashboardClick}
                        style={{ cursor: 'pointer' }}
                    >
                        Дашборд
                    </span>{' '}
                    <IconBackForward /> Контрагенты
                </h2>
                <div className={s.headerBtns}>
                    <FiltersContainer
                        isFetching={isFetching}
                        isLoading={isLoading}
                    />
                </div>
            </header>
            <main className={s.main}>
                <div className={s.leftSide}>
                    <div className={s.dropdowns}>
                        <h4 className={s.headerTitle}>
                            Выбор контрагента и договора
                        </h4>
                        <Dropdown
                            description="Контрагент"
                            options={counterpartiesWithAll}
                            value={selectedCounterparty}
                            onChange={handleCounterpartyChange}
                            placeholder="Выберите контрагента"
                            autoSelectFirst={false}
                            renderOption={renderCounterpartyOption}
                            renderValue={renderCounterpartyValue}
                        />
                        <Dropdown
                            description="Договор"
                            options={contractOptions}
                            value={selectedContract}
                            onChange={setSelectedContract}
                            placeholder={
                                selectedCounterparty?.id === FILTER_VALUES.ALL
                                    ? 'Договор не выбран'
                                    : !selectedCounterparty?.contracts ||
                                      selectedCounterparty?.contracts
                                          ?.length === 0
                                    ? 'Договоры не найдены'
                                    : 'Выберите договор'
                            }
                            disabled={isContractDisabled}
                            renderOption={renderContractOption}
                            renderValue={renderContractOption}
                            autoSelectFirst={false}
                        />

                        <div
                            className={classNames(
                                s.loader,
                                isLoading && s.loader_load
                            )}
                        >
                            <Loader />
                        </div>
                    </div>
                    <CounterpartiesDiagram
                        data={orders_receipts || []}
                        title="Заказы и поступления"
                        series={COUNTERPARTIES_STATISTICS_SERIES}
                        tooltipValueFormatter={formatCurrency}
                        isLoading={isLoadingData}
                    />
                    <OrdersFrequencyDiagram
                        data={performers_order_frequency || []}
                        title="Частота заказов и исполнители"
                        series={ORDERS_FREQUENCY_SERIES}
                        isLoading={isLoadingData}
                    />
                </div>
                <div className={s.rightSide}>
                    <TitleWithLink
                        title="Данные по всем контрагентам"
                        size="medium"
                    />
                    <Indicator
                        isLoading={isLoadingData}
                        title="Сумма завершенных заказов"
                        indicator={data?.order_closed_sum?.indicator || 0}
                        increase={data?.order_closed_sum?.increase || 0}
                        prevPeriod={prevPeriod}
                        info={null}
                        reverse={false}
                    />
                    <Grid
                        container
                        spacing={1.5}
                    >
                        {gridIndicators.map((indicatorConfig) => {
                            const indicatorData =
                                data?.[indicatorConfig.dataKey];
                            return (
                                <Grid
                                    key={indicatorConfig.key}
                                    item
                                    size={6}
                                >
                                    <Indicator
                                        isLoading={isLoadingData}
                                        title={indicatorConfig.title}
                                        indicator={
                                            indicatorData?.indicator || 0
                                        }
                                        increase={indicatorData?.increase || 0}
                                        prevPeriod={prevPeriod}
                                        info={null}
                                        reverse={false}
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                </div>
            </main>
        </div>
    );
};

export default Counterparties;
