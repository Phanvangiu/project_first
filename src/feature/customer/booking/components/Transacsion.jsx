import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { PiCalendarCheckFill } from "react-icons/pi";
import Paymentform from "./Paymentform";
import { LuDot } from "react-icons/lu";
import { IoWarningSharp } from "react-icons/io5";
import { BookingRequest } from "../../property_detail/api/api";
import { UserRequest } from "@/shared/api/userApi";

// Styled components
const StyledContainerAll = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  color: rgba(0, 0, 0, 0.8);
`;

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 7rem;
`;
const StyledContainerError = styled.div`
  padding: 0.7rem 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  display: flex;
  justify-content: stretch;
  align-items: center;
  line-height: 2;
  column-gap: 1rem;
  margin-bottom: 1.5rem;
  & > div div:first-child {
    font-weight: 900;
  }
`;
const StyledTitle = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1.2rem;
`;

// const StyledHeader = styled.div`
//   height: 5rem;
// `;

const StyledYourTrip = styled.div`
  display: flex;
  line-height: 2rem;
  flex-direction: column;
  row-gap: 0.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding-bottom: 1rem;

  & > div {
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  & > div:first-child {
    font-size: 22px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.7);
  }
`;

const StyledFormPay = styled.div`
  margin: 1rem 4rem 0 0;
  & > div:first-child {
    font-size: 22px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.7);
    margin-bottom: 0.7rem;
  }
`;

const StyledContainerCancel = styled.div`
  font-weight: 600;
  color: rgba(0, 0, 0, 0.7);
  margin-top: 1rem;

  & > div:first-child {
    font-size: 22px;
    margin-bottom: 0.7rem;
  }
  & > div:last-child {
    font-size: 17px;
    font-weight: 100;
  }
`;

const StyledContainerRule = styled.div`
  font-weight: 600;
  color: rgba(0, 0, 0, 0.7);
  margin-top: 1rem;

  & > div {
    font-size: 17px;
    font-weight: 100;
  }
  & > div:first-child {
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  & > div:last-child div {
    display: flex;
    align-items: center;
  }
`;

