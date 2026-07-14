export default function Header({ onHomeClick, onOpenCart, cartCount }) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-pink-100 shadow-sm animate-na-fade-up">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <button
          type="button"
          className="flex items-center gap-3 cursor-pointer"
          onClick={onHomeClick}
        >
          <div
            className="w-10 h-10 bg-cover bg-center rounded-full border border-pink-200"
            style={{ backgroundImage: "url('/images/logo.png')" }}
          />
          <span className="font-extrabold text-xl tracking-wider text-[#D9828F]">N&A DOCES</span>
        </button>

        <button
          type="button"
          onClick={onOpenCart}
          className="relative p-2 text-[#D9828F] hover:text-[#c46f7b] transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#5AC4E6] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
