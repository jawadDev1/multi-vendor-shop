import Content from "@/components/ui/atoms/typography/Content";

const ProductDetailsTab = ({
  description,
}: {
  description: string | undefined;
}) => {
  return <Content>{description}</Content>;
};

export default ProductDetailsTab;
