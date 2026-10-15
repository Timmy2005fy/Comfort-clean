import React, { useState } from 'react';
import { MessageSquare, Phone, MapPin, CheckCircle2, ArrowUpRight, Menu, X, Image as ImageIcon, ChevronLeft, ChevronRight, Layers, Sparkles } from 'lucide-react';

type ServiceType = 'Move-in cleaning' | 'Move-out cleaning' | 'Deep cleaning' | 'Student room cleaning';

interface FormState {
  name: string;
  phone: string;
  service: ServiceType;
  address: string;
  date: string;
  notes: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  service?: string;
  address?: string;
}

interface ServiceCardData {
  id: string;
  number: string;
  title: ServiceType;
  tag: string;
  description: string;
  imageLabel: string;
}

const SERVICES_LIST: ServiceCardData[] = [
  {
    id: 'move-in',
    number: '01',
    title: 'Move-in cleaning',
    tag: 'Fresh Start',
    description: 'Complete top-to-bottom sanitization so your new home is pristine, clean, and ready on day one.',
    imageLabel: 'Move-in Cleaning Photo Placeholder',
  },
  {
    id: 'move-out',
    number: '02',
    title: 'Move-out cleaning',
    tag: 'Landlord Ready',
    description: 'Thorough cleaning designed to satisfy move-out inspections and leave the space spotless.',
    imageLabel: 'Move-out Cleaning Photo Placeholder',
  },
  {
    id: 'deep',
    number: '03',
    title: 'Deep cleaning',
    tag: 'Thorough Care',
    description: 'Intense scrub of kitchens, bathrooms, floors, and corners that standard cleaning misses.',
    imageLabel: 'Deep Cleaning Photo Placeholder',
  },
  {
    id: 'student',
    number: '04',
    title: 'Student room cleaning',
    tag: 'Hostel Special',
    description: 'Fast, reliable, and affordable room cleaning tailored specifically for student hostels and rooms.',
    imageLabel: 'Student Room Photo Placeholder',
  },
];

/**
 * Reusable Image Placeholder component
 */
function ImagePlaceholder({ label, aspectRatio = 'aspect-16/9', className = '' }: { label: string; aspectRatio?: string; className?: string }) {
  return (
    <div className={`relative w-full ${aspectRatio} rounded-2xl overflow-hidden bg-placeholder-pattern border border-slate-200 flex flex-col items-center justify-center p-4 text-center group hover:border-[#000000] transition-colors ${className}`}>
      <div className="w-10 h-10 rounded-full bg-[#C6F500] text-[#000000] flex items-center justify-center font-bold mb-2 shadow-xs group-hover:scale-105 transition-transform">
        <ImageIcon className="w-5 h-5 text-[#000000]" />
      </div>
      <span className="text-xs font-extrabold uppercase tracking-wider text-[#000000] bg-white px-3.5 py-1 rounded-full shadow-xs border border-slate-200">
        {label}
      </span>
      <span className="text-[10px] text-slate-500 font-medium mt-1">
        [ Photo Frame ]
      </span>
    </div>
  );
}

