import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Owner, Bella Vista Restaurant',
    content: 'Aivora transformed our customer service. We never miss a reservation call anymore, and our Google reviews have increased by 300%!',
    rating: 5,
  },
  {
    name: 'Michael Rodriguez',
    role: 'Manager, Grand Hotel & Spa',
    content: 'The AI voice agent handles guest inquiries 24/7. Our staff can focus on in-person service while automation takes care of the rest.',
    rating: 5,
  },
  {
    name: 'Emma Thompson',
    role: 'Café Owner, The Daily Grind',
    content: 'The WhatsApp chatbot has been a game-changer. Customers can place orders directly, and we see higher satisfaction scores every month.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="relative py-20 lg:py-32 px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 text-foreground">
            What Our Clients Say
          </h2>
          <p className="text-lg text-foreground/80">
            Trusted by hospitality businesses worldwide
          </p>
        </div>

        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardContent className="p-8 lg:p-12">
            <div className="flex justify-center mb-6">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-primary text-primary" />
              ))}
            </div>

            <blockquote className="text-lg lg:text-xl text-center mb-8 italic text-foreground">
              "{currentTestimonial.content}"
            </blockquote>

            <div className="flex items-center justify-center gap-4">
              <Avatar className="w-12 h-12 border-2 border-primary/20">
                <AvatarFallback className="bg-gradient-to-br from-primary to-chart-2 text-primary-foreground font-semibold">
                  {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="font-semibold text-foreground">{currentTestimonial.name}</p>
                <p className="text-sm text-foreground/70">{currentTestimonial.role}</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPrevious}
                data-testid="button-testimonial-prev"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex ? 'bg-primary w-8' : 'bg-muted-foreground/30'
                    }`}
                    data-testid={`button-testimonial-dot-${index}`}
                  />
                ))}
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={goToNext}
                data-testid="button-testimonial-next"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
