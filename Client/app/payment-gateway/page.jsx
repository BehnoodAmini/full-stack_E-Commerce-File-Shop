import PaymentGatewayComp from "@/components/paymentGatewayComp";

const PaymentGateway = async ({ searchParams }) => {
  const resolvedParams = await searchParams;

  return (
    <div>
      <>
        <meta charSet="utf-8" />
        <title> درگاه پرداخت </title>
        <meta name="description" content=" درگاه پرداخت " />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="/payment-gateway" />
      </>
      <section className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-indigo-100 via-indigo-200 to-indigo-300 backdrop-blur-sm">
        <PaymentGatewayComp resnumber={resolvedParams.Authority} />
      </section>
    </div>
  );
};

export default PaymentGateway;
