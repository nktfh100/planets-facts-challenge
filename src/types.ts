
export interface PlanetData {
    name: string
    color: string
    overview: PlanetInfoType
    structure: PlanetInfoType
    geology: PlanetInfoType
    rotation: string
    revolution: string
    radius: string
    temperature: string
    images: PlanetImages
}

export interface PlanetInfoType {
    content: string
    source: string
}

export interface PlanetImages {
    planet: string
    internal: string
    geology: string
}