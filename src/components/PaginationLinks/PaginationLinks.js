import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import className from "classnames/bind";
import style from "./PaginationLinks.module.scss";
const cx = className.bind(style);
export default function PaginationLinks({
  meta,
  onPageClick,
  isFilter = false,
}) {
  function onClick(e, link) {
    e.preventDefault();
    if (!link.url) {
      return;
    }
    onPageClick(link);
  }
  return (
    <div>
      {meta.total > meta.per_page && (
        <nav aria-label="Pagination" className={cx("paginate")}>
          {meta.links?.map((link, index) => {
            if (isFilter) {
              if (index === 0 || index === meta.links.length - 1)
                return (
                  <a
                    key={index}
                    href={link.url}
                    onClick={(e) => onClick(e, link)}
                    aria-current="page"
                    aria-disabled={!link.url ? true : false}
                    className={cx("btn")}
                  >
                    {index === 0 ? (
                      <FontAwesomeIcon icon={faChevronLeft} />
                    ) : index === meta.links.length - 1 ? (
                      <FontAwesomeIcon icon={faChevronRight} />
                    ) : null}
                  </a>
                );
            } else {
              return (
                <a
                  key={index}
                  href={link.url}
                  onClick={(e) => onClick(e, link)}
                  aria-current="page"
                  className={
                    isFilter ? cx("hidden") : link.active ? cx("active") : ""
                  }
                >
                  {index === 0 ? (
                    <FontAwesomeIcon icon={faChevronLeft} />
                  ) : index === meta.links.length - 1 ? (
                    <FontAwesomeIcon icon={faChevronRight} />
                  ) : (
                    !isFilter && link.label
                  )}
                </a>
              );
            }
          })}
        </nav>
      )}
    </div>
  );
}
