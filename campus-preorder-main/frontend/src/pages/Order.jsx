import React from "react";

export default function Order({
  menu,
  vendor,
  onPlaceOrder,
  isAuthenticated,
  isLoading,
  isSubmitting,
}) {
  if (!isAuthenticated) {
    return <p className="helper-text">Log in first to browse a menu and place an order.</p>;
  }

  if (!vendor) {
    return <p className="helper-text">Select a vendor to see available menu items.</p>;
  }

  if (isLoading) {
    return <p className="helper-text">Loading menu for {vendor.name}...</p>;
  }

  if (menu.length === 0) {
    return <p className="helper-text">No active menu items found for {vendor.name}.</p>;
  }

  return (
    <div className="menu-list">
      {menu.map((item) => (
        <article className="menu-card" key={item.id}>
          <div className="menu-meta">
            <strong>{item.name}</strong>
            <span>Rs. {item.price}</span>
          </div>
          <button
            className="primary-button"
            disabled={isSubmitting}
            onClick={() => onPlaceOrder([{ name: item.name, price: item.price, qty: 1 }])}
            type="button"
          >
            {isSubmitting ? "Placing order..." : `Order ${item.name}`}
          </button>
        </article>
      ))}
    </div>
  );
}
