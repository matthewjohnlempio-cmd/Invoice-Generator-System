"use client";

import { useState } from "react";
import { FiUser } from "react-icons/fi";
import { FaUserTie } from "react-icons/fa6";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { MdAddCard } from "react-icons/md";

import Section from "@/components/Section";
import Input from "@/components/Input";
import ServicesTable from "@/components/ServicesTable";
import CurrencySelector from "@/components/CurrencySelector";
import InvoiceTemplate from "@/components/InvoiceTemplate";
import RichNotes from "@/components/RichNotes";

/* =========================
   TYPE FIX (IMPORTANT)
========================= */
type Service = {
  name: string;
  hours: number;
  rate: number;
};

export default function InvoicePage() {

  /* =========================
     SERVICES (FIXED TYPE)
  ========================= */
  const [services, setServices] = useState<Service[]>([]);

  const [currency, setCurrency] = useState({
    code: "USD",
    symbol: "$",
    flag: "🇺🇸",
    rate: 1,
  });

  const [dueDate, setDueDate] = useState("");

  const [invoiceCreated, setInvoiceCreated] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const [savedInvoice, setSavedInvoice] = useState<any>(null);

  const [showNotice, setShowNotice] = useState(false);

  /* =========================
     NEW INPUT STATES
  ========================= */
  const [yourName, setYourName] = useState("");
  const [yourBusiness, setYourBusiness] = useState("");
  const [yourEmail, setYourEmail] = useState("");
  const [yourAddress, setYourAddress] = useState("");

  const [clientName, setClientName] = useState("");
  const [clientBusiness, setClientBusiness] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientEmail, setClientEmail] = useState("");

  /* =========================
     PAYMENT STATES
  ========================= */
  const [paymentMethod, setPaymentMethod] = useState("gcash");
  const [paymentDetails, setPaymentDetails] = useState("");
  const [notes, setNotes] = useState("");

  /* =========================
     SAFE NUMBER TOTAL (FIX)
  ========================= */

  // BASE TOTAL (always raw input values)
  const totalBase = services.reduce((a, s) => {
    const hours = Number(s.hours) || 0;
    const rate = Number(s.rate) || 0;
    return a + (hours * rate);
  }, 0);

  // CONVERTED TOTAL (for display)
  const total = totalBase;

  /* =========================
     AUTO GENERATORS
  ========================= */
  const generateInvoiceNumber = () => {
    return "INV-" + Date.now().toString().slice(-6);
  };

  const generateInvoiceDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  /* =========================
     CREATE INVOICE
  ========================= */
  const handleCreateInvoice = () => {
    const newInvoiceNumber = generateInvoiceNumber();
    const newInvoiceDate = generateInvoiceDate();

    setSavedInvoice({
      services,
      currency,
      invoiceDate: newInvoiceDate,
      dueDate,
      invoiceNumber: newInvoiceNumber,
      total,
      totalBase,

      yourName,
      yourBusiness,
      yourEmail,
      yourAddress,

      clientName,
      clientBusiness,
      clientAddress,
      clientEmail,

      paymentMethod,
      paymentDetails,
      notes,
    });

    setServices([]);
    setDueDate("");

    setInvoiceCreated(true);

    // ✅ SHOW NOTICE
    setShowNotice(true);

    // ✅ AUTO HIDE AFTER 6 SECONDS
    setTimeout(() => {
      setShowNotice(false);
    }, 6000);
  };

  /* =========================
     EXPORT
  ========================= */
  const handleExport = () => {
    if (!savedInvoice) {
      alert("Create an invoice first.");
      return;
    }

    setPreviewOpen(true);
    setTimeout(() => window.print(), 300);
  };

  return (
    <div className="min-h-screen px-10 py-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">

        <h1 className="text-2xl tracking-wide">
          Invoice Builder
        </h1>

        <div className="flex items-center gap-3">

          <CurrencySelector
            currency={currency}
            setCurrency={setCurrency}
          />

          <button
            onClick={handleExport}
            className="bg-[var(--primary)] hover:bg-white/10 hover:text-white text-black px-4 py-2 rounded-md font-semibold"
          >
            Export Invoice
          </button>

          {invoiceCreated && (
            <button
              onClick={() => setPreviewOpen(true)}
              className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md font-semibold"
            >
              Preview Invoice
            </button>
          )}

        </div>
      </div>

      {/* MAIN */}
      <div className="grid grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="col-span-2 space-y-6">

          <Section title="Your Information" icon={<FiUser />}>
            <div className="space-y-3">

              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="Your Name" value={yourName} onChange={(e: any) => setYourName(e.target.value)} />
                <Input placeholder="Business Name" value={yourBusiness} onChange={(e: any) => setYourBusiness(e.target.value)} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="Address" value={yourAddress} onChange={(e: any) => setYourAddress(e.target.value)} />
                <Input placeholder="Email / Contact" value={yourEmail} onChange={(e: any) => setYourEmail(e.target.value)} />
              </div>

            </div>
          </Section>

          <Section title="Client Details" icon={<FaUserTie />}>
            <div className="space-y-3">

              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="Client Name" value={clientName} onChange={(e: any) => setClientName(e.target.value)} />
                <Input placeholder="Business Name" value={clientBusiness} onChange={(e: any) => setClientBusiness(e.target.value)} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="Address" value={clientAddress} onChange={(e: any) => setClientAddress(e.target.value)} />
                <Input placeholder="Email / Contact" value={clientEmail} onChange={(e: any) => setClientEmail(e.target.value)} />
              </div>

            </div>
          </Section>

          <Section title="Invoice Info" icon={<LiaFileInvoiceDollarSolid />}>
            <div className="space-y-3">

              <div className="flex flex-col gap-1">
                <span className="text-xs text-[var(--subtext)]">
                  Due Date
                </span>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full bg-[var(--muted)] border border-white/5 p-2 rounded-md"
                />
              </div>

            </div>
          </Section>

          <ServicesTable
            services={services}
            setServices={setServices}
            currency={currency}
          />

          {/* PAYMENT SECTION */}
          <Section title="Payment" icon={<MdAddCard />}>
            <div className="space-y-3">

              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full bg-[var(--muted)] p-2 rounded-md"
              >
                <option value="gcash">GCash</option>
                <option value="bank">Bank Transfer</option>
                <option value="paypal">PayPal</option>
              </select>

              {paymentMethod === "gcash" && (
                <Input
                  placeholder="GCash Number"
                  value={paymentDetails}
                  onChange={(e: any) => setPaymentDetails(e.target.value)}
                />
              )}

              {paymentMethod === "bank" && (
                <Input
                  placeholder="Bank Account Details"
                  value={paymentDetails}
                  onChange={(e: any) => setPaymentDetails(e.target.value)}
                />
              )}

              {paymentMethod === "paypal" && (
                <Input
                  placeholder="PayPal Email"
                  value={paymentDetails}
                  onChange={(e: any) => setPaymentDetails(e.target.value)}
                />
              )}

              <RichNotes
                value={notes}
                onChange={setNotes}
              />

            </div>
          </Section>

          {/* SUCCESS NOTICE */}
          {showNotice && (
            <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
              <div className="bg-green-500 text-white px-5 py-3 rounded-md shadow-lg animate-pulse">
                Invoice successfully generated ✔
              </div>
            </div>
          )}

          <div className="bg-[var(--surface)] p-5 rounded-xl">
            <button
              onClick={handleCreateInvoice}
              className="w-full bg-[var(--primary)] text-black py-2 rounded-md font-semibold"
            >
              Create Invoice
            </button>
          </div>

        </div>

        {/* RIGHT */}
        <div className="col-span-1 bg-[var(--surface)] p-6 rounded-xl sticky top-6 h-fit">
          <h2 className="text-lg mb-4">Invoice Summary</h2>

          <div className="space-y-3 text-sm text-[var(--subtext)]">

            {/* BASE VALUE DISPLAY */}
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>
                {currency.symbol}
                {totalBase.toFixed(2)}
              </span>
            </div>

            {/* TAX */}
            <div className="flex justify-between">
              <span>Tax</span>
              <span>{currency.symbol}0</span>
            </div>

            {/* FINAL TOTAL (FIXED) */}
            <div className="border-t border-white/10 pt-3 flex justify-between text-white text-base">
              <span>Total</span>
              <span className="text-[var(--primary)] font-bold">
                {currency.symbol}
                {total.toFixed(2)}
              </span>
            </div>

          </div>
        </div>

      </div>

      {/* REAL INVOICE */}
      {previewOpen && savedInvoice && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setPreviewOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-black w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-xl"
          >
            <InvoiceTemplate
              data={savedInvoice}
              onClose={() => setPreviewOpen(false)}
            />
          </div>
        </div>
      )}

    </div>
  );
}