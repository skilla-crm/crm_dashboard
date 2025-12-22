// Dependencies
import { Grid, ThemeProvider, createTheme } from "@mui/material";

// Components
import IndicatorWithPoints from "components/indicators/IndicatorWithPoints/IndicatorWithPoints";
import TitleWithLink from "components/ui/TitleWithLink/TitleWithLink";

// Mapers
import buildSupervisorsData from "../../mapers/buildSupervisorsData";
import buildOperatorsData from "../../mapers/buildOperatorsData";

const theme = createTheme({
  spacing: 4,
});

const EmployeesBlock = ({ employeesData, isLoading }) => {
  return (
    <ThemeProvider theme={theme}>
      <Grid
        size={6}
        item
        container
        spacing={3}
        sx={{ flexDirection: "column" }}
      >
        <Grid item size={12}>
          <TitleWithLink 
            title="Сотрудники" 
            navigateTo={"/employees"}
            state={{ from: "/" }}
          />
        </Grid>
        <Grid item size={12}>
          <IndicatorWithPoints
            title="Менеджеры по персоналу"
            data={buildSupervisorsData(employeesData?.employees?.supervisor)}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item size={12}>
          <IndicatorWithPoints
            title="Клиентские менеджеры"
            data={buildOperatorsData(employeesData?.employees?.operator)}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default EmployeesBlock;
