"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { useForm, useWatch, type FieldErrors, type UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Paperclip, WhatsappLogo, X } from "@phosphor-icons/react";
import { contact } from "@/content/home";
import { getService, replyOptions, services, upload, type Field } from "@/content/quote";
import { quoteSchemaFor, summarise, type QuoteInput } from "@/lib/quote-schema";
import styles from "./QuoteForm.module.css";

type Props = { initialService?: string; initialDetails?: Record<string, string> };

/**
 * Request a quote (Figma Templates → 25 Request a quote): service picker → that service's questions →
 * your details → review → send. Fields come from content/quote.ts; rules from lib/quote-schema.ts.
 */
export function QuoteForm({ initialService, initialDetails = {} }: Props) {
  const router = useRouter();
  const [step, setStep] = useState<"form" | "review">("form");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [sendError, setSendError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors, submitCount },
  } = useForm<QuoteInput>({
    // Validate against the schema for whichever service is picked right now.
    resolver: (values, context, options) => zodResolver(quoteSchemaFor(values.service))(values, context, options),
    mode: "onTouched",
    defaultValues: { service: initialService ?? "", details: initialDetails, replyBy: "WhatsApp", email: "", organisation: "", notes: "" },
  });

  const serviceId = useWatch({ control, name: "service" });
  const service = getService(serviceId);

  // Switching service starts its questions fresh (the prefilled ones only apply to the first service).
  const firstService = useRef(initialService);
  useEffect(() => {
    if (serviceId && serviceId !== firstService.current) {
      setValue("details", {});
      firstService.current = undefined;
    }
  }, [serviceId, setValue]);

  // After a failed submit, move focus to the error summary so keyboard and screen reader users hear it.
  const errorCount = countErrors(errors);
  useEffect(() => {
    if (submitCount > 0 && errorCount > 0) document.getElementById("quote-errors")?.focus();
  }, [submitCount, errorCount]);

  const scrollTop = () => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    e.target.value = "";
    if (!f) return;
    if (!upload.accept.includes(f.type)) return setFileError("Attach a PDF or an image (JPG, PNG or WebP).");
    if (f.size > upload.maxBytes) return setFileError("That file is over 10 MB. Attach a smaller one or send it on WhatsApp.");
    setFileError(null);
    setFile(f);
  }

  async function send() {
    setSending(true);
    setSendError(null);
    const body = new FormData();
    body.set("data", JSON.stringify(getValues()));
    if (file) body.set("file", file);
    try {
      const res = await fetch("/api/quote", { method: "POST", body });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "We couldn’t send your request.");
      router.push(`/quote/sent?ref=${encodeURIComponent(json.reference)}`);
    } catch (err) {
      setSendError(err instanceof Error ? err.message : "We couldn’t send your request.");
      setSending(false);
    }
  }

  const whatsappHref = () => {
    const lines = summarise(getValues()).map((r) => `${r.label}: ${r.value}`);
    return `${contact.whatsappHref}?text=${encodeURIComponent(["Quote request", ...lines].join("\n"))}`;
  };

  if (step === "review") {
    const rows = summarise(getValues());
    return (
      <div ref={topRef} className={styles.form}>
        <h2 className={styles.heading}>Check your request.</h2>
        <p className={styles.muted}>Nothing is sent until you press Send request.</p>
        <dl className={styles.summary}>
          {rows.map((r) => (
            <div key={r.label} className={styles.summaryRow}>
              <dt>{r.label}</dt>
              <dd>{r.value}</dd>
            </div>
          ))}
          {file ? (
            <div className={styles.summaryRow}>
              <dt>Attachment</dt>
              <dd>{file.name}</dd>
            </div>
          ) : null}
        </dl>
        {sendError ? (
          <p role="alert" className={styles.alert}>
            {sendError} You can also <a href={whatsappHref()}>send it on WhatsApp</a>.
          </p>
        ) : null}
        <div className={styles.actions}>
          <button type="button" className={`${styles.button} ${styles.accent}`} onClick={send} disabled={sending}>
            {sending ? "Sending…" : "Send request"}
            {sending ? null : <ArrowRight size={20} aria-hidden="true" />}
          </button>
          <button
            type="button"
            className={`${styles.button} ${styles.secondary}`}
            onClick={() => {
              setStep("form");
              requestAnimationFrame(scrollTop);
            }}
            disabled={sending}
          >
            <ArrowLeft size={20} aria-hidden="true" />
            Back to the form
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      noValidate
      className={styles.form}
      onSubmit={(e) =>
        handleSubmit(() => {
          setStep("review");
          requestAnimationFrame(scrollTop);
        })(e)
      }
    >
      <div ref={topRef} />
      {submitCount > 0 && errorCount > 0 ? (
        <div id="quote-errors" tabIndex={-1} role="alert" className={styles.alert}>
          {errorCount === 1 ? "One answer needs a look." : `${errorCount} answers need a look.`} They’re marked below.
        </div>
      ) : null}

      <fieldset className={styles.group}>
        <legend className={styles.heading}>
          <span className={styles.step}>1</span> What do you need?
        </legend>
        <Choice
          name="service"
          label="Pick one. The questions below change to match."
          options={services.map((s) => ({ value: s.id, label: s.label }))}
          register={register}
          error={errors.service?.message}
        />
      </fieldset>

      {service ? (
        <fieldset className={styles.group} key={service.id}>
          <legend className={styles.heading}>
            <span className={styles.step}>2</span> {service.detailsTitle}
          </legend>
          <div className={styles.fields}>
            {service.fields.map((f) => (
              <DetailField key={f.name} field={f} register={register} errors={errors} />
            ))}
          </div>
        </fieldset>
      ) : null}

      <fieldset className={styles.group}>
        <legend className={styles.heading}>
          <span className={styles.step}>{service ? 3 : 2}</span> Your details
        </legend>
        <div className={styles.fields}>
          <TextField label="Your name" name="name" required half register={register} error={errors.name?.message} autoComplete="name" placeholder="Amina Bello" />
          <TextField label="Organisation" name="organisation" half register={register} autoComplete="organization" placeholder="Optional" />
          <TextField label="Phone" name="phone" type="tel" required half register={register} error={errors.phone?.message} autoComplete="tel" placeholder="0803 123 4567" />
          <TextField label="Email" name="email" type="email" half register={register} error={errors.email?.message} autoComplete="email" placeholder="Optional" />
          <Choice name="replyBy" label="Best way to reply" options={replyOptions.map((o) => ({ value: o, label: o }))} register={register} />
        </div>
      </fieldset>

      <div className={styles.fields}>
        <div className={styles.field}>
          <label htmlFor="notes" className={styles.label}>Anything else? <span className={styles.optional}>(optional)</span></label>
          <textarea id="notes" rows={4} className={styles.input} placeholder="Access, timing, anything we should know" {...register("notes")} />
        </div>

        <div className={styles.field}>
          <span className={styles.label} id="file-label">Attachment <span className={styles.optional}>(optional)</span></span>
          {file ? (
            <div className={styles.fileChip}>
              <Paperclip size={16} aria-hidden="true" />
              <span>{file.name}</span>
              <button type="button" className={styles.fileRemove} onClick={() => setFile(null)} aria-label={`Remove ${file.name}`}>
                <X size={16} aria-hidden="true" />
              </button>
            </div>
          ) : (
            <label className={styles.drop}>
              <Paperclip size={20} aria-hidden="true" />
              <span><strong>Attach a file</strong> such as a fuel schedule, bill, drawing or parts list</span>
              <input type="file" className="visually-hidden" accept={upload.accept.join(",")} onChange={onFile} aria-labelledby="file-label" aria-describedby="file-hint" />
            </label>
          )}
          <p id="file-hint" className={fileError ? styles.error : styles.hint}>{fileError ?? "PDF or image, up to 10 MB."}</p>
        </div>
      </div>

      <div className={styles.actions}>
        <button type="submit" className={`${styles.button} ${styles.accent}`}>
          Review request
          <ArrowRight size={20} aria-hidden="true" />
        </button>
        <a className={`${styles.button} ${styles.ghost}`} href={contact.whatsappHref} onClick={(e) => (e.currentTarget.href = whatsappHref())}>
          <WhatsappLogo size={20} aria-hidden="true" />
          Send on WhatsApp instead
        </a>
      </div>
    </form>
  );
}

