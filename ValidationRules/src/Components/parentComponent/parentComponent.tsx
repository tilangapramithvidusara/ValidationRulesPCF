import React, { useState } from 'react';

interface NestedTable {
  data: string[][];
}

const ParentComponent: React.FC = () => {
  const [tables, setTables] = useState<NestedTable[]>([]);

  const addNestedTable = (rowIndex: number) => {
    const newTable: NestedTable = {
      data: [['Nested 1', 'Nested 2']],
    };

    setTables((prevTables) => {
      const updatedTables = [...prevTables];
      updatedTables[rowIndex] = newTable;
      return updatedTables;
    });
  };

  const renderNestedTable = (nestedTable: NestedTable) => {
    return (
      <table>
        <tbody>
          {nestedTable.data.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <table>
      <tbody>
        {tables.map((table, rowIndex) => (
          <tr key={rowIndex}>
            <td>Row {rowIndex + 1}</td>
            <td>
              <button onClick={() => addNestedTable(rowIndex)}>Add Nested Table</button>
            </td>
            <td>{renderNestedTable(table)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ParentComponent;