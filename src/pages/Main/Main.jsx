import s from './Main.module.scss';
import { useState } from 'react';
//api
import { useGetDashboardQuery } from '../../redux/dashboardApiActions';
//components
import IndicatorsFinance from 'components/IndicatorsFinance/IndicatorsFinance';

const Main = () => {
    const [period, setPeriod] = useState('month');
    const params = {
        'filter[period]': period
    }
    const { data, isLoading } = useGetDashboardQuery(params);



    return (
        <div className={s.root}>
            <div className={s.header}>
                <h2></h2>
            </div>

            <IndicatorsFinance
                data={data?.finance}
                isLoading={isLoading}
            />
        </div>
    )
};

export default Main;