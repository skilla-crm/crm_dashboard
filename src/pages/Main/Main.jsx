import s from './Main.module.scss';
import { useState } from 'react';
//api
import { useGetDashboardQuery } from '../../redux/dashboardApiActions';
//components
import Indicator from 'components/indicators/Indicator/Indicator';


const Main = () => {
    const [period, setPeriod] = useState('month');
    const params = {
        'filter[period]': period
    }
    const { data, isLoading } = useGetDashboardQuery(params);

    console.log(data)

    return (
        <div className={s.root}>
            <div className={s.header}>
                <h2>Дашборд</h2>
            </div>
            <Indicator
                isLoading={isLoading}
                title={'Выручка'}
                indicator={data?.finance?.lost_revenue?.indicator || ''}
                increaseView={true}
                increase={data?.finance?.lost_revenue?.increase}
                prevPeriod={'авг'}
                info={'sgsdgsdgsdgsdg'}
                reverse={true}
            />
        </div>
    )
};

export default Main;