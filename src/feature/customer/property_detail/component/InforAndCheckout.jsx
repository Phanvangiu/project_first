import styled from "styled-components";
import PropertyInfo from "./PropertyInfo";
import { useEffect, useState } from "react";
import Checkout from "./Checkout";
import { UserRequest } from "@/shared/api/userApi";
const StyeldContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 4rem;
  margin-top: 2rem;
`;
const StyledContainerBadge = styled.div`
  width: 100%;
  height: fit-content;
  position: sticky;
  display: flex;
  align-items: center; /* Căn giữa theo chiều dọc */
  justify-content: center; /* Căn giữa theo chiều ngang */
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  border-radius: 8px;
`;

export default function InforAndCheckout({ data }) {
  const [selectedDates, setSelectedDates] = useState([]);
  const [isErrorBadge, setIsErrorBadge] = useState(false);
  const [showErrorBadge, setShowErrorBadge] = useState("");
  const user = UserRequest();
  useEffect(() => {
    if (user.isSuccess && user.data.status == 200) {
      if (data.instantBookRequirementID != null) {
        const checkBadge = user.data.data.userBadges.find(
          (badge) => badge.userBadgeId.badgeId == data.instantBookRequirementID
        );
        if (!checkBadge) {
          setIsErrorBadge(true);
          if (data.instantBookRequirementID == 1) {
            setShowErrorBadge(
              "<h2>You need to stay at least 5 different locations.</h2>"
            );
          }
          if (data.instantBookRequirementID == 4) {
            setShowErrorBadge(
              "<h1>Please verify your identity to earn the 'Verified User' badge.</h1>"
            );
          }
        }
      }
    }
  }, [data, user]);
  return (
    <StyeldContainer>
      <PropertyInfo
        data={data}
        selectedDates={selectedDates}
        setSelectedDates={setSelectedDates}
      />
      {isErrorBadge ? (
        <StyledContainerBadge
          dangerouslySetInnerHTML={{ __html: showErrorBadge }}
        />
      ) : (
        <Checkout
          data={data}
          selectedDates={selectedDates}
          setSelectedDates={setSelectedDates}
        />
      )}
    </StyeldContainer>
  );
}
