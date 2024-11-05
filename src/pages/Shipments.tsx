import React, { useState } from 'react';
import ShipmentsTable from '../components/shipments/ShipmentsTable';
import { Shipment } from '../types/models';

export function Shipments() {
  const [shipments] = useState<Shipment[]>([
    // Your mock shipments here
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Shipments</h1>
      <ShipmentsTable shipments={shipments} />
    </div>
  );
} 