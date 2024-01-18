export interface FtnItem {
  input: string;
  output: string;
}

export default function Preview({ items }: { items: FtnItem[] }) {
  return (
    <div className="border border-x-slate-300 border-y-slate-300">
      <div className="font-medium text-sm text-slate-900 grid grid-cols-2 divide-x divide-slate-300 rounded-sm">
        <p className="px-2">Instruction</p>
        <p className="px-2">Input</p>
        {/* <p className="px-2">Output</p> */}
      </div>
      {items.map((i) => (
        <div
          className="grid grid-cols-2 divide-x divide-slate-300 rounded-sm hover:bg-slate-200 odd:bg-slate-100 bg-white text-slate-900"
          key={i.output}
        >
          <div className="px-2 mono text-sm">{i.input}</div>
          <div className="px-2 mono text-sm">{i.output}</div>
          {/* <div className="px-2 text-sm">d.output</div> */}
        </div>
      ))}
      {/* <div
		class="grid grid-cols-3 divide-x divide-slate-300 rounded-sm hover:bg-slate-200 even:bg-slate-100 text-slate-900"
	>
		<div class="px-2 mono text-sm">Add Two Numbers</div>
		<div class="px-2 mono text-sm">func add(</div>
		<div class="px-2 text-sm">num1 string, num2 string) &#123return num1 + num2&#125;</div>
	</div>
	<div
		class="grid grid-cols-3 divide-x divide-slate-300 rounded-sm hover:bg-slate-200/80 even:bg-slate-100 text-slate-900"
	>
		<div class="px-2 mono text-sm">Generate two numbers</div>
		<div class="px-2 mono text-sm">2</div>
		<div class="px-2 text-sm">3</div>
	</div> */}
    </div>
  );
}
