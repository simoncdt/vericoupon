import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Clock, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { Disclosure, Transition } from '@headlessui/react';

const providers = [
  { key: 'pcs', name: 'PCS', logo: '/src/public/pcss.png', description: 'Cartes PCS Mastercard' },
  { key: 'neosurf', name: 'Neosurf', logo: '/src/public/neosurf.png', description: 'Coupons Neosurf' },
  { key: 'steam', name: 'Steam', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg', description: 'Cartes Steam' },
  { key: 'transcash', name: 'Transcash', logo: '/src/public/transcash.webp', description: 'Coupons Transcash' },
  { key: 'paysafecard', name: 'PaySafeCard', logo: '/src/public/p.png', description: 'Coupons Paysafecard' },
  { key: 'toneofirst', name: 'Toneo First', logo: '/src/public/toneo.png', description: 'Coupons Toneo First' }
];

const faqs = [
  { question: "Comment fonctionne VérifiCoupon ?", answer: "Vous choisissez le type de coupon, saisissez les informations, et recevez un retour instantané sur sa validité." },
  { question: "Quels types de coupons sont pris en charge ?", answer: "Nous vérifions les coupons PCS, Neosurf, Toneo, Paysafecard, Steam et Transcash." },
  { question: "Que faire si mon coupon est invalide ?", answer: "Vous pouvez contacter notre support via l'email affiché en bas de page pour plus d'assistance." },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5 }
};

