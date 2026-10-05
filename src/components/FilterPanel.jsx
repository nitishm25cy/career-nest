function FilterPanel({
  location,
  setLocation,
  industry,
  setIndustry,
  experience,
  setExperience,
  type,
  setType
}) {
  return (
    <div className="filter-panel">

      <div className="filter-header">
        <h3>Filter Jobs</h3>

        <button
          onClick={() => {
            setLocation("");
            setIndustry("");
            setExperience("");
            setType("");
          }}
        >
          Clear
        </button>
      </div>

      <label>Location</label>

      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      >
        <option value="">All Locations</option>
        <option value="Chennai">Chennai</option>
        <option value="Bangalore">Bangalore</option>
        <option value="Hyderabad">Hyderabad</option>
        <option value="Pune">Pune</option>
        <option value="Mumbai">Mumbai</option>
      </select>

      <label>Industry</label>

      <select
        value={industry}
        onChange={(e) => setIndustry(e.target.value)}
      >
        <option value="">All Industries</option>
        <option value="IT & Software">IT & Software</option>
        <option value="Design">Design</option>
        <option value="Data">Data</option>
        <option value="Marketing">Marketing</option>
      </select>

      <label>Experience</label>

      <select
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
      >
        <option value="">All Experience</option>
        <option value="0–2 Years">0–2 Years</option>
        <option value="1–3 Years">1–3 Years</option>
        <option value="2–4 Years">2–4 Years</option>
        <option value="2–5 Years">2–5 Years</option>
      </select>

      <label>Job Type</label>

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="">All Types</option>
        <option value="Full Time">Full Time</option>
        <option value="Remote">Remote</option>
      </select>

    </div>
  );
}

export default FilterPanel;