'use client';

import React, { useState } from 'react';
import CTA from '../UI/CTA';

interface ContactFormProps {
  className?: string;
}

const ContactForm = ({ className = '' }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    honeypot: '', // Hidden field for bot detection
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          honeypot: '',
        });
      } else {
        setStatus('error');
        setErrorMessage(
          data.error ||
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

  const inputBaseStyles =
    'w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-opacity-20 transition-all duration-200 text-body-base';
  const labelStyles = 'block text-body-base font-medium mb-2 text-gray-700';

  return (
    <div className={`max-w-2xl mx-auto ${className}`.trim()}>
      {status === 'success' ? (
        <div className='bg-green-50 border-2 border-green-200 rounded-lg p-6 text-center'>
          <h3 className='text-h4 text-green-800 mb-2'>Thank you for your message!</h3>
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
        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Honeypot field - hidden from users, only bots will fill it */}
          <div className='hidden' aria-hidden='true'>
            <label htmlFor='honeypot'>Leave this field empty</label>
            <input
              type='text'
              id='honeypot'
              name='honeypot'
              value={formData.honeypot}
              onChange={handleChange}
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
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
              disabled={status === 'loading'}
              className={inputBaseStyles}
              placeholder='Your name'
            />
          </div>

          {/* Email field */}
          <div>
            <label htmlFor='email' className={labelStyles}>
              Email <span className='text-red-500'>*</span>
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
              disabled={status === 'loading'}
              className={inputBaseStyles}
              placeholder='your.email@example.com'
            />
          </div>

          {/* Phone field (optional) */}
          <div>
            <label htmlFor='phone' className={labelStyles}>
              Phone <span className='text-gray-400 text-body-sm'>(optional)</span>
            </label>
            <input
              type='tel'
              id='phone'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              disabled={status === 'loading'}
              className={inputBaseStyles}
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
              name='message'
              value={formData.message}
              onChange={handleChange}
              required
              disabled={status === 'loading'}
              rows={6}
              className={inputBaseStyles}
              placeholder='Tell us how we can help you...'
            />
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
