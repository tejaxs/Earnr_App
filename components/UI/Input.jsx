"use client";

const DynamicInput = ({ id, label, value, onChange, isFocused,type ,name}) => {
  return (
    <div className="relative w-full ">
      {/* Dynamic Label */}
      <label
        htmlFor={id}
        className={`absolute left-3 transition-all duration-300 urbanist-500 ${
          isFocused || value
            ? "top-[5px] text-white text-sm bg-black px-2 tracking-wider"
            : "top-7 text-white"
        }`}
      >
        {label}
      </label>

      {/* Dynamic Input */}
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        onFocus={() => onChange(id, value, true)}
        onBlur={() => onChange(id, value, false)}
        name={name}
        autoComplete="off"
        className="w-full border border-[#FFFFFF] bg-black rounded-md px-3 py-3 mt-4 text-white focus:outline-none autofill:bg-black autofill:text-white "
      />
    </div>
  );
};

export default DynamicInput;
