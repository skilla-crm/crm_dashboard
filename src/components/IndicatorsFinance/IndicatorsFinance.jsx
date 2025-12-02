import s from "./IndicatorsFinance.module.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";

import { createTheme, ThemeProvider } from "@mui/material/styles";
//hooks
import useNumberSmallBlock from "hooks/useNumberSmallBlock";
//compnonents
import FinanceDiagram from "components/indicators/FinanceDiagram/FinanceDiagram";
import Indicator from "components/indicators/Indicator/Indicator";
import IndicatorWithList from "components/indicators/IndicatorWithList/IndicatorWithList";

const IndicatorsFinance = ({ data, type, isLoading }) => {
  const { financeGrid } = useSelector((state) => state.indicatorsGrid);
  const numberSmallBlock = useNumberSmallBlock(financeGrid);

  const theme = createTheme({
    spacing: 4,
  });

  return (
    <div className={s.root}>
      <ThemeProvider theme={theme}>
        <Grid container spacing={5}>
          блок со столбчатой диаграммой
          {financeGrid
            ?.filter((el) => el.type_block === 1)
            ?.map((el) => (
              <Grid item size={12}>
                <FinanceDiagram />
                {/* <Slider />
                <HalfCircleDiagram /> */}
              </Grid>
            ))}

          <Grid
            item
            size={6}
            container
            spacing={3}
            sx={{
              justifyContent: "flex-start",
              alignItems: "flex-start",
              height: "fit-content",
            }}
          >
            {financeGrid
              ?.filter((el) => el.type_block === 2)
              ?.slice(0, numberSmallBlock)
              ?.map((el) => (
                <Grid item size={6}>
                  <Indicator
                    isLoading={isLoading}
                    title={"Выручка"}
                    indicator={isLoading ? 0 : data[el.indicator]?.indicator}
                    increaseView={true}
                    increase={67}
                    prevPeriod={"авг"}
                    info={null}
                    reverse={false}
                  />
                </Grid>
              ))}
          </Grid>

          <Grid
            item
            size={6}
            container
            spacing={3}
            sx={{
              justifyContent: "flex-start",
              alignItems: "flex-start",
              height: "fit-content",
            }}
          >
            {financeGrid
              ?.filter((el) => el.type_block === 3)
              ?.map((el) => (
                <Grid item size={12}>
                  <IndicatorWithList
                    const
                    data={el}
                    isLoading={isLoading}
                    title={"Входящие транзакции"}
                    indicator={5345}
                    increaseView={true}
                    increase={67}
                    prevPeriod={"авг"}
                    info={null}
                    reverse={true}
                  />
                </Grid>
              ))}

            <Grid
              item
              size={12}
              container
              spacing={3}
              sx={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
                height: "fit-content",
              }}
            >
              {financeGrid
                ?.filter((el) => el.type_block === "small")
                ?.slice(numberSmallBlock, 20)
                ?.map((el) => (
                  <Grid item size={6}>
                    <Indicator
                      const
                      data={el}
                      isLoading={isLoading}
                      title={"Выручка"}
                      indicator={isLoading ? 0 : data[el.indicator]?.indicator}
                      increaseView={true}
                      increase={67}
                      prevPeriod={"авг"}
                      info={"sgsdgsdgsdgsdg"}
                      reverse={true}
                    />
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
};

export default IndicatorsFinance;
