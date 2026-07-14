export default function ProductCard({ product, onOpenProduct }) {
  const imagemCapa = product.imagens && product.imagens.length > 0 ? product.imagens[0] : 'festa.jpg';

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpenProduct(product)}
      onKeyDown={(event) => event.key === 'Enter' && onOpenProduct(product)}
      className="group cursor-pointer flex flex-col h-full animate-na-card transition-transform duration-300 ease-out hover:-translate-y-1"
    >
      <div className="aspect-square bg-[#FFF5F6] rounded-2xl overflow-hidden mb-4 border border-pink-50/50 shadow-sm transform-gpu transition duration-300 group-hover:shadow-lg">
        <img
          src={`/images/${imagemCapa}`}
          alt={product.nome}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300 ease-out"
          onError={(event) => {
            event.target.src = 'https://placehold.co/400x400/FFF5F6/D9828F?text=N%26A+Doces';
          }}
        />
      </div>
      <span className="text-[10px] font-bold tracking-widest text-[#5AC4E6] uppercase mb-1">{product.categoria}</span>
      <h3 className="font-bold text-base leading-snug group-hover:text-[#D9828F] transition duration-200">{product.nome}</h3>
      <p className="text-xs text-gray-400 mt-1 line-clamp-2 mb-2">{product.descricao}</p>
      <div className="mt-auto pt-2 font-bold text-sm text-[#D9828F]">
        {product.sobConsulta ? 'Sob Consulta' : product.regraPreco || `R$ ${product.preco.toFixed(2)}`}
      </div>
    </div>
  );
}
