import Image from 'next/image';

interface CategoryBannerProps {
  title: string;
  description: string;
  imageUrl: string;
}

export default function CategoryBanner({ title, description, imageUrl }: CategoryBannerProps) {
  return (
    <div className="relative">
      {/* Fixed aspect ratio container for the image */}
      <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
      </div>
      
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 md:mb-4">
              {title}
            </h1>
            <p className="text-sm sm:text-base text-white/90 max-w-lg">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}