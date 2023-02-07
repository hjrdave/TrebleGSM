export interface IUpdate{
    (
        action: string,
        dispatchValue: any,
        options?: {
            disableMiddleware?: boolean
        }
        
    ): void
}

export interface IToggle{
    (
        action: string,
        dispatchValue?: boolean,
        options?:{
            disableMiddleware?: boolean
        }
    ): void
}

export interface IReset{
    (
        action: string,
        options?: {
            disableMiddleware?: boolean
        }
        
    ): void
}

export interface IResetAll{
    (
        action: string,
        options?: {
            disableMiddleware?: boolean
        }
        
    ): void
}