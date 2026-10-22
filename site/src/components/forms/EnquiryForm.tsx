"use client";

import { useEffect, useId, useState } from "react";
import { useForm, type FieldErrors, type UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle, Paperclip, X } from "@phosphor-icons/react";
import { contact } from "@/content/home";
import { enquiryForms, type EnquiryField, type EnquiryForm as Config } from "@/content/enquiries";
import { upload } from "@/content/quote";
import { enquirySchemaFor } from "@/lib/enquiry-schema";
import styles from "@/components/quote/QuoteForm.module.css";

type Values = Record<string, string>;

/**
 * Contact, partnership and careers form. Fields come from content/enquiries.ts; the same schema validates here
 * and in app/api/enquiry. Uses the quote form's styles so every form on the site looks the same.
 */
export function EnquiryForm({ kind }: { kind: Config["kind"] }) {
  const config = enquiryForms[kind];
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [sendError, setSendError] = useState<string | null>(null);
  const [sent, setSent] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const formId = useId();

  const { register, handleSubmit, formState: { errors, submitCount } } = useForm<Values>({
    resolver: zodResolver(enquirySchemaFor(kind)),
    mode: "onTouched",
  });

  const errorCount = Object.keys(errors).length + (config.file?.required && !file && submitCount > 0 ? 1 : 0);
  useEffect(() => {
    if (submitCount > 0 && errorCount > 0) document.getElementById(`${formId}-errors`)?.focus();
  }, [submitCount, errorCount, formId]);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    e.target.value = "";
    if (!f) return;
    const accept = kind === "career" ? ["application/pdf"] : upload.accept;
    if (!accept.includes(f.type)) return setFileError(kind === "career" ? "Attach your CV as a PDF." : "Attach a PDF or an image (JPG, PNG or WebP).");
    if (f.size > upload.maxBytes) return setFileError("That file is over 10 MB.");
    setFileError(null);
    setFile(f);
  }

  async function onSubmit(values: Values) {
    if (config.file?.required && !file) {
      setFileError(`Attach your ${config.file.label}.`);
      return;
    }
    setSending(true);
    setSendError(null);
    const body = new FormData();
    body.set("kind", kind);
    body.set("data", JSON.stringify(values));
    if (file) body.set("file", file);
    try {
      const res = await fetch("/api/enquiry", { method: "POST", body });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "We couldn’t send that.");
      setSent(json.reference);
    } catch (err) {
      setSendError(err instanceof Error ? err.message : "We couldn’t send that.");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className={styles.form} role="status">
        <CheckCircle size={40} style={{ color: "var(--success)" }} aria-hidden="true" />
        <h2 className={styles.heading}>{config.sentTitle}</h2>
        <p className="overline" style={{ color: "var(--ink-muted)", marginTop: "calc(var(--space-24) * -1)" }}>Reference {sent}</p>
        <p style={{ color: "var(--ink-muted)" }}>{config.sentText}</p>
      </div>
    );
  }

  return (
    <form noValidate className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {submitCount > 0 && errorCount > 0 ? (
        <div id={`${formId}-errors`} tabIndex={-1} role="alert" className={styles.alert}>
          {errorCount === 1 ? "One answer needs a look." : `${errorCount} answers need a look.`} They’re marked below.
        </div>
      ) : null}
      <div className={styles.fields}>
        {config.fields.map((f) => (
          <Field key={f.name} field={f} register={register} errors={errors} />
        ))}
        {config.file ? (
          <div className={styles.field}>
            <span className={styles.label} id={`${formId}-file`}>
              {config.file.label}
              {config.file.required ? " *" : <span className={styles.optional}> (optional)</span>}
            </span>
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
                <span><strong>Attach a file</strong></span>
                <input type="file" className="visually-hidden" accept={kind === "career" ? "application/pdf" : upload.accept.join(",")} onChange={onFile} aria-labelledby={`${formId}-file`} aria-describedby={`${formId}-file-hint`} />
              </label>
            )}
            <p id={`${formId}-file-hint`} className={fileError ? styles.error : styles.hint}>{fileError ?? config.file.hint}</p>
          </div>
        ) : null}
      </div>
      {sendError ? (
        <p role="alert" className={styles.alert}>
          {sendError} You can also reach us on <a href={contact.whatsappHref}>WhatsApp</a>.
        </p>
      ) : null}
      <div className={styles.actions}>
        <button type="submit" className={`${styles.button} ${styles.accent}`} disabled={sending}>
          {sending ? "Sending…" : config.submitLabel}
          {sending ? null : <ArrowRight size={20} aria-hidden="true" />}
        </button>
      </div>
    </form>
  );
}

function Field({ field, register, errors }: { field: EnquiryField; register: UseFormRegister<Values>; errors: FieldErrors<Values> }) {
  const id = useId();
  const error = errors[field.name]?.message as string | undefined;
  const label = (
    <>
      {field.label}
      {field.required ? " *" : null}
    </>
  );
  if (field.type === "choice") {
    return (
      <div className={styles.field} role="radiogroup" aria-labelledby={`${id}-label`} aria-invalid={!!error} aria-describedby={error ? `${id}-msg` : undefined}>
        <span id={`${id}-label`} className={styles.label}>{label}</span>
        <div className={styles.chips}>
          {field.options.map((o) => (
            <label key={o} className={styles.chip}>
              <input type="radio" value={o} className="visually-hidden" {...register(field.name)} />
              <span>{o}</span>
            </label>
          ))}
        </div>
        {error ? <p id={`${id}-msg`} className={styles.error}>{error}</p> : null}
      </div>
    );
  }
  const common = {
    id,
    className: styles.input,
    placeholder: field.placeholder,
    "aria-invalid": !!error,
    "aria-describedby": error ? `${id}-msg` : undefined,
    ...register(field.name),
  };
  return (
    <div className={`${styles.field} ${"half" in field && field.half ? styles.half : ""}`}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      {field.type === "textarea" ? <textarea rows={5} {...common} /> : <input type={field.type} autoComplete={field.autoComplete} {...common} />}
      {error ? <p id={`${id}-msg`} className={styles.error}>{error}</p> : null}
    </div>
  );
}
