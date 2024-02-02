import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./ManagementSPK.css";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const ManagementSPK = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState(null);


  useEffect(() => {
    axios.get('http://localhost:5000/employee')
      .then(response => {
        console.log('API Response:', response.data);
        setEmployeeData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        if (error.response) {
          console.error('Server responded with:', error.response.data);
          console.error('Status code:', error.response.status);
          console.error('Headers:', error.response.headers);
        } else if (error.request) {
          console.error('No response received from the server');
          console.error('Request:', error.request);
        } else {
          console.error('Error setting up the request:', error.message);
        }
      });
  }, []);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:5000/employee')
      .then(response => {
        console.log('API Response:', response.data);
        setEmployeeData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };


  const toggleAddModal = () => {
    setShowAddModal(!showAddModal);
  };

  const handleDetailClick = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleDeleteClick = (employeeId) => {
    axios.delete(`http://localhost:5000/employee/${employeeId}`)
      .then(response => {
        console.log('Delete Response:', response.data);
        setEmployeeData(prevData => prevData.filter(employee => employee.id !== employeeId));
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 5000);
      })
      .catch(error => {
        console.error('Error deleting data:', error);
      });
  };

  const handleSave = (employee) => {
    if (selectedEmployee) {
      axios.put(`http://localhost:5000/employee/${selectedEmployee.id}`, employee)
        .then(response => {
          console.log('Update Response:', response.data);
          setEmployeeData(prevData => prevData.map(item => (item.id === selectedEmployee.id ? employee : item)));
          setShowModal(false);
          setNotification({ type: 'success', message: 'Data berhasil diperbarui!' });
        })
        .catch(error => {
          console.error('Error updating data:', error);
        });
    } else {
      axios.post('http://localhost:5000/employee', employee)
        .then(response => {
          console.log('Add Response:', response.data);
          setEmployeeData(prevData => [...prevData, response.data]);
          setShowModal(false);
          setNotification({ type: 'success', message: 'Data berhasil ditambahkan!' });
        })
        .catch(error => {
          console.error('Error adding data:', error);
        });
    }

    setShowModal(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = {
      nama: e.target.elements.nama.value,
      email: e.target.elements.email.value,
      role: e.target.elements.role.value,
      start_date: e.target.elements.start_date.value,
      end_date: e.target.elements.end_date.value,
      mandays: e.target.elements.mandays.value,
      feedback: e.target.elements.feedback.value,
      delivery: e.target.elements.delivery.value,
      score: e.target.elements.score.value,
      extra_miles: e.target.elements.extra_miles.value,
    };

    handleSave(formData);
  };

  const handleAddFormSubmit = (e) => {
    e.preventDefault();
  
    const formData = {
      nama: e.target.elements.nama.value,
      email: e.target.elements.email.value,
      role: e.target.elements.role.value,
      start_date: e.target.elements.start_date.value,
      end_date: e.target.elements.end_date.value,
      mandays: parseInt(e.target.elements.mandays.value), // Ubah ke tipe data yang sesuai
      feedback: e.target.elements.feedback.value,
      delivery: e.target.elements.delivery.value,
      score: e.target.elements.score.value,
      extra_miles: e.target.elements.extra_miles.value,
      // Tambahkan field formulir lainnya sesuai kebutuhan
    };
  
    // Pastikan semua nilai formData telah diambil dengan benar
    console.log('Form Data:', formData);
  
    handleSave(formData); // Panggil fungsi handleSave untuk mengirim data ke server
    setShowAddModal(false);
  };
  

  return (

    <div className="management-container">
      <h1 className="management-title">Management SPK</h1>

      {/* Tombol "Tambah Data" */}
      <button className="management-button" onClick={toggleAddModal}>
        Tambah Data
      </button>
      {/* Notifikasi melayang */}
      {showNotification && (
        <div className="floating-notification">
          Data telah dihapus!
          <button className="notification-button" onClick={() => setShowNotification(false)}>
            Tutup
          </button>
        </div>
      )}
      {notification && (
  <div className={`floating-notification ${notification.type}`}>
    <p>{notification.message}</p>
    <button className="notification-button" onClick={() => setNotification(null)}>
      Tutup
    </button>
  </div>
)}


      {/* Table */}
      <table className="management-table">
        <thead>
          <tr>
            <th className="management-th">ID</th>
            <th className="management-th">Nama</th>
            <th className="management-th">Email</th>
            <th className="management-th">Role</th>
            <th className="management-th">Start Date</th>
            <th className="management-th">End Date</th>
            <th className="management-th">Mandays</th>
            <th className="management-th">Feedback</th>
            <th className="management-th">Delivery</th>
            <th className="management-th">Score</th>
            <th className="management-th">Extra Miles</th>
            <th className="management-th">Detail</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.map(employee => (
            <tr key={employee.id}>
              <td className="management-td">{employee.id}</td>
              <td className="management-td">{employee.nama}</td>
              <td className="management-td">{employee.email}</td>
              <td className="management-td">{employee.role}</td>
              <td className="management-td">{formatDate(employee.start_date)}</td>
              <td className="management-td">{formatDate(employee.end_date)}</td>
              <td className="management-td">{employee.mandays}</td>
              <td className="management-td">{employee.feedback}</td>
              <td className="management-td">{employee.delivery}</td>
              <td className="management-td">{employee.score}</td>
              <td className="management-td">{employee.extra_miles}</td>
              <td>
                <button className="management-button" onClick={() => handleDetailClick(employee)}>
                  Edit
                </button>
                <button className="management-button2" onClick={() => handleDeleteClick(employee.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal untuk Tambah Data */}
      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleAddModal}>&times;</span>
            <h2>Tambah Data</h2>
            <form onSubmit={handleAddFormSubmit}>
              <label htmlFor="nama">Nama:</label>
              <input type="text" id="nama" name="nama" defaultValue="" required />

              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" defaultValue="" required />

              <label htmlFor="role">Role:</label>
              <input type="text" id="role" name="role" defaultValue="" required />

              <label htmlFor="start_date">Start Date:</label>
              <input type="date" id="start_date" name="start_date" defaultValue="" required />

              <label htmlFor="end_date">End Date:</label>
              <input type="date" id="end_date" name="end_date" defaultValue="" required />

              <label htmlFor="mandays">Mandays:</label>
              <input type="number" id="mandays" name="mandays" defaultValue="" required />

              <label htmlFor="feedback">Feedback:</label>
              <input type="text" id="feedback" name="feedback" defaultValue="" required />

              <label htmlFor="delivery">Delivery:</label>
              <input type="text" id="delivery" name="delivery" defaultValue="" required />

              <label htmlFor="score">Score:</label>
              <input type="text" id="score" name="score" defaultValue="" required />

              <label htmlFor="extra_miles">Extra Miles:</label>
              <input type="text" id="extra_miles" name="extra_miles" defaultValue="" required />

              <button type="submit">Tambah Data</button>
            </form>
          </div>
        </div>
      )}

      {/* Modal untuk Edit/Tambah */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>{selectedEmployee ? 'Edit Data' : 'Tambah Data'}</h2>
            <form onSubmit={handleFormSubmit}>
              <label htmlFor="nama">Nama:</label>
              <input type="text" id="nama" name="nama" defaultValue={selectedEmployee?.nama || ''} required />

              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" defaultValue={selectedEmployee?.email || ''} required />

              <label htmlFor="role">Role:</label>
              <input type="text" id="role" name="role" defaultValue={selectedEmployee?.role || ''} required />

              <label htmlFor="start_date">Start Date:</label>
              <input type="date" id="start_date" name="start_date" defaultValue={formatDate(selectedEmployee?.start_date) || ''} required />

              <label htmlFor="end_date">End Date:</label>
              <input type="date" id="end_date" name="end_date" defaultValue={formatDate(selectedEmployee?.end_date) || ''} required />

              <label htmlFor="mandays">Mandays:</label>
              <input type="number" id="mandays" name="mandays" defaultValue={selectedEmployee?.mandays || ''} required />

              <label htmlFor="feedback">Feedback:</label>
              <input type="text" id="feedback" name="feedback" defaultValue={selectedEmployee?.feedback || ''} required />

              <label htmlFor="delivery">Delivery:</label>
              <input type="text" id="delivery" name="delivery" defaultValue={selectedEmployee?.delivery || ''} required />

              <label htmlFor="score">Score:</label>
              <input type="text" id="score" name="score" defaultValue={selectedEmployee?.score || ''} required />

              <label htmlFor="extra_miles">Extra Miles:</label>
              <input type="text" id="extra_miles" name="extra_miles" defaultValue={selectedEmployee?.extra_miles || ''} required />

              <button type="submit">{selectedEmployee ? 'Simpan Perubahan' : 'Tambah Data'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagementSPK;
