import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background pointer-events-none" />
      
      <div className="relative max-w-6xl mx-auto text-center pt-20 pb-16">
        <div className="space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary via-chart-3 to-chart-2 bg-clip-text text-transparent">
              AI-Powered Reputation, Voice & Automation
            </span>
            <br />
            <span className="text-foreground mt-2 block">for Hospitality</span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Turn missed calls into bookings. Turn happy guests into 5-star reviews.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              size="lg"
              className="px-8 py-6 text-lg group"
              onClick={scrollToContact}
              data-testid="button-book-demo-hero"
            >
              Book a Free Demo
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg bg-background/20 backdrop-blur-sm border-white/20 hover:bg-background/30"
              onClick={() => {
                const element = document.getElementById('services');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              data-testid="button-learn-more"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
