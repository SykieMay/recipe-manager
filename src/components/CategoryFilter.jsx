const FILTERS = ["All", "Breakfast", "Lunch", "Dinner", "Dessert"];

export default function CategoryFilter({ activeFilter, onFilterChange }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {/* TODO: render one button per FILTERS entry.
          - Each button calls onFilterChange(f) on click.
          - The active button should look different from the others
            (e.g., "btn-primary" for active, "btn-outline" otherwise).
          - Don't forget the `key` prop! */}
          {/* {FILTERS.map((filter) => (
            <button
              key={filter}
              className={`btn ${activeFilter === filter ? "btn-primary" : "btn-outline"}`}
              onClick={() => onFilterChange(filter)}
            >
              {filter}
            </button>
          ))} */}
          <button
            key="All"
            className={`btn ${activeFilter === "All" ? "btn-primary" : "btn-outline"}`}
            onClick={() => onFilterChange("All")}
          >
            All
          </button>

          <button
            key="Breakfast"
            className={`btn ${activeFilter === "Breakfast" ? "btn-primary" : "btn-outline"}`}
            onClick={() => onFilterChange("Breakfast")}
          >
            Breakfast
          </button>

          <button
            key="Lunch"
            className={`btn ${activeFilter === "Lunch" ? "btn-primary" : "btn-outline"}`}
            onClick={() => onFilterChange("Lunch")}
          >
            Lunch
          </button>

          <button
            key="Dinner"
            className={`btn ${activeFilter === "Dinner" ? "btn-primary" : "btn-outline"}`}
            onClick={() => onFilterChange("Dinner")}
          >
            Dinner
          </button>
          <button
            key="Dessert"
            className={`btn ${activeFilter === "Dessert" ? "btn-primary" : "btn-outline"}`}
            onClick={() => onFilterChange("Dessert")}
            >
              Dessert
            </button>
    </div>
  );
}
