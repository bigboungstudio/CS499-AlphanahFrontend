import axios from "axios";
const baseUrl = "http://alphanah.com:8080/checkout";

export async function stripePaymentMethodHandler(
  stripe,
  result,
  profile,
  token,
  setPaymentComplete,
  setLoading
) {
  if (result.error) {
    window.alert("กรุณากรอกข้อมูลบัตร");
    setLoading();
    // Show error in payment form
  } else {
    // Otherwise send paymentMethod.id to your server (see Step 4)
    //   try {
    const res = await axios.post(
      baseUrl,
      {
        payment_method_id: result.paymentMethod.id,
        firstname: profile.firstname,
        lastname: profile.lastname,
        phone: profile.phone,
        address: profile.address,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token.tokenType} ${token.accessToken}`,
        },
      }
    );
    const paymentResponse = res.data;

    // Handle server response (see Step 4)
    handleServerResponse(
      stripe,
      paymentResponse,
      profile,
      token,
      setPaymentComplete
    );

    //   } catch (error) {
    //     console.log(error)
    //   }
  }
}

export async function handleServerResponse(
  stripe,
  response,
  profile,
  token,
  setPaymentComplete
) {
  if (response.error) {
    // Show error from server on payment form
  } else if (response.requires_action) {
    // Use Stripe.js to handle the required card action
    //   const { error: errorAction, paymentIntent } = await stripe.handleCardAction(response.payment_intent_client_secret);
    const { error: errorAction, paymentIntent } = await stripe.handleCardAction(
      response.payment_intent_client_secret
    );
    if (errorAction) {
      console.log(errorAction);
      // Show error from Stripe.js in payment form
    } else {
      // The card action has been handled
      // The PaymentIntent can be confirmed again on the server
      const serverResponse = await axios.post(
        baseUrl,
        {
          payment_intent_id: paymentIntent.id,
          firstname: profile.firstname,
          lastname: profile.lastname,
          phone: profile.phone,
          address: profile.address,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token.tokenType} ${token.accessToken}`,
          },
        }
      );
      handleServerResponse(stripe, await serverResponse.json());
    }
  } else {
    setPaymentComplete();
  }
}
