import { css } from '@emotion/react';

export const globalStyles = css`
  html,
  body {
    margin: 0;
  }
`;
export const appAreaStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`;

export const navBarStyles = css`
  display: flex;
  background-color: rgba(237, 224, 223, 0.3);
  border-bottom: 3px ridge;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
`;

export const menuStyles = css`
  display: inline-flex;
  gap: 20px;

  // Shopping cart quantity
  span {
    position: relative;
    right: 38px;
    bottom: 30px;
    font-size: 14px;
    font-weight: 700;
    border-radius: 50%;
    height: 10px;
    width: 25px;
    display: inline-block;
    text-align: center;
    color: black;
    pointer-events: none;
  }

  .userProfileLink {
    display: flex;
    flex-direction: column;
    align-items: center;

    .userProfileImage {
      display: inline-block;
      overflow: hidden;
      position: relative;
      box-sizing: border-box;
      margin: 0;
      max-width: 60px;
    }

    .userProfileName {
      word-break: break-word;
      max-width: 80px;
      text-align: center;
    }
  }
`;

export const searchBarStyles = css`
  * {
    font-size: 30px;
  }
`;

export const mainStyles = css`
  align-items: stretch;
  background-color: rgba(237, 224, 223, 0.3);
  flex: auto;
  height: 80vh;
  overflow-y: auto;
  padding: 15px;
  box-sizing: border-box;
`;

export const productPageStyles = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  div {
    margin: 15px;
  }

  .singleProductImages {
    display: flex;
    flex-direction: column;
    max-width: 80px;
    margin: 10px;
    max-width: 200px;
    align-items: center;
    justify-content: space-between;
    text-align: center;

    .addImagesButton {
      border: none;
      background: none;
      height: 40px;
      width: 40px;
    }

    .pricePerUnit {
    }
  }

  .singleProductDescription {
    max-width: 500px;
  }

  .singleProductAddToCart {
    display: flex;
    flex-direction: column;
  }
`;

export const shoppingCartStyles = css`
  .deleteCartItemStyles {
    pointer-events: none;
  }

  // If shopping cart is empty
  p {
    text-align: center;
    margin: auto;
  }
`;

export const checkoutStyles = css`
  height: 100%;
  display: flex;
  justify-content: space-between;

  div {
    margin: 0 20px;
  }

  .checkoutInformation {
    display: flex;
    flex-direction: column;

    .checkoutDeliveryAndBilling {
      display: flex;
      justify-content: space-between;
      border: 1px solid;
    }

    .checkoutDeliveryAndBilling > div {
      margin: 0 20px;
      flex-grow: 1;
      border: 1px solid;

      form > input {
        margin: 10px 10px;
      }
    }
  }

  .checkoutOverviewAndBuyNow {
    display: flex;
    flex-direction: column;
    border: 1px solid;
    min-width: 300px;
  }
`;

export const error404Styles = css`
  background-color: rgba(237, 224, 223, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  font-size: 30px;
`;
