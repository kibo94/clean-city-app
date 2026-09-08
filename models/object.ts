interface ObjectModel {
    name: string,
    address: string,
    city: string
    id: string,
    creatorId?: string
    workHours?: {
        from: number,
        to: number
    }
}

export {
    ObjectModel
}