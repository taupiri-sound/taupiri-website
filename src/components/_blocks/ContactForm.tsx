'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import CTA from '../UI/CTA';

interface ContactFormProps {
  className?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  honeypot: string;
}

const ContactForm = ({ className = '' }: ContactFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    mode: 'onTouched', // Validate when user leaves field
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
      honeypot: '',
    },
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        setStatus('success');
        reset(); // Reset form using react-hook-form
      } else {
        setStatus('error');
        setErrorMessage(
          responseData.error ||
            'We encountered an issue sending your message. Please try contacting us directly via email or phone.'
        );
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        'We encountered an issue sending your message. Please try contacting us directly via email or phone.'
      );
      console.error('Contact form submission error:', error);
    }
  };

  const getInputStyles = (fieldName: keyof ContactFormData) => {
    const hasError = errors[fieldName];
    const baseStyles =
      'w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 text-body-base';
    const normalStyles =
      'border-gray-300 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-opacity-20';
    const errorStyles =
      'border-red-500 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-20';

    return `${baseStyles} ${hasError ? errorStyles : normalStyles}`;
  };

  const labelStyles = 'block text-body-base font-medium mb-2 text-gray-700';

  return (
    <div className={`max-w-2xl mx-auto ${className}`.trim()}>
      {status === 'success' ? (
        <div className='bg-green-50 border-2 border-green-200 rounded-lg p-6 text-center'>
          <p className='text-h4 text-green-800 mb-2'>Thank you for your message!</p>
          <p className='text-body-base text-green-700 mb-4'>
            We have received your message and will get back to you as soon as possible. You should
            also receive a confirmation email shortly.
          </p>
          <CTA
            as='button'
            type='button'
            variant='filled'
            onClick={() => setStatus('idle')}
            className='w-auto'>
            Send Another Message
          </CTA>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          {/* Honeypot field - hidden from users, only bots will fill it */}
          <div className='hidden' aria-hidden='true'>
            <label htmlFor='honeypot'>Leave this field empty</label>
            <input
              type='text'
              id='honeypot'
              {...register('honeypot')}
              tabIndex={-1}
              autoComplete='off'
            />
          </div>

          {/* Name field */}
          <div>
            <label htmlFor='name' className={labelStyles}>
              Name <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              id='name'
              {...register('name', {
                required: 'Please enter your name',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              })}
              disabled={status === 'loading'}
              className={getInputStyles('name')}
              placeholder='Your name'
              aria-invalid={errors.name ? 'true' : 'false'}
            />
            {errors.name && (
              <p className='mt-1 text-body-sm text-red-600 transition-opacity duration-200'>
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email field */}
          <div>
            <label htmlFor='email' className={labelStyles}>
              Email <span className='text-red-500'>*</span>
            </label>
            <input
              type='email'
              id='email'
              {...register('email', {
                required: 'Please enter your email address',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address',
                },
              })}
              disabled={status === 'loading'}
              className={getInputStyles('email')}
              placeholder='your.email@example.com'
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && (
              <p className='mt-1 text-body-sm text-red-600 transition-opacity duration-200'>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone field (optional) */}
          <div>
            <label htmlFor='phone' className={labelStyles}>
              Phone <span className='text-gray-400 text-body-sm'>(optional)</span>
            </label>
            <input
              type='tel'
              id='phone'
              {...register('phone')}
              disabled={status === 'loading'}
              className={getInputStyles('phone')}
              placeholder='+64 21 123 4567'
            />
          </div>

          {/* Message field */}
          <div>
            <label htmlFor='message' className={labelStyles}>
              Message <span className='text-red-500'>*</span>
            </label>
            <textarea
              id='message'
              {...register('message', {
                required: 'Please enter a message',
                minLength: {
                  value: 10,
                  message: 'Message must be at least 10 characters',
                },
              })}
              disabled={status === 'loading'}
              rows={6}
              className={getInputStyles('message')}
              placeholder='Tell us how we can help you...'
              aria-invalid={errors.message ? 'true' : 'false'}
            />
            {errors.message && (
              <p className='mt-1 text-body-sm text-red-600 transition-opacity duration-200'>
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Error message display */}
          {status === 'error' && (
            <div className='bg-red-50 border-2 border-red-200 rounded-lg p-4'>
              <p className='text-body-base text-red-700'>{errorMessage}</p>
            </div>
          )}

          {/* Submit button */}
          <div className='flex justify-center'>
            <CTA
              as='button'
              type='submit'
              variant='filled'
              disabled={status === 'loading'}
              className='w-full sm:w-auto'>
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </CTA>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
