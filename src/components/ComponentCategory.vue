<script lang="ts" setup>

interface Props {
    id: number,
    nome: string,
    fundo: string,
}

const props = defineProps<Props>();
const emit = defineEmits(['selectCat'])
const selectCat = () => {
    emit('selectCat', props.id);
}
</script>


<template>
    <label :class="props.fundo" :for="'cat' + props.id" @input="selectCat">
        <input type="radio" name="rdCat" :id="'cat' + props.id" :checked="props.id == 1">
        <div class="containerCategory">
            <span>{{ props.nome }}</span>
        </div>
    </label>
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


.b1 .containerCategory,
.b2 .containerCategory {
    width: fit-content;
    height: fit-content;
    padding: 5px;
    border-radius: 15px;
    background: var(--fundo);
}

.b1 .containerCategory span,
.b2 .containerCategory span {
    font-family: var(--font);
    font-weight: 900;
    font-size: 0.8rem;
    text-transform: uppercase;
    color: var(--contorno);
}

.b1 label,
.b2 label {
    width: fit-content;
    height: fit-content;
}

input {
    display: none;
}

.b2 input[type="radio"]:checked+.containerCategory,
.b1 input[type="radio"]:checked+.containerCategory {
    outline: 2px solid var(--contorno);
}
</style>