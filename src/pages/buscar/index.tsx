import { HOME } from "@/constants/routes";
import { useToast } from "@/contexts/toast";
import { useRouter } from "next/router";
import { useEffect } from "react";

const SearchPage = () => {
  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    showToast("Página em desenvolvimento", "error");
    router.push(HOME);
  }, []);

  return <p>Search Page</p>;
};

export default SearchPage;
