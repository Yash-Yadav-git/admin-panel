import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Table from "./components/Table";
import { columns, transactionsData } from "./constants";

function App() {
  const [tableData, setTableData] = useState(transactionsData);
  const [filters, setFilters] = useState({
    search: "",
    fromDate: "",
    toDate: "",
    branch: "All",
    type: "All",
    status: "All",
  });
  const [sortOrder, setSortOrder] = useState("asc");

  const handleFilterChange = (filterName, value) => {
    console.log('Value is', value, filterName)
    const filterLocal = { ...filters, [filterName]: value };
    setFilters(filterLocal);
    const filteredData = transactionsData.filter((row) => {
      const isNumericSearch = !isNaN(filterLocal.search);
      const isIdMatch =
        isNumericSearch && row.id.toString().includes(filterLocal.search);

      return (
        (isIdMatch || filterLocal.search === "") &&
        (new Date(row.date) >= new Date(filterLocal.fromDate) ||
          filterLocal.fromDate === "") &&
        (new Date(row.date) <= new Date(filterLocal.toDate) ||
          filterLocal.toDate === "") &&
        (filterLocal.branch === "All" || row.branch === filterLocal.branch) &&
        (filterLocal.type === "All" || row.type === filterLocal.type) &&
        (filterLocal.status === "All" || row.status === filterLocal.status)
      );
    });
    setTableData(filteredData);
  };

  const handleDeleteRow = (id) => {
    const updatedTableData = tableData.filter((row) => row.id !== id);
    setTableData(updatedTableData);
  };

  const handleSort = (column) => {
    const sortedData = [...tableData].sort((a, b) => {
      const aValue = column === "date" ? new Date(a[column]) : a[column];
      const bValue = column === "date" ? new Date(b[column]) : b[column];

      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    });

    setTableData(sortedData);

    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="App">
      <Header
        transactionsData={tableData}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      <Table
        columns={columns}
        data={tableData}
        onSort={handleSort}
        onDeleteRow={handleDeleteRow}
      />
    </div>
  );
}

export default App;
