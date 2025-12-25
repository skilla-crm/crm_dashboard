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
import TitleWithLink from "components/ui/TitleWithLink/TitleWithLink";

const Indicator = ({
    isLoading,
    title,
    indicator,
    increase,
    prevPeriod,
    info,
    reverse,
    percentOf,
    navigateTo,
    navigateToNewTab,
    prevPeriodIndicator,
}) => {
    const [hover, setHover] = useState(false);
    const increaseState = useIncreaseState(reverse, increase);

    const increaseView =
        increase !== 0 && indicator !== 0 && prevPeriodIndicator !== 0 && increase < 1000;

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
                navigateTo={navigateTo}
                size="small"
                type="inner"
                navigateToNewTab={navigateToNewTab}
            />

            <div className={s.indicator}>
                <div className={s.indicatorContent}>
                    <NumberFlow
                        value={
                            typeof indicator === 'number'
                                ? indicator.toFixed(0)
                                : '0'
                        }
                    />
                    {Boolean(percentOf) && increaseView && (
                        <div className={s.percentOf}>
                            <NumberFlow value={percentOf} />
                            <span>%</span>
                        </div>
                    )}
                </div>
                {info && (
                    <div
                        className={s.info}
                        onMouseEnter={handleHover}
                        onMouseLeave={handleBlur}
                    >
                        <IconInfo />
                        <Tooltip
                            open={hover}
                            text={info}
                            top={16}
                            maxWidth={280}
                        />
                    </div>
                )}
            </div>
            {increaseView && (
                <div
                    className={classNames(s.bottom, isLoading && s.bottom_load)}
                >
                    <p
                        className={classNames(
                            s.increase,
                            increaseState.negaive && s.increase_red
                        )}
                    >
                        <IconArrow
                            className={classNames(
                                increaseState.down && s.arrow_down
                            )}
                        />
                        {typeof increase === 'number'
                            ? Math.abs(increase).toFixed(1)
                            : '0.0'}
                        %
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
