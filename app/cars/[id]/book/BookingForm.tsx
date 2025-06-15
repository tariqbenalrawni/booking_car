'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Car {
  id: string;
  name: string;
  model: string;
  image: string;
  pricePerDay: number;
}

interface BookingFormProps {
  car: Car;
}

export default function BookingForm({ car }: BookingFormProps) {
  const router = useRouter();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const booking = {
        id: Date.now().toString(),
        carId: car.id,
        car,
        startDate,
        endDate,
        totalPrice: calculateTotalPrice(),
        createdAt: new Date().toISOString(),
      };

      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      bookings.push(booking);
      localStorage.setItem('bookings', JSON.stringify(bookings));

      alert('تم الحجز بنجاح!');
      router.push('/my-bookings');
    } catch (error) {
      console.error('Error booking car:', error);
      alert('حدث خطأ أثناء الحجز. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalPrice = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return days * car.pricePerDay;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-64 w-full">
        <Image
          src={car.image}
          alt={car.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
      
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">حجز {car.name}</h1>
        <p className="text-gray-600 mb-4">الموديل: {car.model}</p>
        <p className="text-gray-600 mb-6">السعر اليومي: {car.pricePerDay} ريال</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
              تاريخ البداية
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
              تاريخ النهاية
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate || new Date().toISOString().split('T')[0]}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {startDate && endDate && (
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-lg font-semibold">
                السعر الإجمالي: {calculateTotalPrice()} ريال
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !startDate || !endDate}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'جاري الحجز...' : 'تأكيد الحجز'}
          </button>
        </form>
      </div>
    </div>
  );
} 