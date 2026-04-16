function InfoCard({ title, description }) {
  return (
    <article className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="mt-2 text-sm text-zinc-400">{description}</p>
    </article>
  );
}

export default InfoCard;
