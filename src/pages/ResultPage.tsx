import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, XCircle, ArrowLeft } from 'lucide-react';

interface ResultState {
  success: boolean;
  message: string;
  code: string;
  provider: string;
}

export default function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as ResultState;

  const success = state?.success ?? false;
  const message = state?.message ?? "Une erreur est survenue";
  const code = state?.code ?? "";
  const provider = state?.provider ?? "";

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
            Retour à l'accueil
          </button>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className={`bg-white rounded-2xl shadow-lg p-8 border-2 ${
          success ? 'border-green-100' : 'border-red-100'
        }`}>
          <div className="text-center">
            {success ? (
              <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
            ) : (
              <XCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
            )}
            
            <h2 className={`text-2xl font-bold mb-2 ${
              success ? 'text-green-700' : 'text-red-700'
            }`}>
              {success ? 'Coupon Valide' : 'Coupon Invalide'}
            </h2>
            
            <p className="text-gray-600 mb-6">
              {message}
            </p>

            {code && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-500">Code vérifié</p>
                <p className="font-mono text-lg text-gray-700">{code}</p>
              </div>
            )}

            <div className="space-y-4">
              <button
                onClick={() => navigate(`/verify/${provider.toLowerCase()}`)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Vérifier un autre coupon
              </button>
              
              <button
                onClick={() => navigate('/')}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Retour à l'accueil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}