'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import carsData from '@/data/cars.json';

interface Car {
  id: string;
  name: string;
  model: string;
  image: string;
  pricePerDay: number;
  description: string;
  features: string[];
}

interface PageProps {
  params: {
    id: string;
  };
}

export default function CarDetails({ params }: PageProps) {
  const router = useRouter();
  const [car, setCar] = useState<Car | null>(null);

  useEffect(() => {
    const selectedCar = carsData.cars.find((c: Car) => c.id === params.id);
    if (selectedCar) {
      setCar(selectedCar);
    }
  }, [params.id]);

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container-custom">
          <div className="text-center">
            <p className="text-gray-600">جاري تحميل بيانات السيارة...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">تفاصيل السيارة</h1>
            <Link href="/cars" className="text-blue-600 hover:text-blue-700">
              العودة للقائمة
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative w-full h-96">
              <Image
                src={car.image}
                alt={car.name}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{car.name}</h2>
              <p className="text-gray-600 mb-4">{car.model}</p>
              <p className="text-blue-600 font-semibold mb-6">
                {car.pricePerDay} ريال / يوم
              </p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">الوصف</h3>
                <p className="text-gray-600">{car.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">المميزات</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {car.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="ml-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={`/cars/${car.id}/book`}
                className="block w-full bg-blue-600 text-white text-center py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                حجز السيارة
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 