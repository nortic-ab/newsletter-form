<script setup lang="ts">
import { UnwrapRef, computed, onBeforeUnmount, ref } from 'vue';
import { useNewsletterSubscriptionForm } from '..';
import '@nortic/newsletter-form/dist/index.css'

const props = withDefaults(defineProps<{
  organizerId: number | string;
  newsletterId: number | string;
  options?: Omit<UnwrapRef<Parameters<typeof useNewsletterSubscriptionForm>[1]>, 'organizerId' | 'newsletterId'>;
}>(), {
  options: () => ({}),
});
const emit = defineEmits<{
  success: []
  error: [error: Error]
  destroyed: []
  reset: []
  updated: []
}>()

const formEl = ref<HTMLDivElement | null>(null);

function resolvedOnSuccess() {
  emit('success');
  props.options?.onSuccess?.();
}

function resolvedOnError(err: Error) {
  emit('error', err);
  props.options?.onError?.(err);
}

function resolvedOnDestroy() {
  emit('destroyed');
  props.options?.onDestroy?.();
}

function resolvedOnReset() {
  emit('reset');
  props.options?.onReset?.();
}

function resolvedOnUpdate() {
  emit('updated');
  props.options?.onUpdate?.();
}

const resolvedOptions = computed(() => ({
  organizerId: props.organizerId,
  newsletterId: props.newsletterId,
  ...props.options,
  onSuccess: resolvedOnSuccess,
  onError: resolvedOnError,
  onDestroy: resolvedOnDestroy,
  onReset: resolvedOnReset,
  onUpdate: resolvedOnUpdate,
}));

const {
  destroy
} = useNewsletterSubscriptionForm(formEl, resolvedOptions)

onBeforeUnmount(() => {
  destroy();
});
</script>

<template>
  <div ref="formEl" />
</template>