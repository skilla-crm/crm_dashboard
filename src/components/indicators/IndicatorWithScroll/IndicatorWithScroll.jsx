import s from './IndicatorWithScroll.module.scss';
import classNames from 'classnames';
//components
import Loader from './Loader/Loader';
import TitleWithLink from 'components/ui/TitleWithLink/TitleWithLink';
import EllipsisWithTooltip from 'components/ui/EllipsisWithTooltip/EllipsisWithTooltip';
import { addSpaceNumber } from 'utils/addSpaceNumber';
import { formatDateToRuLong } from 'utils/formatDateToRuLong';

export const indicatorListMock = [
    {
        id: 1,
        name: 'ООО Ромашка и партнёры',
        label: 'Основной',
        value: '12 450 ',
        additional: '*1234',
    },
    {
        id: 2,
        name: 'ИП Иванов Александр Сергеевич',
        label: 'Санкт-Петербург',
        value: '8 120 ',
    },
    {
        id: 3,
        name: 'АО «Технологии будущего»',
        label: 'Казань',
        value: '25 000 ',
    },
    {
        id: 4,
        name: 'ООО СтройИнвестГрупп',
        label: 'Новосибирск',
        value: '3 540 ',
    },
    {
        id: 5,
        name: 'ООО Digital Solutions & Consulting',
        label: 'Екатеринбург',
        value: '18 990 ',
        additional: '*1234',
    },
    // {
    //   id: 5,
    //   name: "ООО Digital Solutions & Consulting",
    //   label: "Екатеринбург",
    //   value: "18 990 ",
    // },
];

const mockData = [
    {
        id: 134,
        bank: 'АО "ТБанк"',
        rs: '*7040',
        is_main: 0,
        last_extract_date: '2025-08-14 10:36:55',
    },
    {
        id: 549,
        bank: 'ООО "Банк Точка"',
        rs: '*2127',
        is_main: 1,
        last_extract_date: '2025-08-05 03:35:48',
    },
    {
        id: 133,
        bank: 'ООО "Банк Точка"',
        rs: '*4355',
        is_main: 1,
        last_extract_date: '2025-07-31 07:00:20',
    },
    {
        id: 550,
        bank: 'КЕМЕРОВСКОЕ ОТДЕЛЕНИЕ N8615 ПАО СБЕРБАНК',
        rs: '*1029',
        is_main: 0,
        last_extract_date: null,
    },
];

const IndicatorWithScroll = ({
    isLoading,
    title,
    list = [],
    navigateTo = '',
    leftColumnTitle,
    rightColumnTitle,
}) => {
    console.log(list);
    const scrollAble = indicatorListMock.length > 5;
    return (
        <div className={s.root}>
            <TitleWithLink
                title={title}
                size="small"
                type="inner"
                navigateTo={navigateTo}
            />

            <div className={classNames(s.loader, isLoading && s.loader_load)}>
                <Loader />
            </div>

            <div className={s.header}>
                <div className={s.leftHeader}>{leftColumnTitle}</div>
                <div
                    className={classNames(
                        s.rightHeader,
                        scrollAble && s.paddingRight
                    )}
                >
                    {rightColumnTitle}
                </div>
            </div>

            <div className={classNames(s.list, scrollAble && s.scroll)}>
                {list.map((item) => (
                    <div
                        key={item.id}
                        className={s.item}
                    >
                        <div className={s.leftColumn}>
                            <EllipsisWithTooltip text={item.name} />
                            {item.additional && <div>{item.additional}</div>}
                            {item.label && <Label text={item.label} />}
                        </div>
                        <div className={s.rightColumn}>{item.value}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IndicatorWithScroll;

const Label = ({ text }) => (
    <div className={s.label}>
        <EllipsisWithTooltip text={text} />
    </div>
);
