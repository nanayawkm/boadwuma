import { serviceCategories } from '../data/mockData';

export default function CategoryGrid({ onCategorySelect }) {
  return (
    <div className="px-4 mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">What do you need help with?</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
        {serviceCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className="bg-white rounded-2xl p-3 sm:p-4 md:p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-200 active:scale-95 touch-target group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 transform group-active:scale-110 transition-transform duration-150">
                {category.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1 leading-tight">
                {category.name}
              </h3>
              <div className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 bg-blue-50 rounded-full">
                <span className="text-xs font-medium text-blue-600">
                  {category.providerCount} nearby
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}