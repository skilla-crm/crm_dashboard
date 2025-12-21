export const getDateTicks = (data, /* maxTicks = 7 */) => {
    if (!data?.length) return [];

    const maxTicks = 10;

    const step = data?.length <= 10 ? 1 : data?.length < 20 ? 2 : Math.max(1, Math.ceil((data.length) / (maxTicks)));
    const ticks = [];

    for (let i = 0; i <= data.length; i += step) {
        ticks.push(data[i]?.date);
        if (ticks.length >= maxTicks) break;
    }

   /*  const lastDate = data[data.length - 1].date;
    if (ticks[ticks.length - 1] !== lastDate) {
        ticks.push(lastDate);
    }
 */
    return ticks.slice(0, maxTicks);
};