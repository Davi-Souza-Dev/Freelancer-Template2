<script setup lang="ts">
import useCarrinhoStore from '@/stores/carrinhoStore';
const carrinhoStore = useCarrinhoStore();
const emit = defineEmits(['removerProduto']);
interface Props {
    id: number;
    title: string;
    price: number;
    image: string;
    fundo: string,
}

const props = defineProps<Props>();

const removerProduto = () => {
    emit('removerProduto', props.id ,'Produto removido do carrinho');

}
</script>

<template>
    <div class="containerCard" :class="fundo">
        <img src="" alt="">
        <div class="containerInfo">
            <h1 class="title">{{ props.title }}</h1>
            <p class="price">
                {{ new Intl.NumberFormat('pt-BR', {
                    style: 'currency', currency: 'BRL'
                }).format(props.price) }}
            </p>
            <button class="btnDelete" @click="removerProduto">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path d="M10 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round"></path>
                        <path d="M14 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round"></path>
                        <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round"></path>
                        <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#000000"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </g>
                </svg>
            </button>
        </div>
    </div>
</template>

<style scoped>
.b1 {
    --fundo: var(--color1-2);
    --contorno: var(--color1);
}

.b2 {
    --fundo: var(--color2-2);
    --contorno: var(--color2);
}

.containerCard {
    width: 100%;
    max-width: 500px;
    height: 100px;
    border-radius: 10px;
    padding: 5px;
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 10px;
    flex-wrap: nowrap;
    background: var(--fundo);
    outline: 2px solid var(--contorno);
}

.containerCard img {
    aspect-ratio: 1 / 1;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
}

.containerInfo {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    font-family: var(--font);
    position: relative;
}

.containerInfo .title {
    font-size: 1.2rem;
    font-weight: 900;
    white-space: normal;
    overflow-wrap: break-word;
    word-break: break-word;
}

.containerInfo .price {
    font-size: 1rem;
    font-weight: 700;
}

.containerInfo .btnDelete {
    width: 25px;
    height: 25px;
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    right: 0;
}

.btnDelete svg path {
    stroke: var(--contorno);
}
</style>