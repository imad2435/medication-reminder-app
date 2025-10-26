import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createMedication, getMedicationById, updateMedication } from '../api/medicationApi';

// A small helper component for icons to keep JSX clean
const Icon = ({ children, className = "" }) => (
  <span className={`inline-flex items-center justify-center p-2 text-gray-500 rounded-md ${className}`}>
    {children}
  </span>
);

const AddEditMedication = () => {
  const { id } = useParams(); // Gets the ':id' from the URL if it exists
  const navigate = useNavigate();
  const isEditMode = Boolean(id); // True if 'id' exists, false otherwise

  const initialFormState = {
    name: '',
    dosage: '',
    frequency: 'Once daily',
    reminderTimes: ['12:00'],
    startDate: '',
    endDate: '',
    notes: '',
  };

  const [medication, setMedication] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      setLoading(true);
      getMedicationById(id)
        .then(response => {
          const medData = response.data;
          // Format dates correctly for the <input type="date"> fields
          const formattedData = {
            ...medData,
            startDate: medData.startDate ? new Date(medData.startDate).toISOString().split('T')[0] : '',
            endDate: medData.endDate ? new Date(medData.endDate).toISOString().split('T')[0] : '',
            reminderTimes: medData.reminderTimes.length > 0 ? medData.reminderTimes : [''],
          };
          setMedication(formattedData);
        })
        .catch(err => setError('Failed to fetch medication details.'))
        .finally(() => setLoading(false));
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    setMedication({ ...medication, [e.target.name]: e.target.value });
  };

  const handleReminderTimeChange = (index, value) => {
    const newReminderTimes = [...medication.reminderTimes];
    newReminderTimes[index] = value;
    setMedication({ ...medication, reminderTimes: newReminderTimes });
  };

  const addReminderTime = () => {
    setMedication(prev => ({ ...prev, reminderTimes: [...prev.reminderTimes, ''] }));
  };

  const removeReminderTime = (index) => {
    const newReminderTimes = medication.reminderTimes.filter((_, i) => i !== index);
    setMedication({ ...medication, reminderTimes: newReminderTimes });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!medication.name || !medication.startDate) {
      setError("Medication name and start date are required.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      if (isEditMode) {
        await updateMedication(id, medication);
      } else {
        await createMedication(medication);
      }
      navigate('/medications'); // Navigate to the full list page on success
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save medication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-emerald-600">
          {isEditMode ? 'Edit Medication' : 'Add New Medication'}
        </h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            {error}
          </div>
        )}
        
        {loading && isEditMode && <p>Loading medication details...</p>}

        {!loading && (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Medication Name</label>
              <input type="text" id="name" name="name" value={medication.name} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md" />
            </div>

            <div>
              <label htmlFor="dosage" className="block text-sm font-medium text-gray-700 mb-1">Dosage (e.g., 200mg)</label>
              <input type="text" id="dosage" name="dosage" value={medication.dosage} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" />
            </div>

            <div>
              <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
              <select id="frequency" name="frequency" value={medication.frequency} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md">
                <option>Once daily</option>
                <option>Twice daily</option>
                <option>Three times daily</option>
                <option>As needed</option>
              </select>
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Reminder Times</label>
              {medication.reminderTimes.map((time, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input type="time" value={time} onChange={(e) => handleReminderTimeChange(index, e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
                  {medication.reminderTimes.length > 1 && (
                    <button type="button" onClick={() => removeReminderTime(index)} className="p-2 text-red-500">&times;</button>
                  )}
                </div>
              ))}
              <button type="button" onClick={addReminderTime} className="mt-2 text-sm text-emerald-600 hover:underline">Add another time</button>
            </div>

            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input type="date" id="startDate" name="startDate" value={medication.startDate} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md" />
            </div>

            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">End Date (Optional)</label>
              <input type="date" id="endDate" name="endDate" value={medication.endDate} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" />
            </div>

            <div className="col-span-1 md:col-span-2">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Notes / Instructions</label>
              <textarea id="notes" name="notes" rows="4" value={medication.notes} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md"></textarea>
            </div>

            <div className="col-span-1 md:col-span-2 flex justify-center space-x-4 pt-4">
              <button type="submit" disabled={loading} className="px-8 py-3 bg-emerald-500 text-white font-bold rounded-full hover:bg-emerald-600">
                {loading ? 'Saving...' : (isEditMode ? 'Update Medication' : 'Save Medication')}
              </button>
              <button type="button" onClick={() => navigate('/medications')} className="px-8 py-3 bg-gray-200 text-gray-700 font-bold rounded-full hover:bg-gray-300">
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddEditMedication;