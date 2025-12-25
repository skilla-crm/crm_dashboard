import s from './EmployeesList.module.scss';
import { useState } from 'react';
//images
import AvatarDefault from '../../../../assets/images/AvatarDefault.png';
import classNames from 'classnames';

const EmployeesList = ({ active, setActive, list, total }) => {
    const [avatarError, setAvtarError] = useState(false);

    const handleLoadAvatarError = () => {
        setAvtarError(true)
    }

    const handleSelect = (e) => {
        const id = e.currentTarget.id;
        setActive(id)
    }

    return (
        <div className={s.root}>
            <div className={s.header}>
                <p>Имя</p>
                <p>Исполнители на заказах</p>
            </div>

            <ul className={s.list}>

                <li onClick={handleSelect} className={classNames(s.item, active == '' && s.item_active)}>
                    <div className={s.person}>

                        <p>Все</p>
                    </div>
                    <p>{total}</p>
                </li>

                {list?.map(el => <li id={el.id} onClick={handleSelect} className={classNames(s.item, active == el.id && s.item_active)}>
                    <div className={s.person}>
                        <div className={s.avatar}>
                            <img onError={handleLoadAvatarError} src={el?.avatar && !avatarError ? el?.avatar : AvatarDefault}></img>
                        </div>
                        <p>{el?.name} {el?.surname?.slice(0, 1)}</p>
                    </div>
                    <p>{el?.worker_order_count}</p>
                </li>
                )}
            </ul>
        </div>
    )
};

export default EmployeesList;