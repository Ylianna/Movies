import { useEffect, useRef } from "react";
import Hls from "hls.js";
import Plyr from "plyr";
import "plyr/dist/plyr.css";

type Props = {
    src: string;
    poster?: string;
};

export const VideoPlayer = ({ src, poster }: Props) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (!videoRef.current || !src) {
            return;
        }

        const video = videoRef.current;
        let hls: Hls | null = null;
        let plyr: Plyr | null = null;

        const isHlsSource = src.endsWith(".m3u8");

        if (isHlsSource && Hls.isSupported()) {
            hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(video);
        } else {
            video.src = src;
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
