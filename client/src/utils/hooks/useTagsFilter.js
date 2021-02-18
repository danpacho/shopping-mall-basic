import { useCallback, useEffect, useState } from "react";

function useTagsFilter(tags) {
    const [newTags, setNewTags] = useState([]);
    const handleRawTags = useCallback((tags) => {
        const seperateTagsArray = tags.split(",").map(
            (arg) => arg.replace(" ", "")
            //! 공백 제거
        );
        setNewTags(seperateTagsArray);
    }, []);

    useEffect(() => {
        handleRawTags(tags);
    }, []);

    if (newTags) return newTags;
}

export default useTagsFilter;
