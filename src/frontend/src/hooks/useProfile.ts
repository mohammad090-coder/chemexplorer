import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./useAuth";

// Profile types (matching backend profile.mo)
export interface Profile {
  userId: string;
  username: string;
  displayName: string;
  bio: string;
  joinDate: number;
  avatarUrl: string | null;
  /** emoji identifier or 'upload' for custom uploaded photos */
  presetAvatar: string | null;
}

export interface UserStats {
  activityCount: number;
  savedItemsCount: number;
  progressScore: number;
}

export interface ProfileInput {
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string | null;
  presetAvatar?: string | null;
}

/** 8 chemistry-themed preset avatars */
export const PRESET_AVATARS = [
  {
    id: "atom",
    emoji: "⚛️",
    bg: "linear-gradient(135deg, oklch(0.45 0.18 258) 0%, oklch(0.38 0.16 280) 100%)",
  },
  {
    id: "flask",
    emoji: "🧪",
    bg: "linear-gradient(135deg, oklch(0.42 0.18 150) 0%, oklch(0.36 0.16 165) 100%)",
  },
  {
    id: "microscope",
    emoji: "🔬",
    bg: "linear-gradient(135deg, oklch(0.44 0.17 210) 0%, oklch(0.38 0.14 225) 100%)",
  },
  {
    id: "dna",
    emoji: "🧬",
    bg: "linear-gradient(135deg, oklch(0.44 0.2 290) 0%, oklch(0.37 0.18 305) 100%)",
  },
  {
    id: "diamond",
    emoji: "💎",
    bg: "linear-gradient(135deg, oklch(0.48 0.15 200) 0%, oklch(0.4 0.13 215) 100%)",
  },
  {
    id: "alembic",
    emoji: "⚗️",
    bg: "linear-gradient(135deg, oklch(0.46 0.19 40) 0%, oklch(0.4 0.17 55) 100%)",
  },
  {
    id: "thermometer",
    emoji: "🌡️",
    bg: "linear-gradient(135deg, oklch(0.5 0.22 22) 0%, oklch(0.43 0.2 35) 100%)",
  },
  {
    id: "magnet",
    emoji: "🧲",
    bg: "linear-gradient(135deg, oklch(0.44 0.18 340) 0%, oklch(0.38 0.16 355) 100%)",
  },
] as const;

export type PresetAvatarId = (typeof PRESET_AVATARS)[number]["id"];

export function useProfile() {
  const { isAuthenticated, principal } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Load profile from localStorage (local-only, no backend bindgen for profile yet)
  const loadProfile = useCallback(() => {
    if (!isAuthenticated || !principal) return;
    setIsLoading(true);
    try {
      const stored = localStorage.getItem(`chemx-profile-${principal}`);
      if (stored) {
        const parsed = JSON.parse(stored) as Profile;
        setProfile(parsed);
      } else {
        // Default profile
        const defaultProfile: Profile = {
          userId: principal,
          username: `${principal.slice(0, 8)}...`,
          displayName: "ChemisteryX User",
          bio: "Passionate about exploring the world of chemistry.",
          joinDate: Date.now(),
          avatarUrl: null,
          presetAvatar: "atom",
        };
        setProfile(defaultProfile);
      }

      const storedStats = localStorage.getItem(`chemx-stats-${principal}`);
      if (storedStats) {
        setStats(JSON.parse(storedStats) as UserStats);
      } else {
        setStats({ activityCount: 0, savedItemsCount: 0, progressScore: 0 });
      }
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, principal]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const saveProfile = useCallback(
    async (input: ProfileInput): Promise<void> => {
      if (!isAuthenticated || !principal) return;
      setIsSaving(true);
      try {
        const updated: Profile = {
          userId: principal,
          username: input.username,
          displayName: input.displayName,
          bio: input.bio,
          joinDate: profile?.joinDate ?? Date.now(),
          avatarUrl: input.avatarUrl,
          presetAvatar: input.presetAvatar ?? null,
        };
        localStorage.setItem(
          `chemx-profile-${principal}`,
          JSON.stringify(updated),
        );
        setProfile(updated);
      } finally {
        setIsSaving(false);
      }
    },
    [isAuthenticated, principal, profile?.joinDate],
  );

  const uploadAvatar = useCallback(
    async (file: File): Promise<string | null> => {
      setIsUploading(true);
      try {
        // Convert to base64 data URL for local storage
        return await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      } finally {
        setIsUploading(false);
      }
    },
    [],
  );

  /** Select a preset avatar — clears uploaded avatarUrl */
  const selectPresetAvatar = useCallback(
    async (presetId: string): Promise<void> => {
      if (!profile) return;
      await saveProfile({
        ...profile,
        avatarUrl: null,
        presetAvatar: presetId,
      });
    },
    [profile, saveProfile],
  );

  return {
    profile,
    stats,
    isLoading,
    isSaving,
    isUploading,
    saveProfile,
    uploadAvatar,
    selectPresetAvatar,
  };
}
