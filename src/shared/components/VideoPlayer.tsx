import { useEffect, useRef } from "react";
import Hls from "hls.js";
import Plyr from "plyr";
import "plyr/dist/plyr.css";

type Props = {
    src: string;
    poster?: string;
};

const normalizeVideoSrc = (src: string) => {
    if (!src) {
        return src;
    }

    // Keep absolute URLs untouched.
    if (/^https?:\/\//i.test(src)) {
        return src;
    }

    const baseUrl = import.meta.env.BASE_URL || "/";
    const cleanBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
    const cleanSrc = src.startsWith("/") ? src.slice(1) : src;
    return `${cleanBase}${cleanSrc}`;
};

export const VideoPlayer = ({ src, poster }: Props) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (!videoRef.current || !src) {
            return;
        }

        const video = videoRef.current;
        const resolvedSrc = normalizeVideoSrc(src);
        let hls: Hls | null = null;
        let plyr: Plyr | null = null;

        const isHlsSource = resolvedSrc.endsWith(".m3u8");

        if (isHlsSource && Hls.isSupported()) {
            hls = new Hls();
            hls.loadSource(resolvedSrc);
            hls.attachMedia(video);
        } else {
            video.src = resolvedSrc;
        }

        plyr = new Plyr(video, {
            controls: [
                "play-large",
                "play",
                "progress",
                "current-time",
                "mute",
                "volume",
                "settings",
                "fullscreen",
            ],
        });

        return () => {
            plyr?.destroy();
            hls?.destroy();
        };
    }, [src]);

    return (
        <video
            ref={videoRef}
            controls
            playsInline
            poster={poster}
            style={{ width: "100%", borderRadius: "14px", overflow: "hidden" }}
        />
    );
};
