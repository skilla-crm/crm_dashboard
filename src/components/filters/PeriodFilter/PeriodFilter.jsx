import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

// components
import FilterButton from 'components/filters/ui/FilterButton/FilterButton';

// icons
import { ReactComponent as IconCalendar } from 'assets/icons/iconCalendar.svg';
import { ReactComponent as IconDoneBlue } from 'assets/icons/iconDoneBlue.svg';

// styles
import s from './PeriodFilter.module.scss';

const PeriodFilter = ({ period, setPeriod, isLoading, periods }) => {
    const modalRef = useRef(null);
    const buttonRef = useRef(null);

    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                openModal &&
                modalRef.current &&
                !modalRef.current.contains(e.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(e.target)
            ) {
                setOpenModal(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, [openModal]);

    const handleOpen = () => {
        setOpenModal((prev) => !prev);
    };

    const handleSelectPeriod = (selectedPeriod) => {
        setPeriod(selectedPeriod);
        setOpenModal(false);
    };

    const handleReset = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setPeriod('month');
        setOpenModal(false);
    };

    const selectedPeriodLabel =
        periods.find((p) => p.value === period)?.label || 'Месяц';

    return (
        <div className={s.root}>
            <FilterButton
                title={selectedPeriodLabel}
                Icon={IconCalendar}
                count={period !== 'month' ? 1 : 0}
                handleReset={handleReset}
                handleOpen={handleOpen}
                buttonRef={buttonRef}
                done={false}
                load={isLoading}
            />

            <div
                ref={modalRef}
                className={classNames(s.modal, openModal && s.modal_open)}
            >
                <div className={s.block}>
                    {periods?.map((periodOption) => (
                        <div
                            key={periodOption.value}
                            className={s.item}
                            onClick={() =>
                                handleSelectPeriod(periodOption.value)
                            }
                        >
                            <span>{periodOption.label}</span>
                            {period === periodOption.value && (
                                <IconDoneBlue className={s.checkIcon} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PeriodFilter;
