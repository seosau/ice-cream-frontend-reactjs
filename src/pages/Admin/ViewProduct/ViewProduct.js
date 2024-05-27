import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import className from "classnames/bind";
import style from "./ViewProduct.module.scss";
import { Btn } from "../../../components";
import { Loader } from "../../../components";
import axiosClient from "../../../axiosClient/axios";
import ProductListItem from "../../../components/ProductListItem/ProductListItem";
import PaginationLinks from "../../../components/PaginationLinks/PaginationLinks";
import FilterProducts from "../../../components/FilterProducts/FilterProducts";
import webSocketService from "../../../webSocketService";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from "react-paginate";

const cx = className.bind(style);

function ViewProduct() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({});
  const [params, setParams] = useState({});
  const currentURL = window.location.search;
  const currentPath = window.location.pathname;
  const isSort = currentURL.includes("sortBy");
  const getProducts = (
    url = currentPath.includes("seller") ? "/seller/product" : "/admin/product"
  ) => {
    setLoading(true);
    var payload = {};
    if (url.includes("viewproduct")) {
      payload = { ...params };
    }
    axiosClient
      .get(url + `?page=${currentPage}`, { params: payload })
      .then(({ data }) => {
        setProducts(data.content);
        setTotalPages(data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getProductsFromCurrentUrl = () => {
    if (isSort === true) {
      const searchParams = new URLSearchParams(currentURL);
      const sortBy = searchParams.get("sortBy");
      const order = searchParams.get("order");
      setParams({
        sortBy: sortBy,
        order: order,
      });
      onGetSortValue(sortBy, order);
    } else {
      getProducts();
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getProductsFromCurrentUrl();
    const onConnected = () => {
      console.log('Connected to WebSocket');
      webSocketService.subscribe('/topic/productUpdates', (productUpdate) => {
        setProducts((prevProducts) => {
          const productIndex = prevProducts.findIndex((product) => product.id === productUpdate.id);
          if (productIndex !== -1) {
            // Update the product if it exists in the current list
            const updatedProducts = [...prevProducts];
            updatedProducts[productIndex] = { ...updatedProducts[productIndex], ...productUpdate };
            return updatedProducts;
          }
          return prevProducts;
        });
      });
    };

    const onError = (error) => {
      console.error('WebSocket error:', error);
    };

    webSocketService.connect(onConnected, onError);

    return () => {
      webSocketService.disconnect();
    };
  }, [currentURL, currentPage]);

  const onPageClick = (link) => {
    getProducts(link.url);
  };
  const onDelete = (id) => {
    const url = currentPath.includes('/seller') ? '/seller/product' : '/admin/product';
    Swal.fire({
      title: "Bạn có chắc không?",
      text: "Bạn sẽ không thể khôi phục.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient
          .delete(`${url}/${id}`)
          .then((res) => {
            webSocketService.send('/app/deleteProduct', id)
            // getProducts();
            Swal.fire({
              title: "Đã xóa",
              text: "Đã xóa sản phẩm.",
              icon: "success",
            });
            setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
          })
          .catch((error) => {
            Swal.fire({
              title: "Lỗi",
              text: "Đã có lỗi xảy ra",
              icon: "error",
            });
          });
      }
    });
  };
  const onGetSortValue = async (sortBy, order) => {
    setLoading(true);

    setParams({ sortBy, order });
    await axiosClient
      .get(
        currentPath.includes("seller")
          ? "/seller/viewproduct" + `?page=${currentPage}`
          : "/admin/viewproduct" + `?page=${currentPage}`,
        {
          params: {
            sortBy: sortBy,
            order: order,
          },
        }
      )
      .then(({ data }) => {
        setProducts(data.content);
        setTotalPages(data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePageClick = (event) => {
    setCurrentPage(+event.selected + 1);
  };

  return (
    <div className={cx("container")}>
      <div className={cx("heading")}>
        <h1 className={cx("heading-title")}>Danh sách sản phẩm</h1>
        <img src={require("../../../assets/img/separator.png")} alt="spr" />
      </div>
      {products.length > 0 && (
        <FilterProducts
          isClient={false}
          meta={meta}
          onPageClick={onPageClick}
          onGetSortValue={onGetSortValue}
        />
      )}
      {loading && <Loader />}
      <div className={cx("box-container")}>
        {!loading && (
          <>
            {products.length > 0 ? (
              products.map((product) => (
                <ProductListItem
                  url={currentPath}
                  item={product}
                  onDelete={onDelete}
                  key={product.id}
                />
              ))
            ) : (
              <div className={cx("empty")}>
                <p>Không có sản phẩm nào</p>
                <Btn
                  style={{
                    width: "33%",
                    flex: 1,
                  }}
                  value={"Thêm sản phẩm"}
                  href={"/seller/addproduct"}
                />
              </div>
            )}
          </>
        )}
      </div>
      {products.length > 0 && (
        <ReactPaginate
          nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={totalPages}
          previousLabel={<FontAwesomeIcon icon={faChevronLeft} />}
          pageClassName="page-item"
          pageLinkClassName={cx("btn")}
          previousClassName="page-item"
          previousLinkClassName={cx("btn")}
          nextClassName="page-item"
          nextLinkClassName={cx("btn")}
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName={cx("btn")}
          containerClassName={cx("paginate")}
          activeClassName={cx("active")}
          renderOnZeroPageCount={null}
        />
      )}
    </div>
  );
}

export default ViewProduct;
