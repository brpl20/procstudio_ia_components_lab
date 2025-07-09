import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CadastroPage from './pages/CadastroPage';
import QuillEditorPage from './pages/QuillEditorPage';
import QuillClausulasPage from './pages/QuillClausulasPage';
import NavigatorPage from './pages/NavigatorPage';
import DiffPage from './pages/DiffPage';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/cadastro"
          element={
            <Layout>
              <CadastroPage />
            </Layout>
          }
        />
        <Route
          path="/quill-editor"
          element={
            <Layout>
              <QuillEditorPage />
            </Layout>
          }
        />
        <Route
          path="/quill-clausulas"
          element={
            <Layout>
              <QuillClausulasPage />
            </Layout>
          }
        />
        <Route
          path="/navegador"
          element={
            <Layout>
              <NavigatorPage />
            </Layout>
          }
        />
        <Route
          path="/diff"
          element={
            <Layout>
              <DiffPage />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
