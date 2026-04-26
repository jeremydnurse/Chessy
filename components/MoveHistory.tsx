'use client';

export function MoveHistory({ moves }: { moves: string[] }) {
  if (moves.length === 0) {
    return <div className="p-4 text-sm text-gray-500 italic">No moves yet.</div>;
  }
  const pairs: { num: number; white: string; black?: string }[] = [];
  for (let i = 0; i < moves.length; i += 2) {
    pairs.push({ num: i / 2 + 1, white: moves[i], black: moves[i + 1] });
  }
  return (
    <ol className="p-4 font-mono text-sm overflow-y-auto max-h-64 grid grid-cols-[2rem_1fr_1fr] gap-x-2">
      {pairs.map((p) => (
        <li key={p.num} className="contents">
          <span className="text-gray-500">{p.num}.</span>
          <span>{p.white}</span>
          <span>{p.black ?? ''}</span>
        </li>
      ))}
    </ol>
  );
}
