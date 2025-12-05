"use client";
import { getPotentialMatches, likeUser } from "@/lib/actions/matches";
import { useEffect, useState } from "react";
import { UserProfile } from "../profile/page";
import MatchCard from "@/components/MatchCard";
import MatchButtons from "@/components/MatchButtons";
import MatchNotification from "@/components/MatchNotification";
import {useRouter} from "next/navigation";



export default function MatchesPage() {
  const [potentialMatches, setPotentialMatches] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [showMatchNotification, setShowMatchNotification] = useState(false);
  const [matchedUser, setMatchedUser] = useState<UserProfile | null>(null);

  const router = useRouter();

  useEffect(() => {
    async function loadUsers() {
      try {
        const potentialMatchesData = await getPotentialMatches();
        setPotentialMatches(potentialMatchesData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  async function handleLike() {
    if (currentIndex < potentialMatches.length) {
      const likedUser = potentialMatches[currentIndex];

      try {
        const result = await likeUser(likedUser.id);

        if (result.isMatch) {
          setMatchedUser(result.matchedUser!);
          setShowMatchNotification(true);
        }

        setCurrentIndex((prev) => prev + 1);
      } catch (err) {
        console.error(err);
      }
    }
  }

  function handlePass() {
    if (currentIndex < potentialMatches.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else{
      setCurrentIndex(potentialMatches.length);
    }
  }

  function handleCloseMatchNotification() {
    setShowMatchNotification(false);
    setMatchedUser(null);
  }

  function handleStartChat() {
    if (!matchedUser) return;

    router.push(`/chat/${matchedUser.id}`)
    setShowMatchNotification(false);
  }

  if (loading) {
    return (
      <div className="h-full bg-gradient-to-br from-[#5A189A] via-[#8A2BE2] to-[#B666D9] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Finding your matches...
          </p>
        </div>
      </div>
    );
  }

  if (currentIndex >= potentialMatches.length) {
    return (
      <div className="h-full bg-gradient-to-br from-[#5A189A] via-[#8A2BE2] to-[#B666D9] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-24 h-24 bg-gradient-to-l from-[#5A189A] via-[#8A2BE2] to-[#B666D9] rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">💜</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            No more profiles to show
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Check back later for new matches, or try adjusting your preferences!
          </p>
          <button
            onClick={() => setCurrentIndex(0)}
            className="bg-gradient-to-l from-[#5A189A] via-[#8A2BE2] to-[#B666D9] text-white font-semibold py-3 px-6 rounded-full hover:bg-gradient-to-r from-[#5A189A] via-[#8A2BE2] to-[#B666D9] hover:cursor-pointer"
          >
            Refresh
          </button>
        </div>
        {showMatchNotification && matchedUser && (
          <MatchNotification
            match={matchedUser}
            onClose={handleCloseMatchNotification}
            onStartChat={handleStartChat}
          />
        )}
      </div>
    );
  }

  const currentPotentialMatch = potentialMatches[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5A189A] via-[#8A2BE2] to-[#B666D9]">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          

          <div className="text-center" >
            <h1 className="text-3xl font-bold text-purple-300 mb-2">
              Find your match!
            </h1>
            <p>{currentIndex + 1} of {potentialMatches.length} profiles</p>
            
          </div>
        </header>

        <div className="max-w-md mx-auto">
          <MatchCard user={currentPotentialMatch} />
          <div className="mt-8">
            <MatchButtons onLike={handleLike} onPass={handlePass} />
          </div>
        </div>

        {showMatchNotification && matchedUser && (
          <MatchNotification
            match={matchedUser}
            onClose={handleCloseMatchNotification}
            onStartChat={handleStartChat}
          />
        )}
      </div>
    </div>
  );
}