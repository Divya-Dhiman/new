import React, { useEffect, useState } from 'react';
import './Services.css';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import Modal from 'react-modal';
import Pagination from 'react-js-pagination';
import { fetchData, deleteUser } from './action/userAction';
import { connect } from 'react-redux';


function Services({ data, loading, error, fetchData,total ,deleteUser}) {
  // const [formData, setFormData] = useState([]);
  const [userToDelete, setUserToDelete] = useState(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  // const ,[totalPages setTotalPages] = useState('5');
  // const [data, setData] = useState([]); 
  const [sortColumn, setSortColumn] = useState('firstName'); 
  const [sortOrder, setSortOrder] = useState('asc');

  
  const handlePageChange = (pageNumber) => {
    fetchData(searchTerm,itemsPerPage,currentPage,sortColumn,sortOrder);
    setCurrentPage(pageNumber);
    
  };

  useEffect(() => {
    fetchData(searchTerm,itemsPerPage,currentPage,sortColumn,sortOrder);
           
  }, [fetchData,searchTerm,currentPage,itemsPerPage,sortColumn,sortOrder]);

  const handleEditClick = (id) => {
    navigate(`/editContact?id=${id}`);
  };

  // const fetchData = () => {
  //   axios
  //     .get(`http://localhost:3001/users/getUsers`, {
  //       params: {
  //         search: searchTerm,
  //         page: currentPage,
  //         limit: itemsPerPage,
  //         sortColumn,
  //         sortOrder,
  //       },
  //     })
  //     .then((response) => {
  //       if (response?.data?.data?.length) {
  //         setFormData(response?.data?.data);
  //         setTotalPages(Math.ceil(response.data.total / itemsPerPage));
  //         setData(response.data.data);
  //       } else {
  //         setFormData([]);
  //         setTotalPages(1);
  //         setData([]);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // };

  const handleDeleteClick = (id) => {
    setUserToDelete(id);
    setIsModalOpen(true);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchData(searchTerm,itemsPerPage,currentPage,sortColumn,sortOrder);
  };

  // const confirmDelete = () => {
  //   if (userToDelete) {
  //     axios
  //       .delete(`http://localhost:3001/users/deleteUser/${userToDelete}`)
  //       .then(() => {
  //         console.log('User deleted successfully');
  //         setIsModalOpen(false);
  //         setUserToDelete(null);
  //         fetchData();
  //       })
  //       .catch((error) => {
  //         console.error('Error deleting user:', error);
  //       });
  //   }
  // };
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
    <div className="container">
      <h1>Contact List</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <label>
        Sort By:
        <select value={sortColumn} onChange={(e) => handleSort(e.target.value)}>
          <option value="firstName">First Name</option>
          <option value="lastName">Last Name</option>
          <option value="mobile">Mobile</option>
          <option value="age">Age</option>
          <option value="email">Email</option>
        </select>
      </label>
      <label>
        Order:
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>
      <table>
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
          {data && data.length > 0 && sortedData.map((e) => (
            <tr key={e._id}>
              <td>{e.firstName}</td>
              <td>{e.lastName}</td>
              <td>{e.mobile}</td>
              <td>{e.age}</td>
              <td>{e.email}</td>
              <td>
                <button onClick={() => handleEditClick(e._id)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDeleteClick(e._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
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

      <Modal isOpen={isModalOpen} onRequestClose={cancelDelete} contentLabel="Delete Confirmation">
        <p>Are you sure you want to delete this user?</p>
        <button onClick={confirmDelete}>Yes</button>
        <button onClick={cancelDelete}>No</button>
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
