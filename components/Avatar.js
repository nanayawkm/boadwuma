import { useState } from 'react';
import Image from 'next/image';
import { User } from 'lucide-react';

export default function Avatar({ src, alt, size = 48, className = '' }) {
  const [imageError, setImageError] = useState(false);
  
  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const sizeClasses = {
    32: 'w-8 h-8 text-xs',
    40: 'w-10 h-10 text-sm',
    48: 'w-12 h-12 text-base',
    64: 'w-16 h-16 text-lg',
    80: 'w-20 h-20 text-xl',
  };

  if (imageError || !src) {
    return (
      <div className={`${sizeClasses[size]} ${className} bg-secondary-100 border-2 border-primary-500 rounded-full flex items-center justify-center flex-shrink-0`}>
        {alt ? (
          <span className="font-semibold text-primary-600">
            {getInitials(alt)}
          </span>
        ) : (
          <User size={size * 0.5} className="text-primary-600" />
        )}
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} ${className} relative rounded-full overflow-hidden flex-shrink-0`}>
      <Image
        src={src}
        alt={alt || 'Profile picture'}
        fill
        className="object-cover"
        onError={() => setImageError(true)}
      />
    </div>
  );
}