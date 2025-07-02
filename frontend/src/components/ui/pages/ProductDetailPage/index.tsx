import { useEffect } from "react";
import ProductDetailPageTemplate from "../../templates/ProductDetailPageTemplate";
import { useNavigate, useParams } from "react-router";
import { loadProductDetails } from "@/features/product/productThunk";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import Loader from "../../atoms/extra/Loader";

const ProductDetialPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { productDetails, loading, relatedProducts } = useAppSelector(
    (state) => state.product
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const result = await dispatch(loadProductDetails(slug!)).unwrap();
      if (!result?.success) {
        navigate("/not-found");
      }
    })();
  }, [slug]);

  if (!productDetails || loading) {
    return <Loader />;
  }

  return (
    <>
      <ProductDetailPageTemplate
        product={productDetails}
        relatedProducts={relatedProducts}
      />
    </>
  );
};

export default ProductDetialPage;
