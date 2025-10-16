
import React, { useState, useEffect } from 'react';
import { createMedication } from '../api/medicationApi'; 

const Icon = ({ children, className = "" }) => (
  <span className={`inline-flex items-center justify-center p-2 text-gray-500 rounded-md ${className}`}>
    {children}
  </span>
);

const AddEditMedication = () => {
  const [medication, setMedication] = useState({
    name: '',
    dosage: '',
    frequency: 'Once daily', 
    reminderTimes: ['12:00'], 
    startDate: '',
    endDate: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (successMessage) {
        const timer = setTimeout(() => {
            setSuccessMessage(null);
        }, 5000); 
        return () => clearTimeout(timer);
    }
    if (error) {
        const timer = setTimeout(() => {
            setError(null);
        }, 5000); 
        return () => clearTimeout(timer);
    }
  }, [successMessage, error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedication((prevMedication) => ({
      ...prevMedication,
      [name]: value,
    }));
  };

  const handleReminderTimeChange = (index, e) => {
    const newReminderTimes = [...medication.reminderTimes];
    newReminderTimes[index] = e.target.value;
    setMedication((prevMedication) => ({
      ...prevMedication,
      reminderTimes: newReminderTimes,
    }));
  };

  const addReminderTime = () => {
    setMedication((prevMedication) => ({
      ...prevMedication,
      reminderTimes: [...prevMedication.reminderTimes, ''], 
    }));
  };

  const removeReminderTime = (index) => {
    const newReminderTimes = medication.reminderTimes.filter((_, i) => i !== index);
    setMedication((prevMedication) => ({
      ...prevMedication,
      reminderTimes: newReminderTimes.length > 0 ? newReminderTimes : [''], 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    if (!medication.name || !medication.startDate) {
      setError("Medication name and start date are required.");
      setLoading(false);
      return;
    }

    try {
      const medicationData = {
        ...medication,
        userId: "60c72b2f9b1e8e001c8e4d3a" // Hardcoded userId for now, replace with actual user context
      };

      // Call the API function
      const response = await createMedication(medicationData);
      setSuccessMessage('Medication added successfully!');
      console.log('API Response:', response); // Log the response from the API function
      
      // Reset form after successful submission
      setMedication({ 
        name: '',
        dosage: '',
        frequency: 'Once daily', 
        reminderTimes: ['12:00'], 
        startDate: '',
        endDate: '',
        notes: '',
      });

    } catch (err) {
      console.error('Error submitting medication:', err);
      setError(err.response?.data?.message || 'Failed to save medication.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    console.log('Form Cancelled. Resetting form.');
    setError(null);
    setSuccessMessage(null);
    setMedication({ 
        name: '',
        dosage: '',
        frequency: 'Once daily', 
        reminderTimes: ['12:00'], 
        startDate: '',
        endDate: '',
        notes: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
   
      <div className="max-w-4xl w-full px-6 mb-4 text-gray-600 text-sm">
        <span className="text-gray-400">Home</span> &gt; Add Medication
      </div>

      <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
          Add New Medication
        </h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> {successMessage}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Medication Name */}
          <div className="col-span-1 md:col-span-2 bg-gray-50 p-5 rounded-lg shadow-sm flex items-center space-x-4">
            <Icon><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg></Icon>
            <label htmlFor="name" className="sr-only">Medication Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={medication.name}
              onChange={handleChange}
              className="flex-grow bg-transparent border-b-2 border-gray-200 focus:border-blue-500 outline-none text-gray-800 text-lg py-2"
              placeholder="Medication Name"
              required
            />
          </div>

          {/* Dosage */}
          <div className="bg-gray-50 p-5 rounded-lg shadow-sm flex items-center space-x-4">
            <Icon><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 11h10m-2 4h4m-4 8H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2z" /></svg></Icon>
            <label htmlFor="dosage" className="sr-only">Dosage</label>
            <input
              type="text"
              id="dosage"
              name="dosage"
              value={medication.dosage}
              onChange={handleChange}
              className="flex-grow bg-transparent border-b-2 border-gray-200 focus:border-blue-500 outline-none text-gray-800 text-lg py-2"
              placeholder="Dosage"
            />
          </div>

          {/* Frequency */}
          <div className="bg-gray-50 p-5 rounded-lg shadow-sm flex flex-col space-y-3">
            <div className="flex items-center space-x-4">
                <Icon><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></Icon>
                <label htmlFor="frequency" className="text-lg font-medium text-gray-700">Frequency</label>
            </div>
            <select
              id="frequency"
              name="frequency"
              value={medication.frequency}
              onChange={handleChange}
              className="flex-grow bg-white border border-gray-200 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
            >
              <option value="Once daily">Once daily</option>
              <option value="Twice daily">Twice daily</option>
              <option value="Three times daily">Three times daily</option>
              <option value="Every 4 hours">Every 4 hours</option>
              <option value="As needed">As needed</option>
            </select>
           
            <p className="text-sm text-gray-500">Selected: {medication.frequency}</p>
          </div>

          {/* Reminder Times and Dates */}
          <div className="col-span-1 md:col-span-2 bg-gray-50 p-5 rounded-lg shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
          
            <div>
                <div className="flex items-center space-x-4 mb-4">
                    <Icon><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg></Icon>
                    <label className="text-lg font-medium text-gray-700">Reminder Times</label>
                </div>
                <div className="space-y-3">
                    {medication.reminderTimes.map((time, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <input
                        type="time"
                        value={time}
                        onChange={(e) => handleReminderTimeChange(index, e)}
                        className="flex-grow bg-white border border-gray-200 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                        />
                        {medication.reminderTimes.length > 1 && (
                        <button
                            type="button"
                            onClick={() => removeReminderTime(index)}
                            className="p-2 text-red-600 hover:text-red-800 focus:outline-none rounded-full"
                            title="Remove reminder time"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 11-2 0v6a1 1 0 112 0V8z" clipRule="evenodd" />
                            </svg>
                        </button>
                        )}
                       
                    </div>
                    ))}
                    <button
                        type="button"
                        onClick={addReminderTime}
                        className="w-full mt-3 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Add Another Time
                    </button>
                </div>
            </div>

        
            <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                    <Icon><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></Icon>
                    <label htmlFor="startDate" className="text-lg font-medium text-gray-700">Start Date</label>
                </div>
                <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={medication.startDate}
                    onChange={handleChange}
                    className="flex-grow bg-white border border-gray-200 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                    required
                />

                <div className="flex items-center space-x-4 pt-2">
                    <Icon><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></Icon>
                    <label htmlFor="endDate" className="text-lg font-medium text-gray-700">End Date</label>
                </div>
                <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={medication.endDate}
                    onChange={handleChange}
                    className="flex-grow bg-white border border-gray-200 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                />
            </div>
          </div>


          {/* Notes */}
          <div className="col-span-1 md:col-span-2 bg-gray-50 p-5 rounded-lg shadow-sm flex items-start space-x-4">
            <Icon className="mt-1"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg></Icon>
            <label htmlFor="notes" className="sr-only">Notes / Instructions</label>
            <textarea
              id="notes"
              name="notes"
              rows="4"
              value={medication.notes}
              onChange={handleChange}
              className="flex-grow bg-transparent border-b-2 border-gray-200 focus:border-blue-500 outline-none text-gray-800 text-lg py-2 resize-y"
              placeholder="Notes / Instructions"
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="col-span-1 md:col-span-2 flex flex-col items-center space-y-4 pt-6">
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-teal-300"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Medication'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-full md:w-auto px-8 py-3 text-gray-600 hover:text-gray-800 font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-300"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditMedication;