'use client';

import Image from 'next/image';
import Link from 'next/link';

interface CarCardProps {
  id: string;
  name: string;
  model: string;
  pricePerDay: number;
  image: string;
  description: string;
}

const CarCard = ({ id, name, model, pricePerDay, image, description }: CarCardProps) => {
  return (
    <div className="card w-full">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
          <span className="text-lg font-bold text-blue-600">{pricePerDay} ريال</span>
        </div>
        <p className="text-gray-600 mb-2">موديل: {model}</p>
        <p className="text-gray-700 mb-4 line-clamp-2">{description}</p>
        <Link
          href={`/cars/${id}`}
          className="btn-primary w-full text-center block"
        >
          عرض التفاصيل
        </Link>
      </div>
    </div>
  );
};

export default CarCard; 