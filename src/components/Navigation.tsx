import Link from 'next/link'
import Image from 'next/image'
import { signOut } from 'next-auth/client'

const Navigation: React.FC = () => (
  <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
    <nav
      className="relative flex items-center justify-between sm:h-10 lg:justify-start"
      aria-label="Global"
    >
      <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
        <div className="flex items-center justify-between w-auto">
          <Link href="/">
            <a>
              <span className="sr-only">Workflow</span>
              <Image
                width={40}
                height={40}
                className="h-8 w-auto sm:h-10"
                src="https://tailwindui.com/img/logos/workflow-mark-blue-600.svg"
                alt="logo"
              />
            </a>
          </Link>
        </div>
      </div>
      <div className="ml-10 pr-4 space-x-8">
        <Link href="/produtos">
          <a className="font-medium text-gray-500 hover:text-gray-900">Produtos</a>
        </Link>
        <Link href="/clientes">
          <a className="font-medium text-gray-500 hover:text-gray-900">Clientes</a>
        </Link>
        <Link href="/orcamentos">
          <a className="font-medium text-gray-500 hover:text-gray-900">Orçamentos</a>
        </Link>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            signOut()
          }}
          className="font-medium text-gray-500 hover:text-gray-900"
        >
          Sair
        </a>
      </div>
    </nav>
  </div>
)
export default Navigation
