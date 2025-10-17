import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const pricingPlans = [
  {
    name: 'Growth',
    price: '$497',
    period: '/month',
    description: 'Perfect for growing hospitality businesses',
    features: [
      'Dual Voice AI agents (inbound + follow-up)',
      'Website + WhatsApp chatbot integration',
      'Automated review funnel (Google + email/SMS)',
      'Loyalty campaign automation',
      'Missed call text-back system',
      '3 AI workflow automations/month',
      'Reputation dashboard',
    ],
    popular: true,
  },
  {
    name: 'Premium',
    price: '$997',
    period: '/month',
    description: 'For large restaurants, hotel chains, or franchises',
    features: [
      'Everything in Growth +',
      'Full website build or redesign (conversion-focused)',
      'Multi-channel AI system (Voice + WhatsApp + Website Chat)',
      'Advanced CRM customization',
      'Automated staff task reminders',
      '5+ AI workflows/month',
      'Custom analytics dashboard',
      'Dedicated account manager',
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
    <section id="pricing" className="relative py-20 lg:py-32 px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm mb-6"
          >
            <span className="text-sm text-blue-400 font-medium">Flexible Plans</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-foreground">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Choose the plan that fits your business needs
          </p>
          <p className="text-sm text-foreground/60 mt-6 inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            One-time setup fee of $500 applies to all plans
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -8 }}
            >
              <Card
                className={`group h-full relative overflow-hidden backdrop-blur-lg transition-all duration-500 ${
                  plan.popular
                    ? 'border-blue-500/50 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 shadow-xl shadow-blue-500/20'
                    : 'bg-white/5 border-white/10 hover:border-blue-500/30'
                }`}
                data-testid={`card-pricing-${plan.name.toLowerCase()}`}
              >
                {plan.popular && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-center py-3 text-sm font-semibold rounded-t-lg flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </motion.div>
                )}

                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <CardHeader className="relative">
                  <CardTitle className="text-3xl text-foreground group-hover:text-blue-400 transition-colors duration-300">
                    {plan.name}
                  </CardTitle>
                  <div className="mt-6">
                    <motion.span
                      className="text-5xl font-display font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
                      whileHover={{ scale: 1.05 }}
                    >
                      {plan.price}
                    </motion.span>
                    <span className="text-foreground/70 text-lg">{plan.period}</span>
                  </div>
                  <p className="text-foreground/70 mt-4 leading-relaxed">{plan.description}</p>
                </CardHeader>

                <CardContent className="relative">
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: featureIndex * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <div className="mt-1">
                          <Check className="w-5 h-5 text-blue-400" />
                        </div>
                        <span className="text-sm text-foreground/80 leading-relaxed">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="relative">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                    <Button
                      className={`w-full text-base font-semibold py-6 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-lg shadow-blue-500/30'
                          : 'bg-gradient-to-r from-blue-600/80 to-cyan-600/80 hover:from-blue-500 hover:to-cyan-500'
                      }`}
                      onClick={scrollToContact}
                      data-testid={`button-get-started-${plan.name.toLowerCase()}`}
                    >
                      Get Started
                    </Button>
                  </motion.div>
                </CardFooter>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
