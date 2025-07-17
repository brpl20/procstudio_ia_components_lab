import { Play } from 'lucide-react';

function GuiaLayout() {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-[18px] text-[#999999] font-semibold">Guia de Preenchimento</h2>

            <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-1">
                    <h3 className="text-[18px] font-bold text-[#373F45]">
                        O sistema de geração de contratos jurídicos mais rápido que existe!
                    </h3>
                    <p className="text-[#999999] font-semibold text-[16px]">
                        Faça o upload dos seus documentos, escolha o seu modelo de contrato, copie e cole ou peça para a IA criar, depois você ainda poderá assinar e exportar seus documentos, assista o nosso vídeo para aprender mais.
                    </p>
                </div>

                <div className="w-full md:w-96 h-52 relative rounded-lg overflow-hidden bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <button
                        className="relative z-10 w-16 h-16 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                        aria-label="Assistir vídeo de orientação"
                    >
                        <Play className="w-8 h-8 text-white fill-white ml-1" />
                    </button>
                </div>
            </div>
        </div>
    );
}
export default GuiaLayout;
