import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PageLayout from './components/PageLayout';
import VaultLayout from './components/VaultLayout';
import Landing from './pages/Landing';
import Docs from './pages/Docs';
import VaultDashboard from './pages/VaultDashboard';
import Deposit from './pages/Deposit';
import Withdraw from './pages/Withdraw';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route index element={<Landing />} />
            <Route path="docs" element={<Docs />} />
          </Route>
          <Route path="/vault" element={<VaultLayout />}>
            <Route index element={<VaultDashboard />} />
            <Route path="deposit" element={<Deposit />} />
            <Route path="withdraw" element={<Withdraw />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
