import React, { useState, useEffect } from 'react';
import { FileDiff, Copy } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const DiffPage: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [markdownContent, setMarkdownContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMarkdown = async () => {
      try {
        setIsLoading(true);
        // Usando import.meta.glob para carregar arquivos estáticos
        const modules = import.meta.glob('/src/md/*.md', { as: 'raw' });

        if (modules['/src/md/guia.md']) {
          const content = await modules['/src/md/guia.md']();
          setMarkdownContent(content);
          setError(null);
        } else {
          throw new Error('Arquivo markdown não encontrado');
        }
      } catch (err) {
        console.error('Error importing markdown file:', err);
        setError(
          'Não foi possível carregar o arquivo markdown. Verifique o console para mais detalhes.',
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadMarkdown();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    const RESET_COPY_TIMEOUT_MS = 2000;
    setTimeout(() => setCopied(false), RESET_COPY_TIMEOUT_MS);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="flex justify-center items-center h-40">
            <div className="animate-pulse text-lg text-slate-500">
              Carregando markdown...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="flex justify-center items-center h-40">
            <div className="text-lg text-red-500">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
              <FileDiff className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-800">
                Diff Pages - Visualização de Markdown
              </h3>
              <p className="text-slate-500">
                Exemplo de versionamento com suporte a markdown
              </p>
            </div>
          </div>
          <button
            onClick={copyToClipboard}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <Copy size={16} />
            <span>{copied ? 'Copiado!' : 'Copiar Markdown'}</span>
          </button>
        </div>
      </div>

      {/* Markdown Content */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <div className="prose max-w-none prose-headings:text-blue-800 prose-a:text-blue-600 prose-code:bg-slate-100 prose-code:text-blue-800 prose-pre:bg-gray-900 prose-pre:text-white">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {markdownContent}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default DiffPage;
