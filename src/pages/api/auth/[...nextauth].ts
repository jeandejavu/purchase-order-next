import { NowRequest, NowResponse } from '@vercel/node'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
  providers: [
    Providers.Auth0({
      clientId: process.env.AUTH0_CLIENT_ID as string,
      clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
      domain: process.env.AUTH0_DOMAIN as string,
      authorizationUrl: `https://${process.env.AUTH0_DOMAIN}/authorize?response_type=code&prompt=login`,
    }),
  ],
}

export default (request: NowRequest, response: NowResponse) => NextAuth(request, response, options)
