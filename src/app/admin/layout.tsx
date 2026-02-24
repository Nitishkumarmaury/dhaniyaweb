export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Admin pages use their own layout without the site header/footer
  return <div className="min-h-screen">{children}</div>;
}
