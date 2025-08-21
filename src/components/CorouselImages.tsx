"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const CorouselImages = ({ images }: { images: string[] }) => {
  const autoplay = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));

  return (
    <Carousel
      opts={{ loop: true }} // ✅ keep sliding forward infinitely
      plugins={[autoplay.current]}
      className="w-full max-w-[500px]"
    >
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-0">
                  <img
                    src={src}
                    alt={`Slide ${index + 1}`}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CorouselImages;
