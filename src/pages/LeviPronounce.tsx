import { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Play, Pause, Volume2, Home, Bed, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const LeviPronounce = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <>
      <Helmet>
        <title>How to Pronounce Levi - Finnish Lapland Ski Resort | Leville.net</title>
        <meta 
          name="description" 
          content="Learn how to correctly pronounce Levi, the famous ski resort in Finnish Lapland. Listen to the authentic Finnish pronunciation and learn about Finnish phonetics." 
        />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          
          {/* Main Card */}
          <div className="glass-card p-8 md:p-12 text-center space-y-8">
            
            {/* Icon */}
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Volume2 className="w-10 h-10 text-primary" />
              </div>
            </div>

            {/* Title */}
            <div>
              <p className="text-muted-foreground text-sm uppercase tracking-wider mb-2">
                How to Pronounce
              </p>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground">
                "Levi"
              </h1>
            </div>

            {/* Audio Player */}
            <div className="space-y-4">
              <audio 
                ref={audioRef} 
                src="/audio/levi-pronunciation.mp3"
                onEnded={handleEnded}
              />
              
              <Button
                onClick={togglePlay}
                size="lg"
                className="gap-3 px-8 py-6 text-lg"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-6 h-6" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-6 h-6" />
                    Play Audio
                  </>
                )}
              </Button>
            </div>

            {/* Phonetic Guide */}
            <div className="bg-muted/50 rounded-xl p-6 space-y-2">
              <p className="text-2xl font-semibold text-foreground">
                LEH-vee
              </p>
              <p className="text-muted-foreground font-mono">
                /ˈlevi/
              </p>
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              Levi is Finland's largest and most popular ski resort, located in Finnish Lapland 
              above the Arctic Circle. Known for its world-class slopes, stunning northern lights, 
              and magical winter wilderness.
            </p>

            {/* Finnish Pronunciation Info */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-left space-y-3">
              <div className="flex items-center gap-2 text-primary">
                <Info className="w-5 h-5" />
                <h2 className="font-semibold">About Finnish Pronunciation</h2>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Finnish is one of the most phonetically consistent languages in the world. 
                Unlike English, <strong>every letter is always pronounced</strong> — there are no silent letters, 
                and each letter has only one sound. What you see is exactly what you say!
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                This makes Finnish surprisingly easy to read aloud once you know the sounds. 
                For example, "Levi" is simply <strong>L-E-V-I</strong> — four letters, four sounds.
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link to="/en">
                  <Home className="w-5 h-5" />
                  Visit Levi
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link to="/en/accommodations">
                  <Bed className="w-5 h-5" />
                  Browse Accommodations
                </Link>
              </Button>
            </div>

          </div>

        </div>
      </main>

      <Footer lang="en" />
    </>
  );
};

export default LeviPronounce;
