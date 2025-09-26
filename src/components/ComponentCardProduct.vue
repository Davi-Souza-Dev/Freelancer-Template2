<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import useCarrinhoStore from '@/stores/carrinhoStore';
const carrinhoStore = useCarrinhoStore();
const emit = defineEmits(['produtoStatus']);
// CONFIGURAÇÔES DE PROPS
interface Props {
    id: number,
    idCategoria: number,
    title: string,
    price: number,
    image: string,
    fundo: string,
    checked: boolean,
}

const props = defineProps<Props>();


// CONFIGURAÇÔES DE CLIQUE E SELECIONAR O PRODUTO
const inputSelect = ref<HTMLInputElement | null>(null);
const select = ref(props.checked);

// VERIFICAR se O PRODUTO FOI SELECIONADO OU NÂO
const selectProduct = () => {
    console.log('Click Card', select.value);
    if (select.value == false) {
        // SE ELE NÃO TIVER SIDO SELECIONADO
        if (inputSelect.value) {
            carrinhoStore.setProduto(props.id, props.idCategoria, props.title, props.price, props.image);
            select.value = !select.value;
            inputSelect.value.checked = true;
            emit('produtoStatus', 'Produto adicionado ao carrinho');
        }
    } else {
        if (inputSelect.value) {
            carrinhoStore.removerProduto(props.id);
            select.value = false;
            inputSelect.value.checked = false
            emit('produtoStatus', 'Produto removido do carrinho');
        }
    }
}

const btnStatus = () => {
    console.log("Click btn", select.value)
    if (select.value == false) {
        if (inputSelect.value) {
            carrinhoStore.setProduto(props.id, props.idCategoria, props.title, props.price, props.image);
            select.value = !select.value;
            inputSelect.value.checked = true;
            emit('produtoStatus', 'Produto adicionado ao carrinho');
        }
    } else {
        if (inputSelect.value) {
            carrinhoStore.removerProduto(props.id);
            select.value = false;
            inputSelect.value.checked = false
            emit('produtoStatus', 'Produto removido do carrinho');
        }
    }
}
</script>

<template>
    <label :for="'cardProduct' + props.id" :class="props.fundo">
        <input type="checkbox" :id="'cardProduct' + props.id" :name="'cardProduct' + props.id" @input="selectProduct"
            ref="inputSelect" :checked="select">
        <div class="containerProduct">
            <img :src="props.image" alt="">
            <div class="containerInfo">
                <div class="containerTitle">
                    <span class="title">{{ props.title }}</span>
                    <span class="price"> {{ new Intl.NumberFormat('pt-BR', {
                        style: 'currency', currency: 'BRL'
                    }).format(props.price) }}
                    </span>
                </div>
                <div class="btnStatus">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="select == false">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <g id="Edit / Add_Plus">
                                <path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="#000000"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </g>
                        </g>
                    </svg>
                    <svg v-else viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <g id="Edit / Remove_Minus">
                                <path id="Vector" d="M6 12H18" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round"></path>
                            </g>
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    </label>
</template>

<style scoped>
label {
    width: fit-content;
    height: fit-content;
}

.b1 {
    --fundo: var(--color1-2);
    --contorno: var(--color1);
}

.b2 {
    --fundo: var(--color2-2);
    --contorno: var(--color2);
}

input {
    display: none;
}

input[type="checkbox"]:checked+.containerProduct {
    outline: 2px solid var(--contorno);
}


.b1 .containerProduct,
.b2 .containerProduct {
    width: 150px;
    max-width: 500px;
    min-height: 180px;
    height: auto;
    background: var(--fundo);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    padding: 5px;
    gap: 10px;
    position: relative;
}

.containerProduct img {
    width: 100%;
    height: 120px;
    max-height: 80%;
    border-radius: 5px;
    object-fit: cover;
}

.containerInfo {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    position: relative;
}

.containerTitle {
    width: 70%;
    display: flex;
    flex-direction: column;
    white-space: normal;
    overflow-wrap: break-word;
    word-break: break-word;
    position: relative;

}

.containerTitle .title {
    font-family: var(--font);
    font-weight: 900;
    font-size: 0.9rem;
    text-transform: capitalize;
    text-wrap: wrap;
}

.containerTitle .price {
    font-family: var(--font);
    font-weight: 600;
    font-size: 0.9rem;
    text-transform: capitalize;

}

.b1 .btnStatus,
.b2 .btnStatus {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: var(--contorno);
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;

}

.btnStatus svg {
    width: 80%;
}


.b1 .btnStatus svg path,
.b2 .btnStatus svg path {
    stroke: var(--fundo);
}
</style>