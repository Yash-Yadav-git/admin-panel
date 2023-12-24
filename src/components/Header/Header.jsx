import React, { useState } from "react";
import "./Header.css";
import InputField from "../common-components/InputFiled";
import SelectDropdown from "../common-components/SelectDropDown";

const today = new Date();
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1;
let dd = today.getDate();

if (dd < 10) dd = "0" + dd;
if (mm < 10) mm = "0" + mm;

const Header = ({ transactionsData, filters, onFilterChange }) => {
  const [fromDate, setFromDate] = useState(`${yyyy}-${mm - 1 < 10 ? "0" : ""}${mm - 1}-${dd}`);
  const [toDate, setToDate] = useState(`${yyyy}-${mm < 10 ? "0" : ""}${mm}-${dd}`);
  const [errorMessage, setErrorMessage] = useState("");

  const branchOptions = ["Thane", "Navi Mumbai", "Mumbai", "Kurla", "Vile Parle", "Lower Parel", "Andheri", "Byculla"];
  const typeOptions = ["full", "short"];
  const statusOptions = ["pending", "approved", "rejected"];

  const handleFromDateChange = (e) => {
    setErrorMessage("");
    setFromDate(e.target.value);
    onFilterChange("fromDate", e.target.value);
  };

  const handleToDateChange = (e) => {
    if (e.target.value < fromDate) {
      setErrorMessage("Please enter a valid date");
      return;
    }
    setErrorMessage("");
    setToDate(e.target.value);
    onFilterChange("toDate", e.target.value);
  };

  return (
    <div className="header-container">
      <div className="total-search">
        <span>Total ({transactionsData.length})</span>
        <div className="search-container">
          <InputField
            type="text"
            name="search"
            value={filters.search}
            min={fromDate}
            placeholder="Search ID"
            onChange={(e) => onFilterChange("search", e.target.value)}
          />
        </div>
      </div>
      <div className="filters">
        <InputField
          label="From"
          type="date"
          name="from-date"
          value={fromDate}
          onChange={handleFromDateChange}
        />
        <InputField
          label="To"
          type="date"
          name="to-date"
          value={toDate}
          onChange={handleToDateChange}
          errorMessage={errorMessage}
        />
        <SelectDropdown
          label="Branch"
          value={filters.branch}
          options={["All", ...branchOptions]}
          onChange={(e) => onFilterChange("branch", e.target.value)}
        />
        <SelectDropdown
          label="Type"
          value={filters.type}
          options={["All", ...typeOptions]}
          onChange={(e) => onFilterChange("type", e.target.value)}
        />
        <SelectDropdown
          label="Status"
          value={filters.status}
          options={["All", ...statusOptions]}
          onChange={(e) => onFilterChange("status", e.target.value)}
        />
      </div>
    </div>
  );
};

export default Header;
