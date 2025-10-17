import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Phone, Globe, MessageSquare, Database } from 'lucide-react';

const services = [
  {
    icon: Star,
    title: 'Customer Reputation & Google Reviews',
    description: 'Automate review collection and boost your online reputation with AI-powered feedback management.',
  },
  {
    icon: Phone,
    title: 'Voice Agents (Vapi)',
    description: 'Never miss a call again. AI voice agents handle reservations, inquiries, and customer support 24/7.',
  },
  {
    icon: Globe,
    title: 'Website Design & Automation',
    description: 'Modern, conversion-optimized websites with integrated automation workflows for seamless operations.',
  },
  {
    icon: MessageSquare,
    title: 'Chatbots (Website + WhatsApp)',
    description: 'Engage customers instantly on your website and WhatsApp with intelligent AI chatbots.',
  },
  {
    icon: Database,
    title: 'CRM',
    description: 'Centralize customer data, track interactions, and nurture relationships with our hospitality-focused CRM.',
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-20 lg:py-32 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive AI solutions designed specifically for hospitality businesses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover-elevate active-elevate-2 transition-all duration-300 hover:-translate-y-1 bg-white/5 backdrop-blur-lg border-white/10"
              data-testid={`card-service-${index}`}
            >
              <CardHeader>
                <div className="mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center">
                  <service.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl text-foreground">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
