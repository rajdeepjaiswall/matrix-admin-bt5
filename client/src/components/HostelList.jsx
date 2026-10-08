import { useEffect, useState } from 'react';
import axios from 'axios';

export default function HostelList() {
  const [hostels, setHostels] = useState([]);

  useEffect(() => {
    axios.get('/api/hostels').then(res => setHostels(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Registered Hostels</h1>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">City</th>
            <th className="p-2 border">Rooms</th>
          </tr>
        </thead>
        <tbody>
          {hostels.map(h => (
            <tr key={h.id} className="border-b">
              <td className="p-2 border">{h.name}</td>
              <td className="p-2 border">{h.city}</td>
              <td className="p-2 border text-center">{h.num_rooms}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
