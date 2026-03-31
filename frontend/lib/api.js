const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function getVehicles() {
  const res = await fetch(`${API_BASE}/vehicles`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch vehicles. Is the backend running?');
  return res.json();
}

export async function getVehicle(id) {
  const res = await fetch(`${API_BASE}/vehicles/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Vehicle not found');
  return res.json();
}

export async function createVehicle(data) {
  const res = await fetch(`${API_BASE}/vehicles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Failed to create vehicle');
  return json;
}

export async function updateVehicle(id, data) {
  const res = await fetch(`${API_BASE}/vehicles/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Failed to update vehicle');
  return json;
}

export async function deleteVehicle(id) {
  const res = await fetch(`${API_BASE}/vehicles/${id}`, { method: 'DELETE' });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Failed to delete vehicle');
  return json;
}
