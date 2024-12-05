import "../css/calendar.css"; // Import the CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Calendar from "react-calendar";
import styled from "styled-components";
import moment from "moment";

const StyledContainerCalendar = styled.div`
  max-width: 100%;
`;
export default function CalendarBook({
  data,
  setSelectedDates,
  selectedDates,
}) {
  // Lấy số tháng có thể đặt trước từ data.maximumMonthPreBook
  const maxSelectableDate = moment()
    .add(data.maximumMonthPreBook, "months") // Thêm số tháng vào ngày hiện tại
    .date(moment().date()); // Kết thúc ngày này

  // const exceptionDates = data.exceptionDates;
  const bookDateDetails = data.bookDateDetails;
  const notAvailableDates = data.notAvailableDates;

  const unavailableDates = [
    ...bookDateDetails.map(
      (date) => new Date(moment(date.night).format("YYYY-MM-DD"))
    ),
    ...notAvailableDates.map(
      (date) => new Date(moment(date.date).format("YYYY-MM-DD"))
    ),
  ];

  // Kiểm tra nếu một ô (tile) bị vô hiệu hóa
  const isTileDisabled = ({ date, view }) => {
    if (view === "month") {
      return unavailableDates.some(
        (disabledDate) =>
          date.getFullYear() === disabledDate.getFullYear() &&
          date.getMonth() === disabledDate.getMonth() &&
          date.getDate() === disabledDate.getDate()
      );
    }
    return false;
  };

  const listDate = (dates) => {
    const [start, end] = dates;
    const allDatesInRange = [];
    let current = moment(start);

    while (current.isSameOrBefore(end, "day")) {
      allDatesInRange.push(current.toDate());
      current.add(1, "day");
    }
    return allDatesInRange;
  };

  const handleDateChange = (dates) => {
    const [startDate, endDate] = dates;

    // Nếu không chọn đầy đủ khoảng ngày, bỏ qua
    if (!startDate || !endDate) {
      return;
    }

    // Tính số ngày trong khoảng được chọn
    const selectedDuration = moment(endDate).diff(moment(startDate), "days");
    console.log(selectedDuration);
    // Nếu chọn cùng 1 ngày, không hợp lệ
    if (startDate.getDate() === endDate.getDate()) {
      setSelectedDates([]);
      return;
    }

    // Lấy danh sách các ngày trong khoảng đã chọn
    const list = listDate(dates);
    if (list != null) {
      const listDateChosen = list.map(
        (date) => new Date(moment(date).format("YYYY-MM-DD"))
      );

      // Kiểm tra nếu bất kỳ ngày nào bị trùng với ngày không khả dụng
      const isConflict = listDateChosen.some((chosenDate) =>
        unavailableDates.some((unavailableDate) =>
          moment(chosenDate).isSame(unavailableDate, "day")
        )
      );

      // Nếu có xung đột, reset ngày đã chọn
      if (isConflict) {
        setSelectedDates([]);
        return;
      }
    }

    // Nếu cả minimumStay và maximumStay đều null => cho phép đặt thoải mái
    if (data.minimumStay == null && data.maximumStay == null) {
      setSelectedDates(dates);
      return;
    }

    // Nếu chỉ có minimumStay, kiểm tra điều kiện min
    if (data.minimumStay != null && data.maximumStay == null) {
      if (selectedDuration < data.minimumStay) {
        setSelectedDates([]);
        return;
      }
    }

    // Nếu chỉ có maximumStay, kiểm tra điều kiện max
    if (data.maximumStay != null && data.minimumStay == null) {
      if (selectedDuration > data.maximumStay) {
        setSelectedDates([]);
        return;
      }
    }

    // Nếu cả minimumStay và maximumStay đều tồn tại, kiểm tra cả hai
    if (
      data.minimumStay != null &&
      data.maximumStay != null &&
      (selectedDuration < data.minimumStay ||
        selectedDuration > data.maximumStay)
    ) {
      setSelectedDates([dates[0], null]);
      return;
    }

    // Nếu hợp lệ, cập nhật ngày đã chọn
    setSelectedDates(dates);
  };

  return (
    <StyledContainerCalendar>
      <div>
        <Calendar
          tileDisabled={isTileDisabled}
          view="month"
          allowPartialRange={true}
          selectRange={true}
          next2Label={null}
          prev2Label={null}
          nextLabel={<FontAwesomeIcon icon={faAngleRight} />}
          prevLabel={<FontAwesomeIcon icon={faAngleLeft} />}
          minDate={new Date()} // Vô hiệu hóa các ngày trước hôm nay
          maxDate={maxSelectableDate.toDate()}
          onChange={handleDateChange}
          value={selectedDates}
          showDoubleView={true}
        />
      </div>

      <br />
    </StyledContainerCalendar>
  );
}
