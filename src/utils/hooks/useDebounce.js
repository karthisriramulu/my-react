import React, { useState } from 'react'

export default function useDebounce() {
    
    const [typingTimeout, setTypingTimeout] = useState("")

    function bounce(func, wait = 1000) {
        
        clearTimeout(typingTimeout);
        const timeOut = setTimeout(() => func(), wait);

        setTypingTimeout(timeOut);

    }

    return bounce;
}
