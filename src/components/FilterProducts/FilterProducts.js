import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faCheck } from "@fortawesome/free-solid-svg-icons";
import className from "classnames/bind";
import style from "./FilterProducts.module.scss";
import PaginationLinks from "../PaginationLinks/PaginationLinks";
const cx = className.bind(style);
function FilterProducts({
  meta,
  onPageClick,
  onGetSortValue,
  isClient = true,
}) {
  const [btnSorts, setBtnSorts] = useState([
    {
      title: "Mới nhất",
      sortBy: "newest",
      isChecked: false,
    },
    {
      title: "Bán chạy",
      sortBy: "bestsale",
      isChecked: false,
    },
  ]);
  const selections = [
    {
      type: "status",
      options: [
        {
          sortType: "active",
          title: "Trạng thái: Còn hàng",
          isChecked: false,
        },
        {
          sortType: "inactive",
          title: "Trạng thái: Hết hàng",
          isChecked: false,
        },
      ],
    },
    {
      type: "price",
      options: [
        {
          sortType: "asc",
          title: "Giá: Thấp đến Cao",
          isChecked: false,
        },
        {
          sortType: "desc",
          title: "Price: Cao đến Thấp",
          isChecked: false,
        },
      ],
    },

    {
      type: "category",
      options: [
        {
          sortType: "corn",
          title: "Loại: Kem ngô",
          isChecked: false,
        },
        {
          sortType: "coconut",
          title: "Loại: Kem đưa",
          isChecked: false,
        },
        {
          sortType: "chocolate",
          title: "Loại: Kem socola",
          isChecked: false,
        },
        {
          sortType: "strawberry",
          title: "Loại: Kem dâu",
          isChecked: false,
        },
      ],
    },
  ];
  const [selectedOptions, setSelectedOptions] = useState([...selections]);
  const onOptionClick = (sectionIndex, optionIndex) => {
    const updatedSelectedOptions = selectedOptions.map((section, sIndex) => {
      if (sIndex === sectionIndex) {
        return {
          ...section,
          options: section.options.map((option, oIndex) => ({
            ...option,
            isChecked: oIndex === optionIndex,
          })),
        };
      }
      return section;
    });
    setSelectedOptions(updatedSelectedOptions);
  };
  const onActive = (index) => {
    const updatedBtnSorts = btnSorts.map((btn, i) => ({
      ...btn,
      isChecked: i === index,
    }));
    setBtnSorts(updatedBtnSorts);
  };
  return (
    <div className={cx("container")}>
      <div className={cx("sort-choice")}>
        <p className={cx("sort-text")}>Sắp xếp theo</p>
        {btnSorts.map((btnSort, index) => {
          return isClient ? (
            <Link
              className={cx("btn-sort", { active: btnSort.isChecked })}
              key={index}
              onClick={() => {
                onActive(index);
              }}
              to={`?sortBy=${btnSort.sortBy}&order='ctime'`}
            >
              {btnSort.title}
            </Link>
          ) : null;
        })}
        {selectedOptions.map((selection, sectionIndex) => {
          return !isClient || selection.type !== "status" ? (
            <div className={cx("select")} key={sectionIndex}>
              <span className={cx("select__label")}>{selection.type}</span>
              <FontAwesomeIcon icon={faChevronDown} />
              <ul className={cx("select__list")}>
                {selection.options.map((option, optionIndex) => (
                  <li
                    className={cx("select__item")}
                    key={optionIndex + sectionIndex}
                  >
                    <Link
                      to={`?sortBy=${selection.type}&order=${option.sortType}`}
                      className={cx("select__link")}
                      onClick={() => {
                        onOptionClick(sectionIndex, optionIndex);
                        onGetSortValue(selection.type, option.sortType);
                      }}
                    >
                      {option.title}
                    </Link>
                    {option.isChecked ? (
                      <FontAwesomeIcon
                        icon={faCheck}
                        className={cx("select__item--active")}
                      />
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ) : null;
        })}
      </div>
      <PaginationLinks meta={meta} onPageClick={onPageClick} isFilter={true} />
    </div>
  );
}

export default FilterProducts;
