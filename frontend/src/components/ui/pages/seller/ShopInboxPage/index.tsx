import { useAppDispatch, useAppSelector } from "@/app/hooks";
import Loader from "@/components/ui/atoms/extra/Loader";
import ShopInboxPageTemplate from "@/components/ui/templates/seller/ShopInboxPageTemplate";
import { getSellerConversations } from "@/features/seller/sellerThunk";
import { notifyError } from "@/utils/toast";
import { useEffect } from "react";

const ShopInboxPage = () => {
  const dispatch = useAppDispatch();
  const { conversations, error, loading } = useAppSelector(
    (state) => state.seller
  );

  useEffect(() => {
    dispatch(getSellerConversations());

    if (error) {
      notifyError(error);
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <ShopInboxPageTemplate conversations={conversations!} />
    </>
  );
};

export default ShopInboxPage;
