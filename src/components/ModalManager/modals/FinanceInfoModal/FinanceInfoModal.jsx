import React from 'react';

// Hooks
import { useModal } from 'hooks/useModal';

// Components
import Modal from 'components/ModalManager/ui/Modal/Modal';

// Icons
import { ReactComponent as IconCloseBlack } from 'assets/icons/iconCloseBlack.svg';
import { ReactComponent as IconInfo } from 'assets/icons/iconInfoSymbol.svg';

// Styles
import s from './FinanceInfoModal.module.scss';

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
                    <div className={s.item}>
                        <h4>Маржинальная прибыль</h4>

                        <div className={s.formula}>
                            <div className={s.block}>Маржинальная прибыль</div>
                            <span className={s.equals}>=</span>
                            <div className={s.block}>Выручка</div>
                            <span className={s.minus}>−</span>
                            <div className={s.block}>Выплаты исполнителям</div>
                        </div>

                        <p>
                            Рассчитывается как <br /> выручка − выплаты
                            исполнителям.
                        </p>

                        <p>
                            Маржинальная прибыль учитывает в расходах переменные
                            издержки (выплаты исполнителям), которые напрямую
                            зависят от количества заказов компании.
                        </p>

                        <p>
                            Отрицательная динамика указывает на то, что
                            необходимо пересмотреть ставки клиенту (в сторону
                            увеличения) или ставки исполнителям (в сторону
                            уменьшения).
                        </p>
                    </div>

                    <div className={s.item}>
                        {' '}
                        <h4>Операционная прибыль</h4>
                        <div className={s.formulaContainer}>
                            <div className={s.formula}>
                                <div className={s.block}>
                                    Операционная прибыль
                                </div>
                                <span className={s.equals}>=</span>

                                <div className={s.group}>
                                    <div className={s.groupItem}>Выручка</div>
                                    <span className={s.minus}>−</span>
                                    <div className={s.groupItem}>
                                        Выплаты исполнителям
                                    </div>
                                </div>

                                <span className={s.minus}>−</span>
                                <div className={s.block}>
                                    Закупки и ручной учёт
                                </div>
                            </div>
                            <p className={s.formulaText}>
                                Маржинальная прибыль
                            </p>
                        </div>
                        <p>
                            Операционная прибыль учитывает в расходах переменные
                            издержки, а так же постоянные издержки (аренда
                            офиса, з/п сотрудникам, административные расходы),
                            отображая результаты работы бизнеса.
                        </p>
                        <p>
                            Если показатель маржинальной прибыли высокий, а
                            показатель операционной прибыли низкий - то тогда
                            следует сокращать постоянные издержки
                        </p>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default FinanceInfoModal;
