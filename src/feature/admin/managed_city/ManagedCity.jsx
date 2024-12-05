import styled from "styled-components";
import { useState } from "react";
import { GetManagedCityRequest } from "./api/managedCityAp";
import Pagination from "@/shared/components/Pagination/Pagination";
import InputCheckBox from "@/shared/components/Input/InputCheckBox";
import TextInput from "@/shared/components/Input/TextInput";
import SelectInput from "@/shared/components/Input/SelectInput";
import { UpdateCityStatusRequest } from "./api/managedCityAp";

const Container = styled.div`
  background-color: white;
  margin: 2rem;
  padding: 2rem;
`;

const Footer = styled.div`
  margin-top: 5rem;
`;

const TableContent = styled.table`
  border-collapse: collapse;
  width: 100%;
  min-width: 700px;
  overflow-x: scroll;
  font-size: 0.9em;
  overflow: hidden;

  thead tr {
    /* background-color: #0091ea; */
    /* color: #ffffff; */
    border-bottom: 3px solid black;
    text-align: left;
    font-weight: bold;
  }

  th,
  td {
    padding: 18px 15px;
  }

  tbody tr {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
  }

  tbody tr.active-row {
    font-weight: bold;
    color: #009879;
  }
`;

const Filter = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
`;

const CustomSelectInput = styled(SelectInput)`
  width: 12rem;
`;

const optionsPage = [
  { label: "20 items", value: 20 },
  { label: "50 items", value: 50 },
  { label: "100 items", value: 100 },
];

const optionStatus = [
  { label: "All", value: "all" },
  { label: "Active", value: true },
  { label: "Not Active", value: false },
];

export default function ManagedCity() {
  const updateCityStatus = UpdateCityStatusRequest();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPage, setTotalPage] = useState(optionsPage[0]);
  const [status, setStatus] = useState(optionStatus[0]);
  const managedCity = GetManagedCityRequest(currentPage - 1, totalPage.value, search, status.value);

  const onChangeCityStatus = (id, status) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("status", status);

    updateCityStatus.mutate(formData, {
      onSuccess: (response) => {
        if (response.status == 200) {
          managedCity.refetch();
        }
      },
    });
  };

  return (
    <Container>
      <Filter>
        <TextInput placeholder={"Search for location"} state={search} setState={setSearch} />
        <CustomSelectInput state={status} setState={setStatus} options={optionStatus} />
        <CustomSelectInput state={totalPage} setState={setTotalPage} options={optionsPage} />
      </Filter>
      <TableContent>
        <thead>
          <tr>
            <th>CITY</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {managedCity.isSuccess &&
            managedCity.data.data.map((city, index) => {
              return (
                <tr key={index}>
                  <td>{city.cityName}</td>
                  <td>
                    <InputCheckBox
                      onChange={() => onChangeCityStatus(city.id, !city.managed)}
                      checked={city.managed}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </TableContent>
      <Footer>
        {managedCity.isSuccess && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={managedCity.data.totalPages}
          />
        )}
      </Footer>
    </Container>
  );
}
