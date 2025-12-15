const features = [
  { k: 'Formats', v: 'RDF · JSON-LD · CSV' },
  { k: 'Rendering', v: 'WebXR · AR/VR' },
  { k: 'Insights', v: 'Natural-language AI' },
  { k: 'Sharing', v: 'Links · QR · Sessions' },
]

export default function FeatureBoxes() {
  return (
    <div className="mt-12 grid grid-cols-2 gap-6 text-left sm:grid-cols-4">
      {features.map(i => (
        <div
          key={i.k}
          className="group rounded-2xl border p-4 backdrop-blur transition-all duration-300 
                     border-black/5 bg-white/10 supports-[backdrop-filter]:bg-white/30 shadow-sm 
                     hover:bg-white/60 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:-translate-y-1
                     dark:border-white/10 dark:bg-white/5 
                     dark:hover:bg-white/10 dark:hover:shadow-[0_0_15px_rgba(139,92,246,0.4)]"
        >
          <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-white/50">
            {i.k}
          </div>
          <div className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
            {i.v}
          </div>
        </div>
      ))}
    </div>
  )
}
