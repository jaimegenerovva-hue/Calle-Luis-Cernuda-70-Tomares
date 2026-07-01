/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { Phone, Mail, Award, CheckCircle, ShieldCheck, Clock } from "lucide-react";

interface RequestForm {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  message: string;
  privacy: boolean;
}

export default function ContactInquiry() {
  const revealContainerRef = useIntersectionObserver();
  
  const [formData, setFormData] = useState<RequestForm>({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    message: "",
    privacy: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RequestForm, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Field change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
      if (errors.privacy) {
        setErrors((prev) => ({ ...prev, privacy: "" }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name as keyof RequestForm]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    }
  };

  // Submission validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<Record<keyof RequestForm, string>> = {};

    if (!formData.name.trim()) newErrors.name = "El nombre es obligatorio.";
    if (!formData.lastname.trim()) newErrors.lastname = "Los apellidos son obligatorios.";
    
    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Por favor, introduzca un email válido.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es obligatorio.";
    } else if (!/^\+?[0-9\s\-]{8,15}$/.test(formData.phone)) {
      newErrors.phone = "Por favor, introduzca un format de teléfono válido.";
    }

    if (!formData.privacy) {
      newErrors.privacy = "Debe aceptar la política de privacidad.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Trigger loading fake and then show success modal
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      
      // Store locally to prove client interaction registration
      const currentInquiries = JSON.parse(localStorage.getItem("inquiries") || "[]");
      currentInquiries.push({
        ...formData,
        date: new Date().toISOString(),
      });
      localStorage.setItem("inquiries", JSON.stringify(currentInquiries));

      // Build subject & body for Magdalena@suhogarsevilla.com
      const subject = `Solicitud de información - ${formData.name} ${formData.lastname}`;
      const body = `Hola Magdalena,\n\nSe ha recibido una nueva solicitud de información:\n\n` +
        `Nombre: ${formData.name} ${formData.lastname}\n` +
        `Email: ${formData.email}\n` +
        `Móvil de contacto: ${formData.phone}\n\n` +
        `Mensaje:\n${formData.message}\n\n` +
        `Saludos.`;
      
      window.location.href = `mailto:Magdalena@suhogarsevilla.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      // Reset
      setFormData({
        name: "",
        lastname: "",
        email: "",
        phone: "",
        message: "",
        privacy: false,
      });
    }, 1200);
  };

  return (
    <section
      id="contacto"
      ref={revealContainerRef}
      className="py-28 px-6 md:px-12 bg-charcoal text-luxury-white relative overflow-hidden select-none"
    >
      {/* Visual background details */}
      <div className="absolute right-0 bottom-0 w-80 h-80 bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute left-0 top-0 w-80 h-80 bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Side: Professional Form */}
          <div className="lg:col-span-7 bg-dark-pitch border border-neutral-800 p-8 sm:p-12 shadow-2xl relative reveal">
            
            <span className="text-gold tracking-[0.3em] text-xs font-semibold uppercase mb-3 block">
              Trato Preferente
            </span>
            <div className="border-l-2 border-gold pl-4 sm:pl-6 mb-8">
              <h2 className="font-serif text-2xl sm:text-4xl font-light tracking-wide leading-tight">
                Solicitar Información <span className="italic font-normal text-gold">Exclusiva</span>
              </h2>
            </div>

            {/* Line */}
            <div className="w-16 h-[1px] bg-gold mb-10" />

            {/* If Form is submitted, show elegant success screen inline */}
            {submitted ? (
              <div className="text-center py-8 flex flex-col items-center">
                <CheckCircle className="w-16 h-16 text-gold mb-6 animate-pulse" />
                <h3 className="font-serif text-2xl font-light text-luxury-white mb-4">
                  Solicitud Registrada con Éxito
                </h3>
                <p className="font-sans text-neutral-300 text-sm font-light max-w-md leading-relaxed mb-8">
                  Estimado cliente, su solicitud de información ha sido procesada con éxito y enviada a 
                  <strong> Magdalena@suhogarsevilla.com</strong>.
                </p>
                
                <div className="bg-neutral-900 border border-gold/10 p-5 rounded-none max-w-sm flex items-start gap-4 mb-8 text-left">
                  <Clock className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-luxury-white mb-1"> Compromiso de Respuesta</h4>
                    <p className="text-xs text-neutral-400 font-light leading-normal">
                      Nos pondremos en contacto con usted en un plazo máximo de <strong>2 horas hábiles</strong>.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 border border-neutral-700 hover:border-gold hover:text-gold text-xs font-sans font-semibold tracking-widest uppercase transition-colors cursor-pointer"
                  id="reset-form-btn"
                >
                  Enviar otra solicitud
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Names column */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Nombre */}
                  <div className="flex flex-col">
                    <label htmlFor="name-input" className="text-[10px] uppercase font-sans tracking-widest text-neutral-400 mb-2 font-medium">Nombre *</label>
                    <input
                      type="text"
                      id="name-input"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ej: John"
                      className="bg-charcoal/30 border border-neutral-800 focus:border-gold px-4 py-3 text-sm text-luxury-white rounded-none outline-none transition-colors"
                    />
                    {errors.name && <span className="text-[10px] text-red-400 mt-1.5 font-sans">{errors.name}</span>}
                  </div>

                  {/* Apellidos */}
                  <div className="flex flex-col">
                    <label htmlFor="lastname-input" className="text-[10px] uppercase font-sans tracking-widest text-neutral-400 mb-2 font-medium">Apellidos *</label>
                    <input
                      type="text"
                      id="lastname-input"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      placeholder="Ej: Smith"
                      className="bg-charcoal/30 border border-neutral-800 focus:border-gold px-4 py-3 text-sm text-luxury-white rounded-none outline-none transition-colors"
                    />
                    {errors.lastname && <span className="text-[10px] text-red-400 mt-1.5 font-sans">{errors.lastname}</span>}
                  </div>
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Correo */}
                  <div className="flex flex-col">
                    <label htmlFor="email-input" className="text-[10px] uppercase font-sans tracking-widest text-neutral-400 mb-2 font-medium">Email Privado *</label>
                    <input
                      type="email"
                      id="email-input"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john.smith@luxury.com"
                      className="bg-charcoal/30 border border-neutral-800 focus:border-gold px-4 py-3 text-sm text-luxury-white rounded-none outline-none transition-colors"
                    />
                    {errors.email && <span className="text-[10px] text-red-400 mt-1.5 font-sans">{errors.email}</span>}
                  </div>

                  {/* Teléfono */}
                  <div className="flex flex-col">
                    <label htmlFor="phone-input" className="text-[10px] uppercase font-sans tracking-widest text-neutral-400 mb-2 font-medium">Móvil de Contacto *</label>
                    <input
                      type="tel"
                      id="phone-input"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Ej: +34 600 000 000"
                      className="bg-charcoal/30 border border-neutral-800 focus:border-gold px-4 py-3 text-sm text-luxury-white rounded-none outline-none transition-colors"
                    />
                    {errors.phone && <span className="text-[10px] text-red-400 mt-1.5 font-sans">{errors.phone}</span>}
                  </div>
                </div>

                {/* Mensaje */}
                <div className="flex flex-col">
                  <label htmlFor="message-input" className="text-[10px] uppercase font-sans tracking-widest text-neutral-400 mb-2 font-medium font-semibold">Mensaje o Solicitud Especial (Opcional)</label>
                  <textarea
                    id="message-input"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Escriba aquí los detalles adicionales de su visita, fechas de interés o especificaciones..."
                    className="bg-charcoal/30 border border-neutral-800 focus:border-gold px-4 py-3 text-sm text-luxury-white rounded-none outline-none transition-colors resize-none"
                  />
                </div>

                {/* Privacy check */}
                <div className="flex flex-col">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="privacy"
                      checked={formData.privacy}
                      onChange={handleChange}
                      className="mt-1 accent-gold cursor-pointer"
                      id="privacy-checkbox"
                    />
                    <span className="text-[11px] text-neutral-400 font-sans leading-normal font-light">
                      He leído y acepto expresamente la <strong className="text-gold">Política de Privacidad y Consentimiento de Datos</strong> para que mis datos sean tratados por la agencia inmobiliaria bajo el estricto Reglamento Europeo de Protección de Datos (RGPD) para gestionar la visita y dossier.
                    </span>
                  </label>
                  {errors.privacy && <span className="text-[10px] text-red-400 mt-2 font-sans">{errors.privacy}</span>}
                </div>

                {/* Premium Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gold hover:bg-gold-dark text-charcoal py-4 text-xs font-sans font-bold tracking-[0.25em] uppercase transition-all duration-300 shadow-xl shadow-gold/5 flex items-center justify-center gap-2 cursor-pointer rounded-none disabled:opacity-50"
                  id="submit-inquiry-btn"
                >
                  {loading ? (
                    <span className="animate-pulse">Procesando solicitud...</span>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      SOLICITAR INFORMACIÓN
                    </>
                  )}
                </button>

              </form>
            )}
          </div>

          {/* Right Side: Professional Advisor Information */}
          <div className="lg:col-span-5 space-y-8 reveal">
            
            {/* Agent Board Profile */}
            <div className="bg-dark-pitch border border-neutral-800 p-8 shadow-2xl relative">
              <span className="text-[9px] uppercase font-sans tracking-widest text-gold mb-6 block font-bold">
                Asesora Privada Asignada
              </span>

              <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                {/* Advisor Photo Wrapper */}
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gold/40 flex-shrink-0">
                  <img
                    src="https://i.ibb.co/3yvvt76w/imagen.jpg"
                    alt="Magdalena - Asesora Inmobiliaria"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="text-center sm:text-left">
                  <h3 className="font-serif text-xl font-light text-luxury-white tracking-wide">
                    Magdalena
                  </h3>
                  <p className="text-[11px] text-gold font-sans tracking-widest uppercase font-semibold mb-2">
                    Asesora inmobiliaria
                  </p>
                  <p className="text-xs text-neutral-400 font-sans font-light leading-relaxed">
                    Comprarcasa SuHogar Sevilla
                  </p>
                </div>
              </div>

              {/* Directly reach details */}
              <div className="border-t border-neutral-800/80 pt-6 space-y-4">
                <a
                  href="https://wa.me/34635475213"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-xs text-neutral-300 hover:text-gold transition-colors font-sans"
                  id="agent-phone"
                >
                  <Phone className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span>Teléfono: 635 475 213 (WhatsApp)</span>
                </a>
                <a
                  href="mailto:Magdalena@suhogarsevilla.com"
                  className="flex items-center gap-3 text-xs text-neutral-300 hover:text-gold transition-colors font-sans"
                  id="agent-mail"
                >
                  <Mail className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span>Magdalena@suhogarsevilla.com</span>
                </a>
              </div>
            </div>

            {/* Quality Seals Card */}
            <div className="border border-neutral-800 p-8 bg-neutral-900/40 text-left space-y-5">
              <div className="flex items-start gap-4">
                <Award className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold tracking-widest uppercase text-luxury-white mb-1">
                    ATENCIÓN PERSONALIZADA
                  </h4>
                  <p className="text-[11px] text-neutral-400 leading-normal font-light">
                    Te acompañamos durante todo el proceso de compra o venta, resolviendo dudas y ofreciendo un trato cercano, claro y profesional.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <ShieldCheck className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold tracking-widest uppercase text-luxury-white mb-1">
                    COMPRARCASA SUHOGAR SEVILLA
                  </h4>
                  <p className="text-[11px] text-neutral-400 leading-normal font-light">
                    Agencia inmobiliaria especializada en Sevilla y Aljarafe, con herramientas avanzadas de marketing, valoración y comercialización de viviendas.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
