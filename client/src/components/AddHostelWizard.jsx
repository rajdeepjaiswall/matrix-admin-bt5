import { useState } from 'react';
import axios from 'axios';

const steps = ['Details', 'Address', 'Rooms', 'Owner'];

export default function AddHostelWizard() {
  const [current, setCurrent] = useState(0);
  const [form, setForm] = useState({
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    numRooms: '',
    roomTypes: '',
    amenities: '',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: ''
  });

  const next = () => setCurrent(c => Math.min(c + 1, steps.length - 1));
  const prev = () => setCurrent(c => Math.max(c - 1, 0));

  const submit = async () => {
    const res = await axios.post('/api/hostels', form);
    alert(`Owner ID: ${res.data.credentials.ownerId}\nPassword: ${res.data.credentials.password}`);
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Add Hostel</h1>
      <div className="mb-4">Step {current + 1} of {steps.length}: {steps[current]}</div>
      {current === 0 && (
        <div className="space-y-2">
          <input className="border p-2 w-full" placeholder="Hostel Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        </div>
      )}
      {current === 1 && (
        <div className="space-y-2">
          <input className="border p-2 w-full" placeholder="Address Line 1" value={form.addressLine1} onChange={e => setForm({...form, addressLine1: e.target.value})} />
          <input className="border p-2 w-full" placeholder="Address Line 2" value={form.addressLine2} onChange={e => setForm({...form, addressLine2: e.target.value})} />
          <input className="border p-2 w-full" placeholder="City" value={form.city} onChange={e => setForm({...form, city: e.target.value})} />
          <input className="border p-2 w-full" placeholder="State" value={form.state} onChange={e => setForm({...form, state: e.target.value})} />
          <input className="border p-2 w-full" placeholder="Pincode" value={form.pincode} onChange={e => setForm({...form, pincode: e.target.value})} />
        </div>
      )}
      {current === 2 && (
        <div className="space-y-2">
          <input className="border p-2 w-full" placeholder="Number of Rooms" value={form.numRooms} onChange={e => setForm({...form, numRooms: e.target.value})} />
          <input className="border p-2 w-full" placeholder="Room Types (comma separated)" value={form.roomTypes} onChange={e => setForm({...form, roomTypes: e.target.value})} />
          <input className="border p-2 w-full" placeholder="Amenities (comma separated)" value={form.amenities} onChange={e => setForm({...form, amenities: e.target.value})} />
        </div>
      )}
      {current === 3 && (
        <div className="space-y-2">
          <input className="border p-2 w-full" placeholder="Owner Name" value={form.ownerName} onChange={e => setForm({...form, ownerName: e.target.value})} />
          <input className="border p-2 w-full" placeholder="Owner Email" value={form.ownerEmail} onChange={e => setForm({...form, ownerEmail: e.target.value})} />
          <input className="border p-2 w-full" placeholder="Owner Phone" value={form.ownerPhone} onChange={e => setForm({...form, ownerPhone: e.target.value})} />
        </div>
      )}
      <div className="mt-4 space-x-2">
        {current > 0 && <button className="px-4 py-2 border" onClick={prev}>Back</button>}
        {current < steps.length - 1 && <button className="px-4 py-2 border" onClick={next}>Next</button>}
        {current === steps.length - 1 && <button className="px-4 py-2 border" onClick={submit}>Submit</button>}
      </div>
    </div>
  );
}
