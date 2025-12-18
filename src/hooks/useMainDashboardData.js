import { useRef } from 'react';
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

    const params = {
        'filter[date_start]': dateStartPicker,
        'filter[date_end]': dateEndPicker,
    };

    const {
        data: financeDataRaw,
        isLoading: isLoadingFinance,
        isFetching: isFetchingFinance,
    } = useGetMainDashboardFinanceQuery(params, {
        skip: !dateStartPicker || !dateEndPicker,
    });

    const {
        data: ordersDataRaw,
        isLoading: isLoadingOrders,
        isFetching: isFetchingOrders,
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
    } = useGetMainDashboardCounterpartiesQuery(params, {
        skip: !dateStartPicker || !dateEndPicker || !isPrimaryLoaded,
    });

    const {
        data: employeesDataRaw,
        isLoading: isLoadingEmployees,
        isFetching: isFetchingEmployees,
    } = useGetMainDashboardEmployeesQuery(params, {
        skip: !dateStartPicker || !dateEndPicker || !isPrimaryLoaded,
    });

    const {
        data: performersDataRaw,
        isLoading: isLoadingPerformers,
        isFetching: isFetchingPerformers,
    } = useGetMainDashboardPerformersQuery(params, {
        skip: !dateStartPicker || !dateEndPicker || !isPrimaryLoaded,
    });

    const {
        data: appDataRaw,
        isLoading: isLoadingApp,
        isFetching: isFetchingApp,
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
    } = useGetMainDashboardForecastsQuery(forecastsParams, {
        skip: !dateStartPicker || !dateEndPicker || !isPrimaryLoaded,
    });

    const financeRef = useRef();
    const ordersRef = useRef();
    const counterpartiesRef = useRef();
    const employeesRef = useRef();
    const performersRef = useRef();
    const appRef = useRef();
    const forecastsRef = useRef();

    if (financeDataRaw !== undefined) {
        financeRef.current = financeDataRaw;
    }
    if (ordersDataRaw !== undefined) {
        ordersRef.current = ordersDataRaw;
    }
    if (counterpartiesDataRaw !== undefined) {
        counterpartiesRef.current = counterpartiesDataRaw;
    }
    if (employeesDataRaw !== undefined) {
        employeesRef.current = employeesDataRaw;
    }
    if (performersDataRaw !== undefined) {
        performersRef.current = performersDataRaw;
    }
    if (appDataRaw !== undefined) {
        appRef.current = appDataRaw;
    }
    if (forecastsDataRaw !== undefined) {
        forecastsRef.current = forecastsDataRaw;
    }

    const financeData = financeDataRaw ?? financeRef.current;
    const ordersData = ordersDataRaw ?? ordersRef.current;
    const counterpartiesData =
        counterpartiesDataRaw ?? counterpartiesRef.current;
    const employeesData = employeesDataRaw ?? employeesRef.current;
    const performersData = performersDataRaw ?? performersRef.current;
    const appData = appDataRaw ?? appRef.current;
    const forecastsData = forecastsDataRaw ?? forecastsRef.current;

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
        isLoadingFinance: isLoadingFinance || isFetchingFinance,
        isLoadingOrders: isLoadingOrders || isFetchingOrders,
        isLoadingCounterparties:
            isLoadingCounterparties || isFetchingCounterparties,
        isLoadingEmployees: isLoadingEmployees || isFetchingEmployees,
        isLoadingPerformers: isLoadingPerformers || isFetchingPerformers,
        isLoadingForecasts:
            isLoadingForecasts || isFetchingForecasts || !forecastsData,
        isLoadingApp: isLoadingApp || isFetchingApp,
    };

    const isLoading =
        isLoadingFinance ||
        isFetchingFinance ||
        isLoadingOrders ||
        isFetchingOrders ||
        isLoadingCounterparties ||
        isFetchingCounterparties ||
        isLoadingEmployees ||
        isFetchingEmployees ||
        isLoadingPerformers ||
        isFetchingPerformers ||
        isLoadingForecasts ||
        isFetchingForecasts ||
        isLoadingApp ||
        isFetchingApp;

    return {
        data,
        isLoading,
        isLoadingMap,
        newPerformers,
        appPerformers,
        ordersData,
        forecastsData,
        financeData,
        appData,
    };
};
