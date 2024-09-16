import Navbar from "@/components/navbar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginButtons from "@/components/login-buttons";
import LoginSide from "@/components/login-side";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session) return redirect("/app");

  return (
    <div className="w-full h-screen flex fixed top-0 left-0">
      <Navbar links={[{ name: "Connect account", href: "/login" }]} />
      <LoginSide />
      <div className="w-full h-full p-6 flex flex-col items-center justify-center gap-3 text-center">
        <h3 className="text-2xl font-semibold">Connect your account</h3>
        <p className="text-sm opacity-70 mb-12">
          The future is now... one click away from you!
        </p>
        <LoginButtons />
        <div className="text-xs opacity-70 mt-2">
          By continue you agree to our{" "}
          <span className="text-primary underline">Terms of Service</span> and{" "}
          <span className="text-primary underline">Privacy Policy</span>
        </div>
      </div>
    </div>
  );
}
