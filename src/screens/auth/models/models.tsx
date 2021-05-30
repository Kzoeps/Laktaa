import { APIStatuses } from 'src/shared/models/model'

export interface AuthState {
    userDetails: {
        userName: string
        userId: string
    }
    status: APIStatuses
    error: string | null
}
