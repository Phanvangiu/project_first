import { useState } from "react";
import styled from "styled-components";
import { GetAmenityListRequest } from "./api/amenityListApi";
import Pagination from "@/shared/components/Pagination/Pagination";
import TextInput from "@/shared/components/Input/TextInput";
import InputCheckBox from "@/shared/components/Input/InputCheckBox";
import SelectInput from "@/shared/components/Input/SelectInput";
import { Link } from "react-router-dom";

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

const ImgContainer = styled.div`
  width: 2rem;
`;

const AmenityColumn = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const optionsPage = [
  { label: "10 items", value: 10 },
  { label: "20 items", value: 20 },
  { label: "50 items", value: 50 },
];

const optionStatus = [
  { label: "All", value: "all" },
  { label: "Active", value: true },
  { label: "Not Active", value: false },
];

export default function Amenity() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(optionsPage[0]);
  const [status, setStatus] = useState(optionStatus[0]);

  const [search, setSearch] = useState("");
  const getAmenityList = GetAmenityListRequest(
    currentPage - 1,
    totalPage.value,
    search,
    status.value
  );

  return (
    <Container>
      <Filter>
        <TextInput placeholder={"Search for type and name"} state={search} setState={setSearch} />
        <CustomSelectInput state={status} setState={setStatus} options={optionStatus} />
        <CustomSelectInput state={totalPage} setState={setTotalPage} options={optionsPage} />
      </Filter>
      <TableContent>
        <thead>
          <tr>
            <th>AMENITY</th>
            <th>Type</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {getAmenityList.isSuccess &&
            getAmenityList.data.data.map((amenity, index) => {
              return (
                <tr key={index}>
                  <td>
                    <AmenityColumn>
                      <ImgContainer>
                        <img src={amenity.image} />
                      </ImgContainer>{" "}
                      {amenity.name}
                    </AmenityColumn>
                  </td>
                  <td>{amenity.type}</td>
                  <td>
                    <InputCheckBox
                      // onChange={() => onChangeCityStatus(amenity.id, !amenity.status)}
                      checked={amenity.status}
                    />
                  </td>
                  <td>
                    <Link to={"/admin/edit_amenity?id=" + amenity.id}>Edit</Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </TableContent>
      <Footer>
        {getAmenityList.isSuccess && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={getAmenityList.data.totalPages}
          />
        )}
      </Footer>
    </Container>
  );
}