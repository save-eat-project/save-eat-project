import '@styles/global.css'
import { createRoot } from 'react-dom/client'
import { AppRouter } from './app';
import { RecoilRoot } from 'recoil';
import { HashRouter } from 'react-router-dom';

const app = document.createElement('div')
document.body.appendChild(app)

const root = createRoot(app);
root.render(
  <RecoilRoot>
    <HashRouter>
      <AppRouter />
    </HashRouter>
  </RecoilRoot>
);