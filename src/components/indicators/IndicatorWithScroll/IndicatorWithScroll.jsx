import s from './IndicatorWithScroll.module.scss';
import classNames from 'classnames';
//components
import Loader from '../IndicatorWithList/Loader/Loader';
import TitleWithLink from 'components/ui/TitleWithLink/TitleWithLink';
import EllipsisWithTooltip from 'components/ui/EllipsisWithTooltip/EllipsisWithTooltip';
import { addSpaceNumber } from 'utils/addSpaceNumber';
import UniButton from 'components/ui/UniButton/UniButton/UniButton';

const IndicatorWithScroll = ({
    isLoading,
    title,
    list = [],
    navigateTo = '',
    leftColumnTitle,
    rightColumnTitle,
    navigateToNewTab,
    height,
    emptyDataTitle = 'Нет данных',
    buttonConfig,
}) => {
    const { buttonText, onButtonClick, buttonIcon } = buttonConfig || {};
    const hasButtonConfig =
        buttonConfig && Object.keys(buttonConfig || {}).length > 0;
    const scrollAble = list.length > 5;
    const isEmptyData = !list || list.length === 0;
    return (
        <div
            className={s.root}
            style={{ height: height }}
        >
            <TitleWithLink
                title={title}
                size="small"
                type="inner"
                navigateTo={navigateTo}
                navigateToNewTab={navigateToNewTab}
            />
            {isEmptyData && (
                <div className={s.emptyDataTitle}>{emptyDataTitle}</div>
            )}
            {hasButtonConfig && isEmptyData && (
                <UniButton
                    type="outline"
                    text={buttonText}
                    onClick={onButtonClick}
                    icon={buttonIcon}
                    iconPosition="left"
                />
            )}

            <div className={classNames(s.loader, isLoading && s.loader_load)}>
                <Loader />
            </div>

            {!isEmptyData && (
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
            )}

            {!isEmptyData && (
                <div className={classNames(s.list, scrollAble && s.scroll)}>
                    {list.map((item) => (
                        <div
                            key={item.id}
                            className={s.item}
                        >
                            <div className={s.leftColumn}>
                                <EllipsisWithTooltip text={item.name} />
                                {item.additional && (
                                    <div>{item.additional}</div>
                                )}
                                {item.label && <Label text={item.label} />}
                            </div>
                            <div className={s.rightColumn}>{item.value}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default IndicatorWithScroll;

const Label = ({ text }) => (
    <div className={s.label}>
        <EllipsisWithTooltip text={text} />
    </div>
);
