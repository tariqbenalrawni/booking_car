import carsData from '@/data/cars.json';
import BookingForm from './BookingForm';

interface Car {
  id: string;
  name: string;
  model: string;
  image: string;
  pricePerDay: number;
}

interface PageProps {
  params: {
    id: string;
  };
}

export default function BookCarPage({ params }: PageProps) {
  const car = carsData.cars.find((c: Car) => c.id === params.id);

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container-custom">
          <div className="text-center">
            <p className="text-gray-600">السيارة غير موجودة</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <BookingForm car={car} />
        </div>
      </div>
    </main>
  );
} 