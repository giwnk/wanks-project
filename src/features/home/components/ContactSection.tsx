"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ChatTeardropTextIcon,
  CircleNotchIcon,
  EnvelopeSimpleIcon,
  MapPinIcon,
  PaperPlaneTiltIcon,
} from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { useCreateMessage } from "../hooks/useCreateMessage";
import { CreateMessagePayload } from "../types/home.type";
import { MessageSchema } from "../types/message.schema";
import { useGetProfile } from "../hooks/useGetProfile";
import SubHeader from "@/components/SubHeader";

export default function ContactSection() {
  const { mutate, isPending } = useCreateMessage();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<CreateMessagePayload>({
    defaultValues: {
      sender_name: "",
      sender_email: "",
      subject: "",
      message_body: "",
    },
  });

  const {data} = useGetProfile()

  const onSubmit = (data: CreateMessagePayload) => {
    // Validasi Zod manual
    const validationResult = MessageSchema.safeParse(data);
    if (!validationResult.success) {
      validationResult.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as keyof CreateMessagePayload;
        if (fieldName) {
          setError(fieldName, { message: issue.message });
        }
      });
      return;
    }

    mutate(validationResult.data, {
      onSuccess: (res) => {
        if (res.success) {
          reset();
        }
      },
    });
  };

  return (
    <section
      id="contact"
      className="my-6 sm:my-8 mx-4 sm:mx-10 lg:mx-20 flex flex-col gap-3 scroll-mt-20"
    >
      <div className="flex justify-between items-center">
        <SubHeader iconName="PaperPlaneTiltIcon" title="Contact Me"></SubHeader>
      </div>
      <Separator />

      <div className="bg-card border-2 border-border p-4 sm:p-6 lg:p-7 shadow-retro-md grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Info Column (Left) */}
        <div className="lg:col-span-2 flex flex-col justify-between gap-5">
          <div className="flex flex-col gap-3">
            <div className="bg-background shadow-retro border-2 border-border w-fit flex gap-1.5 items-center px-2 py-0.5">
              <ChatTeardropTextIcon
                weight="fill"
                className="text-secondary size-3.5"
              />
              <h4 className="font-mono uppercase font-semibold text-accent-foreground text-xs md:text-sm">
                GET IN TOUCH
              </h4>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-foreground">
              Let's Build Something Great Together
            </h3>

            <p className="font-medium text-accent-foreground text-base leading-relaxed">
              Interested in working together or have a project in mind? Drop a
              message below, and I'll get back to you shortly.
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=agaofficialsans796@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-background border-2 border-border p-2.5 shadow-retro hover-retro-lift cursor-pointer transition-all"
            >
              <EnvelopeSimpleIcon
                weight="bold"
                className="size-5 text-primary shrink-0"
              />
              <div className="min-w-0">
                <p className="font-mono text-xs uppercase text-muted-foreground font-semibold">
                  Direct Email
                </p>
                <p className="font-serif text-base font-bold text-foreground truncate">
                  agaofficialsans796@gmail.com
                </p>
              </div>
            </a>

            <div className="flex items-center gap-2.5 bg-background border-2 border-border p-2.5 shadow-retro">
              <MapPinIcon
                weight="bold"
                className="size-5 text-primary shrink-0"
              />
              <div>
                <p className="font-mono text-xs uppercase text-muted-foreground font-semibold">
                  Location
                </p>
                <p className="font-serif text-base font-bold text-foreground">
                  {data?.location}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column (Right) */}
        <div className="lg:col-span-3 bg-background border-2 border-border p-3.5 sm:p-5 shadow-retro flex flex-col gap-3.5">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
            noValidate
          >
            {/* Input Nama & Email (Grid 2 kolom di screen medium/large) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="sender_name"
                  className="font-mono text-xs uppercase font-bold text-foreground flex items-center gap-1"
                >
                  Name <span className="text-destructive">*</span>
                </label>
                <input
                  id="sender_name"
                  type="text"
                  placeholder="e.g., Alex Morgan"
                  {...register("sender_name")}
                  className="bg-card border-2 border-border px-3 py-2.5 text-sm lg:text-base font-medium text-foreground shadow-retro focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
                {errors.sender_name && (
                  <span className="font-serif text-xs text-destructive font-semibold">
                    {errors.sender_name.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="sender_email"
                  className="font-mono text-xs uppercase font-bold text-foreground flex items-center gap-1"
                >
                  Email <span className="text-destructive">*</span>
                </label>
                <input
                  id="sender_email"
                  type="email"
                  placeholder="name@company.com"
                  {...register("sender_email")}
                  className="bg-card border-2 border-border px-3 py-2.5 text-sm lg:text-base font-medium text-foreground shadow-retro focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
                {errors.sender_email && (
                  <span className="font-serif text-xs text-destructive font-semibold">
                    {errors.sender_email.message}
                  </span>
                )}
              </div>
            </div>

            {/* Input Subyek */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="subject"
                className="font-mono text-xs uppercase font-bold text-foreground flex items-center gap-1"
              >
                Subject <span className="text-destructive">*</span>
              </label>
              <input
                id="subject"
                type="text"
                placeholder="e.g., Web App Design / Freelance Inquiry"
                {...register("subject")}
                className="bg-card border-2 border-border px-3 py-2.5 text-sm lg:text-base font-medium text-foreground shadow-retro focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
              {errors.subject && (
                <span className="font-serif text-[11px] text-destructive font-semibold">
                  {errors.subject.message}
                </span>
              )}
            </div>

            {/* Input Pesan / Message Body */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="message_body"
                className="font-mono text-xs uppercase font-bold text-foreground"
              >
                Message
              </label>
              <textarea
                id="message_body"
                rows={3}
                placeholder="Tell me about your project or timeline..."
                {...register("message_body")}
                className="bg-card border-2 border-border px-3 py-2.5 text-sm lg:text-base font-medium text-foreground shadow-retro focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
              />
              {errors.message_body && (
                <span className="font-serif text-[11px] text-destructive font-semibold">
                  {errors.message_body.message}
                </span>
              )}
            </div>

            {/* Tombol Submit */}
            <div className="mt-1 flex justify-end">
              <Button
                type="submit"
                disabled={isPending}
                className="w-full sm:w-auto h-auto px-3 py-2 shadow-retro border-2 border-border cursor-pointer hover-retro-lift gap-2 font-sans font-semibold text-base"
              >
                {isPending ? (
                  <>
                    <CircleNotchIcon className="size-5 animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <PaperPlaneTiltIcon className="size-5" weight="fill" />
                    <span>Send Message</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
