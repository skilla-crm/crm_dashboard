import EllipsisWithTooltip from "components/ui/EllipsisWithTooltip/EllipsisWithTooltip";

import s from "./CompanyLabelBadge.module.scss";

const CompanyLabelBadge = ({ label }) => {
  if (typeof label !== "string" || !label.trim()) return null;

  return (
    <div className={s.badge}>
      <span className={s.badgeText}>
        <EllipsisWithTooltip text={label.trim()} />
      </span>
    </div>
  );
};

export default CompanyLabelBadge;
