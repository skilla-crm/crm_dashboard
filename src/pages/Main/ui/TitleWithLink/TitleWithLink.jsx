import s from './TitleWithLink.module.scss';
import { ReactComponent as IconTopRight } from 'assets/icons/IconTopRightBlack.svg';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

/**
 * Компонент заголовка с ссылкой
 * @param {string} [props.size='large'] - Размер заголовка ('large' | 'medium' | 'small')
 * @param {string} [props.type='default'] - Тип компонента для стилизации (outer | inner)
 * @param {boolean} [props.withLink=true] - Показывать ли иконку ссылки
 */
const TitleWithLink = ({title, link, size = 'large', type = '', withLink = true}) => {

    return (
        <div className={classNames(s.root, s[type], s[size])}>
            <div className={classNames(s.title, s[size])}>{title}</div>
            {withLink && <Link to={link}><div className={s.icon}><IconTopRight /></div></Link>}
        </div>
    )
}
export default TitleWithLink;