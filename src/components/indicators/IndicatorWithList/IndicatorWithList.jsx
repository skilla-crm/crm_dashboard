import s from "./IndicatorWithList.module.scss";
import classNames from "classnames";
import { useEffect, useState } from "react";
import NumberFlow from "@number-flow/react";
import { ReactComponent as IconInfo } from "./assets/iconinfo.svg";
import { ReactComponent as IconArrow } from "./assets/arrow.svg";
//hooks
import useIncreaseState from "hooks/useIncreaseState";
//components
import Tooltip from "../../ui/Tooltip/Tooltip";
import Loader from "./Loader/Loader";
import TitleWithLink from "components/ui/TitleWithLink/TitleWithLink";
import EllipsisWithTooltip from "components/ui/EllipsisWithTooltip/EllipsisWithTooltip";
import { addSpaceNumber } from "utils/addSpaceNumber";

const IndicatorWithList = ({
  isLoading,
  title,
  indicator,
  increaseView = false,
  increase,
  prevPeriod,
  info = null,
  reverse = false,
  data = [],
  navigateTo = "",
}) => {
  const [hover, setHover] = useState(false);
  const increaseState = useIncreaseState(reverse, increase);

  const handleHover = () => {
    setHover(true);
  };

  const handleBlur = () => {
    setHover(false);
  };
  return (
    <div className={s.root}>
      <TitleWithLink
        title={title}
        size="small"
        type="inner"
        navigateTo={navigateTo}
      />

      <div className={s.indicator}>
        {indicator && <NumberFlow value={indicator} />}
        {info && (
          <div
            className={s.info}
            onMouseEnter={handleHover}
            onMouseLeave={handleBlur}
          >
            <IconInfo />
            <Tooltip open={hover} text={info} top={16} maxWidth={280} />
          </div>
        )}

        {increaseView && (
          <div className={classNames(s.bottom, isLoading && s.bottom_load)}>
            <p
              className={classNames(
                s.increase,
                increaseState.negaive && s.increase_red
              )}
            >
              <IconArrow
                className={classNames(increaseState.down && s.arrow_down)}
              />
              {Math.abs(increase)}%
            </p>
            <span>отн. {prevPeriod}</span>
          </div>
        )}
      </div>

      <div className={classNames(s.loader, isLoading && s.loader_load)}>
        <Loader />
      </div>
      {data.map((item) => (
        <div key={item.id} className={s.item}>
          <EllipsisWithTooltip text={item.company_name} />
          <span>{`+${addSpaceNumber(item.sum)}`}</span>
        </div>
      ))}
    </div>
  );
};

export default IndicatorWithList;
