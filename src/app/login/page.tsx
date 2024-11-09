import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginButtons from "@/components/login-buttons";
import LoginSide from "@/components/login-side";
import { Title } from "@tailus-ui/typography";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session) return redirect("/app");

  return (
    <div className="w-full h-screen flex fixed top-0 left-0 items-center justify-center">
      {/* <LoginSide /> */}
      <div className="absolute top-0 left-0 dots1 z-0 opacity-50 inset-0"></div>
      <div className="w-full max-w-xl h-full p-6 flex flex-col items-center justify-center text-center border-x-1 relative before:absolute before:inset-0 before:-z-40 before:[background-image:url('/grainy-bg.svg')] before:opacity-[0.020] backdrop-blur z-10 bg-background/70">
        <div className="w-full flex items-center justify-center mb-4">
          <div className="flex items-center gap-0.5 min-w-max">
            <div className="w-4 h-7 rounded-tl-[999px] border border-white/20 bg-white"></div>
            <div className="w-4 h-7 rounded-br-[999px] border border-white/20 bg-white "></div>
          </div>
        </div>
        <Title>Welcome to Koxy AI</Title>
        <p className="text-sm opacity-70 mb-12">
          The future of Serverless AI-powered development
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
