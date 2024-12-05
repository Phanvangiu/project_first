import { useEffect } from "react";

import Overlay from "./Overlay";
import styled from "styled-components";

const StyledOverlay = styled(Overlay)`
  z-index: 9999;
`;

const StyledContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  border-radius: 10px;
  background-color: white;

  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10000;
`;
//children nội dung được truyền vào popup
// setShowPopUp thay đổi trạng thái bật tắt popup
//className tên class để css
export default function PopUpContainer({ children, setShowPopUp, className }) {
  useEffect(() => {
    //ngăn scroll khi mở popup
    document.body.classList.add("no-scroll");
    return () => {
      //tắt popup thì mở ra
      document.body.classList.remove("no-scroll");
    };
  });

  return (
    <>
      <StyledOverlay className="overlay" onClick={() => setShowPopUp(false)} />
      <StyledContainer className={className}>{children}</StyledContainer>
    </>
  );
}
