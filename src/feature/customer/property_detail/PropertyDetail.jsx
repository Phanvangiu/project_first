import CustomerHeader from "../custome_header/CustomerHeader";
import styled from "styled-components";
import NameImage from "./component/NameImage";
import InforAndCheckout from "./component/InforAndCheckout";
import { GetPropertyRequest } from "./api/api";
import { useParams } from "react-router-dom";
import Location from "./component/Location";

const StyledContainer = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  color: #222222;
`;

export default function PropertyDetail() {
  const { property_id } = useParams();
  const getPropertyRequest = GetPropertyRequest(property_id);

  if (getPropertyRequest.isLoading) {
    return <div>Loading...</div>;
  }

  if (getPropertyRequest.isError) {
    return <div>Error loading property details.</div>;
  }

  return (
    <div>
      <CustomerHeader />
      {getPropertyRequest.isSuccess && (
        <StyledContainer>
          <NameImage data={getPropertyRequest.data.data} />
          <InforAndCheckout data={getPropertyRequest.data.data} />
          <Location data={getPropertyRequest.data.data} />
        </StyledContainer>
      )}
    </div>
  );
}
