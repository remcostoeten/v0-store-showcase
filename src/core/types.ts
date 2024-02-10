export interface AuthState {
  readonly user: UserInfo | null
  readonly loading: boolean
}

export interface UserInfo {
  readonly displayName: string | null
  readonly email: string | null
  readonly phoneNumber: string | null
  readonly photoURL: string | null
  readonly providerId: string
  readonly uid: string
}
