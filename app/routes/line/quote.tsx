import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import RandomQuoteComponent from "~/components/Line/RandomQuote";
import { timeAfter, timeBefore } from "~/lib/helpers";

export default function QuotePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  let navigate = useNavigate();

  useEffect(() => {
    if (
      (timeAfter("07:25:00") && timeBefore("11:25:00")) ||
      (timeAfter("12:40:00") && timeBefore("17:15:00"))
    ) {
      const redirectTo = searchParams.get("redirectTo");
      if (redirectTo) {
        navigate(redirectTo);
      }
    }
  }, []);

  return <RandomQuoteComponent />;
}
