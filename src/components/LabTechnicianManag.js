import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LabTechnicianForm = () => {
  const [labTechnician, setLabTechnician] = useState({
    name: '',
    specialization: '',
    address: '',
    phoneNumber: '',
    email: '',
    password: ''
  });

  const [labTechnicians, setLabTechnicians] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchLabTechnicians();
  }, []);

  const fetchLabTechnicians = async () => {
    try {
      const response = await axios.get('http://localhost:8091/lab-technicians');
      setLabTechnicians(response.data);
    } catch (error) {
      console.error('Error fetching lab technicians:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLabTechnician(prevLabTechnician => ({
      ...prevLabTechnician,
      [name]: value
    }));
  };

  const clearForm = () => {
    setLabTechnician({
      name: '',
      specialization: '',
      address: '',
      phoneNumber: '',
      email: '',
      password: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8091/lab-technicians', labTechnician);
      console.log('New lab technician added:', response.data);
      clearForm();
      fetchLabTechnicians(); // Refresh the lab technician list after adding a new one
    } catch (error) {
      console.error('Error adding lab technician:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8091/lab-technicians/${id}`);
      fetchLabTechnicians(); // Refresh the lab technician list after deletion
    } catch (error) {
      console.error('Error deleting lab technician:', error);
    }
  };

  const handleEdit = (technician) => {
    setLabTechnician({
      id: technician.id,
      name: technician.name,
      specialization: technician.specialization,
      address: technician.address,
      phoneNumber: technician.phoneNumber,
      email: technician.email
    });
  };

  const filteredLabTechnicians = labTechnicians.filter((technician) => {
    return technician.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">Admin Dashboard</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Lab Technicians</a>
              </li>
              {/* Add more navbar items as needed */}
            </ul>
          </div>
        </div>
      </nav>

      {/* Lab Technician Form */}
      <div className="container mt-5">
        <div className="card">
          <div className="card-header">
            <h2>Add New Lab Technician</h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={labTechnician.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="specialization">Specialization</label>
                <select
                  className="form-control"
                  id="specialization"
                  name="specialization"
                  value={labTechnician.specialization}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select specialization</option>
                  <option value="CARDIOLOGIST">Cardiologist</option>
                  <option value="DERMATOLOGIST">Dermatologist</option>
                  <option value="NEUROLOGIST">Neurologist</option>
                  <option value="ONCOLOGIST">Oncologist</option>
                  <option value="ORTHOPEDIC_SURGEON">Orthopedic Surgeon</option>
                  <option value="PEDIATRICIAN">Pediatrician</option>
                  <option value="PSYCHIATRIST">Psychiatrist</option>
                  <option value="UROLOGIST">Urologist</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={labTechnician.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={labTechnician.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={labTechnician.email}
                  onChange={handleChange}
                  required
                />
                <div className="form-group">
                <label htmlFor="password">Password</label>
                        <input
                       type="password"
                   className="form-control"
                           id="password"
                     name="password"
                   value={labTechnician.password}
                    onChange={handleChange}
                        required
    />
</div>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="container mt-3">
        <input
          type="text"
          placeholder="Search lab technicians..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-control"
        />
      </div>

      {/* Lab Technician Grid View */}
      <div className="container mt-3">
        <h2>Lab Technician List</h2>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
              <th>Name</th>
                <th>Specialization</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLabTechnicians.map((technician, index) => (
                <tr key={index}>
                  <td>{technician.name}</td>
                  <td>{technician.specialization}</td>
                  <td>{technician.address}</td>
                  <td>{technician.phoneNumber}</td>
                  <td>{technician.email}</td>
                  <td>{technician.password}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => handleEdit(technician)}>Edit</button>
                    <span style={{ margin: '0 5px' }}></span>
                    <button className="btn btn-danger" onClick={() => handleDelete(technician.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LabTechnicianForm;
