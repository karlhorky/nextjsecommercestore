/** @jsxImportSource @emotion/react */
import { useContext, useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import {
  ACTIONS,
  ShoppingCartContext,
} from '../../components/ShoppingCartContext';
import { checkoutStyles } from '../../styles/styles';

export default function Checkout(props) {
  const { dispatch, state } = useContext(ShoppingCartContext);
  const [
    deliveryEqualsBillingAddress,
    setDeliveryEqualsBillingAddress,
  ] = useState(true);
  const [premiumDelivery, setPremiumDelivery] = useState(true);
  const [nettoPrice, setNettoPrice] = useState(
    state.reduce((lumpSum, shoppingCartItem) => {
      return (
        lumpSum +
        Number(shoppingCartItem.pricePerUnit) *
          Number(shoppingCartItem.quantity)
      );
    }, 0),
  );
  const [shippingCosts, setShippingCosts] = useState(() => {
    if (
      (premiumDelivery && nettoPrice * 1.2 > 150) ||
      (!premiumDelivery && nettoPrice * 1.2 > 100)
    ) {
      return 0;
    } else {
      return 10;
    }
  });

  function activateBillingInformation(event) {
    event.target.value === 'Yes'
      ? setDeliveryEqualsBillingAddress(true)
      : setDeliveryEqualsBillingAddress(false);
  }

  function handleDeliveryOption(event) {
    setPremiumDelivery(event.target.value === 'premium' ? true : false);
  }

  function buyNow() {
    console.log('buyNOw');
    // database.persistOrder(
    //   3,
    //   2,
    //   1,
    //   (nettoPrice * 1.2 + shippingCosts).toFixed(2),
    // );
  }

  useEffect(() => {
    dispatch({
      type: ACTIONS.GET_CART,
      payload: {
        shoppingCart: props.shoppingCart,
        additionalInfo: props.additionalInfo,
      },
    });
  });

  return (
    <Layout>
      <div css={checkoutStyles}>
        <div className="checkoutInformation">
          <h2>Please check your order and your delivery/billing information</h2>
          <div className="checkoutDeliveryAndBilling">
            <div>
              Delivery address
              <form>
                <fieldset>
                  <legend>Name</legend>
                  <input type="text" placeholder="First name" />
                  <input type="text" placeholder="Last name" />
                </fieldset>
                <fieldset>
                  <legend>Location</legend>
                  <input type="text" placeholder="Street Address" />
                  <input type="text" placeholder="Street Address Line 2" />
                  <input type="text" placeholder="City" />
                  <input type="text" placeholder="State / Province" />
                  <input type="text" placeholder="Postal / ZIP Code" />
                  <input type="text" placeholder="Country" />
                </fieldset>
              </form>
            </div>
            <div>
              Billing address
              <fieldset>
                <legend>Same as delivery address?</legend>
                <label htmlFor="billingInfoEqualsDeliveryInfoYes">Yes</label>
                <input
                  type="radio"
                  name="billingInfoEqualsDeliveryInfo"
                  value="Yes"
                  id="billingInfoEqualsDeliveryInfoYes"
                  onClick={activateBillingInformation}
                  checked={deliveryEqualsBillingAddress}
                />
                <br />
                <label htmlFor="billingInfoEqualsDeliveryInfoNo">No</label>
                <input
                  type="radio"
                  name="billingInfoEqualsDeliveryInfo"
                  value="No"
                  id="billingInfoEqualsDeliveryInfoNo"
                  onClick={activateBillingInformation}
                />
              </fieldset>
              <form>
                <fieldset>
                  <legend>Name</legend>
                  <input
                    type="text"
                    placeholder="First name"
                    readOnly={deliveryEqualsBillingAddress}
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    readOnly={deliveryEqualsBillingAddress}
                  />
                </fieldset>
                <fieldset>
                  <legend>Location</legend>
                  <input
                    type="text"
                    placeholder="Street Address"
                    readOnly={deliveryEqualsBillingAddress}
                  />
                  <input
                    type="text"
                    placeholder="Street Address Line 2"
                    readOnly={deliveryEqualsBillingAddress}
                  />
                  <input
                    type="text"
                    placeholder="City"
                    readOnly={deliveryEqualsBillingAddress}
                  />
                  <input
                    type="text"
                    placeholder="State / Province"
                    readOnly={deliveryEqualsBillingAddress}
                  />
                  <input
                    type="text"
                    placeholder="Postal / ZIP Code"
                    readOnly={deliveryEqualsBillingAddress}
                  />
                  <input
                    type="text"
                    placeholder="Country"
                    readOnly={deliveryEqualsBillingAddress}
                  />
                </fieldset>
              </form>
            </div>
            <div>
              <fieldset>
                <legend>Delivery options</legend>
                <label htmlFor="billingInfoEqualsDeliveryInfoYes">
                  Premium
                </label>
                <input
                  type="radio"
                  name="delivery"
                  value="premium"
                  id="premiumDelivery"
                  onChange={handleDeliveryOption}
                  checked={premiumDelivery}
                />
                <br />
                <label htmlFor="billingInfoEqualsDeliveryInfoNo">
                  Standard
                </label>
                <input
                  type="radio"
                  name="delivery"
                  value="standard"
                  id="standardDelivery"
                  onChange={handleDeliveryOption}
                />
              </fieldset>
            </div>
          </div>
        </div>
        <div className="checkoutOverviewAndBuyNow">
          <button onClick={buyNow}>Buy now</button>
          <p>Overview</p>
          <p>Price: {nettoPrice}</p>
          <p>Shipping: {shippingCosts}</p>
          <p>VAT: {nettoPrice * 0.2}</p>
          <p>Total: {(nettoPrice * 1.2 + shippingCosts).toFixed(2)}</p>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const database = require('../../utils/database');
  let additionalInfo;
  let shoppingCart;
  if (context.req.cookies.shoppingCart) {
    additionalInfo = await database.getAdditionalInfoForCartItemsCookie(
      JSON.parse(context.req.cookies.shoppingCart),
    );
    shoppingCart = JSON.parse(context.req.cookies.shoppingCart);
  }
  console.log('cookies server side: ', shoppingCart);

  return {
    props: {
      additionalInfo: additionalInfo || null,
      shoppingCart: shoppingCart || null,
    }, // will be passed to the page component as props
  };
}
