import React, { useEffect, useState } from 'react';
import './Services.css'; // Your custom styles
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import Pagination from 'react-js-pagination';
import { fetchData, deleteUser } from './action/userAction';
import { connect } from 'react-redux';

function Services({ data, loading, error, fetchData, total, deleteUser }) {
  const [userToDelete, setUserToDelete] = useState(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState('firstName');
  const [sortOrder, setSortOrder] = useState('asc');

  const handlePageChange = (pageNumber) => {
    fetchData(searchTerm, itemsPerPage, currentPage, sortColumn, sortOrder);
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchData(searchTerm, itemsPerPage, currentPage, sortColumn, sortOrder);
  }, [fetchData, searchTerm, currentPage, itemsPerPage, sortColumn, sortOrder]);

  const handleEditClick = (id) => {
    navigate(`/editContact?id=${id}`);
  };

  const handleDeleteClick = (id) => {
    setUserToDelete(id);
    setIsModalOpen(true);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchData(searchTerm, itemsPerPage, currentPage, sortColumn, sortOrder);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      deleteUser(userToDelete);
      setIsModalOpen(false);
      setUserToDelete(null);
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setUserToDelete(null);
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const sortedData = data
    ? [...data].sort((a, b) => {
        const columnA = a[sortColumn];
        const columnB = b[sortColumn];
        return sortOrder === 'asc' ? columnA.localeCompare(columnB) : columnB.localeCompare(columnA);
      })
    : [];

  return (
    <div className="container ">
      <h1>Contact List</h1>
      <div className="row mb-3">
        <div className="col-md-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <label className="mr-2">Sort By:</label>
          <select className="form-control" value={sortColumn} onChange={(e) => handleSort(e.target.value)}>
            <option value="firstName">First Name</option>
            <option value="lastName">Last Name</option>
            <option value="mobile">Mobile</option>
            <option value="age">Age</option>
            <option value="email">Email</option>
          </select>
        </div>
        <div className="col-md-3">
          <label className="mr-2">Order:</label>
          <select className="form-control" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Mobile</th>
            <th>Age</th>
            <th>Email</th>
            <th>Action</th>
            <th>Action2</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.length > 0 &&
            sortedData.map((e) => (
              <tr key={e._id}>
                <td>{e.firstName}</td>
                <td>{e.lastName}</td>
                <td>{e.mobile}</td>
                <td>{e.age}</td>
                <td>{e.email}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => handleEditClick(e._id)}>
                    Edit
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDeleteClick(e._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="row">
        <div className="col-md-12">
          <div className="d-flex justify-content-center">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={itemsPerPage}
              totalItemsCount={total * itemsPerPage}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
              itemClass="page-item"
              linkClass="page-link"
            />
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={cancelDelete} contentLabel="Delete Confirmation">
        <p>Are you sure you want to delete this user?</p>
        <button className="btn btn-danger" onClick={confirmDelete}>
          Yes
        </button>
        <button className="btn btn-secondary" onClick={cancelDelete}>
          No
        </button>
      </Modal>
    </div>
  );
}
const mapStateToProps = (state) => ({
  data: state.data.data,
  total: state.data.totalPages,
  loading: state.data.loading,
  error: state.data.error,
});

export default connect(mapStateToProps, { fetchData, deleteUser })(Services);
