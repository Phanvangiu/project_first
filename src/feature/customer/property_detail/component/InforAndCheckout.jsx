import styled from "styled-components";
import PropertyInfo from "./PropertyInfo";
import { useState } from "react";
import Checkout from "./Checkout";
const StyeldContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 4rem;
  margin-top: 2rem;
`;
export default function InforAndCheckout({ data }) {
  const [selectedDates, setSelectedDates] = useState([]); // Trạng thái cho ngày bắt đầu và ngày kết thúc

  return (
    <StyeldContainer>
      <PropertyInfo
        data={data}
        selectedDates={selectedDates}
        setSelectedDates={setSelectedDates}
      />
      <Checkout
        data={data}
        selectedDates={selectedDates}
        setSelectedDates={setSelectedDates}
      />
    </StyeldContainer>
  );
}
