import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home({children}) {
    return (
        <main className="min-h-screen overflow-x-hidden">
            <Navbar />
            {children}
            <Footer />
        </main>
    );
}
