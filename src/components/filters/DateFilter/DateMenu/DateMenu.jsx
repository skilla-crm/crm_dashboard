import { useDispatch } from 'react-redux';
import classNames from 'classnames';

import { DatePickerСhoose } from './DatePickerСhoose/index';
import {
  getCurrentMonth,
  getCurrentQuarter,
  getCurrentYear,
  getLastMonth,
  getPreviousYear,
} from './utils/date';

import styles from './DateMenu.module.scss';

import {
  setDateEndPicker as setDateEnd,
  setDateStartPicker as setDateStart,
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
    dispatch(setDateStart(getCurrentMonth('start')));
    dispatch(setDateEnd(getCurrentMonth('end')));
    setActiveFilter('date');
    setIsOpen(false);
  };

  const handlerLastMonth = () => {
    dispatch(setDateStart(getLastMonth('start')));
    dispatch(setDateEnd(getLastMonth('end')));
    setActiveFilter('date');
    setIsOpen(false);
  };

  const handlerCurrentQuarter = () => {
    dispatch(setDateStart(getCurrentQuarter('start')));
    dispatch(setDateEnd(getCurrentQuarter('end')));
    setActiveFilter('date');
    setIsOpen(false);
  };

  const handlerCurrentYear = () => {
    dispatch(setDateStart(getCurrentYear('start')));
    dispatch(setDateEnd(getCurrentYear('end')));
    setActiveFilter('date');
    setIsOpen(false);
  };

  const handlerPreviousYear = () => {
    dispatch(setDateStart(getPreviousYear('start')));
    dispatch(setDateEnd(getPreviousYear('end')));
    setActiveFilter('date');
    setIsOpen(false);
  };

  return (
    <div
      className={classNames(styles.menu, isOpen ? styles.menu_open : '')}
      onClick={(e) => e.stopPropagation()}
    >
      <ul className={styles.list}>
        <li className={styles.item} onClick={handlerCurrentMonth}>
          Месяц
        </li>
        <li className={styles.item} onClick={handlerLastMonth}>
          Предыдущий месяц
        </li>
        <li className={styles.item} onClick={handlerCurrentQuarter}>
          Квартал
        </li>
        <li className={styles.item} onClick={handlerCurrentYear}>
          Год
        </li>
        <li className={styles.item} onClick={handlerPreviousYear}>
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
