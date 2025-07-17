import React from 'react';
import GuiaLayout from '@/components/layout/GuiaLayout';
import ContratanteLayout from '@/components/layout/ContratanteLayout';
import  ContratadoLayout  from '@/components/layout/ContratadoLayout';
import ConfigModelLayout from '@/components/layout/ConfigModelLayout';
import InstrucaoLayout from '@/components/layout/InstrucaoLayout';

const CadastroPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <GuiaLayout />
      <ContratanteLayout />
      <ContratadoLayout />
      <ConfigModelLayout />
      <InstrucaoLayout /> 
    </div>
  );
};

export default CadastroPage;
