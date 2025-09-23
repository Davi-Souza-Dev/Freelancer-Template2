import { defineStore } from 'pinia'

interface Produto {
  id: number,
  idCategoria: number,
  title: string,
  price: number,
  image: string
}

const useCarrinhoStore = defineStore('carrinho', {
  state: () => ({
    produtos: [] as Produto[],
  }),

  getters: {
    getProdutos: (state) => state.produtos,
    getTotal: (state) =>{
        let total = 0; 
        state.produtos.map((produto)=>{
          total += produto.price;
        })
        return total;
    }
  },
  actions: {
    setProduto(id: number,idCategoria:number, title: string, price: number, image: string) {
      const produtoExistente = this.produtos.find((p) => p.id === id)
      if (produtoExistente == undefined) {
        const produto: Produto = {
          id,
          idCategoria,
          title,
          price,
          image,
        }
        this.produtos.push(produto)
      }
    },
    removerProduto(id: number) {
      this.produtos = this.produtos.filter((p) => p.id !== id)
    },
  },
  persist: {
    storage: sessionStorage,
  },
})

export default useCarrinhoStore
