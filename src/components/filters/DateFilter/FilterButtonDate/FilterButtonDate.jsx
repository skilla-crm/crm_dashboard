import classNames from 'classnames';
//components
import LoaderCircle from 'components/filters/ui/FilterButton/LoaderCircle/LoaderCircle';

//icons
import { ReactComponent as IconClose } from 'components/filters/ui/FilterButton/icons/iconClose.svg';
import { ReactComponent as IconDone } from 'components/filters/ui/FilterButton/icons/iconDone.svg';

//styles
import s from './FilterButtonDate.module.scss';

export const FilterButtonDate = ({
    title,
    Icon,
    load = false,
    done = false,
    isSelected,
    handleReset,
    handleOpen,
    buttonRef,
}) => {
    return (
        <div
            ref={buttonRef}
            onClick={handleOpen}
            className={classNames(s.filter, isSelected && s.filter_active)}
        >
            <div className={s.icon}>
                <Icon className={(load || done) && s.hidden} />
                <div className={classNames(s.loader, load && s.loader_vis)}>
                    <LoaderCircle />
                </div>

                <div
                    className={classNames(
                        s.loader,
                        !load && done && s.loader_vis
                    )}
                >
                    <IconDone />
                </div>
            </div>

            <p className={classNames(s.title, isSelected && s.title_active)}>
                {title}
            </p>
            {/* <div
                className={classNames(
                    s.block,
                    isSelected && s.block_activeDate
                )}
            >
                <IconClose
                    onClick={(e) => handleReset(e)}
                    className={s.close}
                />
            </div> */}
        </div>
    );
};

export default FilterButtonDate;
