import carsData from '@/data/cars.json';
import BookingForm from './BookingForm';

interface Car {
  id: string;
  name: string;
  model: string;
  image: string;
  pricePerDay: number;
}

interface Params {
  id: string;
}

export function generateStaticParams() {
  return carsData.cars.map((car: Car) => ({
    id: car.id,
  }));
}

export function generateMetadata({ params }: { params: Params }) {
  const car = carsData.cars.find((c: Car) => c.id === params.id);
  return {
    title: car ? `حجز ${car.name}` : 'حجز سيارة',
  };
}

export default function BookCarPage({ params }: { params: Params }) {
  const car = carsData.cars.find((car) => car.id === params.id);

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">السيارة غير موجودة</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <BookingForm car={car} />
      </div>
    </main>
  );
}
