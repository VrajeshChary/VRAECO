import { useState, useEffect } from 'react';

export default function useDeliveryEstimate() {
  const [city, setCity] = useState('');
  const [minDays, setMinDays] = useState(3);
  const [maxDays, setMaxDays] = useState(5);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        // Simple estimate based on lat
        const lat = pos.coords.latitude;
        if (lat > 25) { setCity('North India'); setMinDays(3); setMaxDays(5); }
        else if (lat < 12) { setCity('South India'); setMinDays(4); setMaxDays(6); }
        else { setCity('Central India'); setMinDays(3); setMaxDays(5); }
      },
      () => {
        setCity('India'); setMinDays(4); setMaxDays(7);
      }
    );
  }, []);

  const minDate = new Date(); minDate.setDate(minDate.getDate() + minDays);
  const maxDate = new Date(); maxDate.setDate(maxDate.getDate() + maxDays);
  const fmt = (d: Date) => d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

  return { city, minDate: fmt(minDate), maxDate: fmt(maxDate) };
}
