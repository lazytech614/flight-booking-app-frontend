'use client';
import { useState, useEffect } from 'react';
import { fetchFlights, bookFlight } from '../../lib/api';
import FlightCard from '../../components/FlightCard';
import { Flight } from '../../types/flight';

export default function FlightsPage() {
  const [from, setFrom] = useState('DEL');
  const [to, setTo] = useState('BLR');
  const [flights, setFlights] = useState<Flight[]>([]);
  const [wallet, setWallet] = useState(50000);

  useEffect(() => {
    fetchFlights(from, to).then(setFlights);
  }, [from, to]);

  const handleBook = async (id: string) => {
    const booking = await bookFlight(id, 'user123');
    setWallet(w => w - booking.pricePaid);
    // regenerate flights to reflect dynamic pricing
    setFlights(await fetchFlights(from, to));
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <input value={from} onChange={e => setFrom(e.target.value)} className="p-2 border rounded" />
        <input value={to} onChange={e => setTo(e.target.value)} className="p-2 border rounded" />
        <button onClick={() => fetchFlights(from, to).then(setFlights)} className="bg-primary text-white px-4 rounded">
          Search
        </button>
      </div>
      <p>Wallet Balance: <strong>₹{wallet}</strong></p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {flights.map(f => (
          <FlightCard key={f.id} flight={f} onBook={handleBook} />
        ))}
      </div>
    </div>
  );
}
