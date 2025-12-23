import { useSelector } from 'react-redux';
import {
    useGetMainDashboardFinanceQuery,
    useGetMainDashboardOrdersQuery,
    useGetMainDashboardCounterpartiesQuery,
    useGetMainDashboardEmployeesQuery,
    useGetMainDashboardPerformersQuery,
    useGetMainDashboardForecastsQuery,
    useGetMainDashboardAppQuery,
} from '../redux/dashboardApiActions';

export const useMainDashboardData = (period = 'month') => {
    const { dateStartPicker, dateEndPicker } = useSelector(
        (state) => state.dateRange || {}
    );
    const selectedPartnerships = useSelector(
        (state) => state.companies?.selectedPartnerships || []
    );

    const params = {
        'filter[date_start]': dateStartPicker,
        'filter[date_end]': dateEndPicker,
        'filter.partnership_id': selectedPartnerships,
    };

    const {
        data: financeDataRaw,
        isLoading: isLoadingFinance,
        isFetching: isFetchingFinance,
        error: financeError,
        refetch: refetchFinance,
    } = useGetMainDashboardFinanceQuery(params, {
        skip: !dateStartPicker || !dateEndPicker,
    });

    const {
        data: ordersDataRaw,
        isLoading: isLoadingOrders,
        isFetching: isFetchingOrders,
        error: ordersError,
        refetch: refetchOrders,
    } = useGetMainDashboardOrdersQuery(params, {
        skip: !dateStartPicker || !dateEndPicker,
    });

    const isPrimaryLoaded =
        !isLoadingFinance &&
        !isFetchingFinance &&
        !isLoadingOrders &&
        !isFetchingOrders &&
        !!financeDataRaw &&
        !!ordersDataRaw;

    const {
        data: counterpartiesDataRaw,
        isLoading: isLoadingCounterparties,
        isFetching: isFetchingCounterparties,
        error: counterpartiesError,
        refetch: refetchCounterparties,
    } = useGetMainDashboardCounterpartiesQuery(params, {
        skip: !dateStartPicker || !dateEndPicker || !isPrimaryLoaded,
    });

    const {
        data: employeesDataRaw,
        isLoading: isLoadingEmployees,
        isFetching: isFetchingEmployees,
        error: employeesError,
        refetch: refetchEmployees,
    } = useGetMainDashboardEmployeesQuery(params, {
        skip: !dateStartPicker || !dateEndPicker || !isPrimaryLoaded,
    });

    const {
        data: performersDataRaw,
        isLoading: isLoadingPerformers,
        isFetching: isFetchingPerformers,
        error: performersError,
        refetch: refetchPerformers,
    } = useGetMainDashboardPerformersQuery(params, {
        skip: !dateStartPicker || !dateEndPicker || !isPrimaryLoaded,
    });

    const {
        data: appDataRaw,
        isLoading: isLoadingApp,
        isFetching: isFetchingApp,
        error: appError,
        refetch: refetchApp,
    } = useGetMainDashboardAppQuery(params, {
        skip: !dateStartPicker || !dateEndPicker || !isPrimaryLoaded,
    });

    const forecastsParams = {
        ...params,
        'filter[period]': period,
    };
    const {
        data: forecastsDataRaw,
        isLoading: isLoadingForecasts,
        isFetching: isFetchingForecasts,
        error: forecastsError,
        refetch: refetchForecasts,
    } = useGetMainDashboardForecastsQuery(forecastsParams, {
        skip: !dateStartPicker || !dateEndPicker || !isPrimaryLoaded,
    });

    const financeData = financeDataRaw;
    const ordersData = ordersDataRaw;
    const counterpartiesData = counterpartiesDataRaw;
    const employeesData = employeesDataRaw;
    const performersData = performersDataRaw;
    const appData = appDataRaw;
    const forecastsData = forecastsDataRaw;

    const newPerformers = performersData?.new;
    const appPerformers = performersData?.app;

    const data = {
        finance: financeData,
        orders: ordersData,
        counterparties: counterpartiesData,
        employees: employeesData,
        performers: performersData,
        forecasting: forecastsData,
        app: appData,
    };

    const isLoadingMap = {
        isLoadingFinance: isLoadingFinance,
        isLoadingOrders: isLoadingOrders,
        isLoadingCounterparties: isLoadingCounterparties,
        isLoadingEmployees: isLoadingEmployees,
        isLoadingPerformers: isLoadingPerformers,
        isLoadingForecasts: isLoadingForecasts,
        isLoadingApp: isLoadingApp,
    };

    const isLoading =
        isLoadingFinance ||
        isLoadingOrders ||
        isLoadingCounterparties ||
        isLoadingEmployees ||
        isLoadingPerformers ||
        isLoadingForecasts ||
        isLoadingApp;

    const isFetching =
        isFetchingFinance ||
        isFetchingOrders ||
        isFetchingCounterparties ||
        isFetchingEmployees ||
        isFetchingPerformers ||
        isFetchingForecasts ||
        isFetchingApp;

    const errorMap = {
        financeError,
        ordersError,
        counterpartiesError,
        employeesError,
        performersError,
        forecastsError,
        appError,
    };

    const refetchMap = {
        refetchFinance,
        refetchOrders,
        refetchCounterparties,
        refetchEmployees,
        refetchPerformers,
        refetchForecasts,
        refetchApp,
    };

    return {
        employeesData,
        data,
        isLoading,
        isFetching,
        isLoadingMap,
        errorMap,
        refetchMap,
        newPerformers,
        appPerformers,
        performersData,
        ordersData,
        forecastsData,
        financeData,
        counterpartiesData,
        appData,
    };
};
