'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Car {
  id: string;
  name: string;
  model: string;
  image: string;
  pricePerDay: number;
}

interface Booking {
  id: string;
  car: Car;
  pickupDate: string;
  returnDate: string;
  city: string;
  numberOfDays: number;
  totalPrice: number;
  createdAt: string;
}

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const loadBookings = () => {
    try {
      setIsLoading(true);
      console.log('Loading bookings...');

      // قراءة الحجوزات من localStorage
      const storedBookings = localStorage.getItem('bookings');
      console.log('Raw stored bookings:', storedBookings);

      if (!storedBookings) {
        console.log('No bookings found in localStorage');
        setBookings([]);
        return;
      }

      try {
        const parsedBookings = JSON.parse(storedBookings);
        console.log('Parsed bookings:', parsedBookings);

        if (!Array.isArray(parsedBookings)) {
          console.error('Bookings data is not an array:', parsedBookings);
          setBookings([]);
          return;
        }

        // التحقق من صحة البيانات وتصفيتها
        const validBookings = parsedBookings.filter((booking: any) => {
          const isValid = 
            booking &&
            booking.id &&
            booking.car &&
            booking.car.id &&
            booking.car.name &&
            booking.car.model &&
            booking.car.image &&
            booking.car.pricePerDay &&
            booking.pickupDate &&
            booking.returnDate &&
            booking.city &&
            booking.numberOfDays &&
            booking.totalPrice &&
            booking.createdAt;

          if (!isValid) {
            console.error('Invalid booking data:', booking);
          }

          return isValid;
        });

        // ترتيب الحجوزات من الأحدث إلى الأقدم
        const sortedBookings = validBookings.sort((a: Booking, b: Booking) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        console.log('Sorted bookings:', sortedBookings);

        setBookings(sortedBookings);
      } catch (parseError) {
        console.error('Error parsing bookings:', parseError);
        setBookings([]);
      }
    } catch (error) {
      console.error('Error loading bookings:', error);
      setBookings([]);
    } finally {
      setIsLoading(false);
    }
  };

  // تحميل الحجوزات عند تحميل الصفحة
  useEffect(() => {
    console.log('Component mounted, loading bookings...');
    loadBookings();
  }, []);

  // تحديث الحجوزات عند التركيز على الصفحة
  useEffect(() => {
    const handleFocus = () => {
      console.log('Window focused, reloading bookings...');
      loadBookings();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container-custom">
          <div className="text-center">
            <p className="text-gray-600">جاري تحميل الحجوزات...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">حجوزاتي</h1>
          <div className="flex gap-4">
            <button
              onClick={() => {
                console.log('Manual refresh clicked');
                loadBookings();
              }}
              className="text-blue-600 hover:text-blue-700"
            >
              تحديث
            </button>
            <Link href="/" className="text-blue-600 hover:text-blue-700">
              العودة للرئيسية
            </Link>
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">لا توجد حجوزات حالياً</p>
            <Link href="/cars" className="text-blue-600 hover:text-blue-700">
              تصفح السيارات المتاحة
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="relative w-full md:w-48 h-32">
                      <Image
                        src={booking.car.image}
                        alt={booking.car.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 192px"
                        className="object-cover rounded-lg"
                        priority
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold mb-2">{booking.car.name}</h2>
                      <p className="text-gray-600 mb-4">{booking.car.model}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-600">
                            تاريخ الاستلام: <span className="font-semibold">{formatDate(booking.pickupDate)}</span>
                          </p>
                          <p className="text-gray-600">
                            تاريخ الإرجاع: <span className="font-semibold">{formatDate(booking.returnDate)}</span>
                          </p>
                          <p className="text-gray-600">
                            المنطقة: <span className="font-semibold">{booking.city}</span>
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">
                            عدد الأيام: <span className="font-semibold">{booking.numberOfDays}</span>
                          </p>
                          <p className="text-gray-600">
                            السعر لكل يوم: <span className="font-semibold">{booking.car.pricePerDay} ريال</span>
                          </p>
                          <p className="text-gray-600">
                            السعر الإجمالي: <span className="font-semibold">{booking.totalPrice} ريال</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
} 