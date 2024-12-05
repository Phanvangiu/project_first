import styled from "styled-components";
import CustomerHeader from "../custome_header/CustomerHeader";

const Container = styled.div`
  background-color: white;
`;

const HeaderContainer = styled.div`
  padding: 0 5rem;
  position: relative;

  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const Body = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 10px 5rem;
  gap: 1rem;
`;

const BodyItem = styled.div`
  aspect-ratio: 1 / 1;
  background-color: #b0b0b0;
  border-radius: 10px;
`;

export default function HomePage() {
  return (
    <Container>
      <HeaderContainer>
        <CustomerHeader />
      </HeaderContainer>
      <Body>
        <BodyItem />
        <BodyItem />
        <BodyItem />
        <BodyItem />
        <BodyItem />
        <BodyItem />
        <BodyItem />
        <BodyItem />
        <BodyItem />
        <BodyItem />
        <BodyItem />
        <BodyItem />
        <BodyItem />
        <BodyItem />
        <BodyItem />
      </Body>
    </Container>
  );
}
