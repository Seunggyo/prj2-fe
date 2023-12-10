import { useEffect, useRef, useState } from "react";
import {
  loadPaymentWidget,
  PaymentWidgetInstance,
} from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import { Button, useQuery } from "@chakra-ui/react";

const clientKey = "test_ck_kYG57Eba3GRQEjeLbEQj8pWDOxmA";
const customerKey = nanoid();
const selector = "#payment-widget";

export function Payment() {
  const paymentWidget = usePaymentWidget(clientKey, customerKey);
  const paymentWidgetRef = useRef(null);
  const paymentMethodsWidgetRef = useRef(null);
  const [price, setPrice] = useState(5000);

  useEffect(() => {
    (async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey);
      if (paymentWidget === null) {
        return;
      }
      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        selector,
        price,
        { variantKey: "DEFAULT" },
      );
      paymentWidget.renderAgreement("#agreement", { variantKey: "AGREEMENT" });
      paymentWidgetRef.current = paymentWidget;
      paymentMethodsWidgetRef.current = paymentMethodsWidget;
    })();
  }, [paymentWidget]);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;
    if (paymentMethodsWidget === null) {
      return;
    }
    paymentMethodsWidget.updateAmount(
      price,
      paymentMethodsWidget.UPDATE_REASON.COUPON,
    );
  }, [price]);

  return (
    <div className="wrapper">
      <div className="box_section">
        <div id="payment-widget" />
        <div id="agreement" />
        <div style={{ paddingLeft: "24px" }}>
          <div className="checkable typography--p">
            <label
              htmlFor="coupon-box"
              className="checkable__label typography--regular"
            >
              <input
                id="coupon-box"
                className="checkable__input"
                type="checkbox"
                aria-checked="true"
                onChange={(event) => {
                  setPrice(
                    event.target.checked ? price - 5_000 : price + 5_000,
                  );
                }}
              />
              <span className="checkable__label-text">5,000원 쿠폰 적용</span>
            </label>
          </div>
        </div>
        <div className="result wrapper">
          <Button
            onClick={async () => {
              const paymentWidget = paymentWidgetRef.current;
              try {
                await paymentWidget?.requestPayment({
                  orderId: nanoid(),
                  orderName: "paymntName",
                  customerName: "1231",
                  customerEmail: "yhd9999@naver.com",
                  successUrl: `${window.location.origin}/success`,
                  failUrl: `${window.location.origin}/fail`,
                });
              } catch (err) {
                console.log(err);
              }
            }}
          >
            결제하기
          </Button>
        </div>
      </div>
    </div>
  );
}

function usePaymentWidget(clientKey, customerKey) {
  return useQuery({
    queryKey: ["payment-widget", clientKey, customerKey],
    queryFn: () => {
      // 결제 위젯 초기회
      return loadPaymentWidget(clientKey, customerKey);
    },
  });
}
