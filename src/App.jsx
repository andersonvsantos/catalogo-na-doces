import { useEffect, useState } from 'react';
import './App.css'; // <--- Garanta que seu arquivo CSS está sendo importado aqui!

import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import CartDrawer from './components/CartDrawer';
import { produtos } from './data/produtos';
import { calcularPrecoBrigadeiro, calcularTotalCarrinho, recalcularPrecosCarrinho } from './utils/cart';

const categorias = ['Todos', 'Brigadeiros', 'Tortinhas', 'Especiais', 'Festa'];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [selectedFlavorsQty, setSelectedFlavorsQty] = useState({});
  const [generalQuantity, setGeneralQuantity] = useState(1);

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('na_doces_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [userAddress, setUserAddress] = useState('');

  useEffect(() => {
    localStorage.setItem('na_doces_cart', JSON.stringify(cart));
  }, [cart]);

  const handleOpenProduct = (produto) => {
    setSelectedProduct(produto);
    setSelectedFlavorsQty({});
    setGeneralQuantity(1);
    setActivePhotoIndex(0);
    setCurrentPage('produto');
  };

  const nextPhoto = (totalPhotos) => {
    setActivePhotoIndex((prev) => (prev + 1) % totalPhotos);
  };

  const prevPhoto = (totalPhotos) => {
    setActivePhotoIndex((prev) => (prev - 1 + totalPhotos) % totalPhotos);
  };

  const handleSaborQtyChange = (sabor, change) => {
    const currentQty = selectedFlavorsQty[sabor] || 0;
    const nextQty = currentQty + change;

    if (nextQty <= 0) {
      const updated = { ...selectedFlavorsQty };
      delete updated[sabor];
      setSelectedFlavorsQty(updated);
    } else {
      setSelectedFlavorsQty({
        ...selectedFlavorsQty,
        [sabor]: nextQty
      });
    }
  };

  const handleAddToCart = () => {
    let novosItensCarrinho = [...cart];

    if (selectedProduct.temSabores) {
      const saboresSelecionados = Object.keys(selectedFlavorsQty);
      if (saboresSelecionados.length === 0) {
        alert('Por favor, adicione a quantidade de pelo menos um sabor!');
        return;
      }

      saboresSelecionados.forEach((sabor) => {
        const qtdSabor = selectedFlavorsQty[sabor];
        const itemExistenteIndex = novosItensCarrinho.findIndex(
          (item) => item.produto.id === selectedProduct.id && item.sabor === sabor
        );

        if (itemExistenteIndex > -1) {
          novosItensCarrinho[itemExistenteIndex].quantidade += qtdSabor;
        } else {
          novosItensCarrinho.push({
            idUnico: Date.now() + Math.random(),
            produto: selectedProduct,
            quantidade: qtdSabor,
            sabor,
            total: 0
          });
        }
      });
    } else {
      const itemExistenteIndex = novosItensCarrinho.findIndex((item) => item.produto.id === selectedProduct.id);

      if (itemExistenteIndex > -1) {
        novosItensCarrinho[itemExistenteIndex].quantidade += generalQuantity;
      } else {
        novosItensCarrinho.push({
          idUnico: Date.now(),
          produto: selectedProduct,
          quantidade: generalQuantity,
          sabor: '',
          total: 0
        });
      }
    }

    setCart(recalcularPrecosCarrinho(novosItensCarrinho));
    setCurrentPage('home');
    setIsCartOpen(true);
  };

  const updateCartItemQuantity = (idUnico, novaQtd) => {
    if (novaQtd < 1) return;

    const novoCarrinho = cart.map((item) => {
      if (item.idUnico === idUnico) {
        return { ...item, quantidade: novaQtd };
      }
      return item;
    });

    setCart(recalcularPrecosCarrinho(novoCarrinho));
  };

  const removerItem = (idUnico) => {
    const novoCarrinho = cart.filter((item) => item.idUnico !== idUnico);
    setCart(recalcularPrecosCarrinho(novoCarrinho));
  };

  const totalBrigadeirosPagina = Object.values(selectedFlavorsQty).reduce((a, b) => a + b, 0);
  const totalBrigadeirosNoCarrinho = cart.filter((item) => item.produto.id === 'brigadeiro-unitario').reduce(
    (sum, item) => sum + item.quantidade,
    0
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantidade, 0);

  const handleCheckout = () => {
    if (!userName.trim()) {
      alert('Por favor, informe seu nome para podermos te atender!');
      return;
    }

    let mensagem = '*Novo Pedido - N&A Doces* 🌸\n\n';
    mensagem += `*Cliente:* ${userName}\n`;
    mensagem += `*Entrega:* ${userAddress || 'Retirada no local'}\n\n`;
    mensagem += '*Itens do Pedido:*\n';

    cart.forEach((item) => {
      const detalhe = item.sabor ? `(${item.sabor})` : '';
      const precoExibido = item.produto.sobConsulta ? 'Sob Consulta' : `R$ ${item.total.toFixed(2)}`;
      mensagem += `- ${item.quantidade}x ${item.produto.nome} ${detalhe} — *${precoExibido}*\n`;
    });

    const totalFinal = calcularTotalCarrinho(cart);
    if (totalFinal > 0) {
      mensagem += `\n*Total Estimado:* R$ ${totalFinal.toFixed(2)}`;
    } else {
      mensagem += '\n*Orçamento final a combinar!*';
    }

    const numeroWhats = '5511986346279';
    const url = `https://wa.me/${numeroWhats}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  };

  const filteredProducts = produtos.filter((prod) => {
    const matchesCategory = selectedCategory === 'Todos' || prod.categoria === selectedCategory;
    const matchesSearch =
      prod.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.descricao.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleHomeClick = () => {
    setCurrentPage('home');
    setSelectedCategory('Todos');
  };

  const getItemPriceLabel = (item) => {
    if (item.produto.id === 'brigadeiro-unitario' && totalBrigadeirosNoCarrinho >= 4) {
      return (
        <>
          <span className="text-[10px] text-gray-400 line-through block">R$ {(item.quantidade * 5).toFixed(2)}</span>
          <span className="font-black text-xs text-[#D9828F]">R$ {item.total.toFixed(2)}</span>
        </>
      );
    }

    return <span className="font-black text-xs text-[#D9828F]">{item.produto.sobConsulta ? 'Sob Consulta' : `R$ ${item.total.toFixed(2)}`}</span>;
  };

  return (
    <div className="min-h-screen bg-[#FFFDFD] text-[#5C3A3F] flex flex-col font-sans antialiased pb-24">
      <Header onHomeClick={handleHomeClick} onOpenCart={() => setIsCartOpen(true)} cartCount={cartCount} />

      <main className="flex-grow max-w-6xl w-full mx-auto px-6 py-8">
        {currentPage === 'home' && (
          <div>
            <div className="text-center max-w-xl mx-auto mb-10">
              <h2 className="text-3xl font-extrabold text-[#D9828F] tracking-tight mb-2">Catálogo de Produtos</h2>
              <p className="text-sm text-gray-500 italic mb-6">Feitos com amor para adoçar seu dia ♥</p>

              <div className="relative">
                <input
                  type="text"
                  placeholder="O que você procura hoje?"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="w-full bg-[#FFF5F6] border border-pink-100 rounded-full px-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D9828F]/40 transition text-center text-[#5C3A3F] placeholder-[#5C3A3F]/50"
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categorias.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-bold tracking-wide uppercase transition ${
                    selectedCategory === cat ? 'bg-[#D9828F] text-white shadow-sm' : 'bg-[#FFF5F6] text-[#5C3A3F] hover:bg-pink-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {filteredProducts.length === 0 ? (
              <p className="text-center text-gray-400 py-12">Nenhum docinho encontrado na busca 🌸</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {filteredProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} onOpenProduct={handleOpenProduct} />
                ))}
              </div>
            )}
          </div>
        )}

        {currentPage === 'produto' && selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            activePhotoIndex={activePhotoIndex}
            selectedFlavorsQty={selectedFlavorsQty}
            generalQuantity={generalQuantity}
            onBack={() => setCurrentPage('home')}
            onPrevPhoto={prevPhoto}
            onNextPhoto={nextPhoto}
            onSelectPhoto={setActivePhotoIndex}
            onFlavorQtyChange={handleSaborQtyChange}
            onGeneralQuantityChange={setGeneralQuantity}
            onAddToCart={handleAddToCart}
            totalBrigadeirosPagina={totalBrigadeirosPagina}
            calcularPrecoBrigadeiro={calcularPrecoBrigadeiro}
          />
        )}
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        cart={cart}
        userName={userName}
        userAddress={userAddress}
        onClose={() => setIsCartOpen(false)}
        onUpdateItemQuantity={updateCartItemQuantity}
        onRemoveItem={removerItem}
        onUserNameChange={setUserName}
        onUserAddressChange={setUserAddress}
        onCheckout={handleCheckout}
        calcularTotalCarrinho={() => calcularTotalCarrinho(cart)}
        cartTotalItems={totalBrigadeirosNoCarrinho}
        getItemPriceLabel={getItemPriceLabel}
      />

      {/* Barra Flutuante de Subtotal Fixo com Descontos Reais */}
      {cartCount > 0 && !isCartOpen && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md bg-white border border-pink-100 shadow-2xl rounded-2xl px-5 py-4 z-40 flex items-center justify-between backdrop-blur-md bg-white/95 transition-all duration-300">
          <div className="flex flex-col">
            <span className="text-[10px] text-[#5C3A3F]/60 uppercase tracking-widest font-black">Subtotal</span>
            <span className="text-lg font-black text-[#D9828F]">
              R$ {calcularTotalCarrinho(cart).toFixed(2)}
            </span>
            <span className="text-[10px] text-gray-400">
              {cartCount} {cartCount === 1 ? 'item' : 'itens'} adicionados
            </span>
          </div>
          
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="bg-[#D9828F] hover:bg-[#D9828F]/90 text-white font-black text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all duration-200 flex items-center gap-2 active:scale-95 shadow-md shadow-pink-100"
          >
            Ver Sacola
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
            </svg>
          </button>
        </div>
      )}

      {/* Footer Estilizado com Identidade Visual & Ícones SVG Oficiais */}
      <footer className="w-full bg-[#FFF5F6]/40 border-t border-pink-100/50 py-10 px-6 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo / Direitos */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
            <span className="font-extrabold text-[#D9828F] tracking-widest text-sm uppercase">N&A Doces</span>
            <p className="text-[11px] text-[#5C3A3F]/70">© 2026 Todos os direitos reservados.</p>
            <p className="text-[10px] font-semibold text-[#D9828F]/90">Campo Limpo Paulista ♥</p>
          </div>

          {/* Redes Sociais com SVGs Customizados */}
          <div className="flex items-center gap-6">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/nadoces.oficial"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-black text-[#5C3A3F] hover:text-[#D9828F] transition-colors duration-200 group"
              aria-label="Acessar Instagram da N&A Doces"
            >
              <div className="w-8 h-8 rounded-full bg-pink-100/50 flex items-center justify-center group-hover:bg-[#D9828F]/20 transition-colors">
                <svg
                  className="w-4 h-4 text-[#D9828F]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
              <span className="tracking-wide">@nadoces.oficial</span>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/5511986346279"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-black text-[#5C3A3F] hover:text-[#25D366] transition-colors duration-200 group"
              aria-label="Chamar no WhatsApp da N&A Doces"
            >
              <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-[#25D366]/10 transition-colors">
                <svg
                  className="w-4 h-4 text-[#25D366]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <span className="tracking-wide">(11) 98634-6279</span>
            </a>
          </div>

        </div>
      </footer>
    </div>
  );
}