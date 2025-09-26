<script setup lang="ts">
import Header from '@/components/ComponentHeader.vue';
import Category from '@/components/ComponentCategory.vue';
import Product from '@/components/ComponentCardProduct.vue';
import Social from '@/components/ComponentSocial.vue';
import { onMounted, ref } from 'vue';
import axios from 'axios';
import useCarrinhoStore from '@/stores/carrinhoStore';
import Notification from '@/components/ComponentNotification.vue';
const carrinhoStore = useCarrinhoStore();
const showNotification = ref(false);
const noticationMsg = ref('');
interface Categoria {
  id: number
  nome: string
  produtos: Produto[];
}

interface Produto {
  id: number
  idCategoria: number
  nome: string
  preco: number
  imagem: string
}

const categorias = ref<Categoria[]>([]);
const produtos = ref<Produto[]>([]);
// PEGANDO OS DADOS
onMounted(async () => {
  try {
    const response = await axios.get('/db.json')
    categorias.value = response.data.categorias;
    produtos.value = categorias.value[0].produtos ?? [];
  } catch (error) {
    console.error(error)
  }
});

// SELECIONAR OS PRODUTOS DE UMA CATEGORIA
const selectCat = (idCat: number
) => {
  const categoria = categorias.value.find((cat) => cat.id == idCat)
  produtos.value = categoria?.produtos ?? [];
}

// VERIFICAR SE ALGUM PRODUTO JÁ FOI SELECIONADO
const produtoChecked = (idProduto:number) => {
  return carrinhoStore.getProdutos.some((produto) => produto.id === idProduto);
}

// FUNÇÔES PARA A NOTIFICAÇÃO
const notificaton = (msg:string)=>{
  showNotification.value = true;
  noticationMsg.value = msg;
  setTimeout(()=>{
    showNotification.value = false;
  },2000);
}
</script>

<template>
  <div class="containerIndex">
    <Header />
    <Notification :msg="noticationMsg" v-show="showNotification"/>
    <section class="containerCategories">
      <h1 class="title">
        Inicio
      </h1>
      <div class="categories">
        <Category v-for="categoria in categorias" :key="categoria.id" :id="categoria.id" :nome="categoria.nome"
          :fundo="categoria.id % 2 === 0 ? 'b1' : 'b2'" @select-cat="selectCat(categoria.id)" />
      </div>
    </section>
    <section>
      <div class="containerProducts">
        <h1>Produtos</h1>
        <Product v-for="produto in produtos" :key="produto.id" :id="produto.id" :price="produto.preco"
          :id-categoria="produto.idCategoria"
          :title="produto.nome" :image="produto.imagem" :fundo="Math.floor(produto.id / 2) % 2 === 0 ? 'b1' : 'b2'"  :checked="produtoChecked(produto.id)" @produto-status="notificaton"/>
      </div>
    </section>
    <Social />
  </div>
</template>


<style scoped>
.containerIndex {
  width: 100%;
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.title {
  font-family: var(--font);
  font-weight: 900;
}

section {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 20px;
}

.containerCategories {
  gap: 5px;
}

.categories {
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 10px;
  overflow-x: auto;
  padding: 5px;

}

.containerCategories::-webkit-scrollbar {
  display: none;
  height: 0px;
}

.containerProducts {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
}

.containerProducts h1 {
  width: 100%;
  font-family: var(--font);
  font-weight: 900;
  font-size: 1rem;
}
</style>
