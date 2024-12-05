import { Outlet } from "react-router-dom";
import styled, { css } from "styled-components";
import { useEffect } from "react";
import WebFont from "webfontloader";
import SideBar from "@/feature/admin/sidebar/SideBar";
import { useState } from "react";
import Header from "@/feature/admin/header/Header";
import { AdminRequest } from "../api/adminApi";
import WaitingPopUp from "../components/PopUp/WaitingPopUp";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  min-height: 100vh;

  transition: all 0.1s;

  ${(props) => {
    if (props.$isSideBarSmall) {
      return css`
        grid-template-columns: 56px 1fr;
      `;
    }
  }}
`;

const AdminBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const OutletContainer = styled.div`
  background-color: #f3f3f3;
`;

export default function AdminLayout() {
  const admin = AdminRequest();
  const navigate = useNavigate();
  const [isSideBarSmall, setIsSideBarSmall] = useState(false);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Nunito"],
      },
    });
  }, []);

  if (admin.isLoading) {
    return <WaitingPopUp />;
  }

  if (admin.isError) {
    Cookies.remove("ADMIN_ACCESS_TOKEN");
    navigate("/admin_login");
  }

  if (admin.isSuccess && admin.data.status == 404) {
    navigate("/admin_login");
    return;
  }

  if (admin.isSuccess && admin.data.status == 200 && admin.data.data.status == false) {
    Cookies.remove("ADMIN_ACCESS_TOKEN");
    admin.refetch();
  }

  return (
    <Container $isSideBarSmall={isSideBarSmall}>
      <SideBar isSideBarSmall={isSideBarSmall} />
      <AdminBody>
        <Header isSideBarSmall={isSideBarSmall} setIsSideBarSmall={setIsSideBarSmall} />
        <OutletContainer>
          <Outlet />
        </OutletContainer>
      </AdminBody>
    </Container>
  );
}
