import React from 'react';
import Image from 'next/image';
import { getBusinessInfo } from '@/actions';

const MaintenancePage = async () => {
  const businessInfo = await getBusinessInfo();
  const orgName = businessInfo?.organisationName || '';

  return (
    <div className='min-h-svh bg-brand-gradient-brown flex items-center justify-center px-4'>
      <div className='max-w-2xl w-full text-center space-y-8'>
        {/* Logo */}
        <div className='flex justify-center'>
          <Image
            src='/images/logos/logo-white.png'
            alt={`${orgName} Logo`}
            width={300}
            height={208}
            priority
            className='w-full max-w-md h-auto'
          />
        </div>

        {/* Coming Soon Message - Placeholder for now */}
        <div className='space-y-4'>
          <h1 className='text-h2 text-brand-white font-bold'>Coming Soon</h1>
          <p className='text-body-xl text-brand-white/90'>New website on its way ...</p>
        </div>

        {/* Contact Information */}
        <div className='space-y-3 pt-8 border-t border-brand-white/20'>
          <p className='text-body-lg text-brand-white/80 font-semibold'>
            For all enquiries, please contact Lance:
          </p>
          <div className='space-y-2 text-body-base text-brand-white/80'>
            {businessInfo?.email?.link && businessInfo?.email?.value && (
              <p>
                <a
                  href={businessInfo.email.link}
                  className='hover:text-brand-white transition-colors underline'>
                  {businessInfo.email.value}
                </a>
              </p>
            )}
            {businessInfo?.phone?.link && businessInfo?.phone?.value && (
              <p>
                <a
                  href={businessInfo.phone.link}
                  className='hover:text-brand-white transition-colors underline'>
                  {businessInfo.phone.value}
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;
