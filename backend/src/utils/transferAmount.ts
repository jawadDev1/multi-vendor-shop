import Stripe from "stripe";

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const transferAmount = async ({amount, destination, orderId}: {amount: number, destination: string, orderId: string}) => {
  try {
    const transfer = await stripe.transfers.create({
      amount,
      currency: "usd",
      destination,
      description: `Payout for order ${orderId}`,
    });


    return {success: true, transfer_id: transfer.id}

  } catch (error) {
    console.log("Error in trasfer amount ", error);
    return { success: false };
  }
};



export const calculateAmountAfterPlatformFee = (amount: number) => {
    const fee = amount * 0.10;

    return Number(((amount - fee) * 100).toFixed(0));
}