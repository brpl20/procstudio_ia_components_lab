import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

function ConfigModelLayout() {
  const [modelConfigExpanded, setModelConfigExpanded] = useState(false);
  const [selectOpen, setSelectOpen] = useState(false);

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <div className="p-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setModelConfigExpanded(!modelConfigExpanded)}
        >
          <div className="flex items-center gap-2">
            <img
              src="src/assets/gear_icon.svg"
              alt="Icon de engrenagem"
              width={24}
              height={24}
            />
            <span className="text-gray-500 font-medium">Configuração do Modelo <span className='text-[#FC3C32]'>*</span></span>
          </div>
          <ChevronUp className={`text-gray-500 transition-transform ${modelConfigExpanded ? '' : 'rotate-180'}`} />
        </div>

        {modelConfigExpanded && (
          <div className="mt-4 p-4 border-t-[1px] border-[#EDEDED] bg-[#FEFEFA]">
            <Tabs defaultValue="modelo-pronto" className="mb-6">
              <TabsList className="mb-6 flex gap-4">
                <TabsTrigger
                  value="modelo-pronto"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
                >
                  Utilizar modelo pronto
                </TabsTrigger>
                <TabsTrigger
                  value="ia-gerar"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
                >
                  Deixar a IA gerar
                </TabsTrigger>
                <TabsTrigger
                  value="anexar-meu"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
                >
                  Anexar o meu
                </TabsTrigger>
              </TabsList>

              <TabsContent value="modelo-pronto">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="tipo-contrato" className="block text-sm font-medium text-gray-700">
                      Tipo de Contrato
                    </Label>
                    <div className="relative inline-block">
                      <select
                        id="tipo-contrato"
                        className="mt-1 px-3 py-2 pr-10 bg-white border border-[#999999] rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        onFocus={() => setSelectOpen(true)}
                        onBlur={() => setSelectOpen(false)}
                        onChange={() => setSelectOpen(false)}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Selecione uma opção
                        </option>
                        <option value="prestacao-servico">Prestação de Serviço</option>
                        <option value="compra-venda">Compra e Venda</option>
                        <option value="locacao">Locação</option>
                        <option value="trabalho">Contrato de Trabalho</option>
                      </select>

                      {/* Ícone */}
                      <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-[#373F45]">
                        {selectOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ia-gerar">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="detalhes-modelo">Detalhes para o modelo</Label>
                    <Textarea
                      id="detalhes-modelo"
                      placeholder="Informe detalhes para a IA criar o modelo para você."
                      className="min-h-[100px] bg-white border-gray-200"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="anexar-meu">
                <div className="flex flex-col items-center justify-center p-8 border rounded-lg">
                  <div className="mb-2">
                    <img
                      src="src/assets/upload_icon.svg"
                      alt="Icon Upload"
                      width={32}
                      height={32}
                    />
                  </div>
                  <h3 className="font-medium text-center mb-1">Modelo de contrato</h3>
                  <p className="text-gray-500 text-sm text-center mb-4">Arraste e solte o arquivo aqui</p>
                  <Button className="bg-[#0277EE] hover:bg-blue-600 font-semibold">Selecionar arquivo</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
}

export default ConfigModelLayout;

