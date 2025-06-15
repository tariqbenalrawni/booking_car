import carsData from '@/data/cars.json';

export function generateStaticParams() {
  return carsData.cars.map((car) => ({
    id: car.id,
  }));
} 