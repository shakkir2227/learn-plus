import { useState } from "react"
import { INSTRUCTOR_FAQ } from "../constants"

interface IUseAccordion {
    accordions: typeof INSTRUCTOR_FAQ,
    toggleAccordion: (id: number) => void
}

const useAccordion = (): IUseAccordion => {
    const [accordions, setAccordions] = useState(INSTRUCTOR_FAQ)

    const toggleAccordion = (id: number) => {
        setAccordions(accordions.map((accordion) => {
            if (accordion.id === id) return { ...accordion, isOpen: !accordion.isOpen }
            return {...accordion, isOpen: false}
        }))
    }

    return { accordions, toggleAccordion }
}

export default useAccordion