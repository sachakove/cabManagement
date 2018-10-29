export interface Driver {
    _id?: any,
    isActive?: boolean,
    name?: string,
    age?: number,
    picture?: string,
    email?: string,
    latitude?: number,
    longitude?: number,
    address?: any,
    tasks?: [
        {
            _id?: any,
            title?: string,
            scheduled_for?: string,
            address?: any,
            latitude?: number,
            longitude?: number
        }
    ]
}