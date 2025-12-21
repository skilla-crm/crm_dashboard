import { useState } from 'react';
import s from './Employees.module.scss';
import classNames from 'classnames';
import DateFilter from 'components/filters/DateFilter/DateFilter';
import { ReactComponent as IconBackForward } from 'assets/icons/iconBackForwardBlack.svg';
//api
import { useGetEmployeesQuery } from '../../redux/employeesApiActions';
//redux
import { useSelector } from 'react-redux';
//components
import EmployeesList from './components/EmployeesList/EmployeesList';
import SupervisorsDiagram from './components/SupervisorsDiagram/SupervisorsDiagram';
import EmployeesTable from './components/EmployeesTable/EmployeesTable';
//constants
import { EMPLOYES_SERIES } from './config';

const Employees = () => {
    const { dateStartPicker, dateEndPicker } = useSelector((state) => state.dateRange || {});
    const [activeFilter, setActiveFilter] = useState(null);
    const [personId, setPersonId] = useState('');

    const params = {
        'filter[date_start]': dateStartPicker,
        'filter[date_end]': dateEndPicker,
        'filter.person_id': personId,
    };

    const { data, isLoading } = useGetEmployeesQuery(params, {
        skip: !dateStartPicker || !dateEndPicker,
    });

    return (
        <div className={s.root}>
            <header className={s.header}>
                <h2>
                    Дашборд <IconBackForward /> Сотрудники
                </h2>
                <div className={s.headerBtns}>
                    <DateFilter
                        isFetching={false}
                        setActiveFilter={setActiveFilter}
                    />
                </div>
            </header>
            <main className={s.main}>
                <div className={classNames(s.wrapper, s.wrapper_2)}>
                    <h3>Вывод исполнителей на заказы</h3>
                    <div className={s.container}>
                        <SupervisorsDiagram
                            data={data?.indicators}
                            series={EMPLOYES_SERIES}
                        />
                        <EmployeesList
                            active={personId}
                            setActive={setPersonId}
                            list={data?.supervisors || []}
                            total={data?.supervisors_total}
                        />
                    </div>
                </div>
                <div className={classNames(s.wrapper, s.wrapper_2)}>
                    <h3>Показатели эффективности</h3>
                    <div className={s.container}>
                        <EmployeesTable
                            list={data?.performance_indicators}
                            total={data?.performance_indicators_result}

                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Employees;
