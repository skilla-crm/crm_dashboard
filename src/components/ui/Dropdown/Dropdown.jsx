import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

// icons
import { ReactComponent as IconChevron } from 'assets/icons/iconChewron.svg';
import { ReactComponent as IconInfo } from 'components/ui/Field/assets/iconinfo.svg';

// components
import Tooltip from 'components/ui/Field/Tooltip/Tooltip';

// styles
import s from './Dropdown.module.scss';

const isValidField = (field) => {
    if (field === null || field === undefined) {
        return false;
    }
    const stringValue = String(field).trim();
    return stringValue !== '' && stringValue !== '0';
};

const Dropdown = ({
    sub = '',
    options = [],
    value = null,
    onChange = () => {},
    placeholder = '',
    width,
    renderOption,
    renderValue,
    disabled = false,
    description = '',
    info = '',
    containerWidth,
    autoSelectFirst = true,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [hover, setHover] = useState(false);
    const wrapperRef = useRef(null);

    const hasOptions = options.length > 0;
    const hasSelectedValue = !!value?.id || !!value;
    const canOpen = hasOptions && (!hasSelectedValue || options.length > 1);

    const toggleDropdown = () => {
        if (disabled || !canOpen) return;
        setIsOpen((prev) => !prev);
    };

    const handleOptionClick = (option) => {
        if (disabled) return;
        onChange(option);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    useEffect(() => {
        if (
            autoSelectFirst &&
            !disabled &&
            options.length > 0 &&
            !hasSelectedValue
        ) {
            onChange(options[0]);
        }
    }, [options, hasSelectedValue, disabled, autoSelectFirst]);

    const wrapperStyle = {};
    if (width && typeof width === 'number') {
        wrapperStyle.width = `${width}px`;
    }
    if (containerWidth && typeof containerWidth === 'number') {
        wrapperStyle.width = `${containerWidth}px`;
    }

    const handleHover = () => {
        setHover(true);
    };

    const handleBlur = () => {
        setHover(false);
    };

    const formatInnKpp = (inn, kpp) => {
        const parts = [];
        if (isValidField(inn)) {
            parts.push(`ИНН ${inn}`);
        }
        if (isValidField(kpp)) {
            parts.push(`КПП ${kpp}`);
        }
        return parts.join(' ');
    };

    const renderSelectedValue = () => {
        if (!value) return placeholder;
        if (disabled && placeholder && !isValidField(value?.id ?? value)) {
            return placeholder;
        }

        if (renderValue) {
            return renderValue(value);
        }

        return (
            <div className={s.optionCompany}>
                <div className={s.companyName}>{value.name ?? ''}</div>
                {formatInnKpp(value?.inn, value?.kpp) && (
                    <div className={s.companyDetails}>
                        {formatInnKpp(value?.inn, value?.kpp)}
                    </div>
                )}
            </div>
        );
    };

    // Список опций
    const renderOptionsList = () =>
        options.map((option) => {
            const content = renderOption ? (
                renderOption(option)
            ) : (
                <div className={s.optionCompany}>
                    <div className={s.companyName}>{option.name ?? ''}</div>
                    {formatInnKpp(option?.inn, option?.kpp) && (
                        <div className={s.companyDetails}>
                            {formatInnKpp(option?.inn, option?.kpp)}
                        </div>
                    )}
                </div>
            );

            const isSelected = value?.id === option.id;

            return (
                <div
                    id={option.id}
                    key={option.id}
                    className={classNames(s.option, {
                        [s.selected]: isSelected,
                    })}
                    onClick={() => handleOptionClick(option)}
                >
                    {content}
                </div>
            );
        });

    return (
        <div
            className={classNames(s.root, !canOpen && s.root_disabled)}
            style={wrapperStyle}
            ref={wrapperRef}
        >
            {(description || sub) && (
                <div className={s.block}>
                    {description && <p className={s.text}>{description}</p>}
                    {!description && sub && <div className={s.sub}>{sub}</div>}
                    {info && (
                        <div
                            onMouseEnter={handleHover}
                            onMouseLeave={handleBlur}
                            className={s.info}
                        >
                            <IconInfo />
                            <Tooltip
                                open={hover}
                                text={info}
                                top={16}
                                maxWidth={width || containerWidth}
                            />
                        </div>
                    )}
                </div>
            )}

            <div
                className={classNames(s.field, disabled && s.field_disabled)}
                onClick={toggleDropdown}
            >
                {renderSelectedValue()}
                {!disabled && canOpen && (
                    <IconChevron
                        className={classNames(
                            s.chevron,
                            isOpen && s.chevron_open
                        )}
                    />
                )}
            </div>

            {hasOptions && isOpen && !disabled && (
                <ul
                    className={classNames(
                        s.optionsBlock,
                        options.length > 6 && s.optionsBlock_scroll,
                        s.optionsBlock_open
                    )}
                >
                    <div className={s.list}>{renderOptionsList()}</div>
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
