
const SellerHeaderSkeleton = () => {
  return (
    <header className="bg-blue-gray py-3 px-4 flex justify-between items-center shadow-2xl z-10 relative animate-pulse">
      <div className="w-[4rem] h-[2.5rem] bg-charcoal-gray rounded-md" />

      <div className="flex gap-3 items-center">
        <div className="w-[120px] h-[40px] bg-charcoal-gray rounded-md" />

        <div className="size-[30px] lg:size-[50px] rounded-full bg-charcoal-gray" />
      </div>
    </header>
  );
};


export default SellerHeaderSkeleton