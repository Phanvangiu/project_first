import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useEffect } from "react";
import WebFont from "webfontloader";
import HostHeader from "@/feature/customer/host_header/HostHeader";

const Container = styled.div``;

const OutletContainer = styled.div``;

export default function HostLayout() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Nunito"],
      },
    });
  }, []);

  return (
    <Container>
      <HostHeader />
      <OutletContainer>
        <Outlet />
      </OutletContainer>
    </Container>
  );
}
