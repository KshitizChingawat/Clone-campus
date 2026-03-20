import React from "react";
export default function SelectCampus({ campuses, selectedCampusId, setCampus, isLoading }) {
  if (isLoading) {
    return <p className="helper-text">Loading campuses...</p>;
  }

  if (campuses.length === 0) {
    return (
      <p className="helper-text">
        No campuses found yet. Run the backend seed script so the app has at least one campus.
      </p>
    );
  }

  return (
    <div className="field">
      <label htmlFor="campus-select">Campus</label>
      <select
        id="campus-select"
        onChange={(event) => setCampus(event.target.value)}
        value={selectedCampusId}
      >
        {campuses.map((campus) => (
          <option key={campus.id} value={campus.id}>
            {campus.name} ({campus.domain})
          </option>
        ))}
      </select>
    </div>
  );
}
