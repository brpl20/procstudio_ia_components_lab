import React from 'react';
import { Link } from 'react-router-dom';
import {
  UserPlus,
  FileText,
  FileEdit,
  Navigation,
  ChevronRight,
  TestTube,
  FileDiff,
} from 'lucide-react';

const HomePage: React.FC = () => {
  const components = [
    {
      name: 'Página de Cadastro',
      description: 'Formulário de cadastro com validação',
      path: '/cadastro',
      icon: UserPlus,
      color: 'bg-blue-500',
    },
    {
      name: 'Quill Editor de Textos',
      description: 'Editor de texto rico com formatação',
      path: '/quill-editor',
      icon: FileText,
      color: 'bg-green-500',
    },
    {
      name: 'Quill com Cláusulas',
      description: 'Editor com sistema de cláusulas',
      path: '/quill-clausulas',
      icon: FileEdit,
      color: 'bg-purple-500',
    },
    {
      name: 'Navegador Multi Páginas',
      description: 'Sistema de navegação entre páginas',
      path: '/navegador',
      icon: Navigation,
      color: 'bg-orange-500',
    },
    {
      name: 'Diff Versions',
      description: 'Versionamento de Documentos',
      path: '/diff',
      icon: FileDiff,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <TestTube className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Componentes Teste
          </h1>
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {components.map((component, index) => {
            const IconComponent = component.icon;
            return (
              <Link
                key={index}
                to={component.path}
                className="group block bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`${component.color} p-3 rounded-lg text-white group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-slate-800 group-hover:text-blue-600 transition-colors duration-200">
                          {component.name}
                        </h3>
                        <p className="text-slate-600 mt-1">
                          {component.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight
                      size={20}
                      className="text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200"
                    />
                  </div>
                </div>
                <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Link>
            );
          })}
        </div>

        {/* Footer */}
      </div>
    </div>
  );
};

export default HomePage;
