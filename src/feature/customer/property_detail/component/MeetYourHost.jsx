import Avatar from "react-avatar";
import styled from "styled-components";
import { MdOutlineStar } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";
import { capitalizeFirstLetter } from "@/shared/utils/capitalizeFirstLetter";
import { useEffect, useState } from "react";
import { PiShieldWarningBold } from "react-icons/pi";

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 5fr;
  column-gap: 4rem;
`;
const StyledHeader = styled.div`
  font-size: 22px;
  font-weight: 600;
  padding-top: 2rem;
  margin-bottom: 2rem;
`;
const StyledFrame = styled.div`
  width: 100%;
  height: fit-content;
  padding: 2rem 0;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  border-radius: 8px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  margin-left: 1rem;
`;
const StyledAvatar = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1.5;

  & > div {
    font-size: 28px;
    font-weight: bold;
  }
`;
const StyledInfo = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-right: 2rem;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  & > div:nth-child(2) {
    font-size: 12px;
    font-weight: 600;
  }
  & > div:first-child {
    display: flex;
    align-items: center;
  }
`;
const StyledBadge = styled.div`
  display: flex;
  justify-content: stretch;
  align-items: center;
  column-gap: 0.5rem;
  & > div {
    font-size: 15px;
  }
`;
const StyledConainerHostDetail = styled.div`
  margin-top: -1rem;
`;
const StyledHostDetail = styled.div`
  & > div:first-child {
    font-size: 18px;
    font-weight: 600;
    margin: 0.5rem 0;
  }
`;
const StyledWarning = styled.div`
  margin-top: 1rem;
  font-size: 13px;
  display: flex;
  justify-content: stretch;
  column-gap: 0.5rem;
  align-items: center;
`;
const StyledHostMessage = styled.button`
  width: fit-content;
  margin-top: 10px;
  padding: 7px 20px;
  background: black;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
      rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.9);
  }
`;
export default function MeetYourHost({ data }) {
  const [badgeHost, setBadgeHost] = useState([]);
  useEffect(() => {
    let badges = [];
    // alert(data.user.id);
    data.user.userBadges.map((badge) => {
      if (badge.show) {
        badges.push(badge.userBadgeId.badgeId);
      }
    });
    setBadgeHost(badges);
  }, [data.user.userBadges]);
  const getNameBadge = () => {
    for (let index = 0; index < badgeHost.length; index++) {
      if (badgeHost[index] == 2) {
        return "Superhost";
      } else {
        if (badgeHost[index] == 5) {
          return "Top Rated Host";
        }
      }
    }
    return "Verified User";
  };
  return (
    <div>
      <StyledHeader>Meet Your Host</StyledHeader>
      <StyledContainer>
        <StyledFrame>
          <div>
            <StyledAvatar>
              <Avatar
                src={data.user.avatar}
                size="120px"
                textSizeRatio={2}
                round={true}
                name={data.user.firstName}
              />
              <div>
                {capitalizeFirstLetter(data.user.firstName)}{" "}
                {data.user.lastName}
              </div>
              <StyledBadge>
                <FaUserCheck style={{ fontSize: "16px" }} />
                <div> {getNameBadge()}</div>
              </StyledBadge>
            </StyledAvatar>
          </div>
          <div>
            <StyledInfo>
              <div>234</div>
              <div>Reviews</div>
            </StyledInfo>
            <StyledInfo>
              <div>
                <div>234</div>
                <div>
                  <MdOutlineStar style={{ fontSize: "14px" }} />
                </div>
              </div>
              <div>Rating</div>
            </StyledInfo>
            <StyledInfo>
              <div>1</div>
              <div>Year hosting</div>
            </StyledInfo>
          </div>
        </StyledFrame>

        <StyledConainerHostDetail>
          <StyledHostDetail>
            <div>
              {capitalizeFirstLetter(data.user.firstName)} {data.user.lastName}{" "}
              is {getNameBadge()}
            </div>
            <div>
              Superhosts are experienced, highly rated hosts who are committed
              to providing great stays for guests.
            </div>
          </StyledHostDetail>
          <StyledHostDetail>
            <div>Host details</div>
            <div>Response rate: 100%</div>
            <div>Responds within an hour</div>
          </StyledHostDetail>

          <StyledHostMessage>Host message</StyledHostMessage>
          <StyledWarning>
            <PiShieldWarningBold style={{ fontSize: "20px", color: "red" }} />
            To protect your payment, never transfer money or communicate outside
            of the Airbnb website or app.
          </StyledWarning>
        </StyledConainerHostDetail>
      </StyledContainer>
    </div>
  );
}
