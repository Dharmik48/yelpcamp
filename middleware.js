export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/campgrounds/new'],
  pages: {
    signIn: '/auth/login',
  },
}
