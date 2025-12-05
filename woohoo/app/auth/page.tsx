"use client";
import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const supabase = createClient();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !authLoading) {
      router.push("/");
    }
  }, [user, authLoading, router]);

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        if (data.user && !data.session) {
          setError("Please check your email for a confirmation link");
          return;
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center
  bg-gradient-to-br from-[#5A189A] via-[#8A2BE2] to-[#B666D9] "
    >
      <div
        className="bg-purple-200 p-8 rounded-xl shadow-[0_0_30px_#B666D9]
 w-full max-w-md transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_50px_#B666D9]
"
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[#8A2BE2] ">WooHoo</h1>
          <p className= "text-2xl">💜</p>
          <p className="text-gray-600">
            {isSignUp ? "Create your account!" : "Sign in to your account!"}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-medium text-gray-700">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your e-mail"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8A2BE2]"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8A2BE2]"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm font-medium">{error}</div>
          )}

          <button type="submit" disabled={loading} className="w-full bg-[#8A2BE2] text-white py-3 rounded-lg hover:bg-[#B666D9] transition disabled:bg-gray-400 hover:cursor-pointer">
            {loading ? "loading..." : isSignUp ? "Sign up" : "Sign in"}
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-[#8A2BE2] hover:underline hover:cursor-pointer hover:text-[#B666D9]" >
            {isSignUp ? "Already have an account? Sign in!" : "Don't have an account? Sign up!"}
          </button>
        </div>
      </div>
    </div>
  );
}
