import { NewsletterSubscriptionError } from './api';
import { submitSubscription } from './api';
import type * as Types from './types';

export declare class EmbeddedSubscriptionForm {
    private app;
    private options;
    constructor(target: string | HTMLElement, options: Types.NorticNewsletterOptions);
    update(newOptions: Partial<Types.NorticNewsletterOptions>): void;
    destroy(): void;
    reset(): void;
}

export { NewsletterSubscriptionError }

export declare type NorticNewsletterOptions = Types.NorticNewsletterOptions;

export declare type SubmitOptions = Types.SubmitOptions;

export declare type SubmitOptionsBase = Types.SubmitOptionsBase;

export { submitSubscription }

export { }
