import { useSelector } from 'react-redux';
import {
    useGetMainDashboardFinanceQuery,
    useGetMainDashboardOrdersQuery,
    useGetMainDashboardCounterpartiesQuery,
    useGetMainDashboardEmployeesQuery,
    useGetMainDashboardPerformersQuery,
    useGetMainDashboardForecastsQuery,
} from '../redux/dashboardApiActions';

export const useMainDashboardData = (period = 'month') => {
    const { dateStartPicker, dateEndPicker } = useSelector(
        (state) => state.dateRange || {}
    );

    const params = {
        'filter[date_start]': dateStartPicker,
        'filter[date_end]': dateEndPicker,
    };

    const { data: financeData, isLoading: isLoadingFinance } =
        useGetMainDashboardFinanceQuery(params, {
            skip: !dateStartPicker || !dateEndPicker,
        });

    const { data: ordersData, isLoading: isLoadingOrders } =
        useGetMainDashboardOrdersQuery(params, {
            skip: !dateStartPicker || !dateEndPicker || !financeData,
        });

    const { data: counterpartiesData, isLoading: isLoadingCounterparties } =
        useGetMainDashboardCounterpartiesQuery(params, {
            skip: !dateStartPicker || !dateEndPicker || !ordersData,
        });

    const { data: employeesData, isLoading: isLoadingEmployees } =
        useGetMainDashboardEmployeesQuery(params, {
            skip: !dateStartPicker || !dateEndPicker || !counterpartiesData,
        });

    const { data: performersData, isLoading: isLoadingPerformers } =
        useGetMainDashboardPerformersQuery(params, {
            skip: !dateStartPicker || !dateEndPicker || !employeesData,
        });

    const forecastsParams = {
        ...params,
        'filter[period]': period,
    };
    const { data: forecastsData, isLoading: isLoadingForecasts } =
        useGetMainDashboardForecastsQuery(forecastsParams, {
            skip: !dateStartPicker || !dateEndPicker || !performersData,
        });

    const newPerformers = performersData?.new;
    const appPerformers = performersData?.app;

    const data = {
        finance: financeData,
        orders: ordersData,
        counterparties: counterpartiesData,
        employees: employeesData,
        performers: performersData,
        forecasting: forecastsData,
    };

    const isLoading =
        isLoadingFinance ||
        isLoadingOrders ||
        isLoadingCounterparties ||
        isLoadingEmployees ||
        isLoadingPerformers ||
        isLoadingForecasts;

    return {
        data,
        isLoading,
        isLoadingFinance,
        isLoadingOrders,
        isLoadingCounterparties,
        isLoadingEmployees,
        isLoadingPerformers,
        isLoadingForecasts,
        newPerformers,
        appPerformers,
        ordersData,
        forecastsData,
    };
};
