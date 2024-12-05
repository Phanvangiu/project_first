import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useOutletContext } from "react-router-dom";
import SelectInput from "@/shared/components/Input/SelectInput";
import SelectInputDescription from "@/shared/components/Input/SelectInputDescription";
import { PolicyRequest } from "@/shared/api/policyClientApi";
import WaitingPopUp from "@/shared/components/PopUp/WaitingPopUp";
import { UserBadgeRequest } from "@/shared/api/badgeClientApi";
import TextInput from "@/shared/components/Input/TextInput";

const Container = styled.div`
  & hr {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  margin-bottom: 10rem;
`;

const Header = styled.div`
  margin-bottom: 1.5rem;

  p {
    color: rgba(0, 0, 0, 0.5);
  }
`;

const Body = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  > div {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  & p {
    color: rgba(0, 0, 0, 0.5);
    text-align: justify;
  }
`;

const Right = styled.div`
  position: sticky;
  top: 0;

  height: fit-content;

  > div {
    padding: 2rem;

    & p {
      color: rgba(0, 0, 0, 0.5);
    }
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

const bookOptions = [
  {
    label: "Instant book",
    value: "instant",
    description:
      "Guests can book properties instantly without waiting for host approval. Perfect for last-minute stays, ensuring quick confirmation and hassle-free reservations",
  },
  {
    label: "Reserved book",
    value: "reserved",
    description:
      "Guests request a booking and wait for host approval before confirming. Ideal for those who prefer more flexibility and time to finalize details.",
  },
];

const BookingType = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem !important;
`;

const InstantBook = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem !important;
`;

export default function PolicyListing() {
  const policy = PolicyRequest();
  const userBadge = UserBadgeRequest();
  const [state, dispatch, ACTIONS] = useOutletContext();

  if (policy.isLoading) {
    return <WaitingPopUp />;
  }

  return (
    <Container>
      <Header>
        <h2>Policies and rules</h2>
      </Header>
      <Body>
        <Left>
          <div>
            <div>
              <p>Choose a refund policy</p>
            </div>
            <SelectInputDescription
              state={policy.data.data
                .map((item) => {
                  return {
                    label: item.policyName,
                    description: item.policyDescription,
                    value: item.id,
                  };
                })
                .find((type) => type.value == state.refundPolicyId)}
              setState={(type) => {
                dispatch({ type: ACTIONS.CHANGE_REFUND_POLICY_ID, next: type.value });
              }}
              options={policy.data.data.map((item) => {
                return {
                  label: item.policyName,
                  description: item.policyDescription,
                  value: item.id,
                };
              })}
            />
          </div>
          <hr />
          <BookingType>
            <h4>Choose a booking type</h4>
            <p>
              Our platform offers two flexible booking options to cater to every type of traveler:
              Instant Booking and Reserved Booking.
            </p>
            <SelectInputDescription
              state={bookOptions.find((book) => book.value == state.bookingType)}
              setState={(item) => dispatch({ type: ACTIONS.CHANGE_BOOKING_TYPE, next: item.value })}
              options={bookOptions}
            />

            {state.bookingType == "instant" && (
              <InstantBook>
                <h4>Instant booking requirement</h4>
                <SelectInputDescription
                  state={
                    userBadge.isSuccess &&
                    [
                      {
                        label: "All",
                        description: "Accept all kind of guests",
                        value: null,
                      },
                      ...userBadge.data.data.map((item) => {
                        return {
                          label: item.name,
                          description: item.description,
                          value: item.id,
                        };
                      }),
                    ].find((requirement) => requirement.value == state.instantBookRequirementID)
                  }
                  setState={(item) =>
                    dispatch({ type: ACTIONS.CHANGE_INSTANT_BOOK_REQUIREMENT_ID, next: item.value })
                  }
                  options={
                    userBadge.isSuccess && [
                      {
                        label: "All",
                        description: "Accept all kind of guests",
                        value: null,
                      },
                      ...userBadge.data.data.map((item) => {
                        return {
                          label: item.name,
                          description: item.description,
                          value: item.id,
                        };
                      }),
                    ]
                  }
                />
              </InstantBook>
            )}
          </BookingType>
          <hr />
          <div>
            <h4>Checking in and out</h4>
            <p>Check in after {state.checkInAfter}</p>
            <TextInput
              type="time"
              state={state.checkInAfter}
              setState={(value) => dispatch({ type: ACTIONS.CHANGE_CHECK_IN_AFTER, next: value })}
            />
            <p>Check out before {state.checkOutBefore}</p>
            <TextInput
              state={state.checkOutBefore}
              setState={(value) => dispatch({ type: ACTIONS.CHANGE_CHECK_OUT_BEFORE, next: value })}
              type="time"
            />
          </div>
        </Left>
        <Right></Right>
      </Body>
    </Container>
  );
}
