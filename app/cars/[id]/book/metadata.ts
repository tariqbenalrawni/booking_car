import type { Metadata } from 'next';
import carsData from '@/data/cars.json';

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const car = carsData.cars.find((c) => c.id === params.id);
  return {
    title: car ? `حجز ${car.name}` : 'حجز سيارة',
  };
} 