import { ReactNode } from "react";

interface HeaderProps {
  children: ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex justify-center">
          <img src="/logo-word.webp" alt="Easygenerator Logo" className="h-8" />
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center bg-[#f5f7fe]">
        {children}
      </main>
    </div>
  );
}
