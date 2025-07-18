import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto p-4 md:p-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;
