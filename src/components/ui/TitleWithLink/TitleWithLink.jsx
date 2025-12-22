// Dependencies
import classNames from "classnames";
import { Link } from "react-router-dom";

// Assets
import { ReactComponent as IconTopRight } from "assets/icons/IconTopRightBlack.svg";

// Styles
import s from "./TitleWithLink.module.scss";

/**
 * Компонент заголовка с ссылкой
 * @param {string} [props.size='large'] - Размер заголовка ('large' | 'medium' | 'small')
 * @param {string} [props.type='default'] - Тип компонента для стилизации (outer | inner)
 * @param {string} [props.navigateTo = ''] - Ссылка 
 * @param {boolean} [props.navigateToNewTab = false] - Открывать ссылку в новом окне

 */
const TitleWithLink = ({
  title,
  navigateTo,
  navigateToNewTab = false,
  size = "large",
  type = "default",
}) => {
  const content = <IconTopRight />;

  return (
    <div className={classNames(s.root, s[type], s[size])}>
      <div className={classNames(s.title, s[size])}>{title}</div>

      {navigateTo &&
        (navigateToNewTab ? (
          <a
            href={navigateTo}
            className={s.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Перейти к ${title}`}
          >
            {content}
          </a>
        ) : (
          <Link
            to={navigateTo}
            className={s.link}
            aria-label={`Перейти к ${title}`}
          >
            {content}
          </Link>
        ))}
    </div>
  );
};

export default TitleWithLink;
