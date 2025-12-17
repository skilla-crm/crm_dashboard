import s from "./Indicator.module.scss";
import classNames from "classnames";
import { useEffect, useState } from "react";

import NumberFlow from "@number-flow/react";
import { ReactComponent as IconInfo } from "./assets/iconinfo.svg";
import { ReactComponent as IconArrow } from "./assets/arrow.svg";
//hooks
import useIncreaseState from "hooks/useIncreaseState";
//components
import Tooltip from "./Tooltip/Tooltip";
import Loader from "./Loader/Loader";

const Indicator = ({
  isLoading,
  title,
  indicator,
  increaseView,
  increase,
  prevPeriod,
  info,
  reverse,
  data,
  percentOf,
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
      <p className={s.title}>{title}</p>

      <div className={s.indicator}>
        <NumberFlow value={indicator} />
        {Boolean(percentOf) && (
          <div className={s.percentOf}>
            <NumberFlow value={percentOf} />%
          </div>
        )}
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
      </div>
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

      <div className={classNames(s.loader, isLoading && s.loader_load)}>
        <Loader />
      </div>
    </div>
  );
};

export default Indicator;
