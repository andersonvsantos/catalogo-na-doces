import React from 'react';

export default function CartDrawer({
  isOpen,
  cart,
  userName,
  userAddress,
  onClose,
  onUpdateItemQuantity,
  onRemoveItem,
  onUserNameChange,
  onUserAddressChange,
  onCheckout,
  calcularTotalCarrinho,
  cartTotalItems,
  getItemPriceLabel
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-pink-100 flex justify-between items-center bg-[#FFF5F6]">
            <h3 className="text-lg font-black text-[#D9828F] tracking-wide flex items-center gap-2">
              🛒 Sua Sacola de Encomendas
            </h3>
            <button type="button" onClick={onClose} className="text-[#5C3A3F] font-bold text-xl hover:text-black">
              ✕
            </button>
          </div>

          {/* Lista de Itens */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <p className="text-3xl mb-4">🌸</p>
                <p className="font-semibold text-sm">Sua sacola está vazia.</p>
                <p className="text-xs mt-1">Selecione as quantidades dos sabores desejados!</p>
              </div>
            ) : (
              cart.map((item) => {
                const imgItem = item.produto.imagens && item.produto.imagens.length > 0 ? item.produto.imagens[0] : 'festa.jpg';
                return (
                  <div key={item.idUnico} className="flex gap-4 p-4 bg-[#FFFDFD] rounded-2xl border border-pink-50">
                    <div className="w-16 h-16 bg-[#FFF5F6] rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={`/images/${imgItem}`}
                        alt={item.produto.nome}
                        className="w-full h-full object-cover"
                        onError={(event) => {
                          event.target.src = 'https://placehold.co/200x200/FFF5F6/D9828F?text=Doce';
                        }}
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-sm leading-tight text-[#5C3A3F]">{item.produto.nome}</h4>
                        {item.sabor && <p className="text-[11px] text-[#5AC4E6] font-bold mt-1">Sabor: {item.sabor}</p>}
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        {/* Seletor de Quantidade */}
                        <div className="flex items-center border border-pink-100 rounded-full bg-[#FFF5F6] scale-90 origin-left">
                          <button
                            type="button"
                            onClick={() => onUpdateItemQuantity(item.idUnico, item.quantidade - 1)}
                            className="px-2 py-1 font-bold text-[#D9828F]"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-bold">{item.quantidade}</span>
                          <button
                            type="button"
                            onClick={() => onUpdateItemQuantity(item.idUnico, item.quantidade + 1)}
                            className="px-2 py-1 font-bold text-[#D9828F]"
                          >
                            +
                          </button>
                        </div>

                        {/* Preço e Botão Remover */}
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <span className="font-black text-xs text-[#D9828F]">
                              {getItemPriceLabel(item, cartTotalItems)}
                            </span>
                          </div>
                          <button 
                            type="button" 
                            onClick={() => onRemoveItem(item.idUnico)} 
                            className="text-red-400 hover:text-red-600 text-xs font-bold"
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer com Inputs e Botão do WhatsApp */}
          {cart.length > 0 && (
            <div className="border-t border-pink-100 p-6 bg-[#FFF5F6] space-y-4">
              <div className="flex justify-between text-base font-black border-b border-pink-100/50 pb-3">
                <span>Total Estimado:</span>
                <span className="text-[#D9828F] text-lg">R$ {calcularTotalCarrinho().toFixed(2)}</span>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Digite seu Nome..."
                  value={userName}
                  onChange={(event) => onUserNameChange(event.target.value)}
                  className="w-full bg-white border border-pink-100 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-[#D9828F]"
                />
                <input
                  type="text"
                  placeholder="Endereço de entrega ou Retirar no Local?"
                  value={userAddress}
                  onChange={(event) => onUserAddressChange(event.target.value)}
                  className="w-full bg-white border border-pink-100 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-[#D9828F]"
                />
              </div>

                <button
                type="button"
                onClick={onCheckout}
                className="w-full bg-[#25D366] hover:bg-[#1ebd59] text-white py-3.5 rounded-full font-extrabold text-sm shadow transition duration-200 flex items-center justify-center gap-2"
                >
                {/* SVG Simplificado e Altamente Compatível do WhatsApp */}
                <svg
                    className="w-5 h-5 flex-shrink-0"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    fill="#FFFFFF"
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                    />
                </svg>
                <span>Fazer Encomenda</span>
                </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}