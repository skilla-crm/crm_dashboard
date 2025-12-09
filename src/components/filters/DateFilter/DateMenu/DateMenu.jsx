import { useDispatch } from 'react-redux';
import classNames from 'classnames';

import { DatePickerСhoose } from './DatePickerСhoose/index';
import {
    getCurrentMonth,
    getCurrentQuarter,
    getCurrentYear,
    getLastMonth,
    getPreviousYear,
    getTitleDateDuration,
} from './utils/date';

import styles from './DateMenu.module.scss';

import {
    setDateEndPicker as setDateEnd,
    setDateStartPicker as setDateStart,
    setDatePeriod,
} from '../../../../redux/filters/dateRangeSlice';

export const DateMenu = ({
    isOpen,
    setIsOpen,
    setActiveFilter,
    setShouldResetPicker,
    shouldResetPicker,
}) => {
    const dispatch = useDispatch();

    const handlerCurrentMonth = () => {
        const start = getCurrentMonth('start');
        const end = getCurrentMonth('end');
        dispatch(setDateStart(start));
        dispatch(setDateEnd(end));
        dispatch(setDatePeriod(getTitleDateDuration(start, end)));
        setActiveFilter('date');
        setIsOpen(false);
    };

    const handlerLastMonth = () => {
        const start = getLastMonth('start');
        const end = getLastMonth('end');
        dispatch(setDateStart(start));
        dispatch(setDateEnd(end));
        dispatch(setDatePeriod(getTitleDateDuration(start, end)));
        setActiveFilter('date');
        setIsOpen(false);
    };

    const handlerCurrentQuarter = () => {
        const start = getCurrentQuarter('start');
        const end = getCurrentQuarter('end');
        dispatch(setDateStart(start));
        dispatch(setDateEnd(end));
        dispatch(setDatePeriod('Квартал'));
        setActiveFilter('date');
        setIsOpen(false);
    };

    const handlerCurrentYear = () => {
        const start = getCurrentYear('start');
        const end = getCurrentYear('end');
        dispatch(setDateStart(start));
        dispatch(setDateEnd(end));
        dispatch(setDatePeriod(getTitleDateDuration(start, end)));
        setActiveFilter('date');
        setIsOpen(false);
    };

    const handlerPreviousYear = () => {
        const start = getPreviousYear('start');
        const end = getPreviousYear('end');
        dispatch(setDateStart(start));
        dispatch(setDateEnd(end));
        dispatch(setDatePeriod(getTitleDateDuration(start, end)));
        setActiveFilter('date');
        setIsOpen(false);
    };

    return (
        <div
            className={classNames(styles.menu, isOpen ? styles.menu_open : '')}
            onClick={(e) => e.stopPropagation()}
        >
            <ul className={styles.list}>
                <li
                    className={styles.item}
                    onClick={handlerCurrentMonth}
                >
                    Месяц
                </li>
                <li
                    className={styles.item}
                    onClick={handlerLastMonth}
                >
                    Предыдущий месяц
                </li>
                <li
                    className={styles.item}
                    onClick={handlerCurrentQuarter}
                >
                    Квартал
                </li>
                <li
                    className={styles.item}
                    onClick={handlerCurrentYear}
                >
                    Год
                </li>
                <li
                    className={styles.item}
                    onClick={handlerPreviousYear}
                >
                    Предыдущий год
                </li>
            </ul>
            <div className={styles.date}>
                <DatePickerСhoose
                    setOpenDateFilter={setIsOpen}
                    setActiveFilter={setActiveFilter}
                    setShouldResetPicker={setShouldResetPicker}
                    shouldResetPicker={shouldResetPicker}
                />
            </div>
        </div>
    );
};