const StyledSubmitButton = styled.button`
  margin-top: 1rem;
  background-color: #ea5e66;
  border-radius: 8px;
  border: none;
  padding: 0.6rem 2rem;
  color: white;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: #ff0000;
    transform: scale(1.005);
    transition: transform 0.2s ease, background-color 0.2s ease;
  }
  &:active {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    background-color: #ff0000;
    outline: none;
  }
`;
const StyledContainerDetails = styled.div`
  color: rgba(0, 0, 0, 0.7);
  font-size: 18px;
`;
const StyledTittle = styled.div`
  margin-bottom: 1rem;

  & > div:first-child {
    font-size: 26px;
    font-weight: 600;
    color: black;
  }
`;
const StyledContainerNightGuest = styled.div`
  & > div {
    display: flex;
    justify-content: stretch;
    column-gap: 2rem;
    align-items: center;
  }
`;
const StyledContainerDetail = styled.div`
  margin-bottom: 1rem;
  & > div:first-child {
    font-size: 22px;
    font-weight: 600;
  }
`;
const StyledTotal = styled.div`
  display: flex;
  justify-content: stretch;
  column-gap: 2rem;
  align-items: center;
  color: black;
  font-size: 22px;
  & > div:first-child {
    font-weight: 600;
  }
`;
const Transaction = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = UserRequest();

  const bookingRequest = BookingRequest();
  // States for payment form
  const [cardnumber, setCardnumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardnumberError, setCardnumberError] = useState("");
  const [expirationError, setExpirationError] = useState("");
  const [cvvError, setCvvError] = useState("");
  const [errorSubmit, setErrorSubmit] = useState(false);
  //Các state và setState
  const paymentState = {
    cardnumber,
    expiration,
    cvv,
    setCardnumber,
    setExpiration,
    setCvv,
    cardnumberError,
    expirationError,
    cvvError,
    setCardnumberError,
    setExpirationError,
    setCvvError,
  };

  const { checkInDay, checkOutDay, data, children, adult, finalPrice } =
    location.state || {}; // Extract data from location.state

  // Redirect if data is missing
  useEffect(() => {
    if (!checkInDay || !checkOutDay || !data) {
      navigate("/");
    }
  }, [checkInDay, checkOutDay, data, navigate]);

  // Format date to MM/DD/YYYY
  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    }).format(new Date(date));
  };

  const dateBookingQuantity = (start, end) => {
    const timeDifference = new Date(end) - new Date(start); // Ensure the dates are parsed
    const daysDifference = timeDifference / (1000 * 3600 * 24); // Convert ms to days
    return Math.ceil(daysDifference); // No need to subtract 1
  };
  let customerId;
  const formData = new FormData();
  if (user.isSuccess) {
    customerId = user.data.data.id;
    formData.append("checkInDay", checkInDay);
    formData.append("checkOutDay", checkOutDay);
    formData.append("adult", adult);
    formData.append("children", children);
    formData.append("propertyId", data.id);
    formData.append("customerId", customerId);
    formData.append("hostId", data.user.id);
    formData.append("amount", finalPrice);
  }

  // Handle form submission

  const handleSubmitPay = () => {
    if (
      cardnumberError ||
      expirationError ||
      cvvError ||
      !cardnumber ||
      !expiration ||
      !cvv ||
      !customerId
    ) {
      console.log("Vui lòng nhập đầy đủ thông tin");
      setErrorSubmit(true);
    } else {
      bookingRequest.mutate(formData, {
        onSuccess: (response) => {
          if (response.status == 200) {
            console.log("Thông tin hợp lệ");
            setErrorSubmit(false);
            // Ngay sau khi thanh toán thành công, điều hướng về trang chủ
            navigate("/", { replace: true });
            // Thay thế trang hiện tại trong lịch sử để ngăn người dùng quay lại
            window.history.replaceState(null, "", "/");
          }
        },
      });
    }
  };
  return (
    <StyledContainerAll>
      {/* <StyledHeader /> */}
      <StyledTitle>Confirm and pay</StyledTitle>
      <StyledContainer>
        <div>
          {errorSubmit && (
            <StyledContainerError>
              <IoWarningSharp style={{ fontSize: "4rem", color: "red" }} />

              <div>
                <div>Let’s try that again</div>
                <div>Please check your payment details.</div>
              </div>
            </StyledContainerError>
          )}
          <StyledYourTrip>
            <div>Your trip</div>
            <div>
              <div>
                <div>Dates</div>
                <p>
                  {formatDate(checkInDay)} - {formatDate(checkOutDay)}
                </p>
              </div>
              <PiCalendarCheckFill style={{ fontSize: "1.6rem" }} />
            </div>
            <div>
              <div>
                <div>Guests</div>
                <p>{children + adult}</p>
              </div>
              <PiCalendarCheckFill style={{ fontSize: "1.6rem" }} />
            </div>
          </StyledYourTrip>
          <StyledFormPay>
            <div>Pay</div>
            <Paymentform {...paymentState} />
          </StyledFormPay>
          <StyledContainerCancel>
            <div>Cancellation policy</div>
            <div>
              <strong>Free cancellation before Dec 10</strong>. Cancel before
              check-in on Dec 15 for a partial refund.
            </div>
          </StyledContainerCancel>
          <StyledContainerRule>
            <div>Ground rules</div>
            <div>We ask every guest to remember a few simple things.</div>
            <div>
              <div>
                <LuDot />
                <p>Follow the house rules</p>
              </div>
              <div>
                <LuDot />
                <p>Treat your Host’s home like your own</p>
              </div>
            </div>
          </StyledContainerRule>
          {bookingRequest.isPending ? (
            <p>Processing your payment...</p>
          ) : (
            <StyledSubmitButton
              onClick={handleSubmitPay}
              disabled={bookingRequest.isPending}
            >
              Confirm and pay
            </StyledSubmitButton>
          )}
        </div>
        <StyledContainerDetails>
          <div>
            <div>
              <img src={data.propertyImages[0]} alt="" />
            </div>
            <StyledTittle>
              <div>{data.propertyTitle}</div>
              <div>
                <div>{data.propertyType}</div>
                <div>4.89 (222 reviews) • Superhost</div>
              </div>
            </StyledTittle>
          </div>
          <StyledContainerDetail>
            <div>Details</div>
            <StyledContainerNightGuest>
              <div>
                <div>Nights : </div>
                <div>{dateBookingQuantity(checkInDay, checkOutDay)}</div>
              </div>
              <div>
                <div>Guests : </div>
                <div>{children + adult}</div>
              </div>
            </StyledContainerNightGuest>
          </StyledContainerDetail>
          <StyledTotal>
            <div>Total:</div>
            <div>${finalPrice}</div>
          </StyledTotal>
        </StyledContainerDetails>
      </StyledContainer>
    </StyledContainerAll>
  );
};

export default Transaction;
