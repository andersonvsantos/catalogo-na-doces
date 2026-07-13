export const calcularPrecoBrigadeiro = (qtd) => {
  const gruposDeQuatro = Math.floor(qtd / 4);
  const avulsos = qtd % 4;
  return gruposDeQuatro * 15 + avulsos * 5;
};

export const recalcularPrecosCarrinho = (listaCarrinho) => {
  const totalBrigadeiros = listaCarrinho
    .filter((item) => item.produto.id === 'brigadeiro-unitario')
    .reduce((sum, item) => sum + item.quantidade, 0);

  const valorTotalBrigadeiros = calcularPrecoBrigadeiro(totalBrigadeiros);

  return listaCarrinho.map((item) => {
    if (item.produto.id === 'brigadeiro-unitario') {
      const proporcao = totalBrigadeiros > 0 ? item.quantidade / totalBrigadeiros : 0;
      return {
        ...item,
        total: valorTotalBrigadeiros * proporcao
      };
    }

    return {
      ...item,
      total: (item.produto.preco || 0) * item.quantidade
    };
  });
};

export const calcularTotalCarrinho = (cart) => {
  return cart.reduce((acc, curr) => acc + curr.total, 0);
};
