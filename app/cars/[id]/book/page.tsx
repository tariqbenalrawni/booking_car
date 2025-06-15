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
}

interface PageProps {
  params: {
    id: string;
  };
}

const PRICE_PER_DAY = 200;

export default function BookCar({ params }: PageProps) {
  const router = useRouter();
  const [car, setCar] = useState<Car | null>(null);
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [city, setCity] = useState('');
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cities = [
    'الرياض',
    'جدة',
    'الدمام',
    'مكة المكرمة',
    'المدينة المنورة',
    'القصيم'
  ];

  useEffect(() => {
    const selectedCar = carsData.cars.find((c: Car) => c.id === params.id);
    if (selectedCar) {
      setCar(selectedCar);
    }
  }, [params.id]);

  useEffect(() => {
    if (pickupDate && returnDate) {
      const start = new Date(pickupDate);
      const end = new Date(returnDate);
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      setNumberOfDays(days);
      setTotalPrice(days * PRICE_PER_DAY);
    }
  }, [pickupDate, returnDate]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!car) return;

    try {
      setIsSubmitting(true);
      console.log('Starting booking process...');

      // إنشاء كائن الحجز
      const booking = {
        id: Date.now().toString(),
        car: {
          id: car.id,
          name: car.name,
          model: car.model,
          image: car.image,
          pricePerDay: car.pricePerDay
        },
        pickupDate,
        returnDate,
        city,
        numberOfDays,
        totalPrice,
        createdAt: new Date().toISOString()
      };

      console.log('Created booking object:', booking);

      // قراءة الحجوزات الحالية
      const storedBookings = localStorage.getItem('bookings');
      console.log('Current stored bookings:', storedBookings);

      let bookings = [];
      if (storedBookings) {
        try {
          bookings = JSON.parse(storedBookings);
          if (!Array.isArray(bookings)) {
            console.error('Stored bookings is not an array, resetting to empty array');
            bookings = [];
          }
        } catch (error) {
          console.error('Error parsing stored bookings:', error);
          bookings = [];
        }
      }

      // إضافة الحجز الجديد
      bookings.push(booking);
      console.log('Updated bookings array:', bookings);

      // حفظ الحجوزات في localStorage
      localStorage.setItem('bookings', JSON.stringify(bookings));
      console.log('Bookings saved to localStorage');

      // عرض رسالة نجاح
      alert('تم تأكيد الحجز بنجاح!');
      console.log('Booking confirmed, redirecting to bookings page...');

      // الانتقال إلى صفحة الحجوزات
      router.push('/my-bookings');
    } catch (error) {
      console.error('Error saving booking:', error);
      alert('حدث خطأ أثناء حفظ الحجز. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <h1 className="text-2xl font-bold">حجز سيارة</h1>
            <Link href={`/cars/${car.id}`} className="text-blue-600 hover:text-blue-700">
              العودة لتفاصيل السيارة
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative w-full md:w-64 h-48">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 256px"
                    className="object-cover rounded-lg"
                    priority
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-2">{car.name}</h2>
                  <p className="text-gray-600 mb-4">{car.model}</p>
                  <p className="text-gray-600">
                    السعر لكل يوم: <span className="font-semibold">{PRICE_PER_DAY} ريال</span>
                  </p>
                </div>
              </div>

              <form onSubmit={handleBooking} className="mt-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700 mb-2">
                      تاريخ الاستلام
                    </label>
                    <input
                      type="date"
                      id="pickupDate"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700 mb-2">
                      تاريخ الإرجاع
                    </label>
                    <input
                      type="date"
                      id="returnDate"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      min={pickupDate || new Date().toISOString().split('T')[0]}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                      المنطقة
                    </label>
                    <select
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">اختر المنطقة</option>
                      {cities.map((cityName) => (
                        <option key={cityName} value={cityName}>
                          {cityName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {numberOfDays > 0 && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600">
                      عدد الأيام: <span className="font-semibold">{numberOfDays}</span>
                    </p>
                    <p className="text-gray-600">
                      السعر الإجمالي: <span className="font-semibold">{totalPrice} ريال</span>
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'جاري التأكيد...' : 'تأكيد الحجز'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 