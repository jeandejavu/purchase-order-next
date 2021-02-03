import { useState } from 'react'
import CadastroProduto from '../components/CadastroProduto'
import Container from '../components/Container'
import Modal from '../components/Modal'

const Home: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState(true)
  return (
    <Container>
      {isModalVisible ? (
        <Modal
          sizeMedium={false}
          onClose={() => {
            setModalVisible(false)
          }}
        >
          <CadastroProduto />
        </Modal>
      ) : (
        <></>
      )}
    </Container>
  )
}

export default Home
