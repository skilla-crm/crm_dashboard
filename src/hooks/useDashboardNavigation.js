import { useNavigate, useLocation } from "react-router-dom";

/**
 * Хук для навигации на главную страницу дашборжа
 * Если переход был со страницы Main, возвращается назад
 * Иначе переходит на главную страницу
 * @returns {Function} handleDashboardClick - функция для обработки клика на - дашборд
 */
export const useDashboardNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleDashboardClick = (e) => {
    if (e) {
      e.stopPropagation();
    }
    
    const cameFromMain = location.state?.from === "/";
    
    if (cameFromMain) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return handleDashboardClick;
};

