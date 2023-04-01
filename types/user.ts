import { ITrack } from "./track"

export interface Iuser {
    name: string
    email: string
    isActive: boolean
    id: string
    tracks: ITrack[]
}