import Table from "@/components/ui/molecules/Table";

const FIELDS = [
  { title: "Order ID" },
  { title: "Status" },
  { title: "Items Quantity" },
  { title: "Total" },
];

const DATA = [
  {
    name: 'Apple MacBook Pro 17"',
    color: "Silver",
    category: "Laptop",
    price: "$2999",
  },
  {
    name: "Microsoft Surface Pro",
    color: "White",
    category: "Laptop PC",
    price: "$1999",
  },
];

const TrackOrderSection = () => {
  return (
    <>
      <Table fields={FIELDS} data={DATA} />
    </>
  );
};

export default TrackOrderSection;
