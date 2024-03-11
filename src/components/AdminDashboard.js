import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorForm = () => {
  const [doctor, setDoctor] = useState({
    name: '',
    specialization: '',
    address: '',
    phoneNumber: '',
    email: '',
    password: '',
    type: ''
  });

  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:8091/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor(prevDoctor => ({
      ...prevDoctor,
      [name]: value
    }));
  };

  const clearForm = () => {
    setDoctor({
      name: '',
      specialization: '',
      address: '',
      phoneNumber: '',
      email: '',
      password: '',
      type: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8091/doctors', doctor);
      console.log('New doctor added:', response.data);
      clearForm();
      fetchDoctors(); // Refresh the doctor list after adding a new one
    } catch (error) {
      console.error('Error adding doctor:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8091/doctors/${id}`);
      fetchDoctors(); // Refresh the doctor list after deletion
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  const handleEdit = (doc) => {
    setDoctor({
      id: doc.id,
      name: doc.name,
      specialization: doc.specialization,
      address: doc.address,
      phoneNumber: doc.phoneNumber,
      email: doc.email,
      password:doc.password,
      type:doc.type
    });
  };

  const filteredDoctors = doctors.filter((doc) => {
    return doc.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">Doctor Managment</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/lab-technician">Lab Tachnicians</a>
              </li>
              {/* Add more navbar items as needed */}
            </ul>
          </div>
        </div>
      </nav>

      {/* Doctor Form */}
      <div className="container mt-5">
        <div className="card">
          <div className="card-header">
            <h2>Add New Doctor</h2>
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
                  value={doctor.name}
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
                  value={doctor.specialization}
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
                  value={doctor.address}
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
                  value={doctor.phoneNumber}
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
                  value={doctor.email}
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
                   value={doctor.password}
                    onChange={handleChange}
                        required
    />
</div>

<div className="form-group">
                <label htmlFor="type">Type</label>
                <select
                  className="form-control"
                  id="type"
                  name="type"
                  value={doctor.type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select type</option>
                  <option value="DOCTOR">Doctor</option>
                  <option value="LABTECHNICIAN">Lab Technician</option>
                  <option value="RICEPTIONIST">Riceptionist</option>
                  
                </select>
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
          placeholder="Search doctors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-control"
        />
      </div>

      {/* Doctor Grid View */}
      <div className="container mt-3">
        <h2>Doctor List</h2>
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
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doc, index) => (
                <tr key={index}>
                  <td>{doc.name}</td>
                  <td>{doc.specialization}</td>
                  <td>{doc.address}</td>
                  <td>{doc.phoneNumber}</td>
                  <td>{doc.email}</td>
                  <td>{doc.password}</td>
                  <td>{doc.type}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => handleEdit(doc)}>Edit</button>
                    <span style={{ margin: '0 5px' }}></span>
                    <button className="btn btn-danger" onClick={() => handleDelete(doc.id)}>Delete</button>
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

export default DoctorForm;
