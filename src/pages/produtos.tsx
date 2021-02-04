import axios from 'axios'
import { GetServerSideProps } from 'next'
import CadastroProduto from '../components/CadastroProduto'
import Container from '../components/Container'
import { ProdutoModel } from '../entities/Produto'

type ProdutoProps = {
  data: ProdutoModel[]
}

const Produto: React.FC<ProdutoProps> = ({ data = [] }) => {
  return (
    <Container>
      <CadastroProduto data={data} />
    </Container>
  )
}

export default Produto

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await axios.get('http://localhost:3000/api/produtos')

  return {
    props: {
      data,
    },
  }
}
