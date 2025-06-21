import { useEffect, useState } from "react";
import ProductDetailPageTemplate from "../../templates/ProductDetailPageTemplate";
import { useParams } from "react-router";
import { PRODUCTS_DATA, type Product } from "@/constants/static";

const ProductDetialPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[] | null>(
    null
  );

  useEffect(() => {
    let p = PRODUCTS_DATA.find((product) => product.title == slug);
    if (p) setProduct(p);

    let r = PRODUCTS_DATA.filter((product) => product.category == p?.category);

    setRelatedProducts(r);
  }, [slug]);

  if (!product) {
    return null;
  }

  return (
    <>
      <ProductDetailPageTemplate
        product={product}
        relatedProducts={relatedProducts}
      />
    </>
  );
};

export default ProductDetialPage;
