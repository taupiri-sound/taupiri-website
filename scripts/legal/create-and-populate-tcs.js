/**
 * Script to create and populate Terms & Conditions document in Sanity CMS
 *
 * To run this script:
 * 1. Make sure you're in the project root directory
 * 2. Run: node scripts/legal/create-and-populate-tcs.js
 */

/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

// Load environment variables from .env.local
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env.local') });
const { createClient } = require('@sanity/client');

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false, // We want fresh data when writing
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN, // You'll need to set this environment variable
});

// Terms & Conditions content structure
const termsAndConditionsData = {
  _type: 'termsAndConditions',
  _id: 'termsAndConditions',
  hide: false,
  title: 'Terms & Conditions',
  content: [
    {
      _type: 'pageSection',
      _key: 'intro-section',
      hideSection: false,
      title: 'Introduction',
      anchorId: 'introduction',
      useCompactGap: true,
      content: [
        {
          _type: 'richText',
          _key: 'intro-text',
          content: [
            {
              _type: 'block',
              _key: 'intro-block',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'Welcome to Taupiri Sound. These Terms & Conditions govern your use of our website and recording studio services. By accessing or using our website, booking our recording studio, or engaging with our services, you agree to be bound by these terms.',
                  marks: []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      _type: 'pageSection',
      _key: 'definitions-section',
      hideSection: false,
      title: 'Definitions',
      anchorId: 'definitions',
      useCompactGap: true,
      content: [
        {
          _type: 'richText',
          _key: 'definitions-text',
          content: [
            {
              _type: 'block',
              _key: 'definitions-list',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'In these Terms & Conditions:',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'def-company',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  text: '"Studio", "we", "us", or "our" refers to Taupiri Sound',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'def-website',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  text: '"Website" refers to taupirisound.co.nz and all associated pages',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'def-services',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  text: '"Services" refers to our recording studio services including recording, mixing, editing, voice work, audio for media, and related professional audio production services',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'def-client',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  text: '"Client", "you", or "your" refers to any individual or entity booking our studio services or accessing our website',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'def-session',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  text: '"Session" refers to a booked period of studio time for recording, mixing, or other audio production work',
                  marks: []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      _type: 'pageSection',
      _key: 'website-use-section',
      hideSection: false,
      title: 'Website Use',
      anchorId: 'website-use',
      useCompactGap: true,
      content: [
        {
          _type: 'subSection',
          _key: 'permitted-use',
          hideSection: false,
          title: 'Permitted Use',
          anchorId: 'permitted-use',
          content: [
            {
              _type: 'richText',
              _key: 'permitted-use-text',
              content: [
                {
                  _type: 'block',
                  _key: 'permitted-intro',
                  style: 'normal',
                  children: [
                    {
                      _type: 'span',
                      text: 'You may use our website for:',
                      marks: []
                    }
                  ]
                },
                {
                  _type: 'block',
                  _key: 'permitted-1',
                  style: 'normal',
                  listItem: 'bullet',
                  children: [
                    {
                      _type: 'span',
                      text: 'Learning about our recording studio services and facilities',
                      marks: []
                    }
                  ]
                },
                {
                  _type: 'block',
                  _key: 'permitted-2',
                  style: 'normal',
                  listItem: 'bullet',
                  children: [
                    {
                      _type: 'span',
                      text: 'Listening to audio samples and viewing project examples',
                      marks: []
                    }
                  ]
                },
                {
                  _type: 'block',
                  _key: 'permitted-3',
                  style: 'normal',
                  listItem: 'bullet',
                  children: [
                    {
                      _type: 'span',
                      text: 'Reading blog posts and articles about recording techniques',
                      marks: []
                    }
                  ]
                },
                {
                  _type: 'block',
                  _key: 'permitted-4',
                  style: 'normal',
                  listItem: 'bullet',
                  children: [
                    {
                      _type: 'span',
                      text: 'Contacting us to inquire about booking studio sessions',
                      marks: []
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          _type: 'subSection',
          _key: 'prohibited-use',
          hideSection: false,
          title: 'Prohibited Use',
          anchorId: 'prohibited-use',
          content: [
            {
              _type: 'richText',
              _key: 'prohibited-use-text',
              content: [
                {
                  _type: 'block',
                  _key: 'prohibited-intro',
                  style: 'normal',
                  children: [
                    {
                      _type: 'span',
                      text: 'You must not:',
                      marks: []
                    }
                  ]
                },
                {
                  _type: 'block',
                  _key: 'prohibited-1',
                  style: 'normal',
                  listItem: 'bullet',
                  children: [
                    {
                      _type: 'span',
                      text: 'Use our website for any unlawful purpose',
                      marks: []
                    }
                  ]
                },
                {
                  _type: 'block',
                  _key: 'prohibited-2',
                  style: 'normal',
                  listItem: 'bullet',
                  children: [
                    {
                      _type: 'span',
                      text: 'Attempt to gain unauthorized access to our systems',
                      marks: []
                    }
                  ]
                },
                {
                  _type: 'block',
                  _key: 'prohibited-3',
                  style: 'normal',
                  listItem: 'bullet',
                  children: [
                    {
                      _type: 'span',
                      text: 'Download, copy, or distribute audio samples without permission',
                      marks: []
                    }
                  ]
                },
                {
                  _type: 'block',
                  _key: 'prohibited-4',
                  style: 'normal',
                  listItem: 'bullet',
                  children: [
                    {
                      _type: 'span',
                      text: 'Infringe on intellectual property rights',
                      marks: []
                    }
                  ]
                },
                {
                  _type: 'block',
                  _key: 'prohibited-5',
                  style: 'normal',
                  listItem: 'bullet',
                  children: [
                    {
                      _type: 'span',
                      text: 'Spam or send unsolicited communications',
                      marks: []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      _type: 'pageSection',
      _key: 'booking-payment-section',
      hideSection: false,
      title: 'Booking and Payment',
      anchorId: 'booking-payment',
      useCompactGap: true,
      content: [
        {
          _type: 'subSection',
          _key: 'booking-process',
          hideSection: false,
          title: 'Booking Process',
          anchorId: 'booking-process',
          content: [
            {
              _type: 'richText',
              _key: 'booking-text',
              content: [
                {
                  _type: 'block',
                  _key: 'booking-1',
                  style: 'normal',
                  children: [
                    {
                      _type: 'span',
                      text: 'All studio sessions must be booked in advance. Bookings are confirmed upon receipt of payment or deposit as agreed. We reserve the right to decline bookings at our discretion.',
                      marks: []
                    }
                  ]
                },
                {
                  _type: 'block',
                  _key: 'booking-2',
                  style: 'normal',
                  children: [
                    {
                      _type: 'span',
                      text: 'Session times are agreed upon booking and should be adhered to. Extensions may be accommodated subject to availability and additional charges.',
                      marks: []
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          _type: 'subSection',
          _key: 'payment-terms',
          hideSection: false,
          title: 'Payment Terms',
          anchorId: 'payment-terms',
          content: [
            {
              _type: 'richText',
              _key: 'payment-text',
              content: [
                {
                  _type: 'block',
                  _key: 'payment-1',
                  style: 'normal',
                  children: [
                    {
                      _type: 'span',
                      text: 'Payment terms will be agreed upon booking and may include deposits, upfront payments, or invoicing arrangements depending on the scope of work.',
                      marks: []
                    }
                  ]
                },
                {
                  _type: 'block',
                  _key: 'payment-2',
                  style: 'normal',
                  children: [
                    {
                      _type: 'span',
                      text: 'Final recordings and project files will not be released until all outstanding payments have been received in full.',
                      marks: []
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          _type: 'subSection',
          _key: 'cancellation-policy',
          hideSection: false,
          title: 'Cancellation Policy',
          anchorId: 'cancellation-policy',
          content: [
            {
              _type: 'richText',
              _key: 'cancellation-text',
              content: [
                {
                  _type: 'block',
                  _key: 'cancel-intro',
                  style: 'normal',
                  children: [
                    {
                      _type: 'span',
                      text: 'Cancellation policies will be communicated at the time of booking. Generally:',
                      marks: []
                    }
                  ]
                },
                {
                  _type: 'block',
                  _key: 'cancel-1',
                  style: 'normal',
                  listItem: 'bullet',
                  children: [
                    {
                      _type: 'span',
                      text: 'Cancellations with reasonable notice may receive a full or partial refund',
                      marks: []
                    }
                  ]
                },
                {
                  _type: 'block',
                  _key: 'cancel-2',
                  style: 'normal',
                  listItem: 'bullet',
                  children: [
                    {
                      _type: 'span',
                      text: 'Late cancellations or no-shows may result in forfeiture of deposits or full session fees',
                      marks: []
                    }
                  ]
                },
                {
                  _type: 'block',
                  _key: 'cancel-3',
                  style: 'normal',
                  listItem: 'bullet',
                  children: [
                    {
                      _type: 'span',
                      text: 'We reserve the right to cancel or reschedule sessions due to unforeseen circumstances, in which case full refunds will be provided',
                      marks: []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      _type: 'pageSection',
      _key: 'intellectual-property-section',
      hideSection: false,
      title: 'Intellectual Property and Recording Rights',
      anchorId: 'intellectual-property',
      useCompactGap: true,
      content: [
        {
          _type: 'subSection',
          _key: 'client-ownership',
          hideSection: false,
          title: 'Client Ownership',
          anchorId: 'client-ownership',
          content: [
            {
              _type: 'richText',
              _key: 'client-ownership-text',
              content: [
                {
                  _type: 'block',
                  _key: 'ownership-1',
                  style: 'normal',
                  children: [
                    {
                      _type: 'span',
                      text: 'Unless otherwise agreed in writing, clients retain full ownership of the master recordings created during their sessions. We claim no rights to your creative work, compositions, or performances.',
                      marks: []
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          _type: 'subSection',
          _key: 'client-responsibilities',
          hideSection: false,
          title: 'Client Responsibilities',
          anchorId: 'client-responsibilities',
          content: [
            {
              _type: 'richText',
              _key: 'client-resp-text',
              content: [
                {
                  _type: 'block',
                  _key: 'resp-intro',
                  style: 'normal',
                  children: [
                    {
                      _type: 'span',
                      text: 'Clients are responsible for:',
                      marks: []
                    }
                  ]
                },
                {
                  _type: 'block',
                  _key: 'resp-1',
                  style: 'normal',
                  listItem: 'bullet',
                  children: [
                    {
                      _type: 'span',
                      text: 'Ensuring they have all necessary rights and permissions for material recorded at our studio',
                      marks: []
                    }
                  ]
                },
                {
                  _type: 'block',
                  _key: 'resp-2',
                  style: 'normal',
                  listItem: 'bullet',
                  children: [
                    {
                      _type: 'span',
                      text: 'Obtaining any required licenses before duplication or distribution of works',
                      marks: []
                    }
                  ]
                },
                {
                  _type: 'block',
                  _key: 'resp-3',
                  style: 'normal',
                  listItem: 'bullet',
                  children: [
                    {
                      _type: 'span',
                      text: 'Indemnifying the studio against any claims related to copyright infringement or contractual breaches',
                      marks: []
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          _type: 'subSection',
          _key: 'portfolio-use',
          hideSection: false,
          title: 'Portfolio and Promotional Use',
          anchorId: 'portfolio-use',
          content: [
            {
              _type: 'richText',
              _key: 'portfolio-text',
              content: [
                {
                  _type: 'block',
                  _key: 'portfolio-1',
                  style: 'normal',
                  children: [
                    {
                      _type: 'span',
                      text: 'We may request permission to use excerpts of your recordings for promotional purposes, portfolio examples, or website content. Any such use will be discussed and agreed upon with you.',
                      marks: []
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          _type: 'subSection',
          _key: 'website-content',
          hideSection: false,
          title: 'Website Content',
          anchorId: 'website-content',
          content: [
            {
              _type: 'richText',
              _key: 'website-content-text',
              content: [
                {
                  _type: 'block',
                  _key: 'web-content-1',
                  style: 'normal',
                  children: [
                    {
                      _type: 'span',
                      text: 'All content on this website, including text, graphics, logos, photographs, and design, is owned by Taupiri Sound and is protected by intellectual property laws. Unauthorized reproduction or distribution is prohibited.',
                      marks: []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      _type: 'pageSection',
      _key: 'studio-conduct-section',
      hideSection: false,
      title: 'Studio Conduct and Safety',
      anchorId: 'studio-conduct',
      useCompactGap: true,
      content: [
        {
          _type: 'subSection',
          _key: 'facility-access',
          hideSection: false,
          title: 'Facility Access',
          anchorId: 'facility-access',
          content: [
            {
              _type: 'richText',
              _key: 'facility-text',
              content: [
                {
                  _type: 'block',
                  _key: 'facility-1',
                  style: 'normal',
                  children: [
                    {
                      _type: 'span',
                      text: 'Clients may only permit individuals directly involved in the recording session to enter the studio premises during their booked time. All visitors must be approved in advance.',
                      marks: []
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          _type: 'subSection',
          _key: 'equipment-care',
          hideSection: false,
          title: 'Equipment Care and Liability',
          anchorId: 'equipment-care',
          content: [
            {
              _type: 'richText',
              _key: 'equipment-text',
              content: [
                {
                  _type: 'block',
                  _key: 'equipment-intro',
                  style: 'normal',
                  children: [
                    {
                      _type: 'span',
                      text: 'Our studio contains professional-grade equipment that must be handled with care:',
                      marks: []
                    }
                  ]
                },
                {
                  _type: 'block',
                  _key: 'equipment-1',
                  style: 'normal',
                  listItem: 'bullet',
                  children: [
                    {
                      _type: 'span',
                      text: 'Clients are responsible for any loss or damage to studio property caused by misuse, negligence, or careless actions',
                      marks: []
                    }
                  ]
                },
                {
                  _type: 'block',
                  _key: 'equipment-2',
                  style: 'normal',
                  listItem: 'bullet',
                  children: [
                    {
                      _type: 'span',
                      text: 'Studio equipment should only be operated by authorized personnel',
                      marks: []
                    }
                  ]
                },
                {
                  _type: 'block',
                  _key: 'equipment-3',
                  style: 'normal',
                  listItem: 'bullet',
                  children: [
                    {
                      _type: 'span',
                      text: 'Food and beverages must be kept away from all equipment',
                      marks: []
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          _type: 'subSection',
          _key: 'hearing-safety',
          hideSection: false,
          title: 'Hearing Safety',
          anchorId: 'hearing-safety',
          content: [
            {
              _type: 'richText',
              _key: 'hearing-text',
              content: [
                {
                  _type: 'block',
                  _key: 'hearing-1',
                  style: 'normal',
                  children: [
                    {
                      _type: 'span',
                      text: 'Prolonged exposure to high noise levels above 85 dB(A) may cause hearing damage. We maintain safe monitoring levels, but clients should take regular breaks and use hearing protection when appropriate.',
                      marks: []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      _type: 'pageSection',
      _key: 'third-party-section',
      hideSection: false,
      title: 'Third-Party Services and Embedded Content',
      anchorId: 'third-party-services',
      useCompactGap: true,
      content: [
        {
          _type: 'richText',
          _key: 'third-party-text',
          content: [
            {
              _type: 'block',
              _key: 'third-party-intro',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'Our website integrates with various third-party services to showcase our work and provide enhanced functionality:',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'third-party-spotify',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  text: 'Spotify widgets for streaming audio samples',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'third-party-bandcamp',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  text: 'Bandcamp widgets for music playback',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'third-party-youtube',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  text: 'YouTube videos for video content and studio tours',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'third-party-social',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  text: 'Social media platforms for connectivity and updates',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'third-party-disclaimer',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'These third-party services have their own terms of service and privacy policies. We are not responsible for their practices or content. Please refer to our Privacy Policy for information about cookies and data collection.',
                  marks: []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      _type: 'pageSection',
      _key: 'disclaimer-section',
      hideSection: false,
      title: 'Disclaimers and Limitation of Liability',
      anchorId: 'disclaimers',
      useCompactGap: true,
      content: [
        {
          _type: 'richText',
          _key: 'disclaimer-text',
          content: [
            {
              _type: 'block',
              _key: 'disclaimer-warranty',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'Our website and services are provided "as is" without any warranties, express or implied. While we strive for the highest quality in our services, we do not guarantee that our website will be uninterrupted, error-free, or free from harmful components.',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'disclaimer-liability',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'To the fullest extent permitted by law, Taupiri Sound shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or services. We maintain appropriate insurance coverage for our studio operations.',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'disclaimer-results',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'While we aim to deliver professional results, the quality of final recordings depends on many factors including source material, performances, and creative decisions. We cannot guarantee specific commercial or artistic outcomes.',
                  marks: []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      _type: 'pageSection',
      _key: 'contact-section',
      hideSection: false,
      title: 'Contact Information',
      anchorId: 'contact',
      useCompactGap: true,
      content: [
        {
          _type: 'richText',
          _key: 'contact-text',
          content: [
            {
              _type: 'block',
              _key: 'contact-info',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'If you have any questions about these Terms & Conditions, please contact us:',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'contact-email',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'Email: ',
                  marks: []
                },
                {
                  _type: 'span',
                  text: 'lance@taupirisound.co.nz',
                  marks: ['strong']
                }
              ]
            },
            {
              _type: 'block',
              _key: 'contact-phone',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'Phone: ',
                  marks: []
                },
                {
                  _type: 'span',
                  text: '+64 21 311 903',
                  marks: ['strong']
                }
              ]
            },
            {
              _type: 'block',
              _key: 'contact-address',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'Address: ',
                  marks: []
                },
                {
                  _type: 'span',
                  text: 'Topview Road, Taupiri 3792, New Zealand',
                  marks: ['strong']
                }
              ]
            }
          ]
        }
      ]
    },
    {
      _type: 'pageSection',
      _key: 'changes-section',
      hideSection: false,
      title: 'Changes to Terms',
      anchorId: 'changes',
      useCompactGap: true,
      content: [
        {
          _type: 'richText',
          _key: 'changes-text',
          content: [
            {
              _type: 'block',
              _key: 'changes-notice',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'We reserve the right to modify these Terms & Conditions at any time. Changes will be effective immediately upon posting on this website. Your continued use of our website or services constitutes acceptance of any changes.',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'changes-effective',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'Last updated: ',
                  marks: []
                },
                {
                  _type: 'span',
                  text: new Date().toLocaleDateString('en-NZ', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }),
                  marks: ['strong']
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

async function createAndPopulateTermsAndConditions() {
  try {
    console.log('=� Creating Terms & Conditions document...');

    // Check if document already exists
    const existingDoc = await client.fetch('*[_id == "termsAndConditions"][0]');

    if (existingDoc) {
      console.log('�  Terms & Conditions document already exists.');
      console.log('   Updating existing document...');

      const result = await client.createOrReplace(termsAndConditionsData);
      console.log(' Updated Terms & Conditions document');
      console.log(`   Document ID: ${result._id}`);
    } else {
      const result = await client.create(termsAndConditionsData);
      console.log(' Created Terms & Conditions document');
      console.log(`   Document ID: ${result._id}`);
    }

    console.log('\n=� Next steps:');
    console.log('1. Go to your Sanity Studio');
    console.log('2. Navigate to Site Management � Legal � Terms & Conditions');
    console.log('3. Review the content and make any necessary adjustments');
    console.log('4. Publish the document when ready');
    console.log('5. The page will be available at /terms-and-conditions');
  } catch (error) {
    console.error('=� Script failed:', error);
    process.exit(1);
  }
}

// Run the script
createAndPopulateTermsAndConditions();