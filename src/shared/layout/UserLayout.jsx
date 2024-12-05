import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useEffect } from "react";
import WebFont from "webfontloader";

const Container = styled.div`
  background-color: white;
`;

const OutletContainer = styled.div``;

export default function UserLayout() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Nunito"],
      },
    });
  }, []);

  return (
    <Container>
      <OutletContainer>
        <Outlet />
      </OutletContainer>
    </Container>
  );
}
