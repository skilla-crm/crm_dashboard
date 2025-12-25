import React from 'react';

// Hooks
import { useModal } from 'hooks/useModal';

// Components
import Modal from 'components/ModalManager/ui/Modal/Modal';

// Icons
import { ReactComponent as IconCloseBlack } from 'assets/icons/iconCloseBlack.svg';
import { ReactComponent as IconInfo } from 'assets/icons/iconInfoSymbol.svg';

// Styles
import s from './MainInfoModal.module.scss';

const FinanceInfoModal = () => {
    const { hideModal } = useModal();

    return (
        <Modal
            isOpen={true}
            onClose={hideModal}
        >
            <div className={s.modal}>
                <div className={s.modalHeader}>
                    <div className={s.title}>
                        <IconInfo />
                        <h3>Справка</h3>
                    </div>
                    <button
                        className={s.close}
                        onClick={hideModal}
                    >
                        <IconCloseBlack />
                    </button>
                </div>

                <div className={s.content}>
                    <section className={s.section}>
                        <h4 className={s.sectionTitle}>Финансы</h4>

                        <div className={s.item}>
                            <p className={s.itemTitle}>Комиссия</p>
                            <p className={s.itemText}>
                                Рассчитывается как сумма выручки за вычетом
                                суммы выплат исполнителям
                            </p>
                        </div>

                        <div className={s.item}>
                            <p className={s.itemTitle}>Прибыль</p>
                            <p className={s.itemText}>
                                Рассчитывается как комиссия за вычетом
                                операционных расходов (закупки, покупки, ручной
                                учет) и процентов менеджеров по работе с персоналом
                            </p>
                        </div>

                        <div className={s.item}>
                            <p className={s.itemTitle}>Упущенная выручка</p>
                            <p className={s.itemText}>
                                Рассчитывается как разница между стоимостью закрытия заказа и стоимостью заказа при создании
                            </p>
                        </div>
                    </section>

                    <section className={s.section}>
                        <h4 className={s.sectionTitle}>Приложение</h4>

                        <div className={s.item}>
                            <p className={s.itemTitle}>Прошли регистрацию</p>
                            <p className={s.itemText}>
                                Доля исполнителей, завершивших цикл регистрации
                                в приложении и полностью готовых к работе,
                                относительно всех добавленных.
                            </p>
                        </div>

                        <div className={s.item}>
                            <p className={s.itemTitle}>
                                Оформили самозанятость
                            </p>
                            <p className={s.itemText}>
                                Доля новых добавленных исполнителей, которые
                                после регистрации также оформили самозанятость.
                            </p>
                        </div>

                        <div className={s.item}>
                            <p className={s.itemTitle}>Выполнили заказ</p>
                            <p className={s.itemText}>
                                Доля новых добавленных исполнителей, которая
                                вышла на первый заказ.
                            </p>
                        </div>

                        <div className={s.item}>
                            <p className={s.itemTitle}>Выплаты СМЗ</p>
                            <p className={s.itemText}>
                                Доля выплат как самозанятым от общей суммы всех
                                выплат.
                            </p>
                        </div>

                        {/* <div className={s.item}>
                            <p className={s.itemTitle}>Самозанятых</p>
                            <p className={s.itemText}>
                                Доля самозанятых исполнителей от общего списка.
                            </p>
                        </div> */}

                        <div className={s.item}>
                            <p className={s.itemTitle}>Заказы с автоподбором</p>
                            <p className={s.itemText}>
                                Доля заказов, на которых был использован
                                автоподбор, от общего списка.
                            </p>
                        </div>
                    </section>

                    <section className={s.section}>
                        <h4 className={s.sectionTitle}>Прогноз</h4>

                        <div className={s.item}>
                            <p className={s.itemTitle}>Заказы с автоподбором</p>
                            <p className={s.itemText}>
                                Прогнозные показатели расчитываються на конец текущего месца, для расчета прогнозных значений мы используем данные за предыдущий месяц, а также данные за такой же период в прошлом году.
                            </p>
                        </div>
                    </section>


                    <section className={s.section}>
                        <h4 className={s.sectionTitle}>Исполнители</h4>

                        <div className={s.item}>
                            <p className={s.itemTitle}>Добавлено новых</p>
                            <p className={s.itemText}>
                                Количество добавленных исполнителей за выбранный период
                            </p>
                        </div>

                        <div className={s.item}>
                            <p className={s.itemTitle}>Отправлено приглашений</p>
                            <p className={s.itemText}>
                                Количество приглашений в приложение отпраленное исполнителям за выбранный период
                            </p>
                        </div>

                        <div className={s.item}>
                            <p className={s.itemTitle}>Прошли регистрацию</p>
                            <p className={s.itemText}>
                                Количество исполнителей прошедших регистрацию за выбранный период
                            </p>
                        </div>

                        <div className={s.item}>
                            <p className={s.itemTitle}>Первый заказ в приложении</p>
                            <p className={s.itemText}>
                                Количество исполнителей выполнивших первый заказ за выбранный период
                            </p>
                        </div>

                        <div className={s.item}>
                            <p className={s.itemTitle}>Были на заказах</p>
                            <p className={s.itemText}>
                                Количество исполнителей выходившие на заказы за выбранный период
                            </p>
                        </div>


                    </section>


                    <section className={s.section}>
                        <h4 className={s.sectionTitle}>Сотрудники</h4>

                        <div className={s.item}>
                            <p className={s.itemTitle}>План-факт по заказам</p>
                            <p className={s.itemText}>
                                Соотношение суммы закрытия заказов менеджерами по работе с персоналом к сумме заказов при создании
                            </p>
                        </div>

                        <div className={s.item}>
                            <p className={s.itemTitle}>Комиссии</p>
                            <p className={s.itemText}>
                                Сумма процентов менеджеров по работе с персоналом
                            </p>
                        </div>

                    </section>
                </div>
            </div>
        </Modal>
    );
};

export default FinanceInfoModal;