function countErrors(errors: FieldErrors<QuoteInput>) {
  const { details, ...rest } = errors;
  return Object.keys(rest).length + (details ? Object.keys(details).length : 0);
}

function DetailField({ field, register, errors }: { field: Field; register: UseFormRegister<QuoteInput>; errors: FieldErrors<QuoteInput> }) {
  const name = `details.${field.name}` as const;
  const error = (errors.details as Record<string, { message?: string }> | undefined)?.[field.name]?.message;
  if (field.type === "choice") {
    return <Choice name={name} label={field.label} required={field.required} options={field.options.map((o) => ({ value: o, label: o }))} register={register} error={error} />;
  }
  if (field.type === "textarea") {
    return (
      <div className={styles.field}>
        <label htmlFor={name} className={styles.label}>{field.label}{field.required ? " *" : null}</label>
        <textarea id={name} rows={4} className={styles.input} placeholder={field.placeholder} aria-invalid={!!error} aria-describedby={`${name}-msg`} {...register(name)} />
        <p id={`${name}-msg`} className={error ? styles.error : styles.hint}>{error ?? field.hint}</p>
      </div>
    );
  }
  return (
    <TextField
      label={field.label}
      name={name}
      type={field.type === "number" ? "text" : field.type}
      inputMode={field.type === "number" ? "numeric" : undefined}
      required={field.required}
      half={field.half}
      register={register}
      error={error}
      placeholder={field.placeholder}
      hint={field.hint}
    />
  );
}

