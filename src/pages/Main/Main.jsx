import s from './Main.module.scss';
import { useState } from 'react';
//api
import { useGetDashboardQuery } from '../../redux/dashboardApiActions';
//components
import IndicatorsGrid from 'components/IndicatorsGrid/IndicatorsGrid';
import Indicator from 'components/indicators/Indicator/Indicator';


const Main = () => {
    const [period, setPeriod] = useState('quarter');
    const params = {
        'filter[period]': period
    }
    const { data, isLoading } = useGetDashboardQuery(params);



    return (
        <div className={s.root}>
            <div className={s.header}>
                <h2>Дашборд</h2>
            </div>

            <IndicatorsGrid
                type={'finance'}
                data={data?.finance}
                isLoading={isLoading}
            />
        </div>
    )
};

export default Main;