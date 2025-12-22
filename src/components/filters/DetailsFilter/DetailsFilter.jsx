import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import React from "react";

// utils
import renderOgrn from "./utils/renderOgrn";
import groupCompaniesByCity from "./utils/groupCompaniesByCity";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setSelectedPartnerships } from "../../../redux/filters/companyFilterSlice";

// components
import CheckBox from "components/filters/ui/CheckBox/CheckBox";

import FilterButton from "components/filters/ui/FilterButton/FilterButton";
import CompanyLabelBadge from "components/filters/ui/CompanyLabelBadge/CompanyLabelBadge";

// icons
import { ReactComponent as IconCloseBlue } from "assets/icons/iconCloseBlue.svg";
import { ReactComponent as IconDoneWhite } from "assets/icons/iconDoneWhite.svg";
import { ReactComponent as IconHome } from "assets/icons/iconHome.svg";

// styles
import classNames from "classnames";
import s from "./DetailsFilter.module.scss";
import UniButton from "components/ui/UniButton/UniButton/UniButton";

const CompanyItem = ({ data, selected, toggleSelection }) => {
  return (
    <div onClick={() => toggleSelection(data.id)} className={s.item}>
      <div className={s.check}>
        <CheckBox active={selected} />
      </div>
      <div className={s.block}>
        <div className={s.blockDetails}>
          <p>{data?.name}</p>
          <span>
            {data?.inn && `ИНН ${data.inn} `}
            {data?.kpp && `КПП ${data.kpp} `}
          </span>
          <span className={s.ogrnLine}>{renderOgrn(data)}</span>
          {/* <span>{`*${data.rs?.slice(-4)} ${data.bank}`}</span> */}
        </div>
        <CompanyLabelBadge label={data?.label} />
      </div>
    </div>
  );
};

export const DetailsFilter = ({
  isLoading,
  setActiveFilter,
  clearActiveFilter,
  name,
  data: propData,
}) => {
  const dispatch = useDispatch();
  const selectedCompanyIds = useSelector(
    (state) => state.companies?.selectedPartnerships || []
  );
  const companiesListFromRedux = useSelector(
    (state) => state.companies?.companiesList || []
  );
 
  const data = propData !== undefined ? propData : companiesListFromRedux;

  const [open, setOpen] = useState(false);
  const [localSelectedIds, setLocalSelectedIds] = useState([]);
  const modalRef = useRef(null);
  const buttonRef = useRef(null);

  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setLocalSelectedIds(selectedCompanyIds);
  }, [selectedCompanyIds]);

  useEffect(() => {
    const isLoadingFilteredData = isLoading !== undefined ? isLoading : false;
    setIsDone(!isLoadingFilteredData && selectedCompanyIds?.length > 0);
  }, [selectedCompanyIds, isLoading]);

  const toggleSelection = useCallback((id) => {
    setLocalSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  const handleConfirm = () => {
    dispatch(setSelectedPartnerships(localSelectedIds));
    setActiveFilter(name);
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
    setActiveFilter(name);
  };

  const handleReset = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setLocalSelectedIds([]);
    dispatch(setSelectedPartnerships([]));
    setIsDone(false);
    setOpen(false);
    clearActiveFilter();
  };

  useEffect(() => {
    const clickOutside = (e) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpen(false);
        clearActiveFilter();
      }
    };
    document.body.addEventListener("mousedown", clickOutside);
    return () => document.body.removeEventListener("mousedown", clickOutside);
  }, []);

  const companiesByCity = useMemo(
    () => groupCompaniesByCity(data),
    [data]
  );
  return (
    <div className={s.container}>
      <div className={classNames(s.overlay, open && s.overlay_anim)} />

      <FilterButton
        title="Компания"
        Icon={IconHome}
        count={selectedCompanyIds.length}
        handleReset={handleReset}
        handleOpen={handleOpen}
        load={isLoading}
        done={isDone}
        buttonRef={buttonRef}
      />

      <div
        ref={modalRef}
        className={classNames(s.modal, { [s.modal_open]: open })}
      >
        <div className={s.list}>
          <div className={s.headerTitle}>Компания</div>
        </div>

        <div className={s.listContainer}>
          {Object.entries(companiesByCity).map(([city, companies]) => (
            <div key={city} className={s.list}>
              <span className={s.cityTitle}>{city}</span>
              {companies.map((company, index) => (
                <CompanyItem
                  key={`${company.id}-${index}`}
                  data={company}
                  selected={localSelectedIds.includes(company.id)}
                  toggleSelection={toggleSelection}
                />
              ))}
            </div>
          ))}
        </div>

        <div className={s.buttons}>
          <UniButton
            onClick={handleReset}
            text="Сбросить"
            icon={IconCloseBlue}
            type="outline"
          />
          <UniButton
            onClick={handleConfirm}
            text="Применить"
            icon={IconDoneWhite}
            width={268}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailsFilter;
