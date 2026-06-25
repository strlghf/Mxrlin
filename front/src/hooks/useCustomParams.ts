import { useSearchParams } from "react-router";

export const useCustomParams = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  
  return { searchQuery }
}