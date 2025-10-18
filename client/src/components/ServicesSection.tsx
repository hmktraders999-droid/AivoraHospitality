import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Phone, Globe, MessageSquare, Database } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: Star,
    title: 'Customer Reputation & Google Reviews',
    description: 'Automate review collection and boost your online reputation with AI-powered feedback management.',
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Phone,
    title: 'Voice Agents',
    description: 'Never miss a call again. AI voice agents handle reservations, inquiries, and customer support 24/7.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Globe,
    title: 'Website Design & Automation',
    description: 'Modern, conversion-optimized websites with integrated automation workflows for seamless operations.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: MessageSquare,
    title: 'Chatbots (Website + WhatsApp)',
    description: 'Engage customers instantly on your website and WhatsApp with intelligent AI chatbots.',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Database,
    title: 'CRM',
    description: 'Centralize customer data, track interactions, and nurture relationships with our hospitality-focused CRM.',
    gradient: 'from-blue-600 to-indigo-600',
  },
];

export default function ServicesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section id="services" className="relative py-20 lg:py-32 px-6 lg:px-8 overflow-hidden">
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
            <span className="text-sm text-blue-400 font-medium">Complete AI Solutions</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-xl text-blue-300/90 max-w-3xl mx-auto leading-relaxed">
            Comprehensive AI solutions designed specifically for hospitality businesses
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                className="group h-full relative overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-lg border-white/10 hover:border-blue-500/30 transition-all duration-500"
                data-testid={`card-service-${index}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <CardHeader className="relative">
                  <motion.div
                    className={`mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <CardTitle className="text-xl text-foreground group-hover:text-blue-400 transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <p className="text-foreground/70 leading-relaxed">{service.description}</p>
                </CardContent>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
