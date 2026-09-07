import { HomePage } from '../pages/HomePage';
import { LegalNoticePage } from '../pages/LegalNoticePage';

function currentPath() {
  return window.location.pathname.replace(/\/+$/, '') || '/';
}

export function App() {
  if (currentPath() === '/legal-notice') {
    return <LegalNoticePage />;
  }

  return <HomePage />;
}
