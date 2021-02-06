import Navigation from '../components/Navigation'
import { signIn, useSession } from 'next-auth/client'

const Container: React.FC = ({ children }) => {
  const [session, loading] = useSession()
  if (!loading && !session) {
    signIn('auth0', {
      callbackUrl: 'https://purchase-order-next.vercel.app/api/auth/callback/auth0',
    })
  }
  return (
    <>
      {loading || !session ? (
        <h1>Carregando</h1>
      ) : (
        <div className="md:container md:mx-auto">
          <Navigation />
          {children}
        </div>
      )}
    </>
  )
}

export default Container
