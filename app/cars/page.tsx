'use client';

import Link from 'next/link';
import Image from 'next/image';
import carsData from '@/data/cars.json';
import Navbar from '../../components/Navbar';

export default function CarsPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <Navbar />
      
      <div className="container-custom">
        <h1 className="text-2xl font-bold mb-8">قائمة السيارات المتاحة</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {carsData.cars.map((car) => (
            <Link
              key={car.id}
              href={`/cars/${car.id}`}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative w-full h-48">
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{car.name}</h2>
                <p className="text-gray-600 mb-2">{car.model}</p>
                <p className="text-blue-600 font-semibold">
                  {car.pricePerDay} ريال / يوم
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
} 