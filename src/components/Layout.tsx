import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm border-b border-slate-200 py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-xl font-semibold text-slate-800">
            Rich Text Editor Demo
          </h1>
        </div>
      </header>
      <main className="container mx-auto p-4 md:p-6">
        {children}
      </main>
      <footer className="bg-white shadow-sm border-t border-slate-200 py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          Rich Text Editor with Clausulas Demo
        </div>
      </footer>
    </div>
  );
};

export default Layout;
