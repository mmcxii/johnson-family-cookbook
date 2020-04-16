import React from "react";

export const Card: React.FC = ({ children }) => (
  <section className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl">
    {children}
  </section>
);
