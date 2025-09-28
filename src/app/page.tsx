import { redirect } from "next/navigation";

export default function Home() {
  // Redirect root to the dedicated landing route to avoid sidebar layout
  redirect("/landing");
}
