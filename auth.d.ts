declare module '#auth-utils' {
  interface User {
    id: number
    name: string
    email: string
    createdAt?: Date
  }
}

export {}
