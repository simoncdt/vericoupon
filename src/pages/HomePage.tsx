import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Clock, Award } from 'lucide-react';

const providers = [
  {
    name: 'PCS',
    logo: '/src/public/pcss.png',
    description: 'Cartes PCS Mastercard',
    maxLength: 16
  },
  {
    name: 'Neosurf',
    logo: '/src/public/neosurf.png',
    description: 'Coupons Neosurf',
    maxLength: 10
  },
  {
    name: 'Steam',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg',
    description: 'Cartes Steam',
    maxLength: 15
  },
  {
    name: 'Transcash',
    logo: '/src/public/transcash.webp',
    description: 'Coupons Transcash',
    maxLength: 14
  },
  {
    name: 'PaySafeCard',
    logo: '/src/public/lo.png',
    description: 'Coupons Paysafecard',
    maxLength: 14
  },
  {
    name: 'Toneo First',
    logo: '/src/public/toneo.png',
    description: 'Coupons Toneo First',
    maxLength: 14
  }
];

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            VérifiCoupon
          </div>
          
        </nav>
      </header>

      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
              <div className="text-center">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Vérifiez vos coupons</span>
                  <span className="block text-blue-600">en toute sécurité</span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  Service professionnel de vérification instantanée pour vos recharges prépayées.
                  Rapide, sécurisé et disponible 24/7.
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Providers Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Choisissez votre type de recharge
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {providers.map((provider) => (
            <div
              key={provider.name}
              onClick={() => navigate(`/verify/${provider.name.toLowerCase()}`)}
              className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 cursor-pointer border border-gray-100 hover:border-blue-100"
            >
              <div className="aspect-w-16 aspect-h-9 mb-6">
                <img
                  src={provider.logo}
                  alt={`Logo ${provider.name}`}
                  className="object-contain w-full h-24"
                />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {provider.name}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4">
                {provider.description}
              </p>
              
              <div className="absolute bottom-4 left-6 right-6">
                <div className="text-blue-600 text-sm font-medium group-hover:underline flex items-center justify-center">
                  Vérifier maintenant
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-blue-600 mb-4">
                <ShieldCheck className="w-full h-full" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sécurisé</h3>
              <p className="text-gray-600">Protection maximale de vos données et transactions</p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-blue-600 mb-4">
                <Clock className="w-full h-full" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Rapide</h3>
              <p className="text-gray-600">Vérification instantanée 24h/24 et 7j/7</p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-blue-600 mb-4">
                <Award className="w-full h-full" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fiable</h3>
              <p className="text-gray-600">Plus de 100 000 coupons vérifiés avec succès</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                À propos
              </h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                    Qui sommes-nous
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                    Nos services
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Légal
              </h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                    Conditions d'utilisation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                    Politique de confidentialité
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                    Mentions légales
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Support
              </h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                    Centre d'aide
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                    Support technique
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <p className="text-gray-600 text-sm">
              © 2025 VérifiCoupon. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;