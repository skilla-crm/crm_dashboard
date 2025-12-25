import s from './EmployeesTable.module.scss';
import classNames from 'classnames';
import { useState } from 'react';
//images
import AvatarDefault from '../../../../assets/images/AvatarDefault.png';
//utils
import { addSpaceNumber } from 'utils/addSpaceNumber';

const EmployeesTable = ({ list, total }) => {
    return (
        <div className={s.root}>
            <div className={s.header}>
                <div className={classNames(s.person, s.person_header)}>
                    <p>Имя</p>
                </div>
                <div className={s.cell}>
                    <p>Закрытые заказы</p>
                </div>
                <div className={s.cell}>
                    <p>Исполнителей на заказах</p>
                </div>
                <div className={classNames(s.cell, s.cell_small)}>
                    <p>С прилож.</p>
                </div>
                <div className={classNames(s.cell, s.cell_small)}>
                    <p>СМЗ</p>
                </div>
                <div className={s.cell}>
                    <p>Комиссия</p>
                </div>
            </div>


            <div className={s.list}>
                {list?.map((el, i) =>
                    <Row data={el} top={i < 3} />
                )}
            </div>

            <div className={s.footer}>
                <div className={classNames(s.person, s.person_footer)}>
                    <p>ИТОГО</p>
                </div>
                <div className={s.cell}>
                    <p>{total?.orders_closed}</p>
                </div>
                <div className={s.cell}>
                    <p>{total?.workers_shift}</p>
                </div>
                <div className={classNames(s.cell, s.cell_small)}>
                    <p>{total?.workers_shift_app}</p>
                </div>
                <div className={classNames(s.cell, s.cell_small)}>
                    <p>{total?.workers_shift_smz}</p>
                </div>
                <div className={s.cell}>
                    <p>{addSpaceNumber(total?.commission)}</p>
                </div>
            </div>

        </div>
    )
};

const Row = ({ data, top }) => {
    const [avatarError, setAvtarError] = useState(false);

    const handleLoadAvatarError = () => {
        setAvtarError(true)
    }

    return (
        <div className={classNames(s.row, top && s.row_green)}>
            <div className={s.person}>
                <div className={s.avatar}>
                    <img onError={handleLoadAvatarError} src={data?.avatar && !avatarError ? data?.avatar : AvatarDefault}></img>
                </div>
                <p>{data?.supervisor?.name} {data?.supervisor?.surname?.slice(0, 1)}</p>
            </div>
            <div className={s.cell}>
                <p>{data?.orders_closed}</p>
            </div>
            <div className={s.cell}>
                <p>{data?.workers_shift}</p>
            </div>
            <div className={classNames(s.cell, s.cell_small)}>
                <p>{data?.workers_shift_app}</p>
            </div>
            <div className={classNames(s.cell, s.cell_small)}>
                <p>{data?.workers_shift_smz}</p>
            </div>
            <div className={s.cell}>
                <p>{addSpaceNumber(data?.commission)}</p>
            </div>
        </div>
    )
}

export default EmployeesTable;