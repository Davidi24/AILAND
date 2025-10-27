export default function NodeStyles() {
  return (
    <style>{`
      @keyframes float {
        0%,100% { transform: translateY(0) scale(1); opacity: .95; }
        50% { transform: translateY(-10px) scale(1.03); opacity: 1; }
      }
      .node-dark {
        animation: float 6s ease-in-out infinite;
        box-shadow: 0 0 0 3px rgba(255,255,255,.05), 0 0 20px rgba(139,92,246,.26), inset 0 0 10px rgba(255,255,255,.22);
      }
      .node-light {
        animation: float 6s ease-in-out infinite;
        box-shadow: 0 0 0 2px rgba(16,24,40,.05), 0 0 18px rgba(139,92,246,.22), inset 0 0 10px rgba(255,255,255,.45);
      }
    `}</style>
  )
}
