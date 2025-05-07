import { Flight } from '../types/flight';
import { Booking } from '../types/booking';

const API_BASE = process.env.NEXT_PUBLIC_API_URL!;

export async function fetchFlights(from: string, to: string): Promise<Flight[]> {
  const res = await fetch(`${API_BASE}/flights?from=${from}&to=${to}`);
  console.log(res);
  return res.json();
}

export async function bookFlight(flightId: string, userId: string): Promise<Booking> {
  const res = await fetch(`${API_BASE}/book`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ flightId, userId }),
  });
  return res.json();
}

export async function fetchBookings(userId: string): Promise<Booking[]> {
  const res = await fetch(`${API_BASE}/bookings/${userId}`);
  return res.json();
}
