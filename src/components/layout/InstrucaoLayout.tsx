import { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { Label } from '@/components/ui/label';
import { ChevronUp } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

function InstrucaoLayout() {
    const [instructionsExpanded, setInstructionsExpanded] = useState(false);

    return (
        <div className="border rounded-lg overflow-hidden bg-white">
            <div className="p-4">
                <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => setInstructionsExpanded(!instructionsExpanded)}
                >
                    <div className="flex items-center gap-2">
                        <img
                            src="src/assets/book_icon.svg"
                            alt="Icon de livro"
                            width={24}
                            height={24}
                        />
                        <span className="text-gray-500 font-medium">Instruções para a geração <span className='text-[#FC3C32]'>*</span></span>
                        <a className="instrucao">
                            <img
                                src="src/assets/info_icon.svg"
                                alt="Icon de informação"
                                width={19}
                                height={19}
                            />
                        </a>
                        <Tooltip anchorSelect=".instrucao" place="top">
                            Descreva aqui o que o contrato deve conter. Inclua cláusulas, exigências ou qualquer detalhe importante. A IA usará essas informações para gerar o contrato.
                        </Tooltip>
                    </div>
                    <ChevronUp className={`text-gray-500 transition-transform ${instructionsExpanded ? '' : 'rotate-180'}`} />
                </div>

                {instructionsExpanded && (
                    <div className="mt-4 p-4 border-t-[1px] border-[#EDEDED] bg-[#FEFEFA]">
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="instrucoes">Instruções</Label>
                                <Textarea
                                    id="instrucoes"
                                    placeholder="Informe instruções complementares para a IA gerar o contrato para você."
                                    className="min-h-[100px] bg-white border-gray-200"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
export default InstrucaoLayout;
