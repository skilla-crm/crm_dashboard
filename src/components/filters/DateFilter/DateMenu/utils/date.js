import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isoWeek from 'dayjs/plugin/isoWeek';
import localeData from 'dayjs/plugin/localeData';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';

dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);
dayjs.extend(localeData);
dayjs.extend(quarterOfYear);
dayjs.locale('ru');

const insertZeroNum = (count) => {
  return count < 10 ? `0${count}` : count;
};

// const getDateFormatted = (date) => {
//   const year = date.getFullYear();
//   const month = date.getMonth();
//   const day = date.getDate();
//   return `${year}-${insertZeroNum(month + 1)}-${insertZeroNum(day)}`;
// };

const getDateFormatted = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return `${year}-${insertZeroNum(month + 1)}-${insertZeroNum(day)}`;
};

export const getDatePicker = (value) => {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return `${year}-${insertZeroNum(month + 1)}-${insertZeroNum(day)}`;
};

export const getCurrentDay = () => {
  const date = new Date();
  return getDateFormatted(date);
};

export const getNextDay = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return getDateFormatted(date);
};

export const getThreeDay = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return getDateFormatted(date);
};

export const getLastDay = () => {
  const date = dayjs().subtract(1, 'day');
  const lastDay = date.format('D MMMM YYYY').replace(' г.', '');
  const formatedLastDay = lastDay.split(' ')[0].length < 2 ? '0' + lastDay : lastDay;
  return formatedLastDay;
};

export const getWeek = () => {
  const date = new Date();
  date.setDate(date.getDate() - 6);
  return getDateFormatted(date);
};

export const getLastWeek = (value) => {
  if (value === 'start') {
    const dateStart = dayjs().subtract(1, 'week').startOf('week').toDate();
    return getDateFormatted(dateStart);
  }

  if (value === 'end') {
    const dateEnd = dayjs().subtract(1, 'week').endOf('week').toDate();
    return getDateFormatted(dateEnd);
  }
};

export const getTwoLastWeek = () => {
  const date = new Date();
  date.setDate(date.getDate() - 13);
  return getDateFormatted(date);
};

export const getLastMonth = (value) => {
  if (value === 'start') {
    const dateStart = dayjs().subtract(1, 'month').startOf('month').toDate();
    return getDateFormatted(dateStart);
  }

  if (value === 'end') {
    const dateEnd = dayjs().subtract(1, 'month').endOf('month').toDate();
    return getDateFormatted(dateEnd);
  }

  if (value === 'title') {
    const title = dayjs().subtract(1, 'month').format('MMMM');
    return title;
  }
};

export const getBeforeLastMonth = (value) => {
  if (value === 'start') {
    const dateStart = dayjs().subtract(2, 'month').startOf('month').toDate();
    return getDateFormatted(dateStart);
  }

  if (value === 'end') {
    const dateEnd = dayjs().subtract(2, 'month').endOf('month').toDate();
    return getDateFormatted(dateEnd);
  }

  if (value === 'title') {
    const title = dayjs().subtract(2, 'month').format('MMMM');
    return title;
  }
};

export const getCurrentMonth = (value) => {
  if (value === 'start') {
    const dateStart = dayjs().startOf('month').toDate();
    return getDateFormatted(dateStart);
  }

  if (value === 'end') {
    const dateEnd = dayjs().endOf('month').toDate();
    return getDateFormatted(dateEnd);
  }
};

export const getCurrentQuarter = (value) => {
  if (value === 'start') {
    const dateStart = dayjs().startOf('quarter').toDate();
    return getDateFormatted(dateStart);
  }

  if (value === 'end') {
    const dateEnd = dayjs().endOf('quarter').toDate();
    return getDateFormatted(dateEnd);
  }
};

export const getCurrentYear = (value) => {
  if (value === 'start') {
    const dateStart = dayjs().startOf('year').toDate();
    return getDateFormatted(dateStart);
  }

  if (value === 'end') {
    const dateEnd = dayjs().endOf('year').toDate();
    return getDateFormatted(dateEnd);
  }
};

export const getPreviousYear = (value) => {
  if (value === 'start') {
    const dateStart = dayjs().subtract(1, 'year').startOf('year').toDate();
    return getDateFormatted(dateStart);
  }

  if (value === 'end') {
    const dateEnd = dayjs().subtract(1, 'year').endOf('year').toDate();
    return getDateFormatted(dateEnd);
  }
};

export const getTitleDateDuration = (dateStart, dateEnd, viewFullMonth = false) => {
  const currentYear = new Date().getFullYear();
  const startYear = new Date(`${dateStart}`).getFullYear();
  const endYear = new Date(`${dateEnd}`).getFullYear();

  const startMonth = new Date(`${dateStart}`).getMonth() + 1;
  const endMonth = new Date(`${dateEnd}`).getMonth() + 1;

  const startDay = new Date(`${dateStart}`).getDate();
  const endDay = new Date(`${dateEnd}`).getDate();

  const lastDayMonth = dayjs(dateStart)
    .endOf('month')
    .format('D');

  if (!dateStart && !dateEnd) {
    return 'Период';
  }

  if (
    startYear === endYear &&
    startMonth === 1 &&
    endMonth === 12 &&
    startDay === 1 &&
    endDay === 31
  ) {
    //выбран полный год
    return `${dayjs(dateStart).format('YYYY')}`;
  }

  //выбран день текущего года
  if (dateStart === dateEnd && currentYear === startYear) {
    return dayjs(dateStart).format('D MMMM');
  }

  //выбран день другого года
  if (dateStart === dateEnd && currentYear !== startYear) {
    return `${dayjs(dateStart).format('D MMMM YYYY')}`;
  }

  //Выбран период в одном месяце текущего года
  if (currentYear === startYear && startMonth === endMonth) {
    //выбран полный месяц текущего года
    if (startDay === 1 && endDay === +lastDayMonth && !viewFullMonth) {
      const date = `${dayjs(dateStart).format('MMMM')}`;
      return date[0].toUpperCase() + date.slice(1);
    }

    return `${startDay} — ${dayjs(dateEnd).format('D MMMM')}`;
  }

  //Выбран период в одном месяце другого года
  if (currentYear !== endYear && startMonth === endMonth) {
    //выбран полный месяц другого года
    if (startDay === 1 && endDay === +lastDayMonth && !viewFullMonth) {
      const date = `${dayjs(dateStart).format('MMMM YYYY')}`;
      return date[0].toUpperCase() + date.slice(1);
    }

    return `${startDay} — ${dayjs(dateEnd).format('D MMMM YYYY')}`;
  }

  //Выбран период в разные месяцы текущего года
  if (currentYear === startYear && currentYear === endYear && startMonth !== endMonth) {
    return `${dayjs(dateStart).format('D MMMM')} — ${dayjs(dateEnd).format('D MMMM')}`;
  }

  //Выбран период в разные месяцы другого года
  if (currentYear !== endYear && currentYear !== startYear && startMonth !== endMonth) {
    return `${dayjs(dateStart).format('D MMMM')} — ${dayjs(dateEnd).format('D MMMM YYYY')}`;
  }

  //Выбран период в разные года
  if (startYear !== endYear) {
    return `${dayjs(dateStart).format('D MMMM YYYY')} — ${dayjs(dateEnd).format('D MMMM YYYY')}`;
  }
};
