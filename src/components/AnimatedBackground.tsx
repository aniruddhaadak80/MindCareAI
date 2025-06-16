
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
      
      {/* Animated Shapes */}
      <div className="absolute inset-0">
        {/* Floating Circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-200/30 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-pink-200/30 rounded-full blur-xl animate-pulse delay-2000"></div>
        
        {/* Moving Gradient Orbs */}
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-r from-cyan-200/40 to-blue-200/40 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute bottom-1/3 right-1/3 w-56 h-56 bg-gradient-to-r from-purple-200/40 to-pink-200/40 rounded-full blur-2xl animate-bounce delay-500"></div>
      </div>
      
      {/* Particle Effect */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;
