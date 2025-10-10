import RandomQuoteComponentV2 from "~/components/Line/RandomQuoteV2";
export function meta() {
  return [{ title: "Màn hình TV" }, { name: "description", content: "Màn hình TV" }];
}

function FreeTimePage() {
  return <RandomQuoteComponentV2 />;
}

export default FreeTimePage;
