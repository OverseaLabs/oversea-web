interface Props {
  text: string;
  value: any;
  onChange: any;
}

export default function Input({ text, value, onChange }: Props) {
  return (
    <div className="max-w-sm mt-8">
      <label>Model Name</label>
      <input
        id="model-name"
        name="model-name"
        type="text"
        autoComplete="text"
        required
        value={value}
        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6"
        // onChange={(e) => setName(e.target.value)}
        onChange={onChange}
      />
    </div>
  );
}
