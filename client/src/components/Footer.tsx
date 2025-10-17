import { SiLinkedin, SiX, SiFacebook, SiInstagram } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Footer() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
            Ready to Transform Your Hospitality Business?
          </h3>
          <p className="text-muted-foreground mb-6">
            Join hundreds of restaurants, cafés, and hotels using AI automation
          </p>
          <Button
            size="lg"
            className="group"
            onClick={scrollToContact}
            data-testid="button-footer-cta"
          >
            Book a Free Demo
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pt-8 border-t border-white/10">
          <div>
            <h3 className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent mb-4">
              Aivora Hospitality
            </h3>
            <p className="text-muted-foreground max-w-md">
              AI-powered automation solutions for hospitality businesses. Transform your customer experience with cutting-edge technology.
            </p>
          </div>

          <div className="md:text-right">
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <div className="flex gap-4 md:justify-end">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover-elevate active-elevate-2 transition-all"
                aria-label="LinkedIn"
                data-testid="link-linkedin"
              >
                <SiLinkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover-elevate active-elevate-2 transition-all"
                aria-label="X (Twitter)"
                data-testid="link-twitter"
              >
                <SiX className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover-elevate active-elevate-2 transition-all"
                aria-label="Facebook"
                data-testid="link-facebook"
              >
                <SiFacebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover-elevate active-elevate-2 transition-all"
                aria-label="Instagram"
                data-testid="link-instagram"
              >
                <SiInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Aivora Hospitality. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
