// Contact, partnership and careers forms. One generic form (components/forms/EnquiryForm) reads these
// configs; one API route (app/api/enquiry) validates and stores them. Shaped for a CMS collection later.
export type EnquiryField =
  | { name: string; label: string; type: "text" | "email" | "tel"; required?: boolean; half?: boolean; placeholder?: string; autoComplete?: string }
  | { name: string; label: string; type: "textarea"; required?: boolean; placeholder?: string }
  | { name: string; label: string; type: "choice"; options: string[]; required?: boolean };

export type EnquiryForm = {
  kind: "contact" | "partner" | "career" | "senergy";
  submitLabel: string;
  sentTitle: string;
  sentText: string;
  fields: EnquiryField[];
  file?: { label: string; hint: string; required?: boolean };
};

const person: EnquiryField[] = [
  { name: "name", label: "Your name", type: "text", required: true, half: true, autoComplete: "name", placeholder: "Amina Bello" },
  { name: "organisation", label: "Organisation", type: "text", half: true, autoComplete: "organization", placeholder: "Optional" },
  { name: "phone", label: "Phone", type: "tel", required: true, half: true, autoComplete: "tel", placeholder: "0803 123 4567" },
  { name: "email", label: "Email", type: "email", half: true, autoComplete: "email", placeholder: "Optional" },
];

export const enquiryForms: Record<EnquiryForm["kind"], EnquiryForm> = {
  contact: {
    kind: "contact",
    submitLabel: "Send message",
    sentTitle: "Message sent.",
    sentText: "We’ll reply by phone, WhatsApp or email [confirm: within 1 working day].",
    fields: [
      ...person,
      { name: "topic", label: "What is it about?", type: "choice", options: ["A quote", "An existing order or project", "Partnership", "Something else"], required: true },
      { name: "message", label: "Message", type: "textarea", required: true, placeholder: "How can we help?" },
    ],
  },
  partner: {
    kind: "partner",
    submitLabel: "Send enquiry",
    sentTitle: "Enquiry sent.",
    sentText: "Our partnerships team will be in touch to set up a conversation [confirm: within 3 working days].",
    fields: [
      ...person.map((f) => (f.name === "organisation" ? { ...f, required: true, placeholder: "Company or institution" } : f)),
      { name: "partnership", label: "Type of partnership", type: "choice", options: ["Station or site", "Supply or OEM", "Project or EPC", "Finance or investment", "Government or development", "Other"], required: true },
      { name: "message", label: "What do you have in mind?", type: "textarea", required: true, placeholder: "The site, product, project or investment, and where" },
    ],
    file: { label: "Attachment", hint: "A profile, site plan or proposal, if you have one (PDF or image, up to 10 MB)." },
  },
  career: {
    kind: "career",
    submitLabel: "Send application",
    sentTitle: "Application sent.",
    sentText: "Thank you. We keep applications on file and contact you when a matching role opens [confirm].",
    fields: [
      ...person.filter((f) => f.name !== "organisation"),
      { name: "area", label: "Area you work in", type: "choice", options: ["Engineering", "Installation and field work", "Supply and logistics", "Sales and customer service", "Finance and operations", "Other"], required: true },
      { name: "message", label: "Tell us about your experience", type: "textarea", required: true, placeholder: "Your current role, qualifications and what you’d like to do" },
    ],
    file: { label: "CV", hint: "PDF, up to 10 MB.", required: true },
  },
  senergy: {
    kind: "senergy",
    submitLabel: "Get early access",
    sentTitle: "You’re on the list.",
    sentText: "We’ll tell you when SEnergy opens and invite you to try it first.",
    fields: [
      { name: "name", label: "Your name", type: "text", required: true, half: true, autoComplete: "name", placeholder: "Amina Bello" },
      { name: "phone", label: "Phone", type: "tel", required: true, half: true, autoComplete: "tel", placeholder: "0803 123 4567" },
      { name: "email", label: "Email", type: "email", autoComplete: "email", placeholder: "Optional" },
      { name: "use", label: "What would you use it for?", type: "choice", options: ["Cooking gas", "Fuel", "Solar and maintenance", "Paying bills", "Monitoring usage"], required: true },
    ],
  },
};
