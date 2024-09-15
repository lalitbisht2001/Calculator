import { useState } from "react"

const useCalculate = () => {
    const [answer, setAnswer] = useState(null);
    return [answer, setAnswer];
}

export default useCalculate
