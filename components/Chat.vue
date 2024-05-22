import type { MessageForm } from '#build/components';
<template>
  <section class="flex flex-col min-w-[520px] w-full">
    <!-- Customer Support Agent -->
    <div class="flex items-center gap-3.5 pb-4 border-b border-dashed">
      <div>
        <div
          class="w-12 h-12 overflow-hidden rounded-full image-fit border-2 border-slate-200/70"
        >
          <img src="/bruno.svg" />
        </div>
      </div>
      <div>
        <div class="font-medium truncate max-w-[9rem] md:max-w-none">
          GritBot
        </div>
        <div class="text-slate-500 mt-0.5 truncate max-w-[9rem] md:max-w-none">
          Studieassistent och rådgivare
        </div>
      </div>
    </div>

    <!-- Messages -->
    <div class="text-center text-2xl py-12" v-if="pending">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-12 h-12 mx-auto animate-spin"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
        />
      </svg>
    </div>
    <div
      ref="container"
      class="flex flex-col gap-3.5 py-5 px-3 overflow-y-scroll max-h-[400px]"
      v-else
    >
      <!-- To flip message use "flex-row-reverse" -->
      <div
        v-for="message in messages"
        class="flex items-end gap-3"
        :class="{ 'flex-row-reverse': !message.isBruno }"
      >
        <!-- Profile Image -->
        <img
          v-if="message.isBruno"
          class="block w-12 h-12 overflow-hidden rounded-full border-2 border-slate-200/70"
          src="/bruno.svg"
        />
        <!-- Text Image -->
        <div
          v-else
          class="flex uppercase items-center justify-center text-xl text-center text-white font-bold bg-gradient-to-t from-sky-500 to-emerald-500 w-12 h-12 overflow-hidden rounded-full border-2 border-slate-200/70"
        >
          {{ customerInitials }}
        </div>
        <!-- Main Content -->
        <div
          class="w-3/5 flex flex-col gap-2 border px-4 pt-3 pb-4 rounded-xl bg-slate-50/80 border-slate-200/80"
        >
          <!-- Message Content -->
          <div v-if="message.isBruno" v-html="message.message"></div>
          <div v-else>
            {{ message.message }}
          </div>
          <!-- Time -->
          <div class="text-xs text-slate-500/70">{{ message.timestamp }}</div>
        </div>
      </div>
    </div>
    <MessageForm v-if="!pending" />
  </section>
</template>

<script setup lang="ts">
import { type Message } from "openai/resources/beta/threads/messages.mjs";

const messages = useMessages();
const { customerInitials } = useCustomer();
const container = ref();

onUpdated(() => {
  container.value.scrollTop = container.value.scrollHeight;
});

const { pending } = await useFetch("/api/message", {
  lazy: true,
  onResponse({ response }) {
    response._data.data.reverse().forEach((element: Message) => {
      const content = element.content[0];

      if (content?.type == "text") {
        messages.value.push({
          name: element.role === "assistant" ? "Bruno" : customerInitials.value,
          message: content.text.value,
          isBruno: element.role === "assistant" ? true : false, 
          timestamp: new Date().toLocaleString([], {
            timeStyle: "short",
          }),
        });
      }
    });
  },
});
</script>
