import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Link } from "@chakra-ui/react";
import axios from "axios";
import { nanoid } from "nanoid";

export function Success() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const requestData = {
      paymentUid: searchParams.get("orderId"),
      amount: searchParams.get("amount"),
      paymentKey: searchParams.get("paymentKey"),
    };

    axios
      .post("/payment/toss", {
        paymentUid: requestData.paymentUid,
        paymentName: "paymntName",
        customerName: "1231",
        email: "yhd9999@naver.com",
        successUrl: `${window.location.origin}/success`,
        failUrl: `${window.location.origin}/fail`,
        amount: searchParams.get("amount"),
      })
      .then(() => confirm());

    // TODO: 개발자센터에 로그인해서 내 결제위젯 연동 키 > 시크릿 키를 입력하세요. 시크릿 키는 외부에 공개되면 안돼요.
    // @docs https://docs.tosspayments.com/reference/using-api/api-keys
    const secretKey = "test_sk_LlDJaYngro7M5m9gYjpvrezGdRpX";

    // 토스페이먼츠 API는 시크릿 키를 사용자 ID로 사용하고, 비밀번호는 사용하지 않습니다.
    // 비밀번호가 없다는 것을 알리기 위해 시크릿 키 뒤에 콜론을 추가합니다.
    // @docs https://docs.tosspayments.com/reference/using-api/authorization#%EC%9D%B8%EC%A6%9D
    const encryptedSecretKey = `Basic ${btoa(secretKey + ":")}`;

    async function confirm() {
      try {
        const response = axios.post(
          "/payment/toss/success",
          {
            paymentUid: requestData.paymentUid,
            paymentKey: requestData.paymentKey,
            amount: requestData.amount,
          },
          {
            headers: {
              Authorization: encryptedSecretKey,
              "Content-Type": "application/json",
            },
          },
        );

        console.log(response.data); // 성공 응답 데이터 출력
        navigate("/home/member/paymentHistory");
        // 예: 성공 메시지 표시, 다른 페이지로 리디렉션 등
        console.log("결제 성공!");
      } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        // TODO: 구매 실패 비즈니스 로직 구현
        // 예: 실패 메시지 표시, 에러 페이지로 리디렉션 등
        if (error.response) {
          const { code, message } = error.response.data;
          console.log("결제 실패:", code, message);
          navigate(`/fail?code=${code}&message=${message}`);
        }
      }
    }
  }, []);

  return (
    <div className="result wrapper">
      <div className="box_section">
        <h2 style={{ padding: "20px 0px 10px 0px" }}>
          <img
            width="35px"
            src="https://static.toss.im/3d-emojis/u1F389_apng.png"
          />
          결제 성공
        </h2>
        <p>{`paymentKey = ${searchParams.get("paymentKey")}`}</p>
        <p>{`orderId = ${searchParams.get("orderId")}`}</p>
        <p>{`amount = ${Number(
          searchParams.get("amount"),
        ).toLocaleString()}원`}</p>
        <div className="result wrapper">
          <Link to="https://docs.tosspayments.com/guides/payment-widget/integration">
            <button
              className="button"
              style={{ marginTop: "30px", marginRight: "10px" }}
            >
              연동 문서
            </button>
          </Link>
          <Link to="https://discord.gg/A4fRFXQhRu">
            <button
              className="button"
              style={{
                marginTop: "30px",
                backgroundColor: "#e8f3ff",
                color: "#1b64da",
              }}
            >
              실시간 문의
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
