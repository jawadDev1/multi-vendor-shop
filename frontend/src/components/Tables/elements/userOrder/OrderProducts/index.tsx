import TD from "../../../TableLayout/TD";

interface Props {
  value: [];
}

const OrderProduct = ({ value }: Props) => {
  return <TD>{value ? value.length : ""}</TD>;
};

export default OrderProduct;
