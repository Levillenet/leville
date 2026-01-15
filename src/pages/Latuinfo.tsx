import { useEffect } from "react";

const Latuinfo = () => {
  useEffect(() => {
    window.location.href = "https://ladut.lovable.app";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <p className="text-foreground">Ohjataan latuinfoon...</p>
    </div>
  );
};

export default Latuinfo;
