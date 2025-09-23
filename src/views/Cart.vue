<script lang="ts" setup>
import Header from '@/components/ComponentHeader.vue';
import Button from '@/components/ComponentButtonFinal.vue';
import ButtonBack from '@/components/ComponentButtonBack.vue';
import Product from '@/components/Cart/ComponentCartProduct.vue';
import { onBeforeMount, ref } from 'vue';
import useCarrinhoStore from '@/stores/carrinhoStore';
import Popup from '@/components/Cart/ComponentPopUp.vue';
import Notification from '@/components/ComponentNotification.vue';
const showNotification = ref(false);
const noticationMsg = ref('');

const showPopUp = ref(false);
const carrinhoStore = useCarrinhoStore();
interface Produto {
    id: number;
    idCategoria: number;
    title: string;
    price: number;
    image: string;
}

const produtos = ref<Produto[]>([]);

// PEGANDO OS DADOS
onBeforeMount(() => {
    console.log(carrinhoStore.getProdutos)
    produtos.value = [...carrinhoStore.getProdutos];
});

const removerProduto = (idProduto: number, msg: string) => {
    carrinhoStore.removerProduto(idProduto);
    console.log("Produto removido")
    produtos.value = produtos.value.filter((produto) => produto.id != idProduto)
    showNotification.value = true;
    noticationMsg.value = msg;
    setTimeout(() => {
        showNotification.value = false;
    }, 2000);
}
</script>


<template>
    <div class="container">
        <Header />
        <Notification :msg="noticationMsg" v-show="showNotification" />

        <h1 class="title">
            Carrinho
        </h1>
        <section>
            <div class="containerProducts" v-if="produtos.length > 0">
                <Product v-for="produto in produtos" :key="produto.id" :id="produto.id" :image="produto.image"
                    :title="produto.title" :price="produto.price" :fundo="produto.id % 2 === 1 ? 'b1' : 'b2'"
                    @remover-produto="removerProduto" />
            </div>
            <div class="containerProducts" v-else>
                <h1 class="alert">Sem produtos ecolhidos</h1>
            </div>

            <div class="containerButtons">
                <div class="containerTotal" v-if="produtos.length > 0">
                    <span class="tag">Total</span>
                    <span class="price">{{ new Intl.NumberFormat('pt-BR', {
                        style: 'currency', currency: 'BRL'
                    }).format(carrinhoStore.getTotal) }}</span>
                </div>
                <Button v-if="produtos.length > 0" @click="showPopUp = true" />
                <ButtonBack />
            </div>
        </section>

    </div>
    <Popup v-show="showPopUp" />
</template>

<style scoped>
.container {
    width: 100%;
    height: 100%;
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
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 20px;
    padding-bottom: 20px;
    position: relative;
}

.containerProducts {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
}

.containerProducts h1 {
    width: 100%;
    font-family: var(--font);
    font-weight: 900;
    font-size: 1rem;
}

.containerTotal {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-end;
    align-items: center;
    border-radius: 5px;
    padding: 5px;
    gap: 10px;
}

.tag {
    padding: 5px;
    font-weight: var(--font);
    font-size: 1rem;
    text-transform: uppercase;
    background: var(--color1-2);
    border-radius: 5px;
    outline: 2px solid var(--color1);
    color: var(--color1);
    font-weight: bolder;
}

.price {
    font-size: 1rem;
    font-weight: bolder;
    text-transform: uppercase;
}

.containerButtons {
    width: 100%;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    flex-direction: column;
}
</style>
