import React, { useState } from 'react';
import "./App.css"


interface FormProps {
  onSubmit: (formData: FormValues) => void;
}

interface FormValues {
  report_type: string;
  user_id: number ;
  client_id: number ;
  RasterTilesetName: string;
  VectorTilesetName: string;
  report_season_start: string;
  report_season_end: string;
  crop: string;
  rasterS3Path: string;
  vectorSegmentationS3Path: string;
  reportDate: string;
}

const FormComponent: React.FC<FormProps> = ({ onSubmit }) => {
  const userIdOptions = [
    { label: "Zahra", key: 1 },
    { label: "Ali", key: 2 },
    { label: "Ahmed", key: 3 }
  ];
  const clientIdOptions = [
    { label: "Client A", key: 101 },
    { label: "Client B", key: 102 },
    { label: "Client C", key: 103 }
  ];

  const [formValues, setFormValues] = useState<FormValues>({
    report_type: "",
    user_id: 0,
    client_id: 0,
    RasterTilesetName: "",
    VectorTilesetName: "",
    report_season_start: "",
    report_season_end: "",
    crop: "",
    rasterS3Path: "",
    vectorSegmentationS3Path: "",
    reportDate: ""
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    if (name === "user_id" || name === "client_id") {
      const selectedOption = name === "user_id" ? userIdOptions.find(option => option.label === value) : clientIdOptions.find(option => option.label === value);
      
      if (selectedOption) {
        setFormValues({
          ...formValues,
          [name]: selectedOption.key,
        });
      } else {
        setFormValues({
          ...formValues,
          [name]: null,
        });
      }
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newErrors: Partial<Record<keyof FormValues, string>> = {};

    for (const field in formValues) {
      if (formValues[field as keyof FormValues] === "") {
        newErrors[field as keyof FormValues] = "This field is required.";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formValues);
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Report Type:</label>
          <input
            type="text"
            name="report_type"
            value={formValues.report_type}
            onChange={handleInputChange}
          />
          {errors.report_type && <span className="error">{errors.report_type}</span>}
        </div>
        <div className="form-group">
          <label>User ID:</label>
          <select
            name="user_id"
            value={formValues.user_id || ''}
            onChange={handleInputChange}
          >
            <option value="">Select User ID</option>
            {userIdOptions.map(option => (
              <option key={option.key} value={option.label}>
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
            value={formValues.client_id || ''}
            onChange={handleInputChange}
          >
            <option value="">Select Client ID</option>
            {clientIdOptions.map(option => (
              <option key={option.key} value={option.label}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.client_id && <span className="error">{errors.client_id}</span>}
        </div>
        <div className="form-group">
          <label>Raster Tileset Name:</label>
          <input
            type="text"
            name="RasterTilesetName"
            value={formValues.RasterTilesetName}
            onChange={handleInputChange}
          />
          {errors.RasterTilesetName && <span className="error">{errors.RasterTilesetName}</span>}
        </div>
        <div className="form-group">
          <label>Vector Tileset Name:</label>
          <input
            type="text"
            name="VectorTilesetName"
            value={formValues.VectorTilesetName}
            onChange={handleInputChange}
          />
          {errors.VectorTilesetName && <span className="error">{errors.VectorTilesetName}</span>}
        </div>
        <div className="form-group">
          <label>Report Season Start:</label>
          <input
            type="date"
            name="report_season_start"
            value={formValues.report_season_start}
            onChange={handleInputChange}
          />
          {errors.report_season_start && <span className="error">{errors.report_season_start}</span>}
        </div>
        <div className="form-group">
          <label>Report Season End:</label>
          <input
            type="date"
            name="report_season_end"
            value={formValues.report_season_end}
            onChange={handleInputChange}
          />
          {errors.report_season_end && <span className="error">{errors.report_season_end}</span>}
        </div>
        <div className="form-group">
          <label>Crop:</label>
          <input
            type="text"
            name="crop"
            value={formValues.crop}
            onChange={handleInputChange}
          />
          {errors.crop && <span className="error">{errors.crop}</span>}
        </div>
        <div className="form-group">
          <label>Raster S3 Path:</label>
          <input
            type="text"
            name="rasterS3Path"
            value={formValues.rasterS3Path}
            onChange={handleInputChange}
          />
          {errors.rasterS3Path && <span className="error">{errors.rasterS3Path}</span>}
        </div>
        <div className="form-group">
          <label>Vector Segmentation S3 Path:</label>
          <input
            type="text"
            name="vectorSegmentationS3Path"
            value={formValues.vectorSegmentationS3Path}
            onChange={handleInputChange}
          />
          {errors.vectorSegmentationS3Path && <span className="error">{errors.vectorSegmentationS3Path}</span>}
        </div>
        <div className="form-group">
          <label>Report Date:</label>
          <input
            type="date"
            name="reportDate"
            value={formValues.reportDate}
            onChange={handleInputChange}
          />
          {errors.reportDate && <span className="error">{errors.reportDate}</span>}
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default FormComponent;
