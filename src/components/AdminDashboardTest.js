import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function AdminDashboardTest() {
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='bg-dark col-auto col-md-3 min-vh-100 p-0'>
                    <a href="/" className='text-decoration-none text-white d-flex align-items-center p-3'>
                        <i className='fs-4 bi bi-speedometer'></i>
                        <span className='ms-2 fs-4'>Brand</span>
                    </a>
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <a href='#' className="nav-link text-white fs-5">
                                <i className='bi bi-speedometer2 me-2'></i> Dashboard
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href='#' className="nav-link text-white">Link</a>
                        </li>
                        <li className="nav-item disabled">
                            <a href='#' className="nav-link text-white">Disabled</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboardTest;
