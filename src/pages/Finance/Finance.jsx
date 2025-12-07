import s from './Finance.module.scss';

const Finance = () => {
    return (
        <div className={s.root}>
            <header className={s.header}>
                <h2>Финансы</h2>
            </header>
            <main className={s.main}>
                {/* Контент страницы финансов */}
            </main>
        </div>
    );
};

export default Finance;