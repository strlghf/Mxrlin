import { Link } from "react-router";

export function NotFound () {
  return (
    <div>
      <h1>404 Not Found 😢</h1>
      <Link to={"/"}>
        <button>Go Back Home</button>
      </Link>
    </div>
  )
}