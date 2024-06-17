import React, { useState, useMemo } from "react";
import Modal from "./modal";

type Column = {
  Header: string;
  accessor: string;
};

type Data = {
  [key: string]: string | number | Date;
};

type TableProps = {
  columns: Column[];
  data: Data[];
};

const Table: React.FC<TableProps> = ({ columns, data }) => {
  const [currentPage, setCurrentPage] = useState(1); // Default page
  const [rowsPerPage] = useState(7); // Default number of rows per page
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState(data);

  const filteredData = useMemo(() => {
    if (!searchQuery) return tableData;
    return tableData.filter((row) =>
      columns.some((column) =>
        String(row[column.accessor])
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    );
  }, [tableData, searchQuery, columns]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleAddEntity = (newData: Data) => {
    setTableData([...tableData, newData]);
  };

  const renderPagination = () => {
    const pageNumbers: any = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pageNumbers.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pageNumbers.map((page, index) =>
      typeof page === "string" ? (
        <span key={index} className="px-2 py-1">
          {page}
        </span>
      ) : (
        <button
          key={index}
          onClick={() => handlePageChange(page)}
          className={`px-2 py-1 ${
            page === currentPage
              ? "bg-primary text-white"
              : "bg-white border-primary border"
          } rounded text-sm`}
        >
          {page}
        </button>
      )
    );
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded outline-none focus:border-primary text-sm w-[30%]"
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-green-500 text-white rounded text-sm"
        >
          Add Entity
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="bg-[#fefdfd] min-w-full p-4">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.accessor}
                  className="py-6 px-8 border-b text-center border-primary-light border-opacity-50 text-gray-700 text-sm whitespace-nowrap"
                >
                  {column.Header}
                </th>
              ))}
              <th className="py-2 px-4 border-b text-center border-primary-light border-opacity-50 text-gray-700 text-sm whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) => (
                  <td
                    key={column.accessor}
                    className="py-2 px-4 border-b border-primary-light border-opacity-50 text-sm text-gray-700 whitespace-nowrap text-center"
                  >
                    {String(
                      column.accessor === "createdAt"
                        ? new Date(
                            row[column.accessor] as string
                          ).toLocaleDateString()
                        : row[column.accessor]
                    )}
                  </td>
                ))}
                <td className="py-2 px-4 border-b border-primary-light border-opacity-50 text-sm whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button className="px-2 py-1 bg-primary-light text-white rounded text-sm">
                      Update
                    </button>
                    <button className="px-2 py-1 bg-orange-300 text-white rounded text-sm">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className=" flex justify-center items-center mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-1 bg-white border border-primary rounded disabled:opacity-50 text-sm"
        >
          Previous
        </button>
        <div className="flex space-x-2 mx-4">{renderPagination()}</div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 bg-white border border-primary rounded disabled:opacity-50 text-sm"
        >
          Next
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddEntity}
      />
    </div>
  );
};

export default Table;
