import s from './App.module.scss';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetDateRange } from './redux/filters/dateRangeSlice';
import { setCompaniesList, setLoadingCompanies } from './redux/filters/companyFilterSlice';
import { useGetCompaniesQuery } from './redux/companiesForFilterApiActions';
//pages
import Main from "pages/Main/Main";
import Finance from "pages/Finance/Finance";
import Counterparties from "pages/Counterparties/Counterparties";
import Employees from "pages/Employees/Employees";
import Performers from "pages/Performers/Performers";
import Orders from "pages/Orders/Orders";
import Advertising from "pages/Advertising/Advertising";
import ModalManager from "components/ModalManager/ModalManager";

const CompaniesLoader = () => {

    const dispatch = useDispatch();
    const { data: companiesList, isLoading: isCompaniesLoading } = useGetCompaniesQuery();

  useEffect(() => {
    dispatch(setLoadingCompanies(isCompaniesLoading));
  }, [isCompaniesLoading, dispatch]);

  useEffect(() => {
    if (companiesList) {
      dispatch(setCompaniesList(companiesList));
    }
  }, [companiesList, dispatch]);

  return null;
};



const App = () => {

    return (
        <div id='scrollableDiv' className={s.root}>
            <CompaniesLoader />
            <Routes>
                <Route
                    path="/"
                    element={<Main />}
                />
                <Route
                    path="/finance"
                    element={<Finance />}
                />
                <Route
                    path="/counterparties"
                    element={<Counterparties />}
                />
                <Route
                    path="/employees"
                    element={<Employees />}
                />
                <Route
                    path="/performers"
                    element={<Performers />}
                />
                <Route
                    path="/orders"
                    element={<Orders />}
                />
                <Route
                    path="/advertising"
                    element={<Advertising />}
                />
            </Routes>
            <ModalManager />
        </div>
    );
};

export default App;
