import React from 'react';
import { Flight } from '../types/flight';

interface Props {
  flight: Flight;
  onBook: (id: string) => void;
}

export default function FlightCard({ flight, onBook }: Props) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col space-y-3">
      <div className="flex justify-between">
        <h2 className="font-semibold">{flight.airline}</h2>
        <span>{flight.flightNumber}</span>
      </div>
      <div className="grid grid-cols-2 text-sm text-gray-600">
        <div>
          <p>From</p><p>{flight.origin}</p>
        </div>
        <div>
          <p>To</p><p>{flight.destination}</p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-secondary">₹{flight.dynamicPrice.toFixed(0)}</span>
        <button
          onClick={() => onBook(flight.id)}
          className="bg-secondary text-white px-3 py-1 rounded hover:bg-secondary/90"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
