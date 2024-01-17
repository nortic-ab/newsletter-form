<script setup lang="ts">
import { UnwrapRef, computed, ref } from 'vue';
import { useNewsletterSubscriptionForm } from '..';

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
  error,
  submitted,
  formInstance,
  destroy,
  reset,
  update,
} = useNewsletterSubscriptionForm(formEl, resolvedOptions)

defineSlots<{
  before: {
    error: typeof error;
    submitted: typeof submitted;
    formInstance: typeof formInstance;
    formEl: typeof formEl;
    destroy: typeof destroy;
    reset: typeof reset;
    update: typeof update;
    options: typeof resolvedOptions;
  };
  after: {
    error: typeof error;
    submitted: typeof submitted;
    formInstance: typeof formInstance;
    formEl: typeof formEl;
    destroy: typeof destroy;
    reset: typeof reset;
    update: typeof update;
    options: typeof resolvedOptions;
  };
}>()
</script>

<template>
  <slot name="before" v-bind="{ error, submitted, formInstance, formEl, destroy, reset, update, options: resolvedOptions }" />
  <div ref="formEl" />
  <slot name="after" v-bind="{ error, submitted, formInstance, formEl, destroy, reset, update, options: resolvedOptions }" />
</template>