import React, { useState, useRef } from 'react';
import { Plus, X, Navigation } from 'lucide-react';

const NavigatorPage: React.FC = () => {
  const [pages, setPages] = useState([
    { id: 1, content: '', title: 'Página 1' },
  ]);
  const [activePage, setActivePage] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const addPage = () => {
    const newId = Math.max(...pages.map((p) => p.id)) + 1;
    const newPage = {
      id: newId,
      content: '',
      title: `Página ${newId}`,
    };
    setPages([...pages, newPage]);
    setActivePage(newId);

    // Scroll to the new page
    const SCROLL_DELAY_MS = 100; // Short delay to ensure DOM is updated
    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft =
          scrollContainerRef.current.scrollWidth;
      }
    }, SCROLL_DELAY_MS);
  };

  const removePage = (pageId: number) => {
    if (pages.length <= 1) return; // Keep at least one page

    const updatedPages = pages.filter((p) => p.id !== pageId);
    setPages(updatedPages);

    if (activePage === pageId) {
      setActivePage(updatedPages[0].id);
    }
  };

  const updatePageContent = (pageId: number, content: string) => {
    setPages(pages.map((p) => (p.id === pageId ? { ...p, content } : p)));
  };

  const updatePageTitle = (pageId: number, title: string) => {
    setPages(pages.map((p) => (p.id === pageId ? { ...p, title } : p)));
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    pageId: number,
  ) => {
    // Save content on any change
    const content = (e.target as HTMLDivElement).innerHTML;
    updatePageContent(pageId, content);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Navigation className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-slate-800">
                Navegador Multi Páginas
              </h3>
              <p className="text-sm text-slate-600">
                Crie e gerencie múltiplas páginas de conteúdo
              </p>
            </div>
          </div>

          <button
            onClick={addPage}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Nova Página</span>
          </button>
        </div>
      </div>

      {/* Pages Container */}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto overflow-y-hidden bg-slate-50 p-6 rounded-xl shadow-sm border border-slate-200"
        style={{
          scrollBehavior: 'smooth',
          minHeight: '75vh',
          height: 'calc(100vh - 240px)',
        }}
      >
        <div className="flex gap-6 h-full min-w-max">
          {pages.map((page) => (
            <div
              key={page.id}
              data-page-id={page.id}
              className={`bg-white rounded-lg shadow-lg border-2 transition-all duration-200 ${
                activePage === page.id
                  ? 'border-blue-500 shadow-xl'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
              style={{
                width: '600px',
                minHeight: '70vh',
                height: 'calc(100vh - 280px)',
              }}
            >
              {/* Page Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50 rounded-t-lg">
                <input
                  type="text"
                  value={page.title}
                  onChange={(e) => updatePageTitle(page.id, e.target.value)}
                  className="font-semibold text-slate-800 bg-transparent border-none outline-none flex-1"
                  onFocus={() => setActivePage(page.id)}
                />
                {pages.length > 1 && (
                  <button
                    onClick={() => removePage(page.id)}
                    className="text-slate-400 hover:text-red-500 transition-colors p-1 rounded"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Page Content */}
              <div
                contentEditable
                className="p-6 h-full outline-none text-slate-700 leading-relaxed"
                style={{
                  minHeight: '65vh',
                  height: 'calc(100% - 50px)',
                  lineHeight: '1.6',
                }}
                onFocus={() => setActivePage(page.id)}
                onInput={(e) =>
                  updatePageContent(
                    page.id,
                    (e.target as HTMLDivElement).innerHTML,
                  )
                }
                onKeyDown={(e) => handleKeyDown(e, page.id)}
                dangerouslySetInnerHTML={{ __html: page.content }}
                data-placeholder="Comece a escrever aqui..."
              />
            </div>
          ))}
        </div>
      </div>

      {/* Page Indicators */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex items-center justify-center gap-2">
        {pages.map((page) => (
          <button
            key={page.id}
            onClick={() => {
              setActivePage(page.id);
              // Scroll to the selected page
              const pageElement = document.querySelector(
                `[data-page-id="${page.id}"]`,
              );
              if (pageElement && scrollContainerRef.current) {
                const containerRect =
                  scrollContainerRef.current.getBoundingClientRect();
                const pageRect = pageElement.getBoundingClientRect();
                const PAGE_PADDING = 24; // Spacing between pages (matches the gap-6 class)
                const scrollLeft =
                  pageRect.left -
                  containerRect.left +
                  scrollContainerRef.current.scrollLeft -
                  PAGE_PADDING;
                scrollContainerRef.current.scrollTo({
                  left: scrollLeft,
                  behavior: 'smooth',
                });
              }
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              activePage === page.id
                ? 'bg-blue-600'
                : 'bg-slate-300 hover:bg-slate-400'
            }`}
            title={page.title}
          />
        ))}
      </div>
    </div>
  );
};

export default NavigatorPage;
