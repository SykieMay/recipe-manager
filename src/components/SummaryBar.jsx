export default function SummaryBar({ total, favorites }) {
  return (
    <div className="stats shadow w-full">
      {/* TODO: two <div className="stat"> blocks.
          - First: title "Total Recipes", value {total}
          - Second: title "Favorites", value {favorites} ★
      */}
      <div className="stat">
        <div className="stat-title">Total Recipes</div>
        <div className="stat-value">{total}</div>
      </div>

      <div className="stat">
        <div className="stat-title">Favorites</div>
        <div className="stat-value">{favorites} ★</div>
      </div>
    </div>
  );
}
  