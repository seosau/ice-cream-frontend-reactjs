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
const cx = className.bind(style);

function ViewProduct() {
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
      .get(url, { params: payload })
      .then(({ data }) => {
        setProducts(data.data);
        setMeta(data.meta);
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
    getProductsFromCurrentUrl();
  }, [currentURL]);

  const onPageClick = (link) => {
    getProducts(link.url);
  };
  const onDelete = (id) => {
    const url = currentPath.includes('/seller') ? '/seller/product' : '/admin/product';
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient
          .delete(`${url}/${id}`)
          .then((res) => {
            // getProducts();
            Swal.fire({
              title: "Deleted!",
              text: "Your product has been deleted.",
              icon: "success",
            });
            setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
          })
          .catch((error) => {
            Swal.fire({
              title: "Something went wrong",
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
          ? "/seller/viewproduct"
          : "/admin/viewproduct",
        {
          params: {
            sortBy: sortBy,
            order: order,
          },
        }
      )
      .then(({ data }) => {
        setProducts(data.data);
        setMeta(data.meta);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className={cx("container")}>
      <div className={cx("heading")}>
        <h1 className={cx("heading-title")}>your products</h1>
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
                <p>no product added yet!</p>
                <Btn
                  style={{
                    width: "33%",
                    flex: 1,
                  }}
                  value={"add product"}
                  href={"/seller/addproduct"}
                />
              </div>
            )}
          </>
        )}
      </div>
      {products.length > 0 && (
        <PaginationLinks meta={meta} onPageClick={onPageClick} />
      )}
    </div>
  );
}

export default ViewProduct;
