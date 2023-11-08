import { createContext, useState } from 'react';

export const VideoContext = createContext();

function VideoProvider({ children }) {
    const [volume, setVolume] = useState(0.4);
    const [prevVolume, setPreVolume] = useState(volume);
    const [isMute, setIsMute] = useState(true);

    const handleAdjustVolume = (e) => {
        const volume = e.target.value;
        console.log('volume:', volume);
        if (volume === '0') {
            setVolume(0);
            setIsMute(true);
        } else {
            setVolume(volume);
            setIsMute(false);
        }
    };

    const toggleMuted = () => {
        if (isMute) {
            setVolume(prevVolume);
            setIsMute(false);
        } else {
            setPreVolume(volume);
            setVolume(0);
            setIsMute(true);
        }
    };

    const value = { volume, isMute, handleAdjustVolume, toggleMuted };

    return <VideoContext.Provider value={value}>{children}</VideoContext.Provider>;
}

export default VideoProvider;
