import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Settings from './components/Settings';
import StartForm from './components/StartForm';
import Article from './components/Article';
import HowTo, { HowToOpener } from './components/HowTo';

export default function App() {
  return (
    <section className="mt-4 bg-inherit px-8 py-4 max-sm:px-2 max-sm:py-8">
      <Header />
      <Settings />
      <Routes>
        <Route path="/" element={<StartForm />} />
        <Route path="/wiki/:article" element={<Article />} />
      </Routes>
      <HowTo />
      <HowToOpener />
    </section>
  );
}
