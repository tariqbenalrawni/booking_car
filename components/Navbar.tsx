'use client';

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            تأجير السيارات
          </Link>
          
          <div className="flex space-x-8 space-x-reverse">
            <Link
              href="/"
              className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
            >
              الرئيسية
            </Link>
            <Link
              href="/cars"
              className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
            >
              جميع السيارات
            </Link>
            <Link
              href="/my-bookings"
              className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
            >
              حجوزاتي
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 