type TextFieldProps = {
  label: string;
  name: Parameters<UseFormRegister<QuoteInput>>[0];
  register: UseFormRegister<QuoteInput>;
  type?: string;
  inputMode?: "numeric";
  required?: boolean;
  half?: boolean;
  error?: string;
  hint?: string;
  placeholder?: string;
  autoComplete?: string;
};

function TextField({ label, name, register, type = "text", inputMode, required, half, error, hint, placeholder, autoComplete }: TextFieldProps) {
  return (
    <div className={`${styles.field} ${half ? styles.half : ""}`}>
      <label htmlFor={name} className={styles.label}>{label}{required ? " *" : null}</label>
      <input
        id={name}
        type={type}
        inputMode={inputMode}
        className={styles.input}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error || hint ? `${name}-msg` : undefined}
        {...register(name)}
      />
      {error || hint ? <p id={`${name}-msg`} className={error ? styles.error : styles.hint}>{error ?? hint}</p> : null}
    </div>
  );
}

function Choice({
  name,
  label,
  options,
  register,
  required,
  error,
}: {
  name: Parameters<UseFormRegister<QuoteInput>>[0];
  label: string;
  options: { value: string; label: string }[];
  register: UseFormRegister<QuoteInput>;
  required?: boolean;
  error?: string;
}) {
  const id = useId();
  return (
    <div className={styles.field} role="radiogroup" aria-labelledby={`${id}-label`} aria-invalid={!!error} aria-describedby={error ? `${id}-msg` : undefined}>
      <span id={`${id}-label`} className={styles.label}>{label}{required ? " *" : null}</span>
      <div className={styles.chips}>
        {options.map((o) => (
          <label key={o.value} className={styles.chip}>
            <input type="radio" value={o.value} className="visually-hidden" {...register(name)} />
            <span>{o.label}</span>
          </label>
        ))}
      </div>
      {error ? <p id={`${id}-msg`} className={styles.error}>{error}</p> : null}
    </div>
  );
}
