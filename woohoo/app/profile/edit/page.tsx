"use client";

import PhotoUpload from "@/components/PhotoUpload";
import {
  getCurrentUserProfile,
  updateUserProfile,
} from "@/lib/actions/profile";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    bio: "",
    gender: "male" as "male" | "female" | "other",
    birthdate: "",
    avatar_url: "",
  });

  useEffect(() => {
    async function loadProfile() {
      try {
        const profileData = await getCurrentUserProfile();
        if (profileData) {
          setFormData({
            full_name: profileData.full_name || "",
            username: profileData.username || "",
            bio: profileData.bio || "",
            gender: profileData.gender || "male",
            birthdate: profileData.birthdate || "",
            avatar_url: profileData.avatar_url || "",
          });
        }
      } catch {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const result = await updateUserProfile(formData);
      if (result.success) {
        router.push("/profile");
      } else {
        setError(result.error || "Failed to update profile.");
      }
    } catch {
      setError("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  }

  function handleInputChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#5A189A] via-[#8A2BE2] to-[#B666D9]">
        <div className="text-center text-white">
          <div className="animate-spin mx-auto h-12 w-12 border-4 border-white border-t-transparent rounded-full"></div>
          <p className="mt-4 opacity-90">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5A189A] via-[#8A2BE2] to-[#B666D9] py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white drop-shadow-md">
            Edit Profile
          </h1>
          <p className="text-white/80">Update your profile information</p>
        </header>

        <form
          onSubmit={handleFormSubmit}
          className="bg-white p-8 rounded-2xl shadow-[0_0_35px_#B666D9] hover:shadow-[0_0_50px_#B666D9] transition"
        >
          <div className="mb-10">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Profile Picture
            </label>

            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-28 h-28 rounded-full overflow-hidden shadow-lg">
                  <img
                    src={formData.avatar_url || "/default-avatar.png"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                <PhotoUpload
                  onPhotoUploaded={(url) => {
                    setFormData((prev) => ({
                      ...prev,
                      avatar_url: url,
                    }));
                  }}
                />
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">
                  Upload a new profile picture
                </p>
                <p className="text-xs text-gray-500">JPG, PNG or GIF. Max 5MB.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label
                htmlFor="full_name"
                className="block text-sm font-semibold text-[#8A2BE2] mb-2"
              >
                Full Name *
              </label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8A2BE2]"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-[#8A2BE2] mb-2"
              >
                Username *
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8A2BE2]"
                placeholder="Choose a username"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-semibold text-[#8A2BE2] mb-2"
              >
                Gender *
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8A2BE2]"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="birthdate"
                className="block text-sm font-semibold text-[#8A2BE2] mb-2"
              >
                Birthday *
              </label>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8A2BE2]"
              />
            </div>
          </div>

          <div className="mb-10">
            <label
              htmlFor="bio"
              className="block text-sm font-semibold text-[#8A2BE2] mb-2"
            >
              About Me *
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              required
              rows={4}
              maxLength={500}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8A2BE2] resize-none"
              placeholder="Tell others about yourself..."
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.bio.length}/500 characters
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 text-gray-600 hover:text-gray-900 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 bg-[#8A2BE2] text-white rounded-lg font-semibold shadow-md hover:bg-[#B666D9] transition disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
