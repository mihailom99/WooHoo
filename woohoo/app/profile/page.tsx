"use client";

import { getCurrentUserProfile } from "@/lib/actions/profile";
import { useEffect, useState } from "react";
import Link from "next/link";

export interface UserProfile {
  id: string;
  full_name: string;
  username: string;
  email: string;
  gender: "male" | "female" | "other";
  birthdate: string;
  bio: string;
  avatar_url: string;
  preferences: UserPreferences;
  location_lat?: number;
  location_lng?: number;
  last_active: string;
  is_verified: boolean;
  is_online: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserPreferences {
  age_range: {
    min: number;
    max: number;
  };
  distance: number;
  gender_preference: ("male" | "female" | "other")[];
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const profileData = await getCurrentUserProfile();
        if (profileData) setProfile(profileData);
        else setError("Failed to load profile");
      } catch (err) {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  function calculateAge(birthdate: string) {
    const today = new Date();
    const birth = new Date(birthdate);
    let age = today.getFullYear() - birth.getFullYear();
    const diff = today.getMonth() - birth.getMonth();
    if (diff < 0 || (diff === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#5A189A] via-[#8A2BE2] to-[#B666D9]">
        <div className="text-center text-white">
          <div className="animate-spin mx-auto h-12 w-12 border-4 border-white border-t-transparent rounded-full"></div>
          <p className="mt-4 opacity-90">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#5A189A] via-[#8A2BE2] to-[#B666D9]">
        <div className="bg-white/20 backdrop-blur-xl text-white p-10 rounded-2xl shadow-[0_0_40px_#B666D9] max-w-md text-center">
          <div className="text-5xl mb-4">❌</div>
          <h2 className="text-2xl font-bold mb-2">Profile not found</h2>
          <p className="opacity-90 mb-6">
            {error || "Unable to load your profile. Please try again."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-[#8A2BE2] hover:bg-[#B666D9] rounded-full transition text-white font-semibold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5A189A] via-[#8A2BE2] to-[#B666D9] py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white drop-shadow-md">My Profile</h1>
          <p className="text-white/80 mt-2">Manage your profile and preferences</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-[0_0_30px_#B666D9] hover:shadow-[0_0_45px_#B666D9] transition">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-28 h-28 rounded-full overflow-hidden shadow-lg">
                  <img
                    src={profile.avatar_url || "/default-avatar.png"}
                    alt={profile.full_name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#8A2BE2]">
                    {profile.full_name}, {calculateAge(profile.birthdate)}
                  </h2>
                  <p className="text-gray-600">@{profile.username}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Member since {new Date(profile.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-[#8A2BE2] mb-2">About Me</h3>
                <p className="text-gray-700">{profile.bio || "No bio added yet."}</p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-[#8A2BE2] mb-2">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4 text-gray-700">
                  <div>
                    <p className="font-semibold">Gender</p>
                    <p className="capitalize">{profile.gender}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Birthday</p>
                    <p>{new Date(profile.birthdate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#8A2BE2] mb-2">Dating Preferences</h3>
                <div className="grid grid-cols-2 gap-4 text-gray-700">
                  <div>
                    <p className="font-semibold">Age Range</p>
                    <p>
                      {profile.preferences.age_range.min} -{" "}
                      {profile.preferences.age_range.max} years
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Distance</p>
                    <p>Up to {profile.preferences.distance} km</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-[0_0_30px_#B666D9] hover:shadow-[0_0_45px_#B666D9] transition">
              <h3 className="text-xl font-semibold text-[#8A2BE2] mb-4">Quick Actions</h3>

              <Link
                href="/profile/edit"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-[#8A2BE210] transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#8A2BE2] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Edit Profile</span>
                </div>

                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-[0_0_30px_#B666D9] hover:shadow-[0_0_45px_#B666D9] transition">
              <h3 className="text-xl font-semibold text-[#8A2BE2] mb-4">Account</h3>

              <div className="flex items-center justify-between p-3 rounded-lg bg-[#8A2BE210]">
                <span className="font-medium text-gray-700">Username</span>
                <span className="text-gray-600">@{profile.username}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
