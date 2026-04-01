import React from 'react';
import PageHero from '@/components/Page/PageHero';
import Container from '@/components/Layout/Container';
import CTA from '@/components/UI/CTA';
import Breadcrumb from '@/components/UI/Breadcrumb';
import { FaQuestionCircle } from 'react-icons/fa';
import { getBusinessInfo } from '@/actions';
import { getBaseUrl } from '@/lib/metadata';

const META_DESCRIPTION = 'Sorry, the page you are looking for could not be found.';

export async function generateMetadata() {
  const businessInfo = await getBusinessInfo();
  const orgName = businessInfo?.organisationName || '';
  const title = orgName ? `Page Not Found - ${orgName}` : 'Page Not Found';
  return {
    metadataBase: new URL(getBaseUrl()),
    title,
    description: META_DESCRIPTION,
    robots: 'noindex, nofollow',
    openGraph: {
      title,
      description: META_DESCRIPTION,
      type: 'website',
    },
  };
}

export default function NotFound() {
  return (
    <>
      <PageHero title='Page Not Found' />
      <Breadcrumb pageTitle='Page Not Found' />

      <Container>
        <div className='flex flex-col items-center text-center pb-12 md:pb-16'>
          <FaQuestionCircle className='text-[150px] sm:text-[250px] text-brand-primary mb-8 md:mb-12' />

          <div className='max-w-2xl mb-8 md:mb-12'>
            <h2 className='text-h3 md:text-h2 mb-4'>Oops! We can&apos;t find that page</h2>
            <p className='text-body-lg md:text-body-xl leading-relaxed mb-6'>
              The page you&apos;re looking for doesn&apos;t exist or may have been moved. Please
              check the URL for errors.
            </p>
          </div>

          <CTA href='/' variant='filled' className='text-body-lg'>
            Take Me Home
          </CTA>
        </div>
      </Container>
    </>
  );
}
