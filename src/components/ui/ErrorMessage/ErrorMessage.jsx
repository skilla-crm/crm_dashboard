// Styles
import s from './ErrorMessage.module.scss';
import { ReactComponent as IconRefresh } from 'assets/icons/iconPlayer.svg';
/**
 * Компонент отображения ошибки загрузки данных
 * @param {Function} [props.refetch] - Функция для повторной загрузки данных
 * @param {number|string} [props.height] - Высота компонента
 * @param {boolean} [props.error] - Флаг наличия ошибки
 * @param {boolean} [props.isLoading] - Флаг загрузки
 */
const ErrorMessage = ({ refetch, height, error, isLoading }) => {
    const shouldShow = error && !isLoading;

    return (
        <div
            className={`${s.error} ${
                shouldShow ? s.errorVisible : s.errorHidden
            }`}
            style={height ? { height } : undefined}
        >
            <div className={s.errorText}>Ошибка загрузки данных.</div>
            <button
                className={s.errorButton}
                onClick={() => refetch?.()}
            >
                <IconRefresh />
                <span className={s.errorButtonText}>Повторить</span>
            </button>
        </div>
    );
};

export default ErrorMessage;
