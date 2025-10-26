import React, { useState, useEffect, useCallback } from 'react';
import { getMedications, logMedicationStatus } from '../api/medicationApi';
import { Link } from 'react-router-dom';
import { requestNotificationPermission, scheduleTodaysNotifications } from '../utils/notification';

const HomePage = () => {
  const [todaysMeds, setTodaysMeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTodaysMeds = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getMedications();

      // Helper to check if a medication is scheduled for today
      const isScheduledForToday = (med) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize today to the start of the day

        const startDate = new Date(med.startDate);
        startDate.setHours(0, 0, 0, 0); // Normalize start date

        // If there's an end date, normalize it as well
        const endDate = med.endDate ? new Date(med.endDate) : null;
        if (endDate) {
          endDate.setHours(0, 0, 0, 0);
        }

        // Check if today is on or after the start date
        const isAfterStartDate = today >= startDate;
        // Check if there's no end date OR if today is on or before the end date
        const isBeforeEndDate = !endDate || today <= endDate;

        return isAfterStartDate && isBeforeEndDate;
      };
      
      const filteredMeds = response.data.filter(isScheduledForToday);

      setTodaysMeds(filteredMeds);
      
      // After filtering, schedule notifications for the meds that are due today
      scheduleTodaysNotifications(filteredMeds);
      
      setError(null);
    } catch (err) {
      setError('Failed to fetch your medication schedule.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // When the component mounts, ask for notification permission and fetch meds
    requestNotificationPermission();
    fetchTodaysMeds();
  }, [fetchTodaysMeds]);

  const handleMarkAsTaken = async (id) => {
    try {
      // Call the backend to log that the medication was taken
      await logMedicationStatus(id, { status: "Taken" });

      // Update the UI immediately for a better user experience, without needing a full refetch
      setTodaysMeds(prevMeds => 
        prevMeds.map(med => 
          med._id === id ? { ...med, lastTaken: new Date().toISOString() } : med
        )
      );
    } catch (err) {
      alert("Failed to mark medication as taken. Please try again.");
      console.error(err);
    }
  };

  // Helper to check if a medication has already been marked as taken today
  const wasTakenToday = (med) => {
    if (!med.lastTaken) return false;
    const lastTakenDate = new Date(med.lastTaken).toDateString();
    const todayDate = new Date().toDateString();
    return lastTakenDate === todayDate;
  };

  if (loading) {
    return <div className="text-center p-10">Loading your schedule for today...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-600 bg-red-100 rounded-lg">{error}</div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">Today's Schedule</h1>
        <Link
          to="/add"
          className="w-full sm:w-auto px-4 py-2 bg-emerald-500 text-white text-center font-semibold rounded-lg hover:bg-emerald-600 transition duration-200"
        >
          + Add New Medication
        </Link>
      </div>

      {todaysMeds.length === 0 ? (
        <div className="text-center py-12 px-6 bg-white rounded-lg shadow-md">
          <p className="text-xl text-gray-500">You have no medications scheduled for today.</p>
          <p className="mt-2 text-gray-400">Add a new medication or check your full list.</p>
          <Link to="/medications" className="mt-6 inline-block px-6 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700">
            View All Medications
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {todaysMeds.map(med => (
            <div key={med._id} className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-gray-900">{med.name}</h2>
                <p className="text-gray-600">{med.dosage} - {med.frequency}</p>
                <p className="text-sm text-gray-500">
                  Reminder Times: {med.reminderTimes.join(', ')}
                </p>
              </div>
              <div className="w-full sm:w-auto">
                <button
                  onClick={() => handleMarkAsTaken(med._id)}
                  className={`w-full px-4 py-2 font-semibold rounded-lg transition duration-200 ${
                    wasTakenToday(med)
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                  disabled={wasTakenToday(med)}
                >
                  {wasTakenToday(med) ? 'Taken Today' : 'Mark as Taken'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;