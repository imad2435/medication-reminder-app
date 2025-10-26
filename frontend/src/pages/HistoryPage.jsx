import React, { useState, useEffect } from 'react';
import { getHistory } from '../api/historyApi';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await getHistory();
        setHistory(response.data);
      } catch (error) {
        console.error("Failed to fetch history");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) return <p>Loading history...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Medication History</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <ul className="space-y-4">
          {history.length > 0 ? history.map(item => (
            <li key={item._id} className="border-b pb-2">
              <p className="font-semibold">{item.action}</p>
              <p className="text-sm text-gray-500">
                {new Date(item.timestamp).toLocaleString()}
              </p>
            </li>
          )) : <p>No history found.</p>}
        </ul>
      </div>
    </div>
  );
};

export default HistoryPage;