import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Search, ChevronDown, LogOut, AlertCircle } from 'lucide-react';

interface Coupon {
  code: string;
  montant: string | null;
}

interface Enregistrement {
  id: number;
  nom: string;
  prenom: string;
  provider: string;
  coupons: string;
  createdAt?: string;
}

const AdminPage = () => {
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState<Enregistrement[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<keyof Enregistrement>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simuler un délai de chargement
    await new Promise(resolve => setTimeout(resolve, 800));

    if (username === 'admin' && password === 'bt2elf200') {
      setAuth(true);
    } else {
      setError('Identifiants incorrects. Veuillez réessayer.');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (auth) {
      setLoading(true);
      fetch('http://localhost:5000/api/enregistrements')
        .then(res => res.json())
        .then((res: Enregistrement[]) => {
          setData(res);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
          setError('Erreur lors du chargement des données');
        });
    }
  }, [auth]);

  const filteredData = data.filter(item => 
    item.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.provider.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    
    if (sortDirection === 'asc') {
      return String(aValue).localeCompare(String(bValue));
    }
    return String(bValue).localeCompare(String(aValue));
  });

  const handleSort = (column: keyof Enregistrement) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  if (!auth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
        <motion.div 
          className="w-full max-w-md"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={fadeIn}
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            {/* Logo et Titre */}
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 transform rotate-12">
                <div className="text-white text-2xl font-bold transform -rotate-12">V</div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Administration VérifiCoupon</h2>
              <p className="text-gray-500 mt-2">Connectez-vous pour accéder au tableau de bord</p>
            </div>

            <form onSubmit={login} className="space-y-6">
              {/* Champ Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom d'utilisateur
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                  placeholder="Entrez votre nom d'utilisateur"
                  required
                />
              </div>

              {/* Champ Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none pr-12"
                    placeholder="Entrez votre mot de passe"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Message d'erreur */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center p-4 rounded-lg bg-red-50 text-red-600 text-sm"
                  >
                    <AlertCircle size={18} className="mr-2 flex-shrink-0" />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bouton de connexion */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-xl text-white font-medium transition-all duration-200 ${
                  loading
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/25'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Connexion en cours...
                  </div>
                ) : (
                  'Se connecter'
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl font-bold">V</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Tableau de bord</h1>
            </div>
            <button
              onClick={() => setAuth(false)}
              className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut size={18} className="mr-2" />
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          {/* Barre d'outils */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Rechercher par nom, prénom ou fournisseur..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                />
              </div>
              <div className="text-sm text-gray-500">
                {filteredData.length} enregistrement{filteredData.length > 1 ? 's' : ''} trouvé{filteredData.length > 1 ? 's' : ''}
              </div>
            </div>
          </div>

          {/* Tableau */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  {['nom', 'prenom', 'provider'].map((column) => (
                    <th
                      key={column}
                      onClick={() => handleSort(column as keyof Enregistrement)}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-1">
                        <span>{column === 'prenom' ? 'Prénom' : column === 'provider' ? 'Fournisseur' : 'Nom'}</span>
                        <ChevronDown
                          size={16}
                          className={`transform transition-transform ${
                            sortBy === column && sortDirection === 'desc' ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </th>
                  ))}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Coupons
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedData.map((enregistrement) => (
                  <tr
                    key={enregistrement.id}
                    className="hover:bg-blue-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {enregistrement.nom}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {enregistrement.prenom}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {enregistrement.provider}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="space-y-2">
                        {JSON.parse(enregistrement.coupons).map((c: Coupon, index: number) => (
                          <div key={index} className="flex items-center space-x-2">
                            <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">
                              {c.code}
                            </span>
                            <span className="text-xs text-gray-400">
                              {c.montant ? `${c.montant}€` : 'Montant non spécifié'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* État vide ou chargement */}
            {loading ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-500">Chargement des données...</p>
              </div>
            ) : sortedData.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Aucun enregistrement trouvé</p>
              </div>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
