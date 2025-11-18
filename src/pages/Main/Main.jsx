import s from './Main.module.scss';
import { useState } from 'react';
//api
import { useGetDashboardQuery } from '../../redux/dashboardApiActions';


const Main = () => {
    const [period, setPeriod] = useState('month');
    const params = {
        'filter[period]': period
    }
    const { data } = useGetDashboardQuery(params);

    console.log(data)

    return (
        <div className={s.root}>
            <div className={s.header}>
                <h2>Дашборд</h2>
            </div>

        </div>
    )
};

export default Main;