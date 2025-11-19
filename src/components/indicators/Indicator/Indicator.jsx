import s from './Indicator.module.scss';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import NumberFlow from '@number-flow/react'
import { ReactComponent as IconInfo } from './assets/iconinfo.svg';
import { ReactComponent as IconArrow } from './assets/arrow.svg';
//components
import Tooltip from './Tooltip/Tooltip';
//utils
import { addSpaceNumber } from 'utils/addSpaceNumber';

const Indicator = ({ isLoading, title, indicator, increaseView, increase, prevPeriod, info, reverse }) => {
    const [hover, setHover] = useState(false);
    const [increaseState, setIncreaseState] = useState({ down: false, negaive: false });
    console.log(increaseState)

    useEffect(() => {
        if (!reverse && increase >= 0) {
            setIncreaseState({ down: false, negaive: false })
            return
        }

        if (!reverse && increase < 0) {
            setIncreaseState({ down: true, negaive: true })
            return
        }

        if (reverse && increase >= 0) {
            setIncreaseState({ down: false, negaive: true })
            return
        }

        if (reverse && increase < 0) {
            setIncreaseState({ down: true, negaive: false })
            return
        }

    }, [increase, reverse])

    const handleHover = () => {
        setHover(true)
    }

    const handleBlur = () => {
        setHover(false)
    }
    return (
        <div className={s.root}>
            <p className={s.title}>{title}</p>
            <div className={s.indicator}>
                <NumberFlow value={indicator}/>
             {/*    <p>{addSpaceNumber(indicator)}</p> */}
                {info && <div
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
                }
            </div>
            {increaseView && <div className={classNames(s.bottom, isLoading && s.bottom_load)}>
                <p className={classNames(s.increase, increaseState.negaive && s.increase_red)}>
                    <IconArrow className={classNames(increaseState.down && s.arrow_down)} />
                    {Math.abs(increase)}%
                </p>
                <span>отн. {prevPeriod}</span>
            </div>}
        </div>
    )
};

export default Indicator;