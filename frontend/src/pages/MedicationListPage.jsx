import React, { useState, useEffect } from 'react';
import { getMedications, deleteMedication } from '../api/medicationApi';
import { Link } from 'react-router-dom';


const MedicationListPage = () => {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMedications = async () => {
    try {
      setLoading(true);
      const response = await getMedications();
      setMedications(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch medications.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedications();
  }, []); // The empty dependency array means this runs once on component mount

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this medication?')) {
      try {
        await deleteMedication(id);
        // Refetch the medications list to update the UI
        fetchMedications();
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to delete medication.');
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading medications...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Medications</h1>
        <Link
          to="/add"
          className="px-4 py-2 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition duration-200"
        >
          + Add Medication
        </Link>
      </div>

      {medications.length === 0 ? (
        <p className="text-gray-500">You have not added any medications yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {medications.map((med) => (
            <div key={med._id} className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-2 text-gray-900">{med.name}</h2>
              <p className="text-gray-600"><strong>Dosage:</strong> {med.dosage}</p>
              <p className="text-gray-600"><strong>Frequency:</strong> {med.frequency}</p>
              <p className="text-gray-600"><strong>Notes:</strong> {med.notes || 'N/A'}</p>
              <div className="mt-4 flex justify-end space-x-2">
                 <Link
                  to={`/edit/${med._id}`}
                  className="px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(med._id)}
                  className="px-3 py-1 text-sm font-medium text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicationListPage;