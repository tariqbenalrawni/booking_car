import { Suspense } from 'react';
import carsData from '@/data/cars.json';
import BookingForm from './BookingForm';

interface Car {
  id: string;
  name: string;
  model: string;
  image: string;
  pricePerDay: number;
}

export default function BookCarPage({
  params,
}: {
  params: { id: string };
}) {
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
          <Suspense fallback={
            <div className="text-center">
              <p className="text-gray-600">جاري تحميل نموذج الحجز...</p>
            </div>
          }>
            <BookingForm car={car} />
          </Suspense>
        </div>
      </div>
    </main>
  );
} 