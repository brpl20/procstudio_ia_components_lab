import React, { useState } from 'react';
import { FileText, Save, Download } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const QuillEditorPage: React.FC = () => {
  const [value, setValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // QuillJS toolbar configuration
  // Header level constants
  const HEADER_LEVEL_1 = 1;
  const HEADER_LEVEL_2 = 2;
  const HEADER_LEVEL_3 = 3;
  const HEADER_LEVEL_4 = 4;
  const HEADER_LEVEL_5 = 5;
  const HEADER_LEVEL_6 = 6;

  const modules = {
    toolbar: [
      [
        {
          header: [
            HEADER_LEVEL_1,
            HEADER_LEVEL_2,
            HEADER_LEVEL_3,
            HEADER_LEVEL_4,
            HEADER_LEVEL_5,
            HEADER_LEVEL_6,
            false,
          ],
        },
      ],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ align: [] }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'color',
    'background',
    'list',
    'bullet',
    'indent',
    'align',
    'blockquote',
    'code-block',
    'link',
    'image',
  ];

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save operation
    const SAVE_DELAY_MS = 1000; // 1 second delay to simulate saving
    setTimeout(() => {
      setIsSaving(false);
      // You can implement actual save logic here
      console.log('Document saved:', value);
    }, SAVE_DELAY_MS);
  };

  const handleExport = () => {
    const blob = new Blob([value], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (window.confirm('Tem certeza que deseja limpar o editor?')) {
      setValue('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-slate-800">
                Editor de Texto
              </h3>
              <p className="text-sm text-slate-600">
                Crie e edite documentos com formatação rica
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Salvando...' : 'Salvar'}</span>
            </button>

            <button
              onClick={handleExport}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Exportar</span>
            </button>

            <button
              onClick={handleClear}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <span>Limpar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h4 className="text-sm font-medium text-slate-700 mb-1">Documento</h4>
          <p className="text-xs text-slate-500">
            {value.length > 0
              ? `${value.replace(/<[^>]*>/g, '').length} caracteres`
              : 'Documento vazio'}
          </p>
        </div>

        <div className="quill-editor-container">
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            modules={modules}
            formats={formats}
            placeholder="Comece a escrever aqui..."
            style={{ minHeight: '400px' }}
          />
        </div>
      </div>

      {/* Preview */}
      {value && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h4 className="text-sm font-medium text-slate-700 mb-4">
            Prévia do Documento
          </h4>
          <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: value }}
          />
        </div>
      )}
    </div>
  );
};

export default QuillEditorPage;
