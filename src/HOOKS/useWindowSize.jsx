import { useEffect, useState } from 'react'

const useWindowSize = () => {
    const [Windowsize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    useEffect(() => {
        const Resize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            })
            window.addEventListener('resize', Resize);
        }

        return window.removeEventListener('resize', Resize);
    }, [Windowsize, setWindowSize]);

    return [Windowsize]
}

export default useWindowSize
