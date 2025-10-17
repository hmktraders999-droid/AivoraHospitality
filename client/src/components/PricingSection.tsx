import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const pricingPlans = [
  {
    name: 'Growth',
    price: '$999',
    period: '/month',
    description: 'Perfect for growing hospitality businesses',
    features: [
      'AI Voice Agent (up to 500 calls/month)',
      'Website Chatbot Integration',
      'Google Reviews Automation',
      'Basic CRM Access',
      'Email Support',
      'Monthly Analytics Reports',
    ],
    popular: true,
  },
  {
    name: 'Premium',
    price: '$2,499',
    period: '/month',
    description: 'Complete automation for established venues',
    features: [
      'AI Voice Agent (unlimited calls)',
      'Website + WhatsApp Chatbots',
      'Advanced Review Management',
      'Full CRM Suite with Automation',
      'Custom Website Design',
      'Priority Support & Dedicated Manager',
      'Real-time Analytics Dashboard',
      'API Access',
    ],
  },
];

export default function PricingSection() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="relative py-20 lg:py-32 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your business needs
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            * One-time setup fee of $500 applies to all plans
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={`hover-elevate active-elevate-2 transition-all duration-300 ${
                plan.popular
                  ? 'border-primary/50 bg-gradient-to-b from-primary/5 to-transparent'
                  : 'bg-white/5 backdrop-blur-lg border-white/10'
              }`}
              data-testid={`card-pricing-${plan.name.toLowerCase()}`}
            >
              {plan.popular && (
                <div className="bg-gradient-to-r from-primary to-chart-2 text-primary-foreground text-center py-2 text-sm font-semibold rounded-t-lg">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-display font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-muted-foreground mt-2">{plan.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={scrollToContact}
                  data-testid={`button-get-started-${plan.name.toLowerCase()}`}
                >
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
