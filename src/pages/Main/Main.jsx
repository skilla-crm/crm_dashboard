import s from "./Main.module.scss";
import { useState } from "react";
//api
import { useGetDashboardQuery } from "../../redux/dashboardApiActions";
//components
import IndicatorsFinance from "components/IndicatorsFinance/IndicatorsFinance";
import { ReactComponent as IconSettings } from "assets/icons/iconSettings.svg";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FinanceDiagram from "components/indicators/DiagramLarge/FinanceDiagram";

import TitleWithLink from "../../components/ui/UniButton/TitleWithLink/TitleWithLink";
import UniButton from "components/ui/UniButton/UniButton";
import Slider from "components/IndicatorsFinance/components/Slider/Slider";

const Main = () => {
  const [period, setPeriod] = useState("month");
  const params = {
    "filter[period]": period,
  };
  const { data, isLoading } = useGetDashboardQuery(params);

  return (
    <div className={s.root}>
      <header className={s.header}>
        <h2>Дашборд за {period}</h2>
        <div classname={s.headerBtns}>
          <UniButton
            text="Настройка"
            type="outline"
            icon={IconSettings}
            onClick={() => {}}
          />
        </div>
      </header>

      <main className={s.main}>
        <IndicatorsFinance data={data?.finance} isLoading={isLoading} />
      </main>

      <Dashboard />
    </div>
  );
};

export default Main;

// Временные заглушки — дальше заменишь на свои компоненты
const Card = ({ title }) => (
  <Box
    sx={{
      background: "#fff",
      borderRadius: "20px",
      padding: "20px",
      minHeight: 120,
    }}
  >
    <h3>{title}</h3>
  </Box>
);

const Dashboard = () => {
  return (
    <Box sx={{ background: "#F5F7FA", padding: 2 }}>
      <Grid container spacing={2}>
        {/* ЛЕВАЯ КОЛОНКА */}
        <Grid item size={8}>
          <FinanceDiagram />

          <Grid container>
            <Grid item xs={12} md={6}>
              <Card title="Выручка" />
            </Grid>

            <Grid item xs={12} md={6}>
              <Card title="Заказы с оплатой" />
            </Grid>

            <Grid item xs={12} md={6}>
              <Card title="Расходы" />
            </Grid>

            <Grid item xs={12} md={6}>
              <Card title="Улучшенная выручка" />
            </Grid>

            {/* РЕКЛАМА */}
            <Grid item xs={12}>
              <Card title="Реклама" />
            </Grid>

            <Grid item xs={12} md={6}>
              <Card title="Средняя цена клика" />
            </Grid>

            <Grid item xs={12} md={6}>
              <Card title="CTR" />
            </Grid>

            {/* КОНТРАГЕНТЫ */}
            <Grid item xs={12}>
              <Card title="Контрагенты" />
            </Grid>

            {/* СОТРУДНИКИ */}
            <Grid item xs={12}>
              <Card title="Сотрудники" />
            </Grid>

            {/* ИСПОЛНИТЕЛИ */}
            <Grid item xs={12}>
              <Card title="Исполнители" />
            </Grid>
          </Grid>
        </Grid>

        {/* ПРАВАЯ КОЛОНКА */}
        <Grid item size={4}>
          <Slider />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card title="Заказы" />
            </Grid>

            <Grid item xs={12}>
              <Card title="Приложение" />
            </Grid>

            <Grid item xs={12}>
              <Card title="Риски и предупреждения" />
            </Grid>

            <Grid item xs={6}>
              <Card title="Маржинальность" />
            </Grid>

            <Grid item xs={6}>
              <Card title="Операционная прибыль" />
            </Grid>

            <Grid item xs={6}>
              <Card title="Количество заказов" />
            </Grid>

            <Grid item xs={6}>
              <Card title="Выручка" />
            </Grid>

            <Grid item xs={6}>
              <Card title="Выплаты" />
            </Grid>

            <Grid item xs={6}>
              <Card title="Закупки и учет" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
