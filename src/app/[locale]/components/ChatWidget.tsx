"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export function ChatWidget() {
  const t = useTranslations("Chat");

  const [isOpen, setIsOpen] = useState(false);
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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.8, 1, 0.6, 1] }}
            className="flex h-112 w-88 max-w-[90vw] flex-col overflow-hidden rounded-3xl border border-white/10 bg-card shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent-primary" />

                <span className="text-sm font-medium text-foreground">
                  {t("title")}
                </span>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                aria-label={t("close")}
                className="rounded-full p-1.5 text-foreground-secondary transition-colors hover:bg-white/10 hover:text-foreground cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

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
                  {m.parts
                    .filter((part) => part.type === "text")
                    .map((part, i) => (
                      <span key={i}>{part.text}</span>
                    ))}
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
                className="flex-1 rounded-full border border-white/10 bg-white/3 px-4 py-2 text-sm text-foreground placeholder:text-foreground-secondary focus:border-accent-primary/50 focus:outline-none"
              />

              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                aria-label={t("send")}
                className={`rounded-full bg-accent-primary p-2.5 text-background transition-opacity disabled:opacity-40 ${isLoading || !input.trim() ? "cursor-default" : "cursor-pointer"}`}
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? t("close") : t("open")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-primary text-background shadow-xl cursor-pointer"
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
              <X className="h-6 w-6" />
            ) : (
              <MessageCircle className="h-6 w-6" />
            )}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
