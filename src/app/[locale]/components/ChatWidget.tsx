"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { X, Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import ReactMarkdown from "react-markdown";

export function ChatWidget() {
  const t = useTranslations("Chat");

  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const isLoading = status === "submitted" || status === "streaming";

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || isLoading) return;

    sendMessage({ text: input });
    setInput("");
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="fixed z-50 flex flex-col items-end gap-3 inset-x-4 bottom-4 sm:inset-x-auto sm:right-6 sm:bottom-6 pb-[env(safe-area-inset-bottom)]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.8, 1, 0.6, 1] }}
            className="flex w-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-card shadow-2xl h-[70dvh] max-h-112 sm:h-112 sm:w-88"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center justify-between border-b border-white/10 px-2 pt-2 pb-1.5">
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/chat-icon.jpeg"
                    alt=""
                    width={250}
                    height={250}
                    className="h-8 w-8 rounded-full object-cover border border-accent-primary"
                  />

                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-foreground">
                      {t("title")}
                    </span>

                    <a
                      href="https://www.flaticon.com/free-icons/robot-head"
                      title="robot head icons"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[9px] text-foreground-secondary hover:underline"
                    >
                      Robot head icons created by Upnow Graphic - Flaticon
                    </a>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                aria-label={t("close")}
                className="rounded-full p-1.5 text-foreground-secondary transition-colors hover:bg-white/10 hover:text-foreground cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="border-b border-white/10 bg-white/3 px-4 py-1.5 text-[11px] leading-snug text-foreground-secondary">
              {t("privacyNotice")}
            </p>

            <div
              ref={scrollRef}
              className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4"
            >
              {messages.length === 0 && (
                <p className="text-sm text-foreground-secondary">
                  {t("empty")}
                </p>
              )}

              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "self-end bg-accent-primary text-background"
                      : "self-start border border-white/10 bg-white/3 text-foreground"
                  }`}
                >
                  {m.role === "assistant" ? (
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => (
                          <p className="mb-2 last:mb-0">{children}</p>
                        ),
                        strong: ({ children }) => (
                          <strong className="font-semibold text-foreground">
                            {children}
                          </strong>
                        ),
                        a: ({ href, children }) => (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline underline-offset-2 text-accent-primary hover:text-accent-primary/80"
                          >
                            {children}
                          </a>
                        ),
                        ul: ({ children }) => (
                          <ul className="mb-2 last:mb-0 list-disc space-y-1 pl-4">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="mb-2 last:mb-0 list-decimal space-y-1 pl-4">
                            {children}
                          </ol>
                        ),
                        li: ({ children }) => <li>{children}</li>,
                        code: ({ children }) => (
                          <code className="rounded bg-white/10 px-1 py-0.5 text-xs">
                            {children}
                          </code>
                        ),
                      }}
                    >
                      {m.parts
                        .filter((part) => part.type === "text")
                        .map((part) => part.text)
                        .join("")}
                    </ReactMarkdown>
                  ) : (
                    m.parts
                      .filter((part) => part.type === "text")
                      .map((part, i) => <span key={i}>{part.text}</span>)
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-1 self-start rounded-2xl border border-white/10 bg-white/3 px-3.5 py-2.5">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-foreground-secondary [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-foreground-secondary [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-foreground-secondary" />
                </div>
              )}

              {error && (
                <div className="max-w-[85%] self-start rounded-2xl border border-red-500/20 bg-red-500/10 px-3.5 py-2.5 text-sm text-red-400">
                  {error.message || t("error")}
                </div>
              )}
            </div>

            <form
              onSubmit={onSubmit}
              className="flex items-center gap-2 border-t border-white/10 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("placeholder")}
                maxLength={500}
                className="flex-1 rounded-full border border-white/10 bg-white/3 px-4 py-2 text-base sm:text-sm text-foreground placeholder:text-foreground-secondary focus:border-accent-primary/50 focus:outline-none"
              />

              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                aria-label={t("send")}
                className={`shrink-0 rounded-full bg-accent-primary p-2.5 text-background transition-opacity disabled:opacity-40 ${isLoading || !input.trim() ? "cursor-default" : "cursor-pointer"}`}
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <AnimatePresence>
          {isHovered && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-full right-0 mb-3 whitespace-nowrap rounded-full border border-white/10 bg-card px-4 py-2 text-sm font-medium text-foreground shadow-xl"
            >
              {t("hoverHint")}
              <span className="absolute -bottom-1 right-6 h-2 w-2 rotate-45 border-b border-r border-white/10 bg-card" />
            </motion.div>
          )}
        </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        aria-label={isOpen ? t("close") : t("open")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex w-16 h-16 sm:w-18 sm:h-18 lg:h-20 lg:w-20 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-accent-primary via-accent-primary/65 to-accent-secondary text-background shadow-xl ring-1 ring-surface cursor-pointer border-2 border-surface"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isOpen ? "close" : "open"}
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 45 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? (
              <X className="h-10 w-10" />
            ) : (
              <Image
                src="/images/chat-icon.jpeg"
                alt=""
                width={250}
                height={250}
                className="h-14 w-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 rounded-full object-cover"
              />
            )}
          </motion.span>
        </AnimatePresence>
      </motion.button>
      </div>
    </div>
  );
}