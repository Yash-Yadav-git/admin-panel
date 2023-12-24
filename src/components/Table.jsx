import React, { useState } from "react";
import "./Table.css";

const Table = ({ columns, data, onSort, onDeleteRow }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((columnName, index) => (
            <th key={index} onClick={() => onSort("date")}>
              {columnName.label}
            </th>
          ))}
          <th>DELETE</th>
        </tr>
      </thead>
      <tbody>
        {data.map((rowData, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((columnName, colIndex) => (
              <td key={colIndex}>{rowData[columnName.value]}</td>
            ))}
            <td>
              <button onClick={() => onDeleteRow(rowData.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
