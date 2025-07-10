import TD from "../../../TableLayout/TD";

interface Props {
  value: string;
}

const OrderId = ({ value }: Props) => {
  return <TD>{value}</TD>;
};

export default OrderId;
