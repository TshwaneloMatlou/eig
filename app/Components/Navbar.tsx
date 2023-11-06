import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 fixed top-0 left-0 right-0 z-10">
      <div className="mx-auto grid gap-3 justify-center text-center">
        <div className="bg-green-500 hover:bg-blue-500 text-white border-2 border-red-500 font-bold text-xl mb-5 sm:mb-0 sm:w-auto rounded-xl ">
          <Link href="/">E . I . G</Link>
        </div>

        <ul className="flex space-x-4 font-extrabold text-sm sm:text-base">
          <li>
            <Link href="/Charts" className="text-white hover:text-red-500">
              Charts
            </Link>
          </li>
          <li>
            <Link href="/KnowledgeBase" className="text-white hover:text-red-500">
              Knowledge Base
            </Link>
          </li>
          <li>
            <Link href="/Calculators" className="text-white hover:text-red-500">
              Calculators
            </Link>
          </li>
          <li>
            <Link href="/TradeManagement" className="text-white hover:text-red-500">
              Trade Management
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
