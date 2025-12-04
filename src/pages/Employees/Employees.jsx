import s from './Employees.module.scss';

const Employees = () => {
    return (
        <div className={s.root}>
            <header className={s.header}>
                <h2>Сотрудники</h2>
            </header>
            <main className={s.main}>
                {/* Контент страницы сотрудников */}
            </main>
        </div>
    );
};

export default Employees;

