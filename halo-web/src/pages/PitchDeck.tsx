import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PitchDeck = () => {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
            <div className="p-6">
                <Link to="/" className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft className="h-4 w-4" /> Back to Home
                </Link>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight-custom mb-4">H.A.L.O. PITCH DECK</h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                    We are currently working on integrating our beautiful pitch deck. Check back soon for the full presentation!
                </p>
            </div>
        </div>
    );
};

export default PitchDeck;
