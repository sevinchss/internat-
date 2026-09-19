import { PageTransition } from "@/components/layout/PageTransition";

// template.tsx re-mounts on every navigation → a short ring-sweep between routes.
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
