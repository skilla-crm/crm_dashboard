import { useEffect, useState } from "react"

const useIncreaseState = (reverse, increase) => {
    const [increaseState, setIncreaseState] = useState({ down: false, negaive: false });

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

    }, [increase, reverse]);

    return increaseState
}

export default useIncreaseState;