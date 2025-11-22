import { useEffect, useState } from "react";

const useNumberSmallBlock = (financeGrid) => {
    const [numberSmallBlock, setNumberSmallBlock] = useState(4);

    useEffect(() => {
        const lengthType2 = financeGrid.filter(el => el.type_block === 2)?.length;
        const lengthType3 = financeGrid.filter(el => el.type_block === 3)?.length;

        if (lengthType3 > 8 && lengthType3 <= 9 && lengthType2 === 0) {
            setNumberSmallBlock(5)
            return
        }

        if (lengthType3 > 9 && lengthType3 <= 12 && lengthType2 === 0) {
            setNumberSmallBlock(6)
            return
        }

        if (lengthType3 > 12 && lengthType3 <= 13 && lengthType2 === 0) {
            setNumberSmallBlock(7)
            return
        }

        if (lengthType3 > 13 && lengthType3 <= 16 && lengthType2 === 0) {
            setNumberSmallBlock(8)
            return
        }

        if (lengthType3 > 4 && lengthType3 <= 8 && lengthType2 === 1) {
            setNumberSmallBlock(6)
            return
        }

        if (lengthType3 === 9 && lengthType2 === 1) {
            setNumberSmallBlock(7)
            return
        }

        if (lengthType3 > 9 && lengthType3 <= 12 && lengthType2 === 1) {
            setNumberSmallBlock(8)
            return
        }

        if (lengthType3 === 13 && lengthType2 === 1) {
            setNumberSmallBlock(9)
            return
        }

        if (lengthType3 > 13 && lengthType2 === 1) {
            setNumberSmallBlock(10)
            return
        }


        if (lengthType3 > 4 && lengthType3 <= 12 && lengthType2 === 2) {
            setNumberSmallBlock(10)
            return
        }

        if (lengthType3 === 13 && lengthType2 === 2) {
            setNumberSmallBlock(11)
            return
        }

        if (lengthType3 > 13 && lengthType2 === 2) {
            setNumberSmallBlock(12)
            return
        }
    }, [financeGrid])

    return numberSmallBlock
};

export default useNumberSmallBlock;