import styled from "styled-components";
import logo from "@/shared/assets/images/logo.svg";
import Avatar from "react-avatar";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaRegBell } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  align-items: center;
  background-color: white;
`;

const Left = styled.div`
  width: 55px;
  cursor: pointer;
`;

const Center = styled.div`
  display: flex;
  align-items: center;
`;

const Right = styled.div`
  display: flex;
  gap: 15px;
`;

const FocusButton = styled.button`
  background-color: white;
  cursor: pointer;
  padding: 5px 20px;
  border-radius: 25px;

  display: flex;
  align-items: center;
  gap: 5px;
  border: 2.5px solid white;

  &:hover {
    background-color: #f7f7f7;
  }

  &:focus {
    border: 2px solid black;
    font-weight: 600;
  }
`;

const CustomLink = styled(Link)`
  padding: 5px 20px;
  border-radius: 25px;
  color: black;
  text-decoration: none;
  font-weight: 600;
  background-color: white;
  color: rgba(0, 0, 0, 0.5);

  &:hover {
    background-color: #f7f7f7;
  }
`;

const CircleButton = styled.button`
  background-color: white;
  padding: 11px;
  border-radius: 50%;
  font-size: 16px;
  cursor: pointer;
`;

export default function HostHeader() {
  const navigate = useNavigate();

  return (
    <Container>
      <Left onClick={() => navigate("/hosting")}>
        <img src={logo} />
      </Left>
      <Center>
        <CustomLink to={"/hosting"}>Today</CustomLink>
        <CustomLink to={"/hosting/calendar"}>Calendar</CustomLink>
        <CustomLink to={"/hosting/listing"}>Listings</CustomLink>
        <CustomLink to={"hosting/messages"}>Messages</CustomLink>
        <FocusButton>
          Menu <IoIosArrowDown />
        </FocusButton>
      </Center>
      <Right>
        <div>
          <CircleButton>
            <FaRegBell />
          </CircleButton>
        </div>
        <Avatar round size={40} />
      </Right>
    </Container>
  );
}
