import React from 'react';
import NavComp from './NavComp';
import Footer from './Footer';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavComp />
      <main className="flex-grow-1">{children}</main>
      <Footer />
    </div>
  );
}
