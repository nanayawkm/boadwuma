import React from 'react';
import Link from 'next/link';
import { SERVICE_CATEGORIES } from '../data/mockData';

export default function ServiceCategoryGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {SERVICE_CATEGORIES.map((category) => (
        <Link
          key={category.id}
          href={`/services/${category.id}`}
          className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-200 border border-neutral-100 group"
        >
          <div className="text-center">
            {/* Icon */}
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
              {category.icon}
            </div>
            
            {/* Name */}
            <h3 className="text-base font-semibold text-text-900 mb-2">
              {category.name}
            </h3>
            
            {/* Services count */}
            <p className="text-sm text-neutral-600">
              {category.services.length} services
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}