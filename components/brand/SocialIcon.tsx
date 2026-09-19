// Line-style social glyphs matching lucide's 1.8 stroke (lucide v1 no longer ships brand icons).
export function SocialIcon({ id, className = "size-5" }: { id: string; className?: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {id === "telegram" && (
        <path
          {...common}
          d="M21.5 4.5 2.8 11.7c-.9.4-.9 1.1 0 1.4l4.7 1.5 1.8 5.6c.2.6.4.8.9.8.4 0 .6-.2.9-.5l2.3-2.2 4.8 3.5c.9.5 1.5.2 1.7-.8l3.1-14.7c.3-1.3-.5-1.8-1.5-1.3ZM8.3 14.3l9.7-6.4"
        />
      )}
      {id === "instagram" && (
        <g {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.3" cy="6.7" r=".6" fill="currentColor" />
        </g>
      )}
      {id === "facebook" && (
        <path
          {...common}
          d="M14.5 8H17V4.5h-2.8C11.6 4.5 10 6.2 10 8.8V11H7.5v3.5H10V21h3.5v-6.5h2.9l.6-3.5h-3.5V9.3c0-.9.4-1.3 1-1.3Z"
        />
      )}
      {id === "linkedin" && (
        <g {...common}>
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M7.5 10.5V16.5M7.5 7.5v.01M11 16.5v-6M11 13c0-1.7 1.1-2.6 2.4-2.6 1.4 0 2.1.9 2.1 2.6v3.5" />
        </g>
      )}
      {id === "youtube" && (
        <g {...common}>
          <path d="M21.6 7.6a2.6 2.6 0 0 0-1.8-1.8C18.2 5.4 12 5.4 12 5.4s-6.2 0-7.8.4a2.6 2.6 0 0 0-1.8 1.8C2 9.2 2 12 2 12s0 2.8.4 4.4a2.6 2.6 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8c.4-1.6.4-4.4.4-4.4s0-2.8-.4-4.4Z" />
          <path d="m10 15 5.2-3L10 9v6Z" />
        </g>
      )}
    </svg>
  );
}
