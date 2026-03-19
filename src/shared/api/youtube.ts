const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

type YouTubeSearchItem = {
  id?: {
    videoId?: string;
  };
};

type YouTubeSearchResponse = {
  items?: YouTubeSearchItem[];
};

type YouTubeVideoItem = {
  status?: {
    embeddable?: boolean;
  };
};

type YouTubeVideosResponse = {
  items?: YouTubeVideoItem[];
};

const ensureApiKey = () => {
  if (!YOUTUBE_API_KEY) {
    throw new Error("VITE_YOUTUBE_API_KEY is not set");
  }
};

const isVideoEmbeddable = async (videoId: string) => {
  ensureApiKey();

  const url = new URL(`${YOUTUBE_API_BASE}/videos`);
  url.searchParams.set("part", "status");
  url.searchParams.set("id", videoId);
  url.searchParams.set("key", YOUTUBE_API_KEY);

  const res = await fetch(url.toString());
  if (!res.ok) {
    return false;
  }

  const data = (await res.json()) as YouTubeVideosResponse;
  return Boolean(data.items?.[0]?.status?.embeddable);
};

export const getEmbeddableTrailerVideoId = async (query: string) => {
  ensureApiKey();

  const url = new URL(`${YOUTUBE_API_BASE}/search`);
  url.searchParams.set("part", "snippet");
  url.searchParams.set("q", query);
  url.searchParams.set("type", "video");
  url.searchParams.set("videoEmbeddable", "true");
  url.searchParams.set("videoSyndicated", "true");
  url.searchParams.set("safeSearch", "moderate");
  url.searchParams.set("maxResults", "7");
  url.searchParams.set("key", YOUTUBE_API_KEY);

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error("YouTube search failed");
  }

  const data = (await res.json()) as YouTubeSearchResponse;
  const candidateIds = (data.items ?? [])
    .map((item) => item.id?.videoId)
    .filter((id): id is string => Boolean(id));

  for (const videoId of candidateIds) {
    const embeddable = await isVideoEmbeddable(videoId);
    if (embeddable) {
      return videoId;
    }
  }

  return null;
};
