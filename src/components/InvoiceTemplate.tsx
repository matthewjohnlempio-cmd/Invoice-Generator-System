"use client";

export default function InvoiceTemplate({ data, onClose }: any) {
  if (!data) return null;

  return (
    <div
      className="
        bg-white text-black p-10 w-full max-w-[800px] mx-auto rounded-md relative
        shadow-lg

        print:w-full
        print:max-w-none
        print:mx-0
        print:p-6
        print:shadow-none
        print:rounded-none
        print:bg-white
      "
    >

      {/* CLOSE BUTTON */}
      <button
        onClick={onClose}
        className="absolute top-1 -right-9 bg-gray-200 hover:bg-[#fc0235] hover:text-white px-3 py-1 rounded-md print:hidden"
      >
        Close
      </button>

      {/* HEADER */}
      <div className="flex justify-between mb-10">
        <div>
          <h1 className="text-2xl font-bold">INVOICE</h1>
          <p className="text-sm text-gray-500">
            {data.currency?.flag} {data.currency?.code}
          </p>
          <p className="text-sm mt-2">
            <strong>Invoice #:</strong> {data.invoiceNumber || "-"}
          </p>
        </div>

        <div className="text-right text-sm">
          <p><strong>Invoice Date:</strong> {data.invoiceDate || "-"}</p>
          <p><strong>Due Date:</strong> {data.dueDate || "-"}</p>
        </div>
      </div>

      {/* FROM / TO */}
      <div className="grid grid-cols-2 gap-10 mb-10 text-sm">

        <div>
          <p className="font-semibold mb-2">From</p>
          <p>{data.yourName || "-"}</p>
          <p>{data.yourBusiness || "-"}</p>
          <p>{data.yourEmail || "-"}</p>
          <p>{data.yourAddress || "-"}</p>
        </div>

        <div>
          <p className="font-semibold mb-2">Bill To</p>
          <p>{data.clientName || "-"}</p>
          <p>{data.clientBusiness || "-"}</p>
          <p>{data.clientEmail || "-"}</p>
          <p>{data.clientAddress || "-"}</p>
        </div>

      </div>

      {/* SERVICES */}
      <div className="border border-gray-300 rounded-md overflow-hidden text-sm">

        <div className="grid grid-cols-12 bg-gray-100 p-3 font-semibold">
          <div className="col-span-6">Description</div>
          <div className="col-span-2 text-center">Hrs</div>
          <div className="col-span-2 text-center">Rate</div>
          <div className="col-span-2 text-right">Total</div>
        </div>

        {(data.services || []).length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No services added
          </div>
        ) : (
          data.services.map((s: any, i: number) => (
            <div key={i} className="grid grid-cols-12 p-3 border-t">
              <div className="col-span-6">{s.name || "-"}</div>
              <div className="col-span-2 text-center">{s.hours || 0}</div>
              <div className="col-span-2 text-center">
                {data.currency?.symbol}{s.rate || 0}
              </div>
              <div className="col-span-2 text-right">
                {data.currency?.symbol}
                {((s.hours || 0) * (s.rate || 0)).toFixed(2)}
              </div>
            </div>
          ))
        )}

      </div>

      {/* TOTAL */}
      <div className="flex justify-end mt-6 text-sm">
        <div className="w-60 space-y-2">

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>
              {data.currency?.symbol}
              {Number(data.totalBase || 0).toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Tax</span>
            <span>{data.currency?.symbol}0</span>
          </div>

          <div className="flex justify-between border-t pt-2 font-bold">
            <span>Total</span>
            <span>
              {data.currency?.symbol}
              {Number(data.total || 0).toFixed(2)}
            </span>
          </div>

        </div>
      </div>

      {/* PAYMENT */}
      <div className="mt-10 text-sm">
        <p className="font-semibold mb-2">Payment Details</p>

        <p><strong>Method:</strong> {data.paymentMethod || "-"}</p>
        <p><strong>Details:</strong> {data.paymentDetails || "-"}</p>

        <div className="mt-3">
          <p className="font-semibold">Notes:</p>

          {data.notes ? (
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: data.notes }}
            />
          ) : (
            <p>-</p>
          )}
        </div>
      </div>

    </div>
  );
}