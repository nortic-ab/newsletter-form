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
  destroy,
  reset,
  update,
} = useNewsletterSubscriptionForm(formEl, resolvedOptions)

defineSlots<{
  before: {
    error: typeof error;
    submitted: typeof submitted;
    destroy: typeof destroy;
    reset: typeof reset;
    update: typeof update;
  };
  after: {
    error: typeof error;
    submitted: typeof submitted;
    destroy: typeof destroy;
    reset: typeof reset;
    update: typeof update;
  };
}>()
</script>

<template>
  <div>
    <slot name="before" :error="error" :submitted="submitted" :destroy="destroy" :reset="reset" :update="update" />
    <div ref="formEl" />
    <slot name="after" :error="error" :submitted="submitted" :destroy="destroy" :reset="reset" :update="update" />
  </div>
</template>