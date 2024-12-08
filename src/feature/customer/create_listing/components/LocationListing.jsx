import { ManagedCityRequest } from "@/shared/api/managedCityClientApi";
import styled from "styled-components";
import SelectInput from "@/shared/components/Input/SelectInput";
import dchc from "@/shared/data/dchc";
import { useEffect } from "react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import WhiteButton from "@/shared/components/Button/WhiteButton";
import { SearchAddressCoordinates } from "../api/createListingApi";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import WaitingPopUp from "@/shared/components/PopUp/WaitingPopUp";

const Container = styled.div``;

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

const AddressDetail = styled.textarea`
  padding: 8px;
  border-radius: 3px;
  width: 100%;

  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  outline: none;
  transition: all 0.3s;

  &:focus {
    border: 2px solid black;
  }

  &:active {
    border: 2px solid black;
  }

  resize: none;
`;

const CoordinateContainer = styled.div`
  height: 400px;
  overflow: hidden;

  & .leaflet-container {
    height: 100%;
  }
`;

const iconCurrentLocation = new L.Icon({
  iconUrl: `data:image/jpeg;base64,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`,
  iconSize: [15, 15],
  iconAnchor: [0, 0],
  popupAnchor: [1, -34],
});

export default function LocationListing() {
  const [isRead, setIsRead] = useState(true);
  const managedCity = ManagedCityRequest();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [state, dispatch, ACTIONS] = useOutletContext();

  const [chosenProvince, setChosenProvince] = useState(null);
  const [chosenDistrict, setChosenDistrict] = useState(null);
  const [chosenWard, setChosenWard] = useState(null);

  useEffect(() => {
    if (managedCity.isSuccess) {
      var provincesData = dchc.data.filter((province) =>
        managedCity.data.data.find((city) => city.cityName == province.name)
      );
      setProvinces((_) =>
        provincesData.map((item) => {
          return {
            label: item.name,
            value: item.level1_id,
          };
        })
      );
    }
  }, [managedCity.isSuccess]);

  useEffect(() => {
    if (state.addressCode && isRead == true) {
      var addrressArr = state.addressCode.split("_");
      const tempProvince = dchc.data.find(
        (city) => city.level1_id == addrressArr[0]
      );
      setChosenProvince({
        value: tempProvince.level1_id,
        label: tempProvince.name,
      });

      const tempDistrict = tempProvince.level2s.find(
        (district) => district.level2_id == addrressArr[1]
      );

      setChosenDistrict({
        value: tempDistrict.level2_id,
        label: tempDistrict.name,
      });

      const tempWard = tempDistrict.level3s.find(
        (ward) => ward.level3_id == addrressArr[2]
      );

      setChosenWard({ value: tempWard.level3_id, label: tempWard.name });
      return;
    }

    if (chosenDistrict && chosenWard && chosenProvince && isRead) {
      setIsRead(false);
      return;
    }

    if (!state.addressCode) {
      setIsRead(false);
    }
  }, [chosenProvince]);

  useEffect(() => {
    if (!isRead) {
      setChosenDistrict(null);
      setChosenWard(null);
      setWards([]);
    }

    if (chosenProvince != null) {
      const districtsData = dchc.data.find(
        (city) => city.level1_id == chosenProvince.value
      );

      setDistricts(() =>
        districtsData.level2s.map((district) => {
          return { value: district.level2_id, label: district.name };
        })
      );
    }
  }, [chosenProvince]);

  useEffect(() => {
    if (!isRead) {
      setChosenWard(null);
      setWards([]);
    }

    if (chosenDistrict != null) {
      const districtsData = dchc.data.find(
        (city) => city.level1_id == chosenProvince.value
      );
      const wardsData = districtsData.level2s.find(
        (district) => district.level2_id == chosenDistrict.value
      );

      setWards(() =>
        wardsData.level3s.map((ward) => {
          return { value: ward.level3_id, label: ward.name };
        })
      );
    }
  }, [chosenDistrict]);

  useEffect(() => {
    if (chosenDistrict && chosenProvince && chosenWard) {
      dispatch({
        type: ACTIONS.CHANGE_ADDRESS_CODE,
        next: `${chosenProvince.value}_${chosenDistrict.value}_${chosenWard.value}`,
      });
      return;
    }

    if (state.addressCode) {
      dispatch({
        type: ACTIONS.CHANGE_ADDRESS_CODE,
        next: null,
      });
      return;
    }
  }, [chosenDistrict, chosenProvince, chosenWard]);

  const getCoordinate = () => {
    const address = `${state.addressDetail}, ${chosenWard.label}, ${chosenDistrict.label}, ${chosenProvince.label}, Việt Nam`;
    var response = SearchAddressCoordinates(address);
    response.then((data) => {
      if (data.length > 0) {
        const { geometry } = data[0];
        const lat = geometry.lat;
        const lng = geometry.lng;

        dispatch({ type: ACTIONS.CHANGE_COORDINATES_X, next: lat });
        dispatch({ type: ACTIONS.CHANGE_COORDINATES_Y, next: lng });
      } else {
        alert("Không tìm thấy địa chỉ.");
      }
    });
  };

  if (managedCity.isLoading) {
    return <WaitingPopUp />;
  }

  return (
    <>
      <Container>
        <Header>
          <h2>Where's your place located</h2>
          <p>
            Guest will only have your exact address once they've booked a
            reservation
          </p>
        </Header>
        <Body>
          <Left>
            <div>
              <label>City / Province</label>
              <SelectInput
                state={chosenProvince}
                setState={setChosenProvince}
                options={provinces}
              />
            </div>
            <div>
              <label>District</label>
              <SelectInput
                options={districts}
                state={chosenDistrict}
                setState={setChosenDistrict}
              />
            </div>
            <div>
              <label>Ward</label>
              <SelectInput
                options={wards}
                state={chosenWard}
                setState={setChosenWard}
              />
            </div>
            <div>
              <label>Address Detail</label>
              <AddressDetail
                value={state.addressDetail}
                onChange={(ev) =>
                  dispatch({
                    type: ACTIONS.CHANGE_ADDRESS_DETAIL,
                    next: ev.target.value,
                  })
                }
              />
            </div>
            {state.addressDetail && state.addressCode && (
              <>
                <div>
                  <WhiteButton onClick={getCoordinate}>
                    Get Coordinates
                  </WhiteButton>
                </div>
                {state.coordinatesX && state.coordinatesY && (
                  <CoordinateContainer>
                    <MapContainer
                      center={[state.coordinatesX, state.coordinatesY]}
                      zoom={13}
                      scrollWheelZoom={false}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker
                        position={[state.coordinatesX, state.coordinatesY]}
                        icon={iconCurrentLocation}
                      >
                        <Popup>
                          A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                      </Marker>
                    </MapContainer>
                  </CoordinateContainer>
                )}
              </>
            )}
          </Left>
          <Right>
            <div>
              <h4>Restriction</h4>
              <p>
                The website enforces a strict policy, allowing users to select
                only from the cities under its management
              </p>
            </div>
          </Right>
        </Body>
      </Container>
    </>
  );
}