export default function App() {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    phone: '',
    service: 'Move-in cleaning',
    address: '',
    date: '',
    notes: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  
  // Interactive Whot Deck state
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);

  const handleSelectService = (serviceName: ServiceType) => {
    setFormData((prev) => ({ ...prev, service: serviceName }));
    const formElement = document.getElementById('quote');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNextCard = () => {
    setActiveCardIndex((prev) => (prev + 1) % SERVICES_LIST.length);
  };

  const handlePrevCard = () => {
    setActiveCardIndex((prev) => (prev - 1 + SERVICES_LIST.length) % SERVICES_LIST.length);
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number.';
    }
    if (!formData.service) {
      newErrors.service = 'Please select a service.';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Please enter your address or location.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    const message = `Hi Comfort Clean, I'd like a quote. Service: ${formData.service}. Address: ${formData.address.trim()}.${formData.date.trim() ? ` Date: ${formData.date.trim()}.` : ''}${formData.notes.trim() ? ` Notes: ${formData.notes.trim()}.` : ''} Name: ${formData.name.trim()}. Phone: ${formData.phone.trim()}.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/2348110778089?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen font-sans flex flex-col bg-white selection:bg-[#C6F500] selection:text-[#000000]" style={{ color: 'var(--text-body)' }}>
      
      {/* 1. Sticky Header Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="text-2xl font-black tracking-tight text-[#000000] flex items-center gap-2">
            <span>COMFORT</span>
            <span className="font-serif-italic font-normal text-[#000000]">CLEAN</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#C6F500]" aria-hidden="true" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-extrabold uppercase tracking-widest text-[#000000]">
            <a href="#services" className="hover:text-slate-600 transition-colors">Our Work</a>
            <a href="#how-it-works" className="hover:text-slate-600 transition-colors">How It Works</a>
            <a href="#quote" className="hover:text-slate-600 transition-colors">Request a Quote</a>
          </nav>

          {/* Right Header Action */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#quote"
              className="btn-lime px-6 py-3 text-xs font-black uppercase tracking-wider rounded-full shadow-xs cursor-pointer flex items-center justify-center"
            >
              REQUEST A QUOTE
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-slate-800 hover:bg-slate-100 focus:outline-hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 bg-white px-6 py-6 space-y-4 shadow-lg">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-bold uppercase tracking-wider py-1 text-[#000000]"
            >
              Our Work
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-bold uppercase tracking-wider py-1 text-[#000000]"
            >
              How It Works
            </a>
            <a
              href="#quote"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-bold uppercase tracking-wider py-1 text-[#000000]"
            >
              Request a Quote
            </a>
            <a
              href="#quote"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-lime block w-full text-center px-6 py-3.5 text-xs font-black uppercase tracking-wider rounded-full mt-2"
            >
              REQUEST A QUOTE
            </a>
          </div>
        )}
      </header>

      <main className="flex-1">
        
        {/* 2. Clean Hero Section (Zero redundant photo frames, zero duplicate cards) */}
        <section className="pt-16 pb-20 md:pt-28 md:pb-32 px-4 sm:px-8 bg-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#000000] leading-[1.05]">
              SPOTLESS <span className="font-serif-italic font-normal text-[#000000]">HOMES</span><br />
              IN IBOGUN, IFO &amp; LAGOS.
            </h1>
            
            <p className="text-base sm:text-xl font-medium text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Move-in, move-out, deep, and student room cleaning. She brings all her own supplies and equipment to every job.
            </p>

            <div className="pt-4 flex items-center justify-center">
              <a
                href="#quote"
                className="btn-lime px-8 py-4 rounded-full text-xs font-black uppercase tracking-wider shadow-md flex items-center justify-center"
              >
                Request a Quote
              </a>
            </div>

          </div>
        </section>

        {/* 3. "OUR WORK THAT WE DO" - SCROLL-DRIVEN STACKED WHOT-CARD DECK */}
        <section id="services" className="py-20 md:py-28 px-4 sm:px-8 bg-[#F7F8FA]">
          <div className="max-w-5xl mx-auto space-y-12">
            
            {/* Section Header */}
            <div className="border-b border-slate-200 pb-6">
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#000000]">
                OUR <span className="font-serif-italic font-normal text-[#000000]">WORK</span> THAT WE DO
              </h2>
            </div>

            {/* STACKED CARDS DECK CONTAINER */}
            <div className="space-y-16 md:space-y-24 pb-20">
              {SERVICES_LIST.map((card, idx) => {
                const stickyTopClasses = [
                  'sticky top-24 md:top-28 z-10',
                  'sticky top-40 md:top-48 z-20',
                  'sticky top-56 md:top-68 z-30',
                  'sticky top-72 md:top-88 z-40',
                ];

                return (
                  <div
                    key={card.id}
                    id={`card-${card.id}`}
                    className={`${stickyTopClasses[idx] || 'sticky top-24 z-10'} w-full p-8 sm:p-12 md:p-14 rounded-3xl bg-white border border-slate-300 shadow-xl transition-all duration-300`}
                  >
                    {/* Card Body with Asymmetric Spacing */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
                      <div className="md:col-span-6 space-y-5">
                        <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-[#000000]">
                          {card.title}
                        </h3>
                        <p className="text-sm sm:text-base leading-relaxed text-slate-600 font-medium">
                          {card.description}
                        </p>
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => handleSelectService(card.title)}
                            className="btn-lime px-7 py-3.5 rounded-full text-xs font-black uppercase tracking-wider shadow-sm flex items-center justify-center cursor-pointer"
                          >
                            Request Quote
                          </button>
                        </div>
                      </div>

                      <div className="md:col-span-6">
                        <ImagePlaceholder label={card.imageLabel} aspectRatio="aspect-16/10" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* 4. HOW IT WORKS SECTION (Approach B — Staggered Alternating Flow) */}
        <section id="how-it-works" className="py-20 md:py-28 px-4 sm:px-8 border-t border-slate-200 bg-white">
          <div className="max-w-6xl mx-auto space-y-16">
            
            <div className="text-center space-y-3 max-w-xl mx-auto">
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#000000]">
                HOW IT <span className="font-serif-italic font-normal text-[#000000]">WORKS</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                3 simple steps from your initial request to a clean room.
              </p>
            </div>

            {/* Alternating Staggered Process Steps */}
            <div className="space-y-12 sm:space-y-16">
              
              {/* Step 01 (Text Left, Photo Right) */}
              <div className="p-8 sm:p-12 rounded-3xl bg-[#F7F8FA] border border-slate-200 shadow-xs">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-6 space-y-4">
                    <div className="w-12 h-12 rounded-full bg-[#C6F500] text-[#000000] font-mono font-black text-base flex items-center justify-center shadow-xs">
                      01
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[#000000]">
                      Request a Quote
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600 font-medium">
                      Select your service and location details on our quote form or chat on WhatsApp.
                    </p>
                  </div>
                  <div className="md:col-span-6">
                    <ImagePlaceholder label="Step 01 Photo Frame" aspectRatio="aspect-16/10" />
                  </div>
                </div>
              </div>

              {/* Step 02 (Photo Left, Text Right - Staggered) */}
              <div className="p-8 sm:p-12 rounded-3xl bg-[#F7F8FA] border border-slate-200 shadow-xs">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-6 md:order-2 space-y-4">
                    <div className="w-12 h-12 rounded-full bg-[#C6F500] text-[#000000] font-mono font-black text-base flex items-center justify-center shadow-xs">
                      02
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[#000000]">
                      Price within 24 Hours
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600 font-medium">
                      We review your specifications and reply back on WhatsApp with a clear, direct quote.
                    </p>
                  </div>
                  <div className="md:col-span-6 md:order-1">
                    <ImagePlaceholder label="Step 02 Photo Frame" aspectRatio="aspect-16/10" />
                  </div>
                </div>
              </div>

              {/* Step 03 (Text Left, Photo Right) */}
              <div className="p-8 sm:p-12 rounded-3xl bg-[#F7F8FA] border border-slate-200 shadow-xs">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-6 space-y-4">
                    <div className="w-12 h-12 rounded-full bg-[#C6F500] text-[#000000] font-mono font-black text-base flex items-center justify-center shadow-xs">
                      03
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[#000000]">
                      Supplies Included
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600 font-medium">
                      She arrives at your location with all her own cleaning products, materials, and equipment.
                    </p>
                  </div>
                  <div className="md:col-span-6">
                    <ImagePlaceholder label="Step 03 Photo Frame" aspectRatio="aspect-16/10" />
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 5. REQUEST A QUOTE FORM SECTION */}
        <section id="quote" className="py-20 md:py-28 px-4 sm:px-8 border-t border-slate-200 bg-[#F7F8FA]">
          <div className="max-w-3xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#000000]">
                REQUEST A <span className="font-serif-italic font-normal text-[#000000]">QUOTE</span>
              </h2>
              <p className="text-xs text-slate-600 font-medium max-w-md mx-auto">
                Fill in your cleaning details below. Submitting will open your pre-filled request in WhatsApp.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 sm:p-12 rounded-3xl border border-slate-200 bg-white text-center space-y-4 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black tracking-tight text-[#000000]">
                  Request Sent on WhatsApp
                </h3>
                <p className="text-xs text-slate-600">
                  We will reply with your custom price quote within 24 hours.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-bold uppercase tracking-wider underline hover:no-underline cursor-pointer text-[#000000]"
                  >
                    Submit another quote request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 sm:p-10 rounded-3xl border border-slate-200 bg-white space-y-6 shadow-sm" noValidate aria-label="Request a quote form">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="block text-xs font-extrabold uppercase tracking-wider text-[#000000]">
                      Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full px-4.5 py-3.5 rounded-2xl border border-slate-200 bg-[#F7F8FA] text-sm font-medium focus:outline-hidden focus:ring-0 text-[#000000]"
                      style={{ borderColor: errors.name ? '#DC2626' : undefined }}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-xs font-semibold text-red-600">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="block text-xs font-extrabold uppercase tracking-wider text-[#000000]">
                      Phone <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Your phone number"
                      className="w-full px-4.5 py-3.5 rounded-2xl border border-slate-200 bg-[#F7F8FA] text-sm font-medium focus:outline-hidden focus:ring-0 text-[#000000]"
                      style={{ borderColor: errors.phone ? '#DC2626' : undefined }}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="text-xs font-semibold text-red-600">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Service */}
                  <div className="space-y-1.5">
                    <label htmlFor="service" className="block text-xs font-extrabold uppercase tracking-wider text-[#000000]">
                      Service <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value as ServiceType })}
                      className="w-full px-4.5 py-3.5 rounded-2xl border border-slate-200 bg-[#F7F8FA] text-sm font-medium focus:outline-hidden focus:ring-0 cursor-pointer text-[#000000]"
                      style={{ borderColor: errors.service ? '#DC2626' : undefined }}
                      aria-invalid={!!errors.service}
                      aria-describedby={errors.service ? 'service-error' : undefined}
                    >
                      <option value="Move-in cleaning">Move-in cleaning</option>
                      <option value="Move-out cleaning">Move-out cleaning</option>
                      <option value="Deep cleaning">Deep cleaning</option>
                      <option value="Student room cleaning">Student room cleaning</option>
                    </select>
                    {errors.service && (
                      <p id="service-error" className="text-xs font-semibold text-red-600">
                        {errors.service}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div className="space-y-1.5">
                    <label htmlFor="address" className="block text-xs font-extrabold uppercase tracking-wider text-[#000000]">
                      Address / Location <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="E.g., Ibogun, Ifo, or Lagos area"
                      className="w-full px-4.5 py-3.5 rounded-2xl border border-slate-200 bg-[#F7F8FA] text-sm font-medium focus:outline-hidden focus:ring-0 text-[#000000]"
                      style={{ borderColor: errors.address ? '#DC2626' : undefined }}
                      aria-invalid={!!errors.address}
                      aria-describedby={errors.address ? 'address-error' : undefined}
                    />
                    {errors.address && (
                      <p id="address-error" className="text-xs font-semibold text-red-600">
                        {errors.address}
                      </p>
                    )}
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Date */}
                  <div className="space-y-1.5">
                    <label htmlFor="date" className="block text-xs font-extrabold uppercase tracking-wider text-[#000000]">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4.5 py-3.5 rounded-2xl border border-slate-200 bg-[#F7F8FA] text-sm font-medium focus:outline-hidden focus:ring-0 text-[#000000]"
                    />
                  </div>

                  {/* Notes */}
                  <div className="space-y-1.5">
                    <label htmlFor="notes" className="block text-xs font-extrabold uppercase tracking-wider text-[#000000]">
                      Notes <span className="text-xs normal-case font-normal text-slate-500">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Special instructions or room count"
                      className="w-full px-4.5 py-3.5 rounded-2xl border border-slate-200 bg-[#F7F8FA] text-sm font-medium focus:outline-hidden focus:ring-0 text-[#000000]"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-3">
                  <button
                    type="submit"
                    className="btn-lime w-full px-8 py-4 rounded-full font-black text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center cursor-pointer focus:outline-hidden"
                  >
                    Send Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>

      {/* 6. High-Impact Clean Dark Footer */}
      {/* Footer */}
      <footer className="py-16 sm:py-20 px-4 sm:px-8 border-t border-neutral-900 bg-black text-white">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-neutral-800 pb-8 text-center md:text-left">
            <div className="space-y-2">
              <div className="text-2xl font-black tracking-tight text-white flex items-center justify-center md:justify-start gap-2">
                <span>COMFORT</span>
                <span className="font-serif-italic font-normal">CLEAN</span>
              </div>
              <div className="text-xs text-neutral-400 font-medium flex items-center justify-center md:justify-start gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#C6F500]" />
                <span>Location: Ibogun (Ifo) &amp; Lagos State</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/2348110778089"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-lime px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider shadow-sm flex items-center gap-2"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.001 5.45-4.436 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662a11.87 11.87 0 005.71 1.455h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z" />
                </svg>
                <span>WhatsApp</span>
              </a>

              <a
                href="tel:+2348110778089"
                className="px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider border border-neutral-700 text-white hover:bg-neutral-900 transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Us</span>
              </a>
            </div>
          </div>

          <div className="text-center pt-2 select-none">
            <div className="text-5xl sm:text-7xl lg:text-9xl font-black tracking-tighter opacity-20 uppercase font-sans text-white">
              COMFORT <span className="font-serif-italic font-normal">CLEAN</span>
            </div>
            <p className="text-xs text-neutral-400 font-medium mt-4">
              Comfort Clean &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
