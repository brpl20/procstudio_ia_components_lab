import React from 'react';
import { Navigation } from 'lucide-react';

const NavigatorPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Placeholder */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <div className="text-center">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Navigation className="w-12 h-12 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-800 mb-2">
            Navegador Multi Páginas
          </h3>
        </div>
      </div>
    </div>
  );
};

export default NavigatorPage;
