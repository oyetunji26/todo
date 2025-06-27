// app/login/layout.tsx

export const metadata = {
  title: "auth",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#222327] flex items-center justify-center min-h-screen">
        {children}
      </body>
    </html>
  );
}
