import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import Toast from '../Toast';

export default function PageLayout() {
    return (
        <>
            <Navbar />
            <main style={{ minHeight: 'calc(100vh - 64px)' }}>
                <Outlet />
            </main>
            <Toast />
        </>
    );
}
