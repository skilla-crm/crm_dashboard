import s from './IndicatorWithList.module.scss';
import classNames from 'classnames';
//components
import Loader from './Loader/Loader';
import TitleWithLink from 'components/ui/TitleWithLink/TitleWithLink';
import EllipsisWithTooltip from 'components/ui/EllipsisWithTooltip/EllipsisWithTooltip';
import { addSpaceNumber } from 'utils/addSpaceNumber';

const IndicatorWithList = ({
    isLoading,
    title,
    list = [],
    navigateTo = '',
    leftColumnTitle,
    rightColumnTitle,

}) => {
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
            {list.map((item) => (
                <div
                    key={item.id}
                    className={s.item}
                >
                    {/* <div className={s.leftColumn}><EllipsisWithTooltip text={itemName}/><Label text={label}/></div>
                    <div className={s.rightColumn}>{value}</div> */}
                    
                </div>
            ))}
        </div>
    );
};

export default IndicatorWithList;

const Label = ({text}) => {
    return <div className={s.label}><EllipsisWithTooltip text={text}/></div>
}
