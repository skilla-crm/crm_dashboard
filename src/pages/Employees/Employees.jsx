import { useState } from 'react';
import s from './Employees.module.scss';
import classNames from 'classnames';
import FiltersContainer from 'components/filters/FiltersContainer/FiltersContainer';
import { ReactComponent as IconBackForward } from 'assets/icons/iconBackForwardBlack.svg';
//api
import { useGetEmployeesQuery } from '../../redux/employeesApiActions';
//redux
import { useSelector } from 'react-redux';
//hooks
import { useDashboardNavigation } from 'hooks/useDashboardNavigation';
//components
import EmployeesList from './components/EmployeesList/EmployeesList';
import SupervisorsDiagram from './components/SupervisorsDiagram/SupervisorsDiagram';
import EmployeesTable from './components/EmployeesTable/EmployeesTable';
//constants
import { EMPLOYES_SERIES } from './config';

const Employees = () => {
    const { dateStartPicker, dateEndPicker } = useSelector((state) => state.dateRange || {});
    const selectedPartnerships = useSelector(
        (state) => state.companies?.selectedPartnerships || []
    );
    const [personId, setPersonId] = useState('');
    const handleDashboardClick = useDashboardNavigation();

    const params = {
        'filter[date_start]': dateStartPicker,
        'filter[date_end]': dateEndPicker,
        'filter.partnership_id': selectedPartnerships,
        'filter.person_id': personId,
    };

    const { data, isLoading, isFetching } = useGetEmployeesQuery(params, {
        skip: !dateStartPicker || !dateEndPicker,
    });

    return (
        <div className={s.root}>
            <header className={s.header}>
                <h2>
                    <span 
                        onClick={handleDashboardClick}
                        style={{ cursor: "pointer" }}
                    >
                        Дашборд
                    </span>{" "}
                    <IconBackForward />{" "}
                    Сотрудники
                </h2>
                <div className={s.headerBtns}>
                <FiltersContainer isFetching={isFetching} isLoading={isLoading}/>
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
