import React, { useState } from 'react';
import './About.css';

const itemPerPage = 10;

const data = [
  { 
    id: 1, 
    Name: 'Divye', 
    Age: 22, 
    Designation:  'React.js', 
    Company: 'Infoneo', 
    Address: 'Sector-62' 
  },
  {
     id: 2, 
     Name: 'Faiz', 
     Age: 23, 
     Designation:'JAVA', 
     Company: 'Arya.io', 
     Address: 'Sector-63' 
  },
  { id: 3, 
    Name: 'Paras', 
    Age: 25, 
    Designation: 'Devops', 
    Company: 'Rapipay', 
    Address: 'Sector-68'
  },
  { 
    id: 4, 
    Name: 'Faisal', 
    Age: 21, 
    Designation: 'Java FullSatck Developer', 
    Company: 'Vinculum', 
    Address:'Sector-62'
  },
  { 
    id: 5., 
    Name: 'tushar', 
    Age: 22, 
    Designation:  'React.js', 
    Company: 'Infoneo', 
    Address: 'Sector-62' 
  },
  { 
    id: 6 ,
    Name: 'aman', 
    Age: 22, 
    Designation:  'React.js', 
    Company: 'Infoneo', 
    Address: 'Sector-62' 
  },
  { 
    id: 7, 
    Name: 'daiwik', 
    Age: 22, 
    Designation:  'angular', 
    Company: 'Infoneo', 
    Address: 'Sector-62' 
  },
  { 
    id: 8, 
    Name: 'hunny', 
    Age: 22, 
    Designation:  'React.js', 
    Company: 'Infoneo', 
    Address: 'Sector-62' 
  },
  { 
    id: 9, 
    Name: 'Prajjwal', 
    Age: 22, 
    Designation:  'React.js', 
    Company: 'Infoneo', 
    Address: 'Sector-62' 
  },
  { 
    id: 10, 
    Name: 'gourav', 
    Age: 22, 
    Designation:  'angular', 
    Company: 'Infoneo', 
    Address: 'Sector-62' 
  },
  { 
    id: 11, 
    Name: 'jatin', 
    Age: 22, 
    Designation:  'React.js', 
    Company: 'Infoneo', 
    Address: 'Sector-62' 
  },
  { 
    id: 12, 
    Name: 'yogye', 
    Age: 22, 
    Designation:  'React.js', 
    Company: 'Infoneo', 
    Address: 'Sector-62' 
  },{ 
    id: 13, 
    Name: 'gourav', 
    Age: 22, 
    Designation:  'angular', 
    Company: 'Infoneo', 
    Address: 'Sector-62' 
  },

  { 
    id: 14, 
    Name: 'mukaul', 
    Age: 22, 
    Designation:  'React.js', 
    Company: 'Infoneo', 
    Address: 'Sector-62' 
  },{ 
    id: 15, 
    Name: 'chotu', 
    Age: 22, 
    Designation:  'angular', 
    Company: 'Infoneo', 
    Address: 'Sector-62' 
  },
  { 
    id: 16, 
    Name: 'ravi', 
    Age: 22, 
    Designation:  'React.js', 
    Company: 'Infoneo', 
    Address: 'Sector-62' 
  },
  { 
    id: 17, 
    Name: 'shagun', 
    Age: 22, 
    Designation:  'React.js', 
    Company: 'Infoneo', 
    Address: 'Sector-62' 
  },
  { 
    id: 18, 
    Name: 'milan', 
    Age: 22, 
    Designation:  'React.js', 
    Company: 'Infoneo', 
    Address: 'Sector-62' 
  },
  { 
    id: 19, 
    Name: 'madhur', 
    Age: 22, 
    Designation:  'angular', 
    Company: 'Infoneo', 
    Address: 'Sector-62' 
  },
  { 
    id: 20, 
    Name: 'shrey', 
    Age: 22, 
    Designation:  'React.js', 
    Company: 'Infoneo', 
    Address: 'Sector-62' 
  },
  


];

const numberOfPage = Math.ceil(data.length / itemPerPage);
const pageIndex = Array.from({ length: numberOfPage }, (_, idx) => idx + 1);

export default function About() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [sortColumn, setSortColumn] = useState('Name');
  const [sortOrder, setSortOrder] = useState('asc'); 

  const filteredData = data.filter(
    (item) =>
      item.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Age.toString().includes(searchTerm) ||
      item.Designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };
  
  const sortedData = filteredData.slice().sort((a, b) => {
    const columnA = a[sortColumn];
    const columnB = b[sortColumn];
    if (sortOrder === 'asc') {
      return columnA < columnB ? -1 : 1;
    } else {
      return columnA > columnB ? -1 : 1;
    }
  });

  const rows = sortedData.slice(currentPage * itemPerPage, (currentPage + 1) * itemPerPage);

  const handlePerPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className='About'>
        <div>
          <input
            type='text'
            placeholder='Search '
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(0);
            }}
          /><br />
          <label>
            Sort By:
            <select value={sortColumn} onChange={(e) => handleSort(e.target.value)}>
            <option value="id">ID</option>
              <option value="Name">Name</option>
              <option value="Age">Age</option>
              
            </select>
          </label>
          <label>
            Order:
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </label>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Designation</th>
              <th>Company</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {rows?.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.Name}</td>
                <td>{item.Age}</td>
                <td>{item.Designation}</td>
                <td>{item.Company}</td>
                <td>{item.Address}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <button disabled={currentPage === 0} onClick={() => handlePerPageChange(currentPage - 1)}>
            Previous
          </button>
          {pageIndex.slice(Math.max(0, currentPage - 2), Math.min(numberOfPage, currentPage + 3)).map((page) => (
            <button
              key={page}
              onClick={() => handlePerPageChange(page - 1)}
              className={page === currentPage + 1 ? 'active' : ''}
            >
              {page}
            </button>
          ))}
          <button
            disabled={currentPage === numberOfPage - 1}
            onClick={() => handlePerPageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
