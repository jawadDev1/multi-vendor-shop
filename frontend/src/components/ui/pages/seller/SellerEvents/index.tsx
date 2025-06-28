import { useAppDispatch, useAppSelector } from "@/app/hooks";
import Loader from "@/components/ui/atoms/extra/Loader";
import SellerEventPageTemplate from "@/components/ui/templates/seller/EventsPageTemplate";
import { loadSellerEvents } from "@/features/event/eventThunk";
import { notifyError } from "@/utils/toast";
import { useEffect } from "react";

const SellerEventPage = () => {
  const dispatch = useAppDispatch();
  const { sellerEvents, error, loading } = useAppSelector(
    (state) => state.event
  );

  useEffect(() => {
    if (!error) {
      dispatch(loadSellerEvents());
    }

    if (error) {
      notifyError(error);
    }
  }, [error]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <SellerEventPageTemplate
        key={sellerEvents?.length}
        data={sellerEvents as any}
      />
    </>
  );
};

export default SellerEventPage;
