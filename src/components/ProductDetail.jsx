export default function ProductDetail({
  product,
  activePhotoIndex,
  selectedFlavorsQty,
  generalQuantity,
  onBack,
  onPrevPhoto,
  onNextPhoto,
  onSelectPhoto,
  onFlavorQtyChange,
  onGeneralQuantityChange,
  onAddToCart,
  totalBrigadeirosPagina,
  calcularPrecoBrigadeiro
}) {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-pink-50">
      <button
        type="button"
        onClick={onBack}
        className="text-xs font-extrabold tracking-wide text-[#D9828F] uppercase mb-6 flex items-center gap-1 hover:underline"
      >
        ← Voltar ao catálogo
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div className="relative aspect-square bg-[#FFF5F6] rounded-3xl overflow-hidden border border-pink-50 group-carousel">
          <img
            src={`/images/${product.imagens[activePhotoIndex]}`}
            alt={`${product.nome} - Imagem ${activePhotoIndex + 1}`}
            className="w-full h-full object-cover transition-all duration-300"
            onError={(event) => {
              event.target.src = 'https://placehold.co/600x600/FFF5F6/D9828F?text=N%26A+Doces';
            }}
          />

          {product.imagens && product.imagens.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => onPrevPhoto(product.imagens.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#D9828F] w-9 h-9 rounded-full flex items-center justify-center shadow-md transition duration-200 hover:scale-105"
              >
                ❮
              </button>

              <button
                type="button"
                onClick={() => onNextPhoto(product.imagens.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#D9828F] w-9 h-9 rounded-full flex items-center justify-center shadow-md transition duration-200 hover:scale-105"
              >
                ❯
              </button>

              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {product.imagens.map((_, dotIndex) => (
                  <button
                    key={dotIndex}
                    type="button"
                    onClick={() => onSelectPhoto(dotIndex)}
                    className={`h-2 rounded-full transition-all duration-350 ${
                      activePhotoIndex === dotIndex ? 'w-5 bg-[#D9828F]' : 'w-2 bg-white/60 hover:bg-white'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-[#5AC4E6] uppercase tracking-wider">{product.categoria}</span>
            <h2 className="text-2xl font-black text-[#5C3A3F] mt-1 mb-2">{product.nome}</h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">{product.descricao}</p>

            <div className="text-xl font-bold text-[#D9828F] mb-6">
              {product.sobConsulta ? 'Preço Sob Consulta' : product.regraPreco || `R$ ${product.preco.toFixed(2)}`}
            </div>

            {product.temSabores ? (
              <div className="mb-6">
                <label className="block text-xs font-black uppercase tracking-wider text-[#5C3A3F] mb-3">
                  Selecione as quantidades dos sabores:
                </label>
                <div className="space-y-3">
                  {product.sabores.map((sabor, idx) => {
                    const qty = selectedFlavorsQty[sabor] || 0;
                    return (
                      <div
                        key={idx}
                        className={`flex items-center justify-between p-1.5 rounded-full border transition-all duration-150 ${
                          qty > 0 ? 'border-[#D9828F] bg-[#FFF0F2]' : 'border-gray-200 bg-white'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => onFlavorQtyChange(sabor, -1)}
                          className={`w-9 h-9 flex items-center justify-center font-bold rounded-full transition-all text-base ${
                            qty > 0 ? 'bg-[#D9828F] text-white hover:bg-[#c46f7b]' : 'bg-transparent text-gray-300 pointer-events-none'
                          }`}
                          disabled={qty === 0}
                        >
                          -
                        </button>

                        <div className="flex flex-col items-center justify-center flex-1 px-4 text-center select-none">
                          <span className={`text-xs leading-tight ${qty > 0 ? 'font-black text-[#D9828F]' : 'font-medium text-[#5C3A3F]'}`}>
                            {sabor}
                          </span>
                          {qty > 0 && (
                            <span className="text-[10px] font-extrabold text-[#5AC4E6] mt-0.5">
                              {qty} {qty === 1 ? 'unidade' : 'unidades'}
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => onFlavorQtyChange(sabor, 1)}
                          className="w-9 h-9 flex items-center justify-center font-bold bg-[#D9828F] text-white rounded-full hover:bg-[#c46f7b] text-base transition-all"
                        >
                          +
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4 mt-6">
                <span className="text-xs font-black uppercase tracking-wider">Quantidade:</span>
                <div className="flex items-center border border-pink-100 rounded-full bg-[#FFF5F6]">
                  <button
                    type="button"
                    onClick={() => onGeneralQuantityChange(Math.max(1, generalQuantity - 1))}
                    className="px-4 py-2 font-bold text-[#D9828F] hover:bg-pink-100 rounded-l-full"
                  >
                    -
                  </button>
                  <span className="px-4 font-bold text-sm text-[#5C3A3F]">{generalQuantity}</span>
                  <button
                    type="button"
                    onClick={() => onGeneralQuantityChange(generalQuantity + 1)}
                    className="px-4 py-2 font-bold text-[#D9828F] hover:bg-pink-100 rounded-r-full"
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 border-t border-pink-50 pt-6">
            {!product.sobConsulta && (
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-semibold">Subtotal estimado:</span>
                <div className="text-right">
                  {product.id === 'brigadeiro-unitario' && totalBrigadeirosPagina >= 4 ? (
                    <>
                      <span className="text-xs text-gray-400 line-through block font-medium">
                        R$ {(totalBrigadeirosPagina * 5).toFixed(2)}
                      </span>
                      <span className="text-2xl font-black text-[#D9828F]">
                        R$ {calcularPrecoBrigadeiro(totalBrigadeirosPagina).toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-black text-[#D9828F]">
                      R$ {(
                        product.id === 'brigadeiro-unitario'
                          ? calcularPrecoBrigadeiro(totalBrigadeirosPagina)
                          : product.preco * generalQuantity
                      ).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={onAddToCart}
              className="w-full bg-[#D9828F] hover:bg-[#c46f7b] text-white py-4 rounded-full font-bold shadow-md transition duration-200 text-center"
            >
              Adicionar à sacola
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