export default function HomePage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#080B2C] font-inter text-white antialiased">
      <motion.header 
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl transform rotate-12 shadow-lg">
                <div className="absolute inset-0 bg-white/20 transform -rotate-6"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 backdrop-blur-sm"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl transform -rotate-12">V</div>
            </div>
            <div className="text-2xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Vérifi</span>
              <span className="text-gray-900">Coupon</span>
            </div>
          </motion.div>
          
          <div className="flex items-center space-x-6">
            <motion.nav className="hidden md:flex items-center space-x-8">
              {[].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors"
                  whileHover={{ y: -1 }}
                >
                  {item}
                </motion.a>
              ))}
            </motion.nav>
            
          </div>
        </div>
      </motion.header>

      <motion.section 
        className="relative pt-32 pb-24 px-6 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="absolute inset-0 -z-10 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {/* Image de fond principale */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: `url('/src/public/d.jpg')`,
              opacity: 0.1
            }}
          />

          {/* Overlay avec motif */}
          <div 
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234338ca' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-indigo-900/80 to-gray-900/90" style={{ mixBlendMode: 'soft-light' }} />

          {/* Cercles décoratifs avec flou */}
          <div className="absolute top-20 left-[20%] w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 right-[15%] w-[300px] h-[300px] bg-indigo-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute -bottom-20 left-[40%] w-[500px] h-[500px] bg-violet-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

          {/* Overlay de protection pour le texte */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-gray-900/25 to-gray-900/50" />
        </motion.div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div 
            className="inline-flex items-center px-4 py-2 bg-blue-500/10 backdrop-blur-sm rounded-full mb-8 border border-blue-400/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm font-medium text-blue-600">Vérification instantanée 24/7</span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-br from-white via-blue-100 to-blue-200 bg-clip-text text-transparent leading-[1.2]"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            La plateforme de confiance pour vérifier vos coupons prépayés
          </motion.h1>
          <motion.p 
            className="text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
          >
            Vérification instantanée et sécurisée de vos recharges. Plus de 100 000 coupons validés chaque mois.
          </motion.p>
          <motion.button
            onClick={() => navigate('/verify/pcs')}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl shadow-xl hover:shadow-2xl transition-all group mx-auto"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center justify-center">
              Commencer maintenant
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </motion.button>
          
          <motion.div 
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-blue-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Vérifié par Mastercard
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              ACPR Agréé
            </div>
          </motion.div>
        </div>
        
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-indigo-50/30" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-100/30 rounded-full blur-3xl" />
        </div>
      </motion.section>

      <section className="max-w-7xl mx-auto px-4 py-24">
        <motion.h2 
          className="text-3xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Types de coupons pris en charge
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {providers.map((provider, index) => (
            <motion.div
              key={provider.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => navigate(`/verify/${provider.key}`)}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer border border-gray-100"
            >
              <div className="h-20 flex items-center justify-center mb-6">
                <motion.img 
                  src={provider.logo} 
                  alt={provider.name} 
                  className="h-16 object-contain"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{provider.name}</h3>
              <p className="text-gray-600 mb-4">{provider.description}</p>
              <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform">
                Vérifier maintenant 
                <ChevronDown className="w-4 h-4 ml-2 rotate-[-90deg]" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-b from-gray-50 to-white py-24">
        <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-3 gap-12">
          {[
            { icon: ShieldCheck, title: "Sécurité", description: "Vos données sont protégées avec les standards les plus stricts." },
            { icon: Clock, title: "Instantané", description: "Recevez votre résultat en moins de 60 secondes." },
            { icon: Award, title: "Fiabilité", description: "Plus de 100 000 vérifications effectuées avec succès." }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600"
              >
                <feature.icon className="w-8 h-8" />
              </motion.div>
              <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-24">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Foire aux questions
        </motion.h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Disclosure key={index}>
              {({ open }) => (
                <motion.div 
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Disclosure.Button className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50">
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`} />
                  </Disclosure.Button>
                  <Transition
                    show={open}
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel className="px-6 py-4 text-gray-600 bg-gray-50">
                      {faq.answer}
                    </Disclosure.Panel>
                  </Transition>
                </motion.div>
              )}
            </Disclosure>
          ))}
        </div>
      </section>

      <footer className="bg-gradient-to-b from-gray-900 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
            <div>
              <h3 className="text-xl font-bold mb-4 text-blue-300">VérifiCoupon</h3>
              <p className="text-gray-300">La plateforme de confiance pour la vérification de vos coupons prépayés.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-blue-300">Contact</h4>
              <p className="text-gray-300 hover:text-white transition-colors">
                <a href="mailto:support@verificoupon.com">support@verificoupon.com</a>
              </p>
              <p className="text-gray-300 mt-2 hover:text-white transition-colors">
                <a href="tel:+33123456789">+33 (0)1 23 45 67 89</a>
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-blue-300">Légal</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="hover:text-white transition-colors"><a href="#">Conditions d'utilisation</a></li>
                <li className="hover:text-white transition-colors"><a href="#">Politique de confidentialité</a></li>
                <li className="hover:text-white transition-colors"><a href="#">Mentions légales</a></li>
              </ul>
            </div>
          </div>
          
          {/* Section Partenaires */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-6 text-center text-blue-300">Nos Partenaires de Confiance</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-items-center">
                {/* Liste de vos partenaires - Ajoutez ou modifiez selon vos besoins */}
                {[
                  { name: 'PCS', logo: '/src/public/pcss.png' },
                  { name: 'Neosurf', logo: '/src/public/neosurf.png' },
                  { name: 'Transcash', logo: '/src/public/transcash.webp' },
                  { name: 'PaySafeCard', logo: '/src/public/p.png' },
                  { name: 'Toneo First', logo: '/src/public/toneo.png' },
                  // Ajoutez d'autres partenaires ici
                  
                ].map((partner, index) => (
                  <div 
                    key={index}
                    className="w-32 h-20 bg-gray-800/40 rounded-lg flex items-center justify-center p-4 hover:bg-gray-800/60 transition-all duration-300 transform hover:scale-105 group"
                  >
                    {partner.logo ? (
                      <img 
                        src={partner.logo}
                        alt={`Logo ${partner.name}`}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full rounded-lg bg-gradient-to-br from-gray-700/50 to-gray-900/50 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-gray-500 group-hover:text-gray-400 text-xs text-center">
                          {partner.name}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center text-gray-400">
              <p>© {new Date().getFullYear()} VérifiCoupon. Tous droits réservés.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
