import s from './Orders.module.scss';

const Orders = () => {
    return (
        <div className={s.root}>
            <header className={s.header}>
                <h2>Заказы</h2>
            </header>
            <main className={s.main}>
                {/* Контент страницы заказов */}
            </main>
        </div>
    );
};

export default Orders;

