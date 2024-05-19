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
        <div class="font-medium truncate max-w-[9rem] md:max-w-none">Bruno</div>
        <div class="text-slate-500 mt-0.5 truncate max-w-[9rem] md:max-w-none">
          Customer Support Agent
        </div>
      </div>
    </div>

    <!-- Messages -->
    <div
      class="flex flex-col gap-3.5 py-5 px-3 overflow-y-scroll max-h-[400px]"
    >
      <!-- To flip message use "flex-row-reverse" -->
      <div v-for="message in messages" class="flex items-end gap-3" :class="{ 'flex-row-reverse': !message.isBruno }">
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
    <MessageForm />
  </section>
</template>

<script setup lang="ts">
const messages = useMessages();
const { customerInitials } = useCustomer();
</script>
