// Dependencies
import classNames from 'classnames';
import { Link } from 'react-router-dom';

// Assets
import { ReactComponent as IconTopRight } from 'assets/icons/IconTopRightBlack.svg';

// Styles
import s from './TitleWithLink.module.scss';

/**
 * Компонент заголовка с ссылкой
 * @param {string} [props.size='large'] - Размер заголовка ('large' | 'medium' | 'small')
 * @param {string} [props.type='default'] - Тип компонента для стилизации (outer | inner)
 * @param {string} [props.navigateTo = ''] - Ссылка 

 */
const TitleWithLink = ({ title, navigateTo, size = 'large', type = '' }) => {
    return (
        <div className={classNames(s.root, s[type], s[size])}>
            <div className={classNames(s.title, s[size])}>{title}</div>
            {navigateTo && (
                <Link to={navigateTo}>
                    <div className={s.icon}>
                        <IconTopRight />
                    </div>
                </Link>
            )}
        </div>
    );
};
export default TitleWithLink;
