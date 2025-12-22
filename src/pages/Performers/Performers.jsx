import s from './Performers.module.scss';
import FiltersContainer from 'components/filters/FiltersContainer/FiltersContainer';
import { ReactComponent as IconBackForward } from 'assets/icons/iconBackForwardBlack.svg';
import { useDashboardNavigation } from 'hooks/useDashboardNavigation';

const Performers = () => {
    const handleDashboardClick = useDashboardNavigation();

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
                    Исполнители
                </h2>
                <div className={s.headerBtns}>
                    <FiltersContainer />
                </div>
            </header>
            <main className={s.main}></main>
        </div>
    );
};

export default Performers;
