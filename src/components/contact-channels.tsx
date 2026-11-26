"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  AtSign,
  Check,
  Code2,
  Copy,
  Mail,
  Phone,
  Send,
} from "lucide-react";
import {
  CONTACT_CHANNELS,
  type ContactChannelId,
} from "@/lib/contact";
import type { Dictionary } from "@/lib/i18n";

const CHANNEL_ICONS: Record<ContactChannelId, typeof Phone> = {
  phone: Phone,
  telegram: Send,
  email: Mail,
  instagram: AtSign,
  github: Code2,
};

const COPYABLE_IDS = new Set<ContactChannelId>(["phone", "telegram", "email"]);

interface ContactChannelsProps {
  labels: Dictionary["contactPage"]["channels"];
  copyLabels?: {
    copy: string;
    copied: string;
  };
  variant?: "cards" | "compact";
}

export function ContactChannels({
  labels,
  copyLabels = { copy: "Copy", copied: "Copied" },
  variant = "cards",
}: ContactChannelsProps) {
  const [copiedId, setCopiedId] = useState<ContactChannelId | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleCopy = async (id: ContactChannelId, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
      timerRef.current = window.setTimeout(() => {
        setCopiedId(null);
      }, 1800);
    } catch {
      // Clipboard API unavailable
    }
  };

  if (variant === "compact") {
    return (
      <ul className="mt-4 flex flex-col gap-2.5">
        {CONTACT_CHANNELS.map((channel) => {
          const Icon = CHANNEL_ICONS[channel.id];
          const canCopy = COPYABLE_IDS.has(channel.id);
          const isCopied = copiedId === channel.id;
          return (
            <li key={channel.id} className="flex items-center justify-between gap-2">
              <a
                href={channel.href}
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noopener noreferrer" : undefined}
                className="inline-flex min-w-0 items-center gap-2 text-[14px] transition-colors duration-200 hover:text-[var(--color-text-primary)] hover:underline"
                style={{ color: "var(--color-text-secondary)" }}
              >
                <Icon
                  size={15}
                  strokeWidth={1.5}
                  className="shrink-0"
                  style={{ color: "var(--color-accent-blue)" }}
                />
                <span className="truncate">{channel.display}</span>
              </a>

              {canCopy && (
                <button
                  type="button"
                  onClick={() => handleCopy(channel.id, channel.display)}
                  aria-label={`${copyLabels.copy}: ${channel.display}`}
                  title={isCopied ? copyLabels.copied : copyLabels.copy}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border transition-colors hover:border-[var(--color-accent-blue)]"
                  style={{
                    borderColor: isCopied
                      ? "var(--color-accent-cyan)"
                      : "var(--color-border)",
                    color: isCopied
                      ? "var(--color-accent-cyan)"
                      : "var(--color-text-muted)",
                    backgroundColor: "var(--color-surface)",
                  }}
                >
                  {isCopied ? (
                    <Check size={13} strokeWidth={2} />
                  ) : (
                    <Copy size={13} strokeWidth={1.5} />
                  )}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {CONTACT_CHANNELS.map((channel) => {
        const Icon = CHANNEL_ICONS[channel.id];
        const canCopy = COPYABLE_IDS.has(channel.id);
        const isCopied = copiedId === channel.id;

        return (
          <div
            key={channel.id}
            className="group flex items-center justify-between gap-2 rounded-xl border p-3.5 transition-colors duration-200 hover:border-[var(--color-accent-blue)]"
            style={{
              backgroundColor: "var(--color-surface-raised)",
              borderColor: "var(--color-border)",
            }}
          >
            <a
              href={channel.href}
              target={channel.external ? "_blank" : undefined}
              rel={channel.external ? "noopener noreferrer" : undefined}
              className="flex min-w-0 flex-1 items-center gap-3"
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border"
                style={{
                  backgroundColor: "var(--color-surface)",
                  borderColor: "var(--color-border)",
                  color: "var(--color-accent-blue)",
                }}
              >
                <Icon size={18} strokeWidth={1.5} />
              </span>
              <div className="min-w-0">
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.04em]"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {labels[channel.id]}
                </p>
                <p
                  className="truncate text-[14px] font-medium"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {channel.display}
                </p>
              </div>
            </a>

            <div className="flex shrink-0 items-center gap-1.5">
              {canCopy && (
                <button
                  type="button"
                  onClick={() => handleCopy(channel.id, channel.display)}
                  aria-label={`${copyLabels.copy}: ${channel.display}`}
                  title={isCopied ? copyLabels.copied : copyLabels.copy}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border transition-colors hover:border-[var(--color-accent-blue)]"
                  style={{
                    backgroundColor: "var(--color-surface)",
                    borderColor: isCopied
                      ? "var(--color-accent-cyan)"
                      : "var(--color-border)",
                    color: isCopied
                      ? "var(--color-accent-cyan)"
                      : "var(--color-text-muted)",
                  }}
                >
                  {isCopied ? (
                    <Check size={14} strokeWidth={2} />
                  ) : (
                    <Copy size={14} strokeWidth={1.5} />
                  )}
                </button>
              )}

              {channel.external && (
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={labels[channel.id]}
                  className="flex h-8 w-8 items-center justify-center rounded-lg transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  <ArrowUpRight size={16} strokeWidth={1.5} />
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
