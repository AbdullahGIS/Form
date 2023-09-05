import React, { useState} from 'react';
import './Form3.css';
import Select from 'react-select';


interface FormData {
    userId: number;
    cropDetails: CropDetail[];
    selectedReports: number[];     
}

interface CropDetail {
    cropName: string;
    cropSeason: string[];
}

interface ZoomFormData {
    zoomLevel: number;
    nextZoom: number;
    boundaryLayer: string;
}
interface ReportOption {
    value: string;
    label: string;
}


// interface croppp{

//     id:number;
//     name:string
// }


const crop: { id: number; name: string }[] = [
    { id: 1, name: 'Wheat' },
    { id: 2, name: 'Corn' },
    { id: 3, name: 'Rice' },
];

const clients: { id: number; name: string }[] = [
    { id: 1, name: 'Abdullah' },
    { id: 2, name: 'Ali' },
    { id: 3, name: 'Zafir' },
];

const reports: { value: number; label: string }[] = [
    { value: 1, label: 'Report 1' },
    { value: 2, label: 'Report 2' },
    { value: 3, label: 'Report 3' },
];

const Seasons: string[] = ['Fall - 23', 'Spring - 23'];

const Form3 = () => {
    const showZoomForm = true;
    const [editMode, setEditMode] = useState(false);
    const [newLayer, setNewLayer] = useState<string>('');
    const [selectedLayers, setSelectedLayers] = useState<string[]>([]);
    const [showAddNewLayerInput, setShowAddNewLayerInput] = useState(false);
    const [zoomForms, setZoomForms] = useState<ZoomFormData[]>([
        {zoomLevel: 0,nextZoom: 0, boundaryLayer: ''}
    ]);

    const [inputFormData, setInputFormData] = useState<FormData>({
        userId: 0,
        cropDetails: [{ cropName: '', cropSeason: [] }],
        selectedReports: [],
       });
    
       const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
    
        const storedResponses = JSON.parse(localStorage.getItem('responses') || '[]');
    
        const existingResponse = storedResponses.find(
            (response:any) => response.userId === inputFormData.userId
        );
    
        if (existingResponse) {
            alert(`A response already exists for User ID ${inputFormData.userId}.`);
        } else {
            const newResponse = {
                userId: inputFormData.userId,
                cropDetails: inputFormData.cropDetails,
                selectedReports: inputFormData.selectedReports,
                zoomForms,
            };
    
            storedResponses.push(newResponse);
    
            localStorage.setItem('responses', JSON.stringify(storedResponses));
    
            setInputFormData({
                userId: 0,
                cropDetails: [{ cropName: '', cropSeason: [] }],
                selectedReports: [],
            });
            setZoomForms([{ zoomLevel: 0, nextZoom: 0, boundaryLayer: '' }]);
        }
    };
    
    const handleInputChange = (field: keyof FormData, value: number | string) => {
        setInputFormData((prevData) => ({
            ...prevData,
            [field]: Number(value),
        }));
    };

    const handleCropDetailChange = (index: number, field: keyof CropDetail, value: any) => {
        setInputFormData((prevData) => {
            const newCropDetails = [...prevData.cropDetails];
            newCropDetails[index][field] = value;
            return { ...prevData, cropDetails: newCropDetails };
        });
    };

    const handleBoundaryNameChange = (index: number, value: string) => {
    setZoomForms((prevForms) => {
        const updatedForms = [...prevForms];
        updatedForms[index].boundaryLayer = value;
        return updatedForms;
    });
};
const zoom = (index: number, field: keyof ZoomFormData, value: string) => {
    const parsedValue = parseFloat(value);
    
    setZoomForms((prevForms) => {
        const updatedForms: any = [...prevForms];
        if (value === '') {
            updatedForms[index][field] = NaN;
        } else if (!isNaN(parsedValue)) {
            updatedForms[index][field] = parsedValue;
        }
        return updatedForms;
    });
};


    const handleRemoveButtonClick = (index: number) => {
        setZoomForms((prevForms) => {
            const updatedForms = [...prevForms];
            updatedForms.splice(index, 1);
            return updatedForms;
        });
    };

    const addNewLayer = () => {
        if (newLayer.trim() !== '' && !layerOptions.some((option) => option.value === newLayer)) {
            const newLayerOption = { value: newLayer, label: newLayer };
            setLayerOptions([...layerOptions, newLayerOption]);
            setNewLayer('');
        }
    };

    const getFilteredBoundaryOptions = () => {
        const filteredBoundaryOptions = layerOptions.filter((layer) =>
            selectedLayers.includes(layer.value)
        );

        return filteredBoundaryOptions;
    };

    const [layerOptions, setLayerOptions] = useState<ReportOption[]>([
        { value: 'uc', label: 'UC' },
        { value: 'district', label: 'District' },
        { value: 'tehsil', label: 'Tehsil' },
        { value: 'aoi', label: 'AOI' },
        { value: 'gatecircle', label: 'Gate Circle' },
        { value: 'Add a new layer', label: 'Add a new layer' },
    ]);

    const handleRemoveLocalStorage = () => {
        const userIdToRemove = prompt("Enter User ID to remove data (or leave empty to remove all data):");
    
        if (userIdToRemove === null) {
           
            return;
        }
    
        if (userIdToRemove === "") {
          
            localStorage.removeItem('responses');
        } else {
          
            const storedResponses = JSON.parse(localStorage.getItem('responses') || '[]');
    
           
            const indexToRemove = storedResponses.findIndex(
                (response:any) => response.userId === Number(userIdToRemove)
            );
    
            if (indexToRemove !== -1) {
                
                storedResponses.splice(indexToRemove, 1);
                localStorage.setItem('responses', JSON.stringify(storedResponses));
            } else {
                alert(`No data found for User ID ${userIdToRemove}.`);
            }
        }
        setInputFormData({
            userId: 0,
            cropDetails: [{ cropName: '', cropSeason: [] }],
            selectedReports: [],
        });
        setZoomForms([{ zoomLevel: 0, nextZoom: 0, boundaryLayer: '' }]);
    };
    
    const handleRetrieveLocalStorage = () => {
        const userIdToEdit = prompt("Enter User ID to edit data:");

        if (userIdToEdit === null) {
            return;
        }
        const storedResponses = JSON.parse(localStorage.getItem('responses') || '[]');

        const responseToEdit = storedResponses.find(
            (response: any) => response.userId === Number(userIdToEdit)
        );

        if (responseToEdit) {
            setInputFormData(responseToEdit);
            setZoomForms(responseToEdit.zoomForms);
            setEditMode(true);
        } else {
            alert(`No data found for User ID ${userIdToEdit}.`);
        }
    };
    const [filteredBoundaryOptions, setFilteredBoundaryOptions] = useState<ReportOption[]>(
        getFilteredBoundaryOptions()
    );
    const handleDoneButtonClick = () => {
        const storedResponses = JSON.parse(localStorage.getItem('responses') || '[]');

        const updatedResponses = storedResponses.map((response: any) => {
            if (response.userId === inputFormData.userId) {
                return {
                    ...response,
                    cropDetails: inputFormData.cropDetails,
                    selectedReports: inputFormData.selectedReports,
                    zoomForms,
                };
            }
            return response;
        });
        localStorage.setItem('responses', JSON.stringify(updatedResponses));
        setEditMode(false);
    };

    const handleAddButtonClick = () => {
    if (showZoomForm) {
        setZoomForms((prevForms) => [
            ...prevForms,
            { zoomLevel: 0, nextZoom: 0, boundaryLayer: '' }, 
        ]);
    }
};

    return (
        <div className="form-container">
            {
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
                            {crop.map((crop) => (
                                <option key={crop.id} value={crop.id}>
                                    {crop.name}
                                </option>
                            ))}
                            
                        </select>
                        <label className="form-label">Season </label>
                        <Select
                            className="form-select"
                            isMulti
                            value={cropDetail.cropSeason.map((season) => ({ value: season, label: season }))}
                            options={Seasons.map((season) => ({ value: season, label: season }))}
                            onChange={(selectedOptions) => handleCropDetailChange(index, 'cropSeason', selectedOptions.map((option) => option.value))}
                            required
                        />
                    </div>
                ))}

                <label className="form-label">Select Reports:</label>
                <Select
                    className="report-select"
                    isMulti
                    value={reports.filter((report) => inputFormData.selectedReports.includes(report.value))}
                    options={reports}
                    onChange={(selectedOptions) => {
                        const selectedReportValues = selectedOptions.map((option) => option.value);
                        setInputFormData({ ...inputFormData, selectedReports: selectedReportValues });
                    }}
                />

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

                        if (selectedLayerValues.includes('Add a new layer')) {
                            setShowAddNewLayerInput(true);
                        } else {
                            setShowAddNewLayerInput(false);
                        }
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
        onChange={(e) => zoom(index, 'zoomLevel', e.target.value)} 
    />
</div>
<div className="input-fields">
    <label className="form-label">Next Zoom</label>
    <input
        className="form-input"
        type="text"
        value={isNaN(zoomForm.nextZoom) ? '' : zoomForm.nextZoom}
        onChange={(e) => zoom(index, 'nextZoom', e.target.value)} 
    />
</div>
                                <div className="input-fields">
                                    <label className="form-label">Boundary Layer</label>
                                      <select
                                        className="form-select"
                                        value={zoomForm.boundaryLayer}
                                        onChange={(e) => handleBoundaryNameChange(index, e.target.value)}
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

                    <div className="button-container">
                <button
                    className="retrieve-button" 
                    onClick={handleRetrieveLocalStorage}
                    type="button"
                >
                    Edit
                </button>
                       <div className="button-container">
            {editMode && ( 
                <button className="done-button" onClick={handleDoneButtonClick} type="button">
                    Done
                </button>
            )}
        </div>

                <button 
                    className="remove-local-storage-button" 
                    onClick={handleRemoveLocalStorage}
                    type="button"
                >
                    Remove 
                </button>
            
            </div>
                </div>
               
                    </form>
            }
        </div>
    );
};

export default Form3;
