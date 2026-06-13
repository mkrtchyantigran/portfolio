'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Textarea, Button } from '@heroui/react';
import { useTranslations } from 'next-intl';
import { Send } from 'lucide-react';
import { profile } from '@/data/profile';

export function ContactForm() {
  const t = useTranslations('Contact');
  const [sent, setSent] = useState(false);

  const schema = z.object({
    name: z.string().min(2, t('nameRequired')),
    email: z.string().email(t('emailInvalid')),
    message: z.string().min(10, t('messageRequired')),
  });
  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormValues) => {
    const subject = encodeURIComponent(`Portfolio message from ${data.name}`);
    const body = encodeURIComponent(
      `${data.message}\n\n— ${data.name} (${data.email})`,
    );
    // No backend: open the visitor's email client pre-filled.
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
      noValidate
    >
      <Input
        {...register('name')}
        label={t('name')}
        variant="bordered"
        isInvalid={Boolean(errors.name)}
        errorMessage={errors.name?.message}
      />
      <Input
        {...register('email')}
        type="email"
        label={t('email')}
        variant="bordered"
        isInvalid={Boolean(errors.email)}
        errorMessage={errors.email?.message}
      />
      <Textarea
        {...register('message')}
        label={t('message')}
        variant="bordered"
        minRows={4}
        isInvalid={Boolean(errors.message)}
        errorMessage={errors.message?.message}
      />
      <Button
        type="submit"
        color="primary"
        size="lg"
        isLoading={isSubmitting}
        endContent={!isSubmitting && <Send size={16} />}
      >
        {isSubmitting ? t('sending') : t('send')}
      </Button>
      {sent && <p className="text-sm text-success">{t('success')}</p>}
    </form>
  );
}
