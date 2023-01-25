import { PlanetData } from '@/types'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import planetsData from "@/data.json"

interface AppState {
    activePlanetData: PlanetData
    setPlanetData: (newPlanetData: PlanetData) => void
}

export const useAppStore = create<AppState>()(
    devtools(
        (set) => ({
            activePlanetData: planetsData[0],
            setPlanetData: (newPlanetData: PlanetData) => set((state) => ({ activePlanetData: newPlanetData }))
        }),
        {
            name: 'app-storage',
        }
    )
)

