import { createRoot } from 'react-dom/client';
import App from './ui/App';
import './ui/styles.css';
const root = createRoot(document.getElementById('root')!);
if (import.meta.env.DEV && new URLSearchParams(location.search).has('review-v5')) {
  void import('./ui/V5Review').then(({ default: Review }) => root.render(<Review/>));
} else root.render(<App/>);
