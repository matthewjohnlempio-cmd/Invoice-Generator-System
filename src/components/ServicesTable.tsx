"use client";

import { MdOutlineRoomService } from "react-icons/md";

export default function ServicesTable({
  services,
  setServices,
  currency,
}: any) {

  const updateService = (index: number, field: string, value: any) => {
    const updated = [...services];

    if (field === "hours" || field === "rate") {
      const parsed = parseFloat(value);
      updated[index][field] = isNaN(parsed) ? 0 : parsed;
    } else {
      updated[index][field] = value;
    }

    setServices(updated);
  };

  const addService = () => {
    setServices([
      ...services,
      { name: "", hours: 1, rate: 0 }
    ]);
  };

  const removeService = (index: number) => {
    const updated = services.filter((_: any, i: number) => i !== index);
    setServices(updated);
  };

  return (
    <div className="bg-[var(--surface)] p-5 rounded-xl">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4 text-[var(--primary)]">
        <h3 className="font-semibold flex items-center gap-2">
          <MdOutlineRoomService /> Services
        </h3>

        <button
          onClick={addService}
          className="text-sm hover:underline"
        >
          + Add
        </button>
      </div>

      {/* TABLE */}
      <div className="rounded-md overflow-hidden border border-white/10">

        {/* HEADER ROW */}
        <div className="grid grid-cols-12 gap-2 px-3 py-2 text-xs text-[var(--subtext)] bg-[var(--bg)] border-b border-white/10">
          <div className="col-span-5">Description</div>
          <div className="col-span-2 text-center">Hrs</div>
          <div className="col-span-2 text-center">Rate</div>
          <div className="col-span-2 text-right">Subtotal</div>
          <div className="col-span-1"></div>
        </div>

        {/* EMPTY STATE */}
        {(!services || services.length === 0) && (
          <div className="text-center py-10 text-sm text-[var(--subtext)]">
            <p className="mb-2">No services added yet.</p>
            <button
              onClick={addService}
              className="text-[var(--primary)] hover:underline"
            >
              + Add your first service
            </button>
          </div>
        )}

        {/* ROWS */}
        {services && services.map((s: any, i: number) => {

          // ✅ SAFE NUMBERS
          const hours = Number(s.hours) || 0;
          const rate = Number(s.rate) || 0;

          // 💡 BASE CALCULATION ONLY (NO CURRENCY HERE)
          const lineTotal = hours * rate;

          return (
            <div
              key={i}
              className="grid grid-cols-12 gap-2 items-center px-3 py-3 bg-[var(--surface)] border-b border-white/5 last:border-b-0"
            >

              {/* NAME */}
              <input
                className="col-span-5 bg-transparent outline-none"
                value={s.name}
                onChange={(e) =>
                  updateService(i, "name", e.target.value)
                }
              />

              {/* HOURS */}
              <input
                type="number"
                min={0}
                step="0.5"
                className="col-span-2 bg-transparent outline-none text-center appearance-none"
                value={s.hours}
                onChange={(e) =>
                  updateService(i, "hours", e.target.value)
                }
              />

              {/* RATE */}
              <div className="col-span-2 flex items-center justify-center gap-1">

                <span className="text-[var(--subtext)]">
                  {currency.symbol}
                </span>

                <input
                  type="number"
                  min={0}
                  step="0.5"
                  className="w-20 bg-transparent outline-none text-center appearance-none"
                  value={s.rate}
                  onChange={(e) =>
                    updateService(i, "rate", e.target.value)
                  }
                />

              </div>

              {/* SUBTOTAL (NO CURRENCY CONVERSION HERE) */}
              <div className="col-span-2 text-right text-[var(--primary)] font-semibold">
                {currency.symbol}
                {lineTotal.toFixed(2)}
              </div>

              {/* DELETE */}
              <button
                onClick={() => removeService(i)}
                className="col-span-1 text-red-400 hover:text-red-300 text-sm"
              >
                ✕
              </button>

            </div>
          );
        })}

      </div>
    </div>
  );
}