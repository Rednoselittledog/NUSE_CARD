declare module '#auth-utils' {
  interface User {
    id: string
    studentId: string
    name: string
    role: 'member' | 'staff'
  }
}

export {}
