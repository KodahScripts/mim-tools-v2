<template>
    <Accordion value="0">
        <AccordionPanel v-for="deposit in deposits" :key="title" :value="title">
            <AccordionHeader>{{ deposit.check_number }}</AccordionHeader>
            <AccordionContent>
                <p class="m-0">{{ deposit.control }}</p>
            </AccordionContent>
        </AccordionPanel>


        <!-- <template #display>{{ title }}</template>
        <template #content>
            <div v-for="deposit in deposits" :key="deposit.uid">
                {{ deposit.check_number }}
            </div>
        </template> -->
    </Accordion>
</template>
<script setup lang="ts">
import { type UTADepositRow } from '@/utils';

defineProps<{
    title: string,
    deposits: UTADepositRow[]
}>()
</script>