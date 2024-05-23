import { useState, useEffect, useRef, memo } from "react";
import { useNavigate } from "react-router-dom";
import HeadlessTippy from "@tippyjs/react/headless";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faSpinner,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import { useDebounce, useWindowDimensions } from "../../hooks";
import axiosClient from "../../axiosClient/axios";
import SearchItemResult from "../SearchItemResult/SearchItemResult";
const cx = classNames.bind(styles);

function Search({ classname }) {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const [showResult, setShowResult] = useState(true);

  const [loading, setLoading] = useState(false);

  const debounced = useDebounce(searchValue, 500);

  const { width } = useWindowDimensions();

  const inputRef = useRef();
  const onSearch = (e) => {
    e.preventDefault();
    if (searchValue === "") {
      return;
    }
    handleHideResult();
    handleClear();
    return navigate(`/searchresult/${searchValue}`);
  };
  const handleHideResult = () => {
    setShowResult(false);
  };
  const handleClear = () => {
    setSearchValue("");
    setSearchResult([]);

    inputRef.current.focus();
  };
  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) {
      setSearchValue(searchValue);
    }
  };
  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }
    const fetchApi = async () => {
      setLoading(true);

      await axiosClient
        .get(`/searchproduct/${debounced}`)
        .then(({ data }) => {
          setSearchResult(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchApi();
  }, [debounced]);
  const handleViewProductDetail = (data) => {
    handleHideResult();
    handleClear();
    return navigate(`/shop/view1product/${data.id}`, { productId : data.id });
  };
  return (
    <div>
      <HeadlessTippy
        appendTo={() => document.body}
        interactive
        visible={showResult && searchResult.length > 0}
        offset={[-17, 10]}
        render={(attrs) => (
          <div className={cx("search-result")} tabIndex="-1" {...attrs}>
            <div className={cx("search-wrapper")}>
              <h4 className={cx("search-title")}>Sản phẩm</h4>
              {searchResult.map((result) => (
                <SearchItemResult
                  data={result}
                  onClick={handleViewProductDetail}
                />
              ))}
            </div>
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div className={classname}>
          <input
            type="text"
            placeholder="Tìm sản phẩm..."
            ref={inputRef}
            value={searchValue}
            onChange={handleChange}
            onFocus={() => setShowResult(true)}
          />
          {!!searchValue && !loading && (
            <button
              className={cx("clear")}
              onClick={handleClear}
              style={{ left: width * 0.7 }}
            >
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}

          {loading && (
            <FontAwesomeIcon
              icon={faSpinner}
              className={cx("loading")}
              style={{ left: width * 0.66 }}
            />
          )}

          <button id="search_product_btn" onClick={(e) => onSearch(e)}>
            <FontAwesomeIcon icon={faSearch} className={cx("icon-style")} />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default memo(Search);
