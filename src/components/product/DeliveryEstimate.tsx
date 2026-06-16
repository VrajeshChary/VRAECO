import useDeliveryEstimate from '../../components/product/useDeliveryEstimate';
import { MapPin, Truck } from 'lucide-react';

export default function DeliveryEstimate() {
  const { city, minDate, maxDate } = useDeliveryEstimate();

  return (
    <div className="flex items-center gap-4 mb-3">
      <span className="text-[0.72rem] text-text-muted flex items-center gap-1.5">
        <MapPin size={14} className="text-gold" />
        Delivering to <strong className="text-text-main">{city}</strong>
      </span>
      <span className="text-[0.72rem] text-text-muted flex items-center gap-1.5">
        <Truck size={14} className="text-jade" /> Arrives between <strong className="text-jade">{minDate} - {maxDate}</strong>
      </span>
    </div>
  );
}