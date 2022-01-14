import Wallet from './pages/Wallet';
import MainLayout from './layouts/Layout';
import { Route, Routes } from 'react-router-dom';
import Page404 from './errors/404';
import Home from './pages/Home';
import Cryptocurrency from './pages/Cryptocurrency';
import News from './pages/News';
import CryptoDetail from './pages/CryptoDetail';

export const routes = [
    "Markets",
    "Cryptocurrencies", 
    "News", 
    "Wallets"
]
export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="markets" element={<Home />} />
            </Route>
            <Route path="/cryptocurrencies" element={<MainLayout />}>
                <Route index element={<Cryptocurrency />} />
                <Route path=":id" element={<CryptoDetail />}/>
            </Route>
            <Route path="/wallets" element={<MainLayout />} >
                <Route path="" element={<Wallet />} />
            </Route>
            <Route path="/news" element={<MainLayout />} >
                <Route path="" element={<News />} />
            </Route>
            <Route path="*" element={<Page404 />} />
        </Routes>
    )
}