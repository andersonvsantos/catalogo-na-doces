export const SABORES_BRIGADEIRO = [
  'Brigadeiro Tradicional',
  'Brigadeiro de Prestígio',
  'Brigadeiro de Ninho com Nutella',
  'Brigadeiro de Paçoca',
  'Brigadeiro de Confete',
  'Brigadeiro de Chocoboll'
];

export const produtos = [
  {
    id: 'brigadeiro-unitario',
    nome: 'Brigadeiros Unitários (Caixinha)',
    categoria: 'Brigadeiros',
    descricao: 'Monte sua caixinha perfeita com brigadeiros gourmet de 20g.',
    preco: 5,
    regraPreco: 'R$ 5,00 cada ou Leve 4 por R$ 15,00!',
    imagens: ['caixinha.jpg', 'caixinha-2.jpg', 'caixinha-3.jpg'],
    temSabores: true,
    sabores: SABORES_BRIGADEIRO
  },
  {
    id: 'tortinhas-limao',
    nome: 'Tortinha de Limão',
    categoria: 'Tortinhas',
    descricao: 'Massa crocante com recheio cremoso e azedinho de limão.',
    preco: 15,
    imagens: ['tortinhas.jpg', 'tortinhas-limao-detalhe.jpg']
  },
  {
    id: 'tortinhas-maracuja',
    nome: 'Tortinha de Maracujá',
    categoria: 'Tortinhas',
    descricao: 'Massa crocante com um creme aveludado e calda de maracujá.',
    preco: 15,
    imagens: ['tortinhas.jpg']
  },
  {
    id: 'brownie-sem-recheio',
    nome: 'Brownie Tradicional (Sem Recheio)',
    categoria: 'Especiais',
    descricao: 'Brownie de chocolate nobre super molhadinho por dentro com casquinha crocante.',
    preco: 12,
    imagens: ['brownie.jpg', 'brownie-embalagem.jpg']
  },
  {
    id: 'brownie-recheado',
    nome: 'Brownie Recheado',
    categoria: 'Especiais',
    descricao: 'O nosso maravilhoso brownie com uma camada generosa de recheio cremoso.',
    preco: 12,
    imagens: ['brownie.jpg']
  },
  {
    id: 'copo-felicidade',
    nome: 'Copo da Felicidade',
    categoria: 'Especiais',
    descricao: 'Copos recheados com muito brigadeiro, cremes especiais e bombons.',
    preco: 0,
    sobConsulta: true,
    imagens: ['copo.jpg', 'copo-detalhe.jpg']
  },
  {
    id: 'bombom-uva',
    nome: 'Bombom de Uva',
    categoria: 'Especiais',
    descricao: 'Uvas frescas e selecionadas cobertas com creme de leite condensado e chocolate.',
    preco: 0,
    sobConsulta: true,
    imagens: ['bombom.jpg']
  },
  {
    id: 'bombom-morango',
    nome: 'Bombom de Morango',
    categoria: 'Especiais',
    descricao: 'Morangos frescos e docinhos envoltos em brigadeiro branco e casquinha de chocolate.',
    preco: 0,
    sobConsulta: true,
    imagens: ['bombom.jpg']
  },
  {
    id: 'brigadeiro-festa',
    nome: 'Brigadeiros para Festa (15g)',
    categoria: 'Festa',
    descricao: 'Perfeitos para aniversários e eventos corporativos. Sabores tradicionais e gourmet.',
    preco: 0,
    sobConsulta: true,
    imagens: ['festa.jpg'],
    temSabores: true,
    sabores: SABORES_BRIGADEIRO
  }
];
