import React, { useState } from 'react';
import './form2.css';
import { useNavigate } from 'react-router-dom';

interface Client {
  clientId: number | undefined;
  clientPassword: string;
  clientName: string;
  Userid: number | undefined;
  User: {
    id: number;
    name: string;
  }[];
}

const MyForm = () => {
  const Userdata = [
    { id: 1, name: 'Abdullah' },
    { id: 2, name: 'Ali' },
    { id: 3, name: 'Zahra' },
  ];

  const [formData, setFormData] = useState<Client>({
    clientId: undefined,
    clientPassword: '',
    clientName: '',
    Userid: undefined,
    User: Userdata,
  });

  const navigate = useNavigate(); 

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Form Data:', formData);
    navigate('/Form3');
  };

  return (
    <div className="container">
      <h2>Login Form</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>User ID:</label>
          <select
            value={formData.Userid || ''}
            onChange={(e) => setFormData({ ...formData, Userid: Number(e.target.value) })}
            required
          >
            <option value="">Select User</option>
            {formData.User.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Client Name:</label>
          <input
            type="text"
            value={formData.clientName}
            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Client ID:</label>
          <input
            type="number"
            value={formData.clientId || ''}
            onChange={(e) => setFormData({ ...formData, clientId: Number(e.target.value) })}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Client Password:</label>
          <input
            type="password"
            value={formData.clientPassword}
            onChange={(e) => setFormData({ ...formData, clientPassword: e.target.value })}
            required
          />
        </div>
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MyForm;
