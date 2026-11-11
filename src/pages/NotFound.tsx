import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center py-20 space-y-4">
      <h2 className="text-4xl font-bold">404</h2>
      <p className="text-base-content/70">That page does not exist.</p>
      <Link to="/" className="btn btn-primary btn-sm">
        Back to search
      </Link>
    </div>
  );
}