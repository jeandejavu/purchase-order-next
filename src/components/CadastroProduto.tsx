import { useState } from 'react'
import Modal from '../components/Modal'

type ProdutoModel = {
  codigo: string
  descricao: string
  preco_minimo: number
  observacao: string
}

const CadastroProduto: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [produtos, setProdutos] = useState<ProdutoModel[]>([])
  const [filterProdutos, setFilterProdutos] = useState<ProdutoModel[]>([])

  const [codigo, setCodigo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [preco_minimo, setPreco] = useState(0)
  const [observacao, setObservacao] = useState('')

  function onCloseModal(): void {
    setModalOpen(false)
  }

  function clearForm(): void {
    setCodigo('')
    setDescricao('')
    setPreco(0)
    setObservacao('')
  }

  function filter(texto: string): void {
    setFilterProdutos(
      produtos.filter((produto) => produto.descricao.includes(texto) || produto.codigo === texto)
    )
  }

  function onOkModal(): void {
    setProdutos([
      ...produtos.filter((produto) => produto.codigo !== codigo),
      {
        codigo,
        descricao,
        observacao,
        preco_minimo,
      },
    ])
    setFilterProdutos([
      ...filterProdutos.filter((produto) => produto.codigo !== codigo),
      {
        codigo,
        descricao,
        observacao,
        preco_minimo,
      },
    ])
    clearForm()
    setModalOpen(false)
  }

  function onCancelModal(): void {
    setModalOpen(false)
  }

  function selectProduto(codigo: string): void {
    const produto = produtos.find((produto) => produto.codigo === codigo)
    if (!produto) return

    setCodigo(produto.codigo)
    setDescricao(produto.descricao)
    setPreco(produto.preco_minimo)
    setObservacao(produto.observacao)
  }

  return (
    <>
      <section className="px-4 sm:px-6 lg:px-4 xl:px-6 pt-4 pb-4 sm:pb-6 lg:pb-4 xl:pb-6 space-y-4">
        <header className="flex items-center justify-between">
          <h2 className="text-lg leading-6 font-medium text-black">Produtos</h2>
        </header>
        <form className="relative" onSubmit={(e) => e.preventDefault()}>
          <svg
            width="20"
            height="20"
            fill="currentColor"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            />
          </svg>
          <input
            className="focus:border-blue-500 focus:ring-1 focus:ring-offset-blue-300 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-10"
            type="text"
            aria-label="Filtrar produtos"
            placeholder="Filtrar produtos"
            onChange={(e) => {
              filter(e.currentTarget.value)
            }}
          />
        </form>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <li className="hover:shadow-lg flex rounded-lg">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                clearForm()
                setModalOpen(true)
              }}
              className="hover:border-transparent hover:shadow-xs w-full flex items-center justify-center rounded-lg border-2 border-dashed border-gray-200 text-sm font-medium py-4"
            >
              Adicionar novo Produto
            </a>
          </li>
          {filterProdutos.map((produto) => (
            <li key={produto.codigo}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  selectProduto(produto.codigo)
                  setModalOpen(true)
                }}
                className="hover:bg-blue-500 hover:border-transparent hover:shadow-lg group block rounded-lg p-4 border border-gray-200"
              >
                <dl className="grid sm:block lg:grid xl:block grid-cols-2 grid-rows-2 items-center">
                  <div>
                    <dt className="sr-only">Descrição</dt>
                    <dd className="group-hover:text-blue-200 text-sm font-medium sm:mb-4 lg:mb-0 xl:mb-4">
                      <h2>{produto.codigo}</h2>
                      <div className="text-base">{produto.descricao}</div>
                      <div>R$ {produto.preco_minimo}</div>
                      <div>{produto.observacao || '\u00A0'}</div>
                    </dd>
                  </div>
                </dl>
              </a>
            </li>
          ))}
        </ul>
      </section>
      {isModalOpen ? (
        <Modal title={'Cadastro de Produtos'} onClose={onCloseModal}>
          <div className="sm:mt-0">
            <div className="md:grid md:grid-cols-1 md:gap-6">
              <div className="mt-5 md:mt-0 md:col-span-2">
                <form action="#" method="POST">
                  <div className="overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-4">
                          <label
                            htmlFor="codigo"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Codigo
                          </label>
                          <input
                            type="text"
                            name="codigo"
                            id="codigo"
                            value={codigo}
                            onChange={(e) => setCodigo(e.target.value)}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-12">
                          <label
                            htmlFor="descricao"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Descrição
                          </label>
                          <input
                            type="text"
                            name="descricao"
                            id="descricao"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="preco_minimo"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Preço
                          </label>
                          <input
                            type="number"
                            name="preco_minimo"
                            id="preco_minimo"
                            value={preco_minimo}
                            onChange={(e) => setPreco(parseFloat(e.target.value))}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-12">
                          <label
                            htmlFor="observacao"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Observação
                          </label>
                          <div className="mt-1">
                            <textarea
                              id="observacao"
                              name="observacao"
                              rows={3}
                              value={observacao}
                              onChange={(e) => setObservacao(e.target.value)}
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                              placeholder=""
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      className="px-4 bg-transparent p-3 rounded-lg text-blue-500 hover:bg-gray-100 hover:text-blue-400 mr-2"
                      onClick={(e) => {
                        e.preventDefault()
                        onOkModal()
                      }}
                    >
                      Salvar
                    </button>
                    <button
                      className="px-4 bg-blue-500 p-3 rounded-lg text-white hover:bg-blue-400"
                      onClick={(e) => {
                        e.preventDefault()
                        onCancelModal()
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal>
      ) : (
        <></>
      )}
    </>
  )
}

export default CadastroProduto
