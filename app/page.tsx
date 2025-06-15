import carsData from '../data/cars.json';
import CarCard from '../components/CarCard';
import Navbar from '../components/Navbar';

export default function Home() {
  // عرض السيارات المميزة (الأولى والثانية)
  const featuredCars = carsData.cars.slice(0, 2);

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-600 to-blue-700 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">أهلاً بك في خدمة تأجير السيارات</h1>
          <p className="text-xl md:text-2xl opacity-90">اختر سيارتك المفضلة واستمتع برحلة مريحة وآمنة</p>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title">سيارات مميزة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {featuredCars.map((car) => (
              <CarCard key={car.id} {...car} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors duration-300">
              <div className="text-4xl mb-4">🚗</div>
              <h3 className="text-xl font-semibold mb-2">سيارات متنوعة</h3>
              <p className="text-gray-600">اختر من مجموعة واسعة من السيارات الحديثة</p>
            </div>
            <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors duration-300">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">أسعار تنافسية</h3>
              <p className="text-gray-600">أسعار مناسبة مع خيارات دفع مرنة</p>
            </div>
            <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors duration-300">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold mb-2">خدمة متميزة</h3>
              <p className="text-gray-600">خدمة عملاء على مدار الساعة</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
