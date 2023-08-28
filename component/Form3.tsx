import React, { useState } from 'react';
import './Form3.css';
import Select from 'react-select';

interface FormData {
    userId: number;
    clientId: number | null;
    cropDetails: CropDetail[];
}

interface CropDetail {
    cropName: string;
    cropSeason: string;
}

interface ReportOption {
    value: string;
    label: string;
}
interface ReportOption2 {
    value: number;
    label: string;
}

interface ZoomFormData {
    zoomLevel: number;
    nextZoom: number;
    boundaryLayer: string;
}

const clients: { id: number; name: string }[] = [
    { id: 1, name: 'Abdullah' },
    { id: 2, name: 'Ali' },
    { id: 3, name: 'Zafir' },
];

const reports: ReportOption2[] = [
    { value: 1, label: 'Report 1' },
    { value: 2, label: 'Report 2' },
    { value: 3, label: 'Report 3' },
];

const Seasons: string[] = ['Fall - 23', 'Spring -23'];
const CropData: string[] = ['Wheat', 'Corn', 'Rice'];

const Form3 = () => {
    const showZoomForm = true;

    const [newLayer, setNewLayer] = useState<string>('');
    const [selectedLayers, setSelectedLayers] = useState<string[]>([]);
    const [showAddNewLayerInput, setShowAddNewLayerInput] = useState(false);
    const [zoomForms, setZoomForms] = useState<ZoomFormData[]>([]);
    const [selectedReports, setSelectedReports] = useState<string[]>([]);

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("data:",inputFormData );
        console.log("report",selectedReports);
        console.log("layer:",selectedLayers);
        console.log("zoom:",zoomForms);
      };
      
    const [layerOptions, setLayerOptions] = useState<ReportOption[]>([
        { value: 'uc', label: 'UC' },
        { value: 'district', label: 'District' },
        { value: 'tehsil', label: 'Tehsil' },
        { value: 'aoi', label: 'AOI' },
        { value: 'gatecircle', label: 'Gate Circle' },
        { value: 'Add a new layer', label: 'Add a new layer' },
      ]);

    const [inputFormData, setInputFormData] = useState<FormData>({
        userId: 0,
        clientId: null,
        cropDetails: [{ cropName: '', cropSeason: '' }],
    });

   
    const handleRemoveButtonClick = (index: number) => {
        setZoomForms((prevForms) => {
            const updatedForms = [...prevForms];
            updatedForms.splice(index, 1);
            return updatedForms;
        });
    };

    const handleInputChange = (field: keyof FormData, value: number | string) => {
        setInputFormData((prevData) => ({
            ...prevData,
            [field]: Number(value),
        }));
    };
    
    const handleInputChange2 = (field: keyof ZoomFormData, value: number | string) => {
        setInputFormData((prevData) => ({
            ...prevData,
            [field]: Number(value),
        }));
    };

    const getFilteredBoundaryOptions = () => {
        const filteredBoundaryOptions = layerOptions.filter((layer) =>
            selectedLayers.includes(layer.value)
        );
    
        return filteredBoundaryOptions;
    };
      
    const [filteredBoundaryOptions, setFilteredBoundaryOptions] = useState<ReportOption[]>(
        getFilteredBoundaryOptions()
      );


      const handleCropDetailChange = (index: number, field: keyof CropDetail, value: any) => {
        setInputFormData((prevData) => {
            const newCropDetails = [...prevData.cropDetails];
            newCropDetails[index][field] = value;
            return { ...prevData, cropDetails: newCropDetails };
        });
    };

    const addNewLayer = () => {
        if (newLayer.trim() !== '' && !layerOptions.some((option) => option.value === newLayer)) {
            const newLayerOption = { value: newLayer, label: newLayer };
            setLayerOptions([...layerOptions, newLayerOption]);
            setNewLayer('');
        }
    };
    
   

      const handleAddButtonClick = () => {
        if (showZoomForm) {
            setZoomForms((prevForms) => [
                ...prevForms,
                {
                    zoomLevel: 0,
                    nextZoom: 0,
                    boundaryLayer: '',
                },
            ]);
        }
    };

    return (
        <div className="form-container">
            <form className="input-form" onSubmit={handleFormSubmit}>
                <label className="form-label">User ID:</label>
                <select
                    className="form-select"
                    value={inputFormData.userId}
                    onChange={(e) => handleInputChange('userId', e.target.value)}
                    required
                >
                    <option value={0}>Select User</option>
                    {clients.map((client) => (
                        <option key={client.id} value={client.id}>
                            {client.name}
                        </option>
                    ))}
                </select>

                <label className="form-label">Client ID:</label>
                <select
                    className="form-select"
                    value={inputFormData.clientId || ''}
                    onChange={(e) => handleInputChange('clientId', e.target.value)}
                    required
                >
                    <option value="">Select Client</option>
                    {clients.map((client) => (
                        <option key={client.id} value={client.id}>
                            {client.name}
                        </option>
                    ))}
                </select>
                <label className="form-label">Select Layers:</label>
                <Select
                    className="layer-select"
                    isMulti
                    value={layerOptions.filter((layer) => selectedLayers.includes(layer.value))}
                    options={layerOptions}
                    onChange={(selectedOptions) => {
                        const selectedLayerValues = selectedOptions.map((option) => option.value);
                        setSelectedLayers(selectedLayerValues);

                     
                        const filteredOptions = layerOptions.filter((layer) =>
                            selectedLayerValues.includes(layer.value)
                        );
                        setFilteredBoundaryOptions(filteredOptions);

                        // Step 3: Show "Add New Layer" input field when "Add a new layer" is selected
                        if (selectedLayerValues.includes('Add a new layer')) {
                            setShowAddNewLayerInput(true);
                        } else {
                            setShowAddNewLayerInput(false);
                        }
                    }}
/>
{showAddNewLayerInput && (
                    <div>
                        <input
                            className="new-layer-input"
                            type="text"
                            placeholder="Enter a new layer..."
                            value={newLayer}
                            onChange={(e) => setNewLayer(e.target.value)}
                        />
                        <button className="add-new-layer-button" onClick={addNewLayer} type="button">Add New Layer </button>
                    </div>
                )}

                <label className="form-label">Crop Details:</label>
                {inputFormData.cropDetails.map((cropDetail, index) => (
                    <div key={index} className="crop-detail">
                        <select
                            className="form-select"
                            value={cropDetail.cropName}
                            onChange={(e) => handleCropDetailChange(index, 'cropName', e.target.value)}
                            required
                        >
                            <option value="">Select Crop</option>
                            {CropData.map((crop) => (
                                <option key={crop} value={crop}>
                                    {crop}
                                </option>
                            ))}
                        </select>
                        <label className="form-label">Season </label>
                        <select
                            className="form-select"
                            value={cropDetail.cropSeason}
                            onChange={(e) => handleCropDetailChange(index, 'cropSeason', e.target.value)}
                            required
                        >
                            <option value="">Select Season</option>
                            {Seasons.map((season) => (
                                <option key={season} value={season}>
                                    {season}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
<label className="form-label">Select Reports:</label>
<Select
    className="report-select"
    isMulti
    value={reports.filter((report) => selectedReports.includes(report.label))}
    options={reports}
    onChange={(selectedOptions) => {
        const selectedReportValues = selectedOptions.map((option) => option.value.toString());
        setSelectedReports(selectedReportValues);
    }}
/>

                {showZoomForm && (
                    <div className="zoom-form">
                        {zoomForms.map((zoomForm, index) => (
                            <div key={index} className="zoom-options">
                                <div className="input-fields">
                                    <label className="form-label">Zoom Level</label>
                                    <input
                                        className="form-input"
                                        type="text"
                                        value={isNaN(zoomForm.zoomLevel) ? '' : zoomForm.zoomLevel}
                                        onChange={(e) => handleInputChange2('zoomLevel', e.target.value)}
                                    />
                                </div>
                                <div className="input-fields">
                                    <label className="form-label">Next Zoom</label>
                                    <input
                                        className="form-input"
                                        type="text"
                                        value={isNaN(zoomForm.nextZoom) ? '' : zoomForm.nextZoom}
                                        onChange={(e) => handleInputChange2('nextZoom', e.target.value)}
                                    />
                                </div>
                                <div className="input-fields">
                                    <label className="form-label">Boundary Level</label>
                                    <select
  className="form-select"
  value={zoomForm.boundaryLayer}
  onChange={(e) => handleInputChange2('boundaryLayer', e.target.value)}
>
  <option value="">Select Boundary Layer</option>
  {filteredBoundaryOptions.map((boundary, index) => (
    <option key={index} value={boundary.value}>
      {boundary.label}
    </option>
  ))}
</select>
                                </div>
                                <button
                                    className="remove-button"
                                    onClick={() => handleRemoveButtonClick(index)}
                                    type="button"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}

<div className="button-container">
          <button className="add-button" onClick={handleAddButtonClick} type="button">
            {showZoomForm ? 'Add Zoom' : ''}
          </button>
        </div>
        <div className="button-container">
          <button className="submit-button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
    );
};

export default Form3;
