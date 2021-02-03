import Navigation from '../components/Navigation'

const Container: React.FC = ({ children }) => {
  return (
    <>
      <div className="md:container md:mx-auto">
        <Navigation />
        {children}
      </div>
    </>
  )
}

export default Container
