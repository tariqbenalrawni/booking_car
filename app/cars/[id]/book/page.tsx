import { notFound } from 'next/navigation';
import carsData from '@/data/cars.json';
import BookingForm from './BookingForm';

interface Car {
  id: string;
  name: string;
  model: string;
  image: string;
  pricePerDay: number;
}

export default function BookCarPage({ params }: { params: { id: string } }) {
  const car = carsData.cars.find((car) => car.id === params.id);

  if (!car) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <BookingForm car={car} />
      </div>
    </main>
  );
} 