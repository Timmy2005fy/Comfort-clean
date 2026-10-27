import { useRef, useState, type FormEvent } from "react";
import {
  Phone,
  MapPin,
  CheckCircle2,
  Menu,
  X,
  MoveHorizontal,
  ChevronDown,
} from "lucide-react";
import { Logo } from "./components/Logo";
import heroImg from "./assets/hero.jpg";
import moveInImg from "./assets/move-in.jpg";
import moveOutImg from "./assets/move-out.jpg";
import deepImg from "./assets/deep.jpg";
import studentImg from "./assets/student.jpg";
import beforeImg from "./assets/before.jpg";
import afterImg from "./assets/after.jpg";

type ServiceType =
  | "Move-in cleaning"
  | "Move-out cleaning"
  | "Deep cleaning"
  | "Student room cleaning";

interface FormState {
  name: string;
  service: ServiceType;
  address: string;
  date: string;
  notes: string;
}

interface FormErrors {
  name?: string;
  service?: string;
  address?: string;
}

interface ServiceCardData {
  id: string;
  title: ServiceType;
  description: string;
}

const SERVICES_LIST: ServiceCardData[] = [
  {
    id: "move-in",
    title: "Move-in cleaning",
    description:
      "Complete top-to-bottom sanitization so your new home is pristine, clean, and ready on day one.",
  },
  {
    id: "move-out",
    title: "Move-out cleaning",
    description:
      "Thorough cleaning designed to satisfy move-out inspections and leave the space spotless.",
  },
  {
    id: "deep",
    title: "Deep cleaning",
    description:
      "Intense scrub of kitchens, bathrooms, floors, and corners that standard cleaning misses.",
  },
  {
    id: "student",
    title: "Student room cleaning",
    description:
      "Fast, reliable, and affordable room cleaning tailored specifically for student hostels and rooms.",
  },
];

const SERVICE_IMAGES: Record<string, string> = {
  "move-in": moveInImg,
  "move-out": moveOutImg,
  deep: deepImg,
  student: studentImg,
};

function Photo({
  src,
  alt,
  aspectRatio = "aspect-16/10",
  eager = false,
}: {
  src: string;
  alt: string;
  aspectRatio?: string;
  eager?: boolean;
}) {
  return (
    <div
      className={`relative w-full ${aspectRatio} rounded-2xl overflow-hidden border border-border shadow-sm group`}
    >
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        width={1200}
        height={900}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
    </div>
  );
}

