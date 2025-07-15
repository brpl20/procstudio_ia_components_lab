import React, { useRef, useState, lazy, Suspense } from 'react';

// Use React's lazy loading
const RichTextEditor = lazy(() => import('../components/RichTextEditor'));

// Define the RichTextEditorHandle type
type RichTextEditorHandle = {
  getContent: () => string;
  getDelta: () => unknown; // Using unknown instead of any
};

// Helper function to highlight clausula attributes in the delta
const highlightClausulaAttributes = (delta: unknown) => {
  if (!delta || typeof delta !== 'object' || !('ops' in delta)) return delta;

  return {
    ...delta,
    ops: (delta as { ops: Array<unknown> }).ops.map((op: unknown) => {
      if (
        op &&
        typeof op === 'object' &&
        'attributes' in op &&
        op.attributes &&
        typeof op.attributes === 'object' &&
        'clausula' in op.attributes
      ) {
        return {
          ...op,
          highlighted: true, // Add a flag for UI rendering
        };
      }
      return op;
    }),
  };
};

const QuillClausulasPage: React.FC = () => {
  const editorRef = useRef<RichTextEditorHandle>(null);
  const [editorContent, setEditorContent] = useState<string>('');
  const [deltaContent, setDeltaContent] = useState<unknown>(); // Using unknown instead of any

  const handleGetContent = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      const delta = editorRef.current.getDelta();
      console.log('Editor content:', content);
      console.log('Delta content:', JSON.stringify(delta));

      // Look for 'clausula' attributes in the delta
      const clausulaTexts: { text: string; clausula: unknown }[] = [];
      if (
        delta &&
        typeof delta === 'object' &&
        'ops' in delta &&
        Array.isArray(delta.ops)
      ) {
        (delta.ops as Array<unknown>).forEach((op) => {
          if (
            op &&
            typeof op === 'object' &&
            'attributes' in op &&
            op.attributes &&
            typeof op.attributes === 'object' &&
            'clausula' in op.attributes &&
            'insert' in op &&
            typeof op.insert === 'string'
          ) {
            clausulaTexts.push({
              text: op.insert as string,
              clausula: (op.attributes as { clausula: unknown }).clausula,
            });
            console.log(
              'Found clausula:',
              (op.attributes as { clausula: unknown }).clausula,
              'for text:',
              op.insert,
            );
          }
        });
      }

      setEditorContent(content);
      setDeltaContent(highlightClausulaAttributes(delta));
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-center font-bold my-5 text-xl">
        Rich Text Editor with Clauses
      </h1>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <Suspense fallback={<div>Loading editor...</div>}>
          <RichTextEditor ref={editorRef} />
        </Suspense>
      </div>
      <button
        onClick={handleGetContent}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Show Content
      </button>
      <div className="mt-4">
        <h2 className="font-bold text-lg">Editor Content (HTML):</h2>
        <div
          className="border p-4 rounded bg-gray-50 text-black"
          dangerouslySetInnerHTML={{ __html: editorContent }}
        />
      </div>
      <div className="mt-4">
        <h2 className="font-bold text-lg">Editor content (Delta):</h2>
        <pre className="border p-4 rounded bg-gray-50 whitespace-pre-wrap text-black">
          {deltaContent ? JSON.stringify(deltaContent, null, 2) : ''}
        </pre>
      </div>

      <div className="mt-4">
        <h2 className="font-bold text-lg">Texts with Clausula Attribute:</h2>
        <div className="border p-4 rounded bg-gray-50 text-black">
          {deltaContent &&
          typeof deltaContent === 'object' &&
          'ops' in deltaContent &&
          Array.isArray(deltaContent.ops) ? (
            <ul className="list-disc list-inside">
              {(deltaContent.ops as Array<unknown>)
                .filter(
                  (op) =>
                    typeof op === 'object' &&
                    op &&
                    'attributes' in op &&
                    op.attributes &&
                    typeof op.attributes === 'object' &&
                    'clausula' in op.attributes,
                )
                .map((op, i) => {
                  const typedOp = op as {
                    insert: string;
                    attributes: {
                      clausula: unknown;
                    };
                  };
                  return (
                    <li key={i} className="text-red-600">
                      <span className="font-bold">Text:</span> '{typedOp.insert}'
                      -<span className="font-bold"> Clausula Index:</span>{' '}
                      {String(typedOp.attributes.clausula)}
                    </li>
                  );
                })}
            </ul>
          ) : (
            <p>No texts with clausula attribute found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuillClausulasPage;
