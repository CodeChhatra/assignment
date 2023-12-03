import React, { useState, useEffect } from 'react';
import './App.css';
import Tablerow from './components/Tablerow';
import Pagination from './components/Pagination';

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const itemsPerPage = 10;

  useEffect(() => {
    fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) =>
      Object.values(user).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchTerm, users]);



  const handleRowSelect = (id) => {
    const selectedIndex = selectedRows.indexOf(id);
    let newSelectedRows = [...selectedRows];

    if (selectedIndex === -1) {
      newSelectedRows.push(id);
    } else {
      newSelectedRows.splice(selectedIndex, 1);
    }
    setSelectedRows(newSelectedRows);
  };

  const handleSearch = () => {
    // Logic to perform search with searchTerm
    const filtered = users.filter((user) =>
      Object.values(user).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleDeleteSelected = () => {
    const updatedUsers = users.filter((user) => !selectedRows.includes(user.id));
    setUsers(updatedUsers);
    setSelectedRows([]);
    setFilteredUsers(updatedUsers);
  };

  const handleEditUser = (userId, field, value) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return {
          ...user,
          [field]: value,
        };
      }
      return user;
    });
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  };

  const pageNumbers = [];
  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleDeleteSelectedItems = () => {
    const updatedUsers = users.filter((user) => !selectedRows.includes(user.id));
    setUsers(updatedUsers);
    setSelectedRows([]);
    setFilteredUsers(updatedUsers);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const handleSelectAll = () => {
    const allIdsOnCurrentPage = currentItems.map((user) => user.id);
    const updatedSelectedRows = selectedRows.length === allIdsOnCurrentPage.length ? [] : [...allIdsOnCurrentPage];
    setSelectedRows(updatedSelectedRows);
  };


  return (
    <div className="App p-6">
     
      <div className="flex items-center mb-4">
        <div className="relative w-full max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M21 21l-6-6m4-5a8 8 0 11-16 0 8 8 0 0116 0z" />
            </svg>
          </span>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
        <button
  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 mr-2"
  onClick={handleDeleteSelectedItems}
>
  Delete Selected
</button>
        </div>
      </div>


      <table className="min-w-full rounded-lg overflow-hidden shadow-lg">
        {/* Table content */}
        <thead className="bg-gray-800 text-white">
          <tr>
            {/* Table header */}
            <th className="px-4 py-3">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={currentItems.length > 0 && selectedRows.length === currentItems.length}
              />
            </th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Role</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {currentItems.map((user) => (
            <Tablerow
              key={user.id}
              user={user}
              selectedRows={selectedRows}
              handleRowSelect={handleRowSelect}
              handleEditUser={handleEditUser}
              handleDeleteSelected={handleDeleteSelected}
            />
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <Pagination
        setCurrentPage={setCurrentPage}
        numbers={pageNumbers}
        currentPage={currentPage}
        npages={totalPages}
      />
    </div>
  );
}

export default App;
