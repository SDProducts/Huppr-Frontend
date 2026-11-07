"use client";

import { useField } from "formik";

interface PasswordStrengthProps {
  name: string;
}

const PasswordStrength = ({ name }: PasswordStrengthProps) => {
  const [field] = useField(name);

  const password = field.value || "";

  const requirements = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
  };

  const score = Object.values(requirements).filter(Boolean).length;

  const getBarClass = (bar: number) => {
    if (score < bar) {
      return "bg-gray-200";
    }

    if (score <= 2) {
      return "bg-red-500";
    }

    if (score === 3) {
      return "bg-orange-400";
    }

    if (score === 4) {
      return "bg-yellow-400";
    }

    return "bg-green-500";
  };

  const getStrengthLabel = () => {
    if (!password) return null;

    if (score <= 2) return "Weak";
    if (score === 3) return "Fair";
    if (score === 4) return "Good";

    return "Strong";
  };

  const getLabelClass = () => {
    if (score <= 2) return "text-red-500";
    if (score === 3) return "text-orange-500";
    if (score === 4) return "text-yellow-600";

    return "text-green-600";
  };

  return (
    <div className="-mt-2 px-1">
      {/* Strength bars */}
      <div className="grid grid-cols-4 gap-2">
        {[1, 2, 3, 4].map((bar) => (
          <div
            key={bar}
            className={`h-1 transition-colors duration-300 rounded-full ${getBarClass(
              bar
            )}`}
          />
        ))}
      </div>

      {/* Requirement / strength */}
      <div className="mt-2 flex items-center justify-between gap-3">
        <p className="text-[11px] text-muted-foreground">
          Must include 8+ characters, one uppercase, one lowercase, one number,
          and one symbol.
        </p>

        {password && (
          <span
            className={`shrink-0 text-[11px] font-medium ${getLabelClass()}`}
          >
            {getStrengthLabel()}
          </span>
        )}
      </div>
    </div>
  );
};

export default PasswordStrength;
