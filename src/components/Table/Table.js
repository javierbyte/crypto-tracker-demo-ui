import React from "react";

import "./Table.css";

function Table(props) {
  const { data, headers, className, ...other } = props;

  return (
    <table className={["kamina-table", className].join(" ")} {...other}>
      <thead>
        <tr>
          {headers.map((header, headerIdx) => (
            <th key={headerIdx} style={header.style}>
              {header.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIdx) => {
          return (
            <tr key={rowIdx}>
              {headers.map((header, headerIdx) => {
                const rowStyle =
                  header.styleRow instanceof Function
                    ? header.styleRow(row, rowIdx)
                    : header.styleRow;
                return (
                  <td
                    key={headerIdx}
                    style={{
                      ...header.style,
                      ...rowStyle
                    }}
                  >
                    {header.data(row, rowIdx)}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

// <pre>{JSON.stringify(props.data, 0, 2)}</pre>

export default Table;
