import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HostelList from './components/HostelList';
import AddHostelWizard from './components/AddHostelWizard';

export default function App() {
  return (
    <Router>
      <div className="flex">
        <aside className="w-48 bg-gray-800 min-h-screen text-white p-4">
          <h2 className="font-bold mb-4">Hostel Management</h2>
          <ul>
            <li className="mb-2"><Link to="/hostels">Hostels</Link></li>
            <li className="mb-2"><Link to="/add-hostel">Add Hostel</Link></li>
          </ul>
        </aside>
        <main className="flex-1 p-4">
          <Routes>
            <Route path="/hostels" element={<HostelList />} />
            <Route path="/add-hostel" element={<AddHostelWizard />} />
            <Route path="*" element={<HostelList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
