import React from "react";

export default function Vendors({
  vendors,
  selectedVendorId,
  onSelectVendor,
  isLoading,
  isAuthenticated,
}) {
  if (!isAuthenticated) {
    return <p className="helper-text">Log in to load vendors for your campus.</p>;
  }

  if (isLoading) {
    return <p className="helper-text">Loading vendors...</p>;
  }

  if (vendors.length === 0) {
    return <p className="helper-text">No vendors found for this campus yet.</p>;
  }

  return (
    <div className="vendor-list">
      {vendors.map((vendor) => (
        <article
          className={`vendor-card ${vendor.id === selectedVendorId ? "active" : ""}`}
          key={vendor.id}
        >
          <strong>{vendor.name}</strong>
          <button
            className="secondary-button"
            onClick={() => onSelectVendor(vendor.id)}
            type="button"
          >
            {vendor.id === selectedVendorId ? "Selected" : "View menu"}
          </button>
        </article>
      ))}
    </div>
  );
}
