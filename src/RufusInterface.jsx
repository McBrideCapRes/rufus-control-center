import { useState, useEffect } from "react";

export default function RufusInterface() {
  const [progress, setProgress] = useState(33);
  const [particles, setParticles] = useState([]);
  const [cpuLoad, setCpuLoad] = useState(45);
  const [securityStatus, setSecurityStatus] = useState("Secure");

  const handleBoost = () => {
    setProgress((prev) => (prev >= 100 ? 100 : prev + 10));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) => [...prev, { id: Math.random(), left: Math.random() * 100, top: Math.random() * 100 }].slice(-50));
      setCpuLoad(Math.floor(30 + Math.random() * 50));
      setSecurityStatus(Math.random() > 0.1 ? "Secure" : "Intrusion Detected");
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black animate-gradient text-[#00FFFF] p-8 font-sans overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute w-1 h-1 bg-[#00FFFF] rounded-full animate-pulse"
          style={{ left: `${p.left}%`, top: `${p.top}%` }}
        />
      ))}

      <h1 className="text-4xl font-bold mb-8 tracking-wide z-10 relative">RUFUS CONTROL CENTER</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 z-10 relative">
        <div className="bg-black/50 backdrop-blur-md border border-[#39FF14] rounded-2xl shadow-lg p-6">
          <div className="grid gap-6">
            <input
              placeholder="Enter Command..."
              className="bg-black/30 backdrop-blur-sm border border-[#00FFFF] text-[#00FFFF] placeholder-[#00FFFF]/50 focus:ring-2 focus:ring-[#00FFFF] rounded-xl p-2"
            />

            <button
              onClick={handleBoost}
              className="bg-[#00FFFF] text-black hover:bg-[#39FF14] transition-all font-bold rounded-2xl shadow-md hover:shadow-xl p-2"
            >
              Execute
            </button>

            <div className="mt-4">
              <label className="block text-sm mb-2">Progress Toward Domination:</label>
              <div className="h-3 bg-black/30 backdrop-blur-sm border border-[#00FFFF] rounded-full overflow-hidden">
                <div
                  style={{ width: `${progress}%` }}
                  className="h-full bg-[#00FFFF] rounded-full transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black/50 backdrop-blur-md border border-[#39FF14] rounded-2xl shadow-lg p-6 grid gap-6">
          <div>
            <h2 className="text-xl font-bold mb-2">System Status</h2>
            <div className="flex justify-between">
              <span>CPU Load:</span>
              <span>{cpuLoad}%</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Security:</span>
              <span className={securityStatus === "Secure" ? "text-green-400" : "text-red-500"}>{securityStatus}</span>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Communications</h2>
            <p className="text-sm">All channels operational.</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }
      `}</style>
    </div>
  );
}
