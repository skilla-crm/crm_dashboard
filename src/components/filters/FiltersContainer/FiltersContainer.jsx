import { useState } from "react";
import { useSelector } from "react-redux";

// Components
import DateFilter from "components/filters/DateFilter/DateFilter";
import DetailsFilter from "components/filters/DetailsFilter/DetailsFilter";

const FiltersContainer = ({ isFetching, isLoading, noDetails }) => {
  const [activeFilter, setActiveFilter] = useState(null);

  const companiesList = useSelector(
    (state) => state.companies?.companiesList || []
  );
  const isCompaniesLoading = useSelector(
    (state) => state.companies?.isLoadingCompanies || false
  );

  const clearActiveFilter = () => {
    setActiveFilter(null);
  };

  return (
    <>
      {!noDetails && <DetailsFilter
        key="company"
        name="company"
        data={companiesList || []}
        // isFetching={isCompaniesLoading}
        // isLoading={isLoading}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        clearActiveFilter={clearActiveFilter}
      />}
      <DateFilter
        isFetching={isFetching}
        setActiveFilter={setActiveFilter}
        clearActiveFilter={clearActiveFilter}
      />
    </>
  );
};

export default FiltersContainer;

