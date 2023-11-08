import { createContext, useState } from 'react';

export const CommentContext = createContext();

function CommentProvider({ children }) {
    const [isShow, setIsShow] = useState(false);
    const [currentLink, setCurrentLink] = useState();
    const [idVideoCurrent, setIdVideoCurrent] = useState();
    const [isWatch, setIsWatch] = useState(false);
    const [uuidVideo, setUiidVideo] = useState();

    const body = document.body;

    const handleShowComment = () => {
        body.classList.add('hidden');
        setIsShow(true);
    };

    const handleHideComment = () => {
        body.classList.remove('hidden');
        setIsShow(false);
    };

    const handleSetLink = (link) => {
        setCurrentLink(link);
    };

    const handleShowWatchComment = () => {
        body.classList.add('hidden');
        setIsWatch(true);
    };

    const handleHideWatchComment = () => {
        body.classList.remove('hidden');
        setIsWatch(false);
    };

    const value = {
        handleShowComment,
        handleHideComment,
        handleSetLink,
        setIdVideoCurrent,
        handleShowWatchComment,
        handleHideWatchComment,
        setUiidVideo,
        idVideoCurrent,
        currentLink,
        isShow,
        isWatch,
        uuidVideo,
    };

    return <CommentContext.Provider value={value}>{children}</CommentContext.Provider>;
}

export default CommentProvider;
