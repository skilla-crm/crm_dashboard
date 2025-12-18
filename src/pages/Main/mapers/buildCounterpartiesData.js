import { addSpaceNumber2 } from 'utils/addSpaceNumber';

const buildCounterpartiesData = (data) => {
    return data.map((item, index) => ({
        id: item.id || index,
        name: item.name,
        label: item.label,
        value: addSpaceNumber2(item.debt || 0),
    }));
};

export default buildCounterpartiesData;
