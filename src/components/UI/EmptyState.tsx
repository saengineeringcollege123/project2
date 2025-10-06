import React from "react";

const EmptyState: React.FC<{ title: string; subtitle?: string }> = ({
  title,
  subtitle,
}) => {
  return (
    <div className="text-center py-12">
      <div className="text-gray-500 text-lg mb-2">{title}</div>
      {subtitle && <p className="text-gray-400">{subtitle}</p>}
    </div>
  );
};

export default EmptyState;
