'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export interface GalleryShot {
  src: string;
  alt: string;
  caption: string;
}

export function ProjectGallery({ shots }: { shots: GalleryShot[] }) {
  if (shots.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-default-200">
      <Swiper
        modules={[Navigation, Pagination, Keyboard]}
        navigation
        keyboard
        pagination={{ clickable: true }}
        slidesPerView={1}
        className="project-gallery"
      >
        {shots.map((shot, i) => (
          <SwiperSlide key={i}>
            <div className="relative aspect-[16/10] w-full bg-default-100">
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 960px"
                className="object-contain"
                priority={i === 0}
              />
            </div>
            <div className="bg-default-50 px-4 py-3 text-sm text-default-600">
              {shot.caption}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
