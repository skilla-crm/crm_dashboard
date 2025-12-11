import s from './App.module.scss';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetDateRange } from './redux/filters/dateRangeSlice';
//pages
import Main from 'pages/Main/Main';
import Finance from 'pages/Finance/Finance';
import Counterparties from 'pages/Counterparties/Counterparties';
import Employees from 'pages/Employees/Employees';
import Performers from 'pages/Performers/Performers';
import Orders from 'pages/Orders/Orders';
import Advertising from 'pages/Advertising/Advertising';
import ModalManager from 'components/ModalManager/ModalManager';

const App = () => {
    return (
        <div className={s.root}>
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
