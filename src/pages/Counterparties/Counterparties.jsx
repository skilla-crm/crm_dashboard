import { useState } from 'react';
import s from './Counterparties.module.scss';
import DateFilter from 'components/filters/DateFilter/DateFilter';
import { ReactComponent as IconBackForward } from 'assets/icons/iconBackForwardBlack.svg';

const Counterparties = () => {
    const [activeFilter, setActiveFilter] = useState(null);

    const clearActiveFilter = () => {
        setActiveFilter(null);
    };

    return (
        <div className={s.root}>
            <header className={s.header}>
                <h2>
                    Дашборд <IconBackForward /> Контрагенты
                </h2>
                <div className={s.headerBtns}>
                    <DateFilter
                        isFetching={false}
                        setActiveFilter={setActiveFilter}
                        clearActiveFilter={clearActiveFilter}
                    />
                </div>
            </header>
            <main className={s.main}></main>
        </div>
    );
};

export default Counterparties;
