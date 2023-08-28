import React, { useState } from 'react';
import "./App.css"

interface FormProps {
  onSubmit: (formData: FormValues) => void;
}

interface FormValues {
  user_id: number;
  client_id: number;
}

const FormComponent: React.FC<FormProps> = ({ onSubmit }) => {
  const userIdOptions = [{ label: "Zahra", key: 1 }, { label: "Ali", key: 2 }, { label: "Zahra", key: 3 }];
  const clientIdOptions = [{ label: "Client A", key: 101 }, { label: "Client B", key: 102 }, { label: "Client C", key: 103 }];

  const [formValues, setFormValues] = useState<FormValues>({
    user_id: 0,
    client_id: 0,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    if (name === "user_id" || name === "client_id") {
      const selectedOption = name === "user_id" ? userIdOptions.find(option => option.label === value) : clientIdOptions.find(option => option.label === value);
      if (selectedOption) {
        setFormValues({
          ...formValues,
          [name]: selectedOption.key,
        });
      }
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newErrors: Partial<Record<keyof FormValues, string>> = {};

    for (const field in formValues) {
      if (formValues[field as keyof FormValues] === 0) {
        newErrors[field as keyof FormValues] = "Please select an option.";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Selected User ID:", formValues.user_id);
      console.log("Selected Client ID:", formValues.client_id);
      onSubmit(formValues);
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>User ID:</label>
          <select
            name="user_id"
            value={formValues.user_id}
            onChange={handleInputChange}
          >
            <option value={0}>Select User ID</option>
            {userIdOptions.map(option => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.user_id && <span className="error">{errors.user_id}</span>}
        </div>
        <div className="form-group">
          <label>Client ID:</label>
          <select
            name="client_id"
            value={formValues.client_id}
            onChange={handleInputChange}
          >
            <option value={0}>Select Client ID</option>
            {clientIdOptions.map(option => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.client_id && <span className="error">{errors.client_id}</span>}
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default FormComponent;
