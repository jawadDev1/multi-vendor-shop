import { getServerApiRequest } from "@/actions/api";
import Content from "@/components/ui/atoms/typography/Content";
import DashboardPageTemplate from "@/components/ui/templates/seller/DashboardPageTemplate";

const DashboardPage = async () => {
  const result = await getServerApiRequest("shop/states")

  if(!result?.success) {
    return <Content>
      Something went wrong
    </Content>
  }

  const data = result?.data;


  return (
    <>
      <DashboardPageTemplate shop={data} />
    </>
  );
};

export default DashboardPage;
