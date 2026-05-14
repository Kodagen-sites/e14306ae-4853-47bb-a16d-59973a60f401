"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

const PROJECT_TYPES = [
  "Multi-family residential",
  "Custom home",
  "Commercial / mixed-use",
  "Renovation / tenant fit-out",
  "Other",
];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError("Something went wrong. Email info@apexbuild.com directly.");
    }
  }

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="max-w-[520px]"
      >
        <div className="eyebrow mb-4">Received</div>
        <h2 className="font-display text-ink text-[clamp(32px,5vw,56px)] leading-tight font-light mb-6">
          Thank you.
        </h2>
        <p className="text-ink-body text-base md:text-lg leading-relaxed">
          A principal will reply within one business day. If your project is
          time-sensitive, call <a className="text-ink underline-offset-4 hover:underline" href="tel:+14165550100">(416) 555-0100</a>.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-[520px] space-y-6">
      <div className="eyebrow mb-2">
        <span className="inline-block h-px w-10 align-middle bg-ink/30 mr-3" />
        Project inquiry
      </div>

      <Field label="Name" name="name" required />
      <Field label="Email" name="email" type="email" required />
      <Field label="Phone (optional)" name="phone" type="tel" />

      <FieldSelect label="Project type" name="projectType" options={PROJECT_TYPES} required />

      <Field label="Project location" name="location" placeholder="City or neighborhood" required />

      <FieldTextarea
        label="Tell us about the project"
        name="message"
        rows={5}
        placeholder="Scope, timeline, anything we should know."
        required
      />

      {error && (
        <p className="font-mono text-[11px] text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group inline-flex items-center gap-3 bg-ink text-canvas px-8 py-5 font-mono text-[11px] uppercase tracking-[0.22em] hover:bg-ink-soft transition-colors duration-300 disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Send Inquiry"}
        <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-ink-eyebrow mb-2">
        {label}
        {required && <span aria-hidden className="text-ink/40 ml-1">*</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="block w-full bg-transparent border-0 border-b border-ink/20 px-0 py-3 text-ink text-base focus:outline-none focus:border-ink transition-colors placeholder:text-ink-muted"
      />
    </label>
  );
}

function FieldSelect({
  label,
  name,
  options,
  required,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-ink-eyebrow mb-2">
        {label}
        {required && <span aria-hidden className="text-ink/40 ml-1">*</span>}
      </span>
      <select
        name={name}
        required={required}
        defaultValue=""
        className="block w-full bg-transparent border-0 border-b border-ink/20 px-0 py-3 text-ink text-base focus:outline-none focus:border-ink transition-colors"
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

function FieldTextarea({
  label,
  name,
  rows,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  rows: number;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-ink-eyebrow mb-2">
        {label}
        {required && <span aria-hidden className="text-ink/40 ml-1">*</span>}
      </span>
      <textarea
        name={name}
        rows={rows}
        required={required}
        placeholder={placeholder}
        className="block w-full bg-transparent border-0 border-b border-ink/20 px-0 py-3 text-ink text-base focus:outline-none focus:border-ink transition-colors placeholder:text-ink-muted resize-none"
      />
    </label>
  );
}
