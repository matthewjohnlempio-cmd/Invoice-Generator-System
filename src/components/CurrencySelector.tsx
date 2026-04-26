"use client";

import { useEffect, useState } from "react";
import { currencyFlags, currencySymbols } from "@/lib/currencies";

export default function CurrencySelector({
  currency,
  setCurrency,
}: any) {
  const [rates, setRates] = useState<any>({});

  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((res) => res.json())
      .then((data) => setRates(data.rates));
  }, []);

  const currencies = Object.keys(currencyFlags);

  return (
    <div className="flex items-center gap-2 bg-[var(--surface)] px-3 py-2 rounded-md">

      {/* FLAG ONLY ONCE (FIXED DUPLICATION) */}
      <span className="text-lg">
        {currencyFlags[currency.code]}
      </span>

      <select
        value={currency.code}
        onChange={(e) => {
          const code = e.target.value;

          setCurrency({
            code,
            symbol: currencySymbols[code],
            flag: currencyFlags[code],
            rate: rates[code] || 1,
          });
        }}
        className="bg-transparent outline-none text-sm"
      >
        {currencies.map((code) => (
          <option key={code} value={code}>
            {currencyFlags[code]} {code} {currencySymbols[code]}
          </option>
        ))}
      </select>

    </div>
  );
}