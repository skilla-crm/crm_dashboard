import s from "./IndicatorWithScroll.module.scss";
import classNames from "classnames";
//components
import Loader from "../IndicatorWithList/Loader/Loader";
import TitleWithLink from "components/ui/TitleWithLink/TitleWithLink";
import EllipsisWithTooltip from "components/ui/EllipsisWithTooltip/EllipsisWithTooltip";
import { addSpaceNumber } from "utils/addSpaceNumber";

const IndicatorWithScroll = ({
  isLoading,
  title,
  list = [],
  navigateTo = "",
  leftColumnTitle,
  rightColumnTitle,
  navigateToNewTab,
}) => {
  const scrollAble = list.length > 5;
  return (
    <div className={s.root}>
      <TitleWithLink
        title={title}
        size="small"
        type="inner"
        navigateTo={navigateTo}
        navigateToNewTab={navigateToNewTab}
      />

      <div className={classNames(s.loader, isLoading && s.loader_load)}>
        <Loader />
      </div>

      <div className={s.header}>
        <div className={s.leftHeader}>{leftColumnTitle}</div>
        <div
          className={classNames(s.rightHeader, scrollAble && s.paddingRight)}
        >
          {rightColumnTitle}
        </div>
      </div>

      <div className={classNames(s.list, scrollAble && s.scroll)}>
        {list.map((item) => (
          <div key={item.id} className={s.item}>
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
