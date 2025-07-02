// components/InputField.tsx

interface InputFieldProps {
  label?: string;
  type?: string;
  value?: any;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  textarea?: boolean;
  checked?: boolean;
  name?: string;
  options?:any[]; // for select input
}

export default function InputField({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
  disabled = false,
  className = "",
  textarea = false,
  checked,
  name,
  options,
}: InputFieldProps) {
  const baseClasses =
    "w-full bg-theme/20 text-black border border-theme rounded-lg p-2.5 focus:outline-none focus:ring";

  return (
    <div className="space-y-1">
      {type !== "checkbox" && label && (
        <label className="block text-sm font-medium">{label}</label>
      )}

      {textarea ? (
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={`${baseClasses} ${className}`}
        />
      ) : type === "checkbox" ? (
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name={name}
            checked={checked}
            onChange={onChange}
            className="h-4 w-4"
          />
          <label className="text-sm">{label}</label>
        </div>
      ) : type === "select" && options ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={`${baseClasses} ${className}`}
        >
          <option value="">
            {placeholder || "Select an option"}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={`${baseClasses} ${className}`}
        />
      )}
    </div>
  );
}