function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const update = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };
  return (
    <section
      id="results"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-background border-t border-border"
    >
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground block">
            Real Transformations
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-ink">
            BEFORE <span className="font-serif-italic font-normal">&amp;</span>{" "}
            AFTER
          </h2>
          <p className="text-sm text-muted-foreground font-medium">
            Drag the handle horizontally to see the difference a deep clean
            makes.
          </p>
        </div>
        <div
          ref={ref}
          className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-3xl overflow-hidden shadow-xl border border-border select-none touch-none cursor-ew-resize"
          onPointerDown={(e) => {
            dragging.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            update(e.clientX);
          }}
          onPointerMove={(e) => dragging.current && update(e.clientX)}
          onPointerUp={() => (dragging.current = false)}
          onPointerCancel={() => (dragging.current = false)}
        >
          <img
            src={afterImg}
            alt="Living room after cleaning"
            loading="lazy"
            width={1200}
            height={900}
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <img
            src={beforeImg}
            alt="Living room before cleaning"
            loading="lazy"
            width={1200}
            height={900}
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          />
          <span className="absolute top-4 left-4 bg-ink text-ink-foreground text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-sm">
            Before
          </span>
          <span className="absolute top-4 right-4 bg-lime text-lime-foreground text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-sm">
            After
          </span>
          <div
            className="absolute inset-y-0 w-0.5 bg-ink-foreground shadow-lg"
            style={{ left: `${pos}%` }}
          >
            <div
              role="slider"
              tabIndex={0}
              aria-label="Before and after comparison slider"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(pos)}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
                if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-ink-foreground text-ink shadow-2xl flex items-center justify-center hover:scale-110 transition-transform focus:outline-none focus:ring-4 focus:ring-lime"
            >
              <MoveHorizontal className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    service: "Move-in cleaning",
    address: "",
    date: "",
    notes: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const updateField = (field: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field in errors) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof FormErrors];
        return next;
      });
    }
  };

  const handleSelectService = (serviceName: ServiceType) => {
    setFormData((prev) => ({ ...prev, service: serviceName }));
    if ("service" in errors) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.service;
        return next;
      });
    }
    const formElement = document.getElementById("quote");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    }
    if (!formData.service) {
      newErrors.service = "Please select a service.";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Please enter your address or location.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    const message = `Hi Comfort Clean, I'd like a quote. Service: ${
      formData.service
    }. Address: ${formData.address.trim()}.${
      formData.date.trim() ? ` Date: ${formData.date.trim()}.` : ""
    }${
      formData.notes.trim() ? ` Notes: ${formData.notes.trim()}.` : ""
    } Name: ${formData.name.trim()}.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/2348110778089?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen font-sans flex flex-col w-full bg-background text-foreground selection:bg-lime selection:text-lime-foreground">
      {/* Sticky Header Navigation */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a
            href="#"
            className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-lime rounded-lg group py-1"
            aria-label="Comfort Clean Home"
          >
            <Logo
              variant="dark"
              className="h-11 sm:h-12 w-auto group-hover:scale-105 transition-transform"
            />
          </a>

          <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-ink">
            <a
              href="#services"
              className="hover:text-muted-foreground transition-colors py-2"
            >
              Services
            </a>
            <a
              href="#how-it-works"
              className="hover:text-muted-foreground transition-colors py-2"
            >
              How It Works
            </a>
            <a
              href="#results"
              className="hover:text-muted-foreground transition-colors py-2"
            >
              Before &amp; After
            </a>
            <a
              href="#quote"
              className="hover:text-muted-foreground transition-colors py-2"
            >
              Request a Quote
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="#quote"
              className="btn-lime px-5 py-2.5 text-sm font-bold uppercase tracking-wider rounded-full shadow-xs cursor-pointer flex items-center justify-center transition-all"
            >
              Request a Quote
            </a>
          </div>

          <button
            type="button"
            className="md:hidden p-2.5 min-w-[44px] min-h-[44px] rounded-lg text-foreground hover:bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-lime flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-b border-border bg-background px-6 py-6 space-y-4 shadow-lg animate-fade-up">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-bold uppercase tracking-wider py-2 text-ink hover:text-muted-foreground"
            >
              Services
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-bold uppercase tracking-wider py-2 text-ink hover:text-muted-foreground"
            >
              How It Works
            </a>
            <a
              href="#results"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-bold uppercase tracking-wider py-2 text-ink hover:text-muted-foreground"
            >
              Before &amp; After
            </a>
            <a
              href="#quote"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-bold uppercase tracking-wider py-2 text-ink hover:text-muted-foreground"
            >
              Request a Quote
            </a>
            <a
              href="#quote"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-lime block w-full text-center px-6 py-3.5 text-sm font-bold uppercase tracking-wider rounded-full mt-2"
            >
              REQUEST A QUOTE
            </a>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="pt-12 sm:pt-16 pb-16 px-4 sm:px-6 lg:px-8 bg-background border-b border-border">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-ink leading-[1.12]">
              Come home to a space that feels brand new.
            </h1>
            <p className="text-base sm:text-xl font-medium text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              From deep cleaning to move-in and move-out cleaning across Ibogun,
              Ifo, and Lagos, we take care of the mess and bring all our own
              supplies and equipment.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#quote"
                className="btn-lime w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider shadow-md flex items-center justify-center transition-all"
              >
                Request a Quote
              </a>
              <a
                href="#results"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider border border-border text-ink hover:bg-surface transition-colors flex items-center justify-center"
              >
                See Before &amp; After
              </a>
            </div>
          </div>
          <div className="max-w-5xl mx-auto mt-10 animate-fade-up">
            <Photo
              src={heroImg}
              alt="Clean Nigerian apartment living room"
              aspectRatio="aspect-16/10"
              eager
            />
          </div>
        </section>

        {/* Services */}
        <section
          id="services"
          className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-surface"
        >
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="border-b border-border pb-6 max-w-xl">
              <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground block mb-2">
                What We Offer
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-ink">
                OUR CLEANING{" "}
                <span className="font-serif-italic font-normal text-ink">
                  SERVICES
                </span>
              </h2>
            </div>
            <div className="space-y-8">
              {SERVICES_LIST.map((card) => {
                return (
                  <div
                    key={card.id}
                    id={`card-${card.id}`}
                    className="w-full p-6 sm:p-8 rounded-3xl bg-card border border-ink/10 shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                      <div className="md:col-span-7 space-y-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-lime block">
                          Professional Service
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-ink">
                          {card.title}
                        </h3>
                        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground font-medium max-w-xl">
                          {card.description}
                        </p>
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => handleSelectService(card.title)}
                            className="btn-lime px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider shadow-xs flex items-center justify-center cursor-pointer transition-all"
                          >
                            Request a Quote
                          </button>
                        </div>
                      </div>
                      <div className="md:col-span-5">
                        <Photo
                          src={SERVICE_IMAGES[card.id] ?? heroImg}
                          alt={card.title}
                          aspectRatio="aspect-[4/3]"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section
          id="how-it-works"
          className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-border bg-background"
        >
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground block">
                Simple Process
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-ink">
                HOW IT{" "}
                <span className="font-serif-italic font-normal text-ink">
                  WORKS
                </span>
              </h2>
              <p className="text-sm text-muted-foreground font-medium max-w-md mx-auto">
                3 simple steps from your initial request to a spotless space.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 01 */}
              <div className="p-6 rounded-2xl bg-surface border border-border shadow-xs flex flex-col gap-4">
                <div className="w-12 h-12 rounded-full bg-lime text-lime-foreground font-mono font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
                  01
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold tracking-tight text-ink">
                    Request a Quote
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground font-medium">
                    Select your service and location details on our quote form
                    or message us directly on WhatsApp.
                  </p>
                </div>
              </div>
              {/* Step 02 */}
              <div className="p-6 rounded-2xl bg-surface border border-border shadow-xs flex flex-col gap-4">
                <div className="w-12 h-12 rounded-full bg-lime text-lime-foreground font-mono font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
                  02
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold tracking-tight text-ink">
                    Price within 24 Hours
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground font-medium">
                    We review your specifications and reply back on WhatsApp
                    with a clear, upfront quote.
                  </p>
                </div>
              </div>
              {/* Step 03 */}
              <div className="p-6 rounded-2xl bg-surface border border-border shadow-xs flex flex-col gap-4">
                <div className="w-12 h-12 rounded-full bg-lime text-lime-foreground font-mono font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
                  03
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold tracking-tight text-ink">
                    Supplies Included
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground font-medium">
                    Our cleaning team arrives at your location fully equipped
                    with all professional cleaning products, supplies, and
                    tools.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <BeforeAfter />

        {/* Quote form */}
        <section
          id="quote"
          className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-border bg-surface"
        >
          <div className="max-w-3xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground block">
                Get Started
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-ink">
                REQUEST A{" "}
                <span className="font-serif-italic font-normal text-ink">
                  QUOTE
                </span>
              </h2>
              <p className="text-sm text-muted-foreground font-medium max-w-md mx-auto">
                Fill in your cleaning details below. Submitting will open your
                pre-filled request directly in WhatsApp.
              </p>
            </div>
            {submitted ? (
              <div className="p-8 rounded-3xl border border-border bg-background text-center space-y-4 shadow-sm animate-fade-up">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black tracking-tight text-ink">
                  Request Sent on WhatsApp
                </h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Thank you! We will review your specifications and reply with
                  your custom price quote within 24 hours.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-bold uppercase tracking-wider underline hover:no-underline cursor-pointer text-ink py-2"
                  >
                    Submit another quote request
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-6 sm:p-10 rounded-3xl border border-border bg-background space-y-6 shadow-sm"
                noValidate
                aria-label="Request a quote form"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="name"
                      className="block text-xs font-bold uppercase tracking-wider text-ink"
                    >
                      Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      placeholder="Your full name"
                      className={`w-full px-4 py-3 rounded-xl border bg-card text-sm font-medium text-ink transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                        errors.name
                          ? "border-destructive ring-1 ring-destructive"
                          : "border-border"
                      }`}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <p
                        id="name-error"
                        className="text-xs font-semibold text-destructive mt-1"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="service"
                      className="block text-xs font-bold uppercase tracking-wider text-ink"
                    >
                      Service Required{" "}
                      <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="service"
                        value={formData.service}
                        onChange={(e) => updateField("service", e.target.value)}
                        className={`w-full appearance-none px-4 py-3 pr-10 rounded-xl border bg-card text-sm font-medium text-ink transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                          errors.service
                            ? "border-destructive ring-1 ring-destructive"
                            : "border-border"
                        }`}
                        aria-invalid={!!errors.service}
                        aria-describedby={
                          errors.service ? "service-error" : undefined
                        }
                      >
                        <option value="Move-in cleaning">
                          Move-in cleaning
                        </option>
                        <option value="Move-out cleaning">
                          Move-out cleaning
                        </option>
                        <option value="Deep cleaning">Deep cleaning</option>
                        <option value="Student room cleaning">
                          Student room cleaning
                        </option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    </div>
                    {errors.service && (
                      <p
                        id="service-error"
                        className="text-xs font-semibold text-destructive mt-1"
                      >
                        {errors.service}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="address"
                    className="block text-xs font-bold uppercase tracking-wider text-ink"
                  >
                    Address / Location{" "}
                    <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={formData.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    placeholder="e.g. Ibogun, Ifo, or Ikeja Lagos"
                    className={`w-full px-4 py-3 rounded-xl border bg-card text-sm font-medium text-ink transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.address
                        ? "border-destructive ring-1 ring-destructive"
                        : "border-border"
                    }`}
                    aria-invalid={!!errors.address}
                    aria-describedby={
                      errors.address ? "address-error" : undefined
                    }
                  />
                  {errors.address && (
                    <p
                      id="address-error"
                      className="text-xs font-semibold text-destructive mt-1"
                    >
                      {errors.address}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="date"
                      className="block text-xs font-bold uppercase tracking-wider text-ink"
                    >
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      value={formData.date}
                      onChange={(e) => updateField("date", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm font-medium text-ink transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label
                      htmlFor="notes"
                      className="block text-xs font-bold uppercase tracking-wider text-ink"
                    >
                      Notes{" "}
                      <span className="text-xs normal-case font-normal text-muted-foreground">
                        (optional)
                      </span>
                    </label>
                    <input
                      type="text"
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => updateField("notes", e.target.value)}
                      placeholder="e.g. 2-bedroom flat, urgent cleaning"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm font-medium text-ink transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="btn-lime w-full sm:w-auto px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <svg
                      className="w-4 h-4 fill-current shrink-0"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.001 5.45-4.436 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662a11.87 11.87 0 005.71 1.455h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z" />
                    </svg>
                    <span>Request on WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-ink text-ink-foreground">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-ink-foreground/15 pb-8 text-center md:text-left">
            <div className="space-y-3 flex flex-col items-center md:items-start">
              <Logo variant="light" className="h-14 sm:h-16 w-auto" />
              <div className="text-xs text-ink-foreground/80 font-medium flex items-center justify-center md:justify-start gap-1.5">
                <MapPin className="w-4 h-4 text-lime-foreground shrink-0" />
                <span>Service Coverage: Ibogun (Ifo) &amp; Lagos State</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://wa.me/2348110778089"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-lime min-h-[44px] px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider shadow-sm flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4 fill-current shrink-0"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.001 5.45-4.436 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662a11.87 11.87 0 005.71 1.455h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z" />
                </svg>
                <span>WhatsApp</span>
              </a>
              <a
                href="tel:+2348110778089"
                className="min-h-[44px] px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border border-ink-foreground/30 text-ink-foreground hover:bg-ink-foreground/10 transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>Call Us</span>
              </a>
            </div>
          </div>
          <div className="text-center pt-2 select-none flex flex-col items-center justify-center">
            <Logo
              variant="light"
              className="h-16 sm:h-20 w-auto opacity-20 filter grayscale contrast-150"
            />
            <p className="text-xs text-ink-foreground/70 font-medium mt-4">
              Comfort Clean &copy; {new Date().getFullYear()} All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
