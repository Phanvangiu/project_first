import styled, { css } from "styled-components";
import sidebar_content from "./data/sidebar_content";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Tooltip } from "react-tooltip";
import ReactDOM from "react-dom";
import logo from "@/shared/assets/images/URBANNEST.png";

const TooltipContainer = ({ children }) => {
  return ReactDOM.createPortal(children, document.body);
};

const Container = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  background-color: #ea5e66;
  gap: 15px;
  padding: 1rem;
  padding-top: 2rem;
  padding-right: 0;
  height: 100vh;
  overflow-y: scroll;

  /* border-top-right-radius: 30px;
  border-bottom-right-radius: 30px; */

  &::-webkit-scrollbar-track {
    background-color: none;
  }

  &::-webkit-scrollbar {
    width: 0px;
    background-color: none;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgb(205, 205, 207);
  }
`;

const LogoContainer = styled.div`
  height: 50px;
  padding: 0 10px;

  > img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const SingleButton = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5dc;
  gap: 1rem;
  font-size: 17px;
  font-weight: 600;

  &:hover {
    color: white;
  }
  padding: 0.4rem 5px;
  padding-left: 10px;

  > span {
    font-size: 24px;
  }
`;

const SingleButtonSmall = styled(Link)`
  color: #f0bad4;
  text-decoration: none;
  font-size: 20px;
  padding: 0.4rem 5px;
  width: fit-content;

  &:hover {
    color: white;
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Group = styled.div``;

const GroupSmall = styled.div``;

const GroupButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: inherit;
  border: none;
  color: #f5f5dc;
  cursor: pointer;
  width: 100%;
  padding: 0.6rem 5px;
  padding-left: 10px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  font-size: 17px;
  font-weight: 600;

  > div {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  &:hover {
    color: white;
  }
  transition: all 0.1s ease;

  ${(props) => {
    if (props.$active == true) {
      return css`
        background-color: white;
        color: #dd367c;
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;

        &:hover {
          color: #dd367c;
        }
      `;
    }
  }}

  & span {
    font-size: 24px;
  }

  > svg {
    font-size: 20px;
  }
`;

const GroupButtonSmall = styled.button`
  color: #f0bad4;
  text-decoration: none;
  font-size: 20px;
  padding: 0.4rem 5px;
  width: fit-content;
  background-color: inherit;
  border: none;
  cursor: pointer;

  &:hover {
    color: white;
    background-color: rgba(255, 255, 255, 0.1);
  }

  &:hover + div {
    display: block;
  }
`;

const GroupChildrens = styled.div`
  padding-left: 1rem;
  height: 0;
  overflow: hidden;
  transition: all 0.1s ease-in-out;

  ${(props) => {
    if (props.$active == true) {
      return css`
        height: 100%;
      `;
    }
  }}
`;

const ChildrenButton = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f4f3dc;
  gap: 1rem;
  font-size: 17px;
  font-weight: 600;

  &:hover {
    color: white;
  }

  padding: 0.6rem 20px;
`;

export default function SideBar({ isSideBarSmall }) {
  const initialState = {};

  for (let item of sidebar_content) {
    if (item.type == "group") {
      initialState[name] = false;
    }
  }

  const [buttonGroupState, setButtonGroupState] = useState(initialState);

  return (
    <Container>
      {!isSideBarSmall && (
        <>
          <LogoContainer>
            <img src={logo} />
          </LogoContainer>
          <hr />
        </>
      )}

      {sidebar_content.map((item, index) => {
        if (item.type == "button" && !isSideBarSmall) {
          return (
            <SingleButton key={index} to={item.link}>
              <span>{item.icon}</span> {item.name}
            </SingleButton>
          );
        }
        if (item.type == "button" && isSideBarSmall) {
          return (
            <SingleButtonSmall key={index} to={item.link}>
              {item.icon}
            </SingleButtonSmall>
          );
        }
        if (item.type == "group" && !isSideBarSmall) {
          return (
            <Group key={index}>
              <GroupButton
                $active={buttonGroupState[item.name]}
                onClick={() =>
                  setButtonGroupState((prev) => {
                    return { ...prev, [item.name]: !prev[item.name] };
                  })
                }
              >
                <div>
                  <span>{item.icon}</span> {item.name}
                </div>
                {!buttonGroupState[item.name] ? <IoIosArrowForward /> : <IoIosArrowDown />}
              </GroupButton>
              <GroupChildrens $active={buttonGroupState[item.name]}>
                {item.children.map((child, index) => {
                  return (
                    <ChildrenButton key={index} to={child.link}>
                      {child.icon} {child.name}
                    </ChildrenButton>
                  );
                })}
              </GroupChildrens>
            </Group>
          );
        }
        if (item.type == "group" && isSideBarSmall) {
          return (
            <GroupSmall key={index}>
              <GroupButtonSmall data-tooltip-id={item.name}>{item.icon}</GroupButtonSmall>
              <TooltipContainer>
                <Tooltip style={{ backgroundColor: "#2c3e50" }} id={item.name} clickable>
                  {item.children.map((child, index) => {
                    return (
                      <ChildrenButton key={index} to={child.link}>
                        <span>{child.icon}</span> {child.name}
                      </ChildrenButton>
                    );
                  })}
                </Tooltip>
              </TooltipContainer>
            </GroupSmall>
          );
        }
      })}
    </Container>
  );
}
