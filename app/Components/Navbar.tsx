import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="mx-auto flex flex-wrap justify-between items-center">
        <div className="text-white font-bold text-xl mb-4 sm:mb-0 sm:w-auto ">
          <Link href="/">E.I.G</Link>
        </div>

        <ul className="flex space-x-4 font-extrabold text-sm sm:text-base">
          <li>
            <Link href="/Charts" className="text-white hover:text-blue-200">
              Charts
            </Link>
          </li>
          <li>
            <Link href="/KnowledgeBase" className="text-white hover:text-blue-200">
              Knowledge Base
            </Link>
          </li>
          <li>
            <Link href="/Calculators" className="text-white hover:text-blue-200">
              Calculators
            </Link>
          </li>
          <li>
            <Link href="/TradeManagement" className="text-white hover:text-blue-200">
              Trade Management
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
