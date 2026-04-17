import mapImage from '../../assets/Gemini_Generated_Image_3a2bcu3a2bcu3a2b.png';

export default function MapPanel({ title = 'Mapa Operacional' }) {
  return (
    <section className="relative overflow-hidden rounded-xl2 border border-line bg-surface p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
        <span className="text-xs text-muted">Atualização em tempo real</span>
      </div>
      <div className="relative h-[28rem] rounded-xl2 border border-line bg-zinc-900 overflow-hidden">
        <img 
          src={mapImage} 
          alt="Mapa do Porto" 
          className="h-full w-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
