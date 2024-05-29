<template>
  <section class="flex flex-col items-center gap-6">
    <img src="/bruno.svg" class="w-64 h-64 rounded-full" />
    <h1 class="text-center font-bold text-2xl">GritBot</h1>
    <form @submit.prevent="handleSubmit">
      <fieldset :disabled="isSubmitted" class="flex flex-col gap-2 w-full">
        <input
          v-model.trim="customerName"
          type="text"
          placeholder="Ditt namn"
          class="w-full transition p-2 text-sm border border-slate-300/60 shadow-sm placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 pr-16 rounded-xl"
        />
        <small class="text-slate-500 italic">
          Skirv in ditt namn så GritBoten vet vem han pratar med!
        </small>
        <button
          :disabled="hasNameError"
          type="submit"
          class="transition w-full bg-blue-950 text-slate-300 font-medium py-2 px-3 rounded hover:bg-opacity-90"
        >
          Starta ny chatt
        </button>
        <button
          v-if="thread && run"
          @click="isChatting = true"
          type="button"
          class="transition w-full bg-slate-200 text-slate-600 font-medium py-2 px-3 rounded hover:bg-opacity-90"
        >
          Fotsätt tidigare chatt
        </button>
      </fieldset>
    </form>
  </section>
</template>

<script setup lang="ts">
const isChatting = useIsChatting();
const { customerName, hasNameError } = useCustomer();

const thread = useCookie("thread-id");
const run = useCookie("run-id");

const isSubmitted = ref(false);
const handleSubmit = async () => {
  isSubmitted.value = true;

  const response = await $fetch("/api/thread", {
    query: {
      customer: customerName.value,
    },
  });

  thread.value = response.thread;
  run.value = response.run;

  isChatting.value = true;
};
</script>
