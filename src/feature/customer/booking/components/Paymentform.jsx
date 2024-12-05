import styled from "styled-components";

const StyledContainerInput = styled.div``;

const StyledInput = styled.input`
  border: none;
  padding: 0.7rem;
  font-size: 18px;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.7);
  &:focus {
    border-radius: 4px;
    border: 1px solid #ea5e66;
    outline: none;
  }
`;

const StyledError = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const StyledContainerExandCvv = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: 4fr 3fr;
`;

export default function Paymentform({
  cardnumber,
  expiration,
  cvv,
  setCardnumber,
  setCvv,
  setExpiration,
  cardnumberError,
  setCardnumberError,
  expirationError,
  setExpirationError,
  cvvError,
  setCvvError,
}) {
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\s+/g, ""); // Xóa khoảng trắng
    value = value.slice(1); // Loại bỏ ký tự đầu nếu người dùng cố nhập
    value = "4" + value; // Gán mặc định ký tự đầu là "4"

    if (/^[0-9]*$/.test(value) && value.length <= 16) {
      // Thêm khoảng trắng sau mỗi 4 số
      const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
      setCardnumber(formattedValue);

      if (value.length < 16) {
        setCardnumberError("Card number must have 16 digits.");
      } else {
        setCardnumberError("");
      }
    } else {
      setCardnumberError("");
    }
  };

  // Kiểm tra CVV hợp lệ
  const handleCvvChange = (e) => {
    const value = e.target.value;
    if (value.length <= 3 && /^[0-9]*$/.test(value)) {
      setCvv(value);
      setCvvError(""); // Xóa lỗi nếu hợp lệ
    }

    // Kiểm tra điều kiện số lượng ký tự
    if (value.length !== 3) {
      setCvvError("CVV must be 3 digits.");
    }
  };

  const handleExpirationChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Loại bỏ ký tự không phải số
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Lấy tháng hiện tại
    const currentYear = currentDate.getFullYear() % 100; // Lấy 2 số cuối của năm hiện tại

    // Ngăn nhập nhiều hơn 4 ký tự (không tính dấu `/`)
    if (value.length > 4) return;

    // Kiểm tra nếu ký tự đầu tiên là 0 thì ký tự tiếp theo phải > 0
    if (
      value.length === 2 &&
      value[0] === "0" &&
      parseInt(value[1], 10) === 0
    ) {
      return;
    }
    if (value.length === 2 && value[0] === "1" && parseInt(value[1], 10) > 2) {
      return;
    }
    // Tự động thêm "0" nếu chỉ nhập 1 chữ số tháng
    if (value.length === 1 && parseInt(value, 10) > 1) {
      value = "0" + value; // Thêm số 0 ở đầu nếu cần
    }

    // Tự động thêm dấu "/" sau khi nhập tháng
    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
      setExpirationError("input year");
    }
    console.log(expirationError);
    // Phân tích giá trị thành tháng và năm
    const [monthStr, yearStr] = value.split("/");
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10);

    // Kiểm tra năm hợp lệ
    if (yearStr?.length === 2) {
      if (year < currentYear) {
        setExpirationError("Year must not be in the past.");
        return;
      } else if (year === currentYear && month < currentMonth) {
        setExpirationError("Expiration date cannot be in the past.");
        return;
      }
    }
    // Xóa lỗi nếu hợp lệ

    setExpirationError("");
    setExpiration(value); // Cập nhật giá trị expiration
  };

  return (
    <div>
      <StyledContainerInput>
        <StyledInput
          type="text"
          placeholder="Card number (e.g., 4111 1111 1111 1111)"
          value={cardnumber}
          onChange={handleCardNumberChange}
        />
        {cardnumberError && <StyledError>{cardnumberError}</StyledError>}
      </StyledContainerInput>

      <StyledContainerExandCvv>
        <StyledContainerInput>
          <StyledInput
            type="text"
            placeholder="MM/YY (e.g., 04/26)"
            value={expiration}
            onChange={handleExpirationChange}
          />
          {expirationError && <StyledError>{expirationError}</StyledError>}
        </StyledContainerInput>

        <StyledContainerInput>
          <StyledInput
            type="text"
            placeholder="CVV (3 digits)"
            value={cvv}
            onChange={handleCvvChange}
            maxLength={3} // Giới hạn tối đa 3 ký tự
          />
          {cvvError && <StyledError>{cvvError}</StyledError>}
        </StyledContainerInput>
      </StyledContainerExandCvv>
    </div>
  );
}
