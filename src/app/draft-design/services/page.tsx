import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

const ServicesPage = () => {
  return (
    <div className={styles.page}>
      {/* Header (same as home) */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <Link href="/draft-design" className={styles.logoLink}>
            <Image
              src="/images/logo-old.png"
              alt="Taupiri Sound"
              width={120}
              height={80}
              className={styles.logo}
            />
          </Link>
          <nav className={styles.nav}>
            <Link href="/draft-design/services">Services</Link>
            <Link href="/draft-design/music">Music</Link>
            <Link href="/draft-design/the-studio">The Studio</Link>
            <Link href="/draft-design/about-us">About Us</Link>
            <Link href="/draft-design#contact">Contact</Link>
          </nav>
        </div>
      </header>

      {/* Page Hero */}
      <section className={styles.pageHero}>
        <div className={styles.pageHeroContent}>
          <h1 className={styles.pageTitle}>Our Services</h1>
          <p className={styles.pageSubtitle}>
            Professional recording services crafted with expertise and cultural authenticity
          </p>
        </div>
      </section>

      {/* Mixing Service */}
      <section className={styles.serviceSection} id="mixing">
        <div className={styles.serviceSectionContainer}>
          <div className={styles.serviceContent}>
            <h2 className={styles.serviceTitle}>Mixing</h2>
            <p className={styles.serviceDescription}>
              Our mixing services bring balance, clarity, and emotional impact to your recordings.
              With over a decade of experience and a deep understanding of diverse musical styles,
              we craft mixes that honor your artistic vision while meeting industry standards.
            </p>
            <p className={styles.serviceDescription}>
              We work with both analog and digital workflows, utilizing our carefully curated
              collection of outboard gear, plugins, and monitoring systems to ensure your mix
              translates perfectly across all playback systems.
            </p>

            <div className={styles.serviceFeatures}>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>✓</span>
                <span>Analog & digital hybrid workflow</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>✓</span>
                <span>Industry-standard monitoring</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>✓</span>
                <span>Unlimited revisions</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>✓</span>
                <span>Stems and alternate mixes available</span>
              </div>
            </div>

            <blockquote className={styles.testimonial}>
              <p>
                "The mix brought our songs to life in ways we never imagined. Every instrument
                has its place, and the emotional impact is exactly what we were looking for."
              </p>
              <cite>— Hana Morrison, Folk Artist</cite>
            </blockquote>
          </div>

          <div className={styles.serviceMedia}>
            <div className={styles.serviceImage}>
              <Image
                src="/images/service-mixing-detail.jpg"
                alt="Mixing console"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className={styles.mediaCaption}>
              Our hybrid analog/digital mixing setup
            </div>
          </div>
        </div>
      </section>

      {/* Mastering Service */}
      <section className={styles.serviceSection} id="mastering">
        <div className={styles.serviceSectionContainer}>
          <div className={styles.serviceMedia}>
            <div className={styles.serviceImage}>
              <Image
                src="/images/service-mastering-detail.jpg"
                alt="Mastering equipment"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className={styles.serviceGallery}>
              <div className={styles.galleryImage}>
                <Image
                  src="/images/mastering-1.jpg"
                  alt="Mastering process"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.galleryImage}>
                <Image
                  src="/images/mastering-2.jpg"
                  alt="Mastering detail"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>

          <div className={styles.serviceContent}>
            <h2 className={styles.serviceTitle}>Mastering</h2>
            <p className={styles.serviceDescription}>
              Mastering is the final and crucial step in music production. Our mastering services
              ensure your music achieves optimal loudness, clarity, and consistency across all
              tracks while maintaining dynamic range and emotional impact.
            </p>
            <p className={styles.serviceDescription}>
              We prepare your music for all distribution platforms—streaming services, vinyl,
              CD, and digital downloads—with format-specific optimization to ensure it sounds
              its best everywhere.
            </p>

            <div className={styles.serviceFeatures}>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>✓</span>
                <span>Optimized for all streaming platforms</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>✓</span>
                <span>Vinyl and CD mastering available</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>✓</span>
                <span>ISRC code embedding</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>✓</span>
                <span>High-resolution masters provided</span>
              </div>
            </div>

            <blockquote className={styles.testimonial}>
              <p>
                "The mastering made our album sound cohesive and professional. It translates
                perfectly whether you're listening on headphones, in the car, or on a sound system."
              </p>
              <cite>— Te Reo Collective</cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Live Recording Service */}
      <section className={styles.serviceSection} id="recording">
        <div className={styles.serviceSectionContainer}>
          <div className={styles.serviceContent}>
            <h2 className={styles.serviceTitle}>Live Recording</h2>
            <p className={styles.serviceDescription}>
              Capture the magic and energy of live performances in our acoustically treated
              recording space. Whether you're recording a full band, intimate acoustic session,
              or spoken word, our studio provides the perfect environment.
            </p>
            <p className={styles.serviceDescription}>
              Our collection of vintage and modern microphones, combined with our expertise in
              mic placement and room acoustics, ensures we capture the true essence of your
              performance with warmth and detail.
            </p>

            <div className={styles.serviceFeatures}>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>✓</span>
                <span>Acoustically treated live room</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>✓</span>
                <span>Isolated vocal booth</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>✓</span>
                <span>Vintage & modern microphone selection</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>✓</span>
                <span>Multi-track recording up to 32 channels</span>
              </div>
            </div>

            <div className={styles.imageShowcase}>
              <div className={styles.showcaseImage}>
                <Image
                  src="/images/recording-session-1.jpg"
                  alt="Recording session"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.showcaseImage}>
                <Image
                  src="/images/recording-session-2.jpg"
                  alt="Recording session"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.showcaseImage}>
                <Image
                  src="/images/recording-session-3.jpg"
                  alt="Recording session"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>

          <div className={styles.serviceMedia}>
            <div className={styles.serviceImage}>
              <Image
                src="/images/service-recording-detail.jpg"
                alt="Live recording setup"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <blockquote className={styles.testimonial}>
              <p>
                "Recording at Taupiri Sound felt like home. The space has such great energy
                and acoustics—we got the best takes we've ever recorded."
              </p>
              <cite>— Aotearoa Blues Band</cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Production Service */}
      <section className={styles.serviceSection} id="production">
        <div className={styles.serviceSectionContainer}>
          <div className={styles.serviceMedia}>
            <div className={styles.serviceImage}>
              <Image
                src="/images/service-production-detail.jpg"
                alt="Production workspace"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className={styles.productionGrid}>
              <div className={styles.productionStep}>
                <span className={styles.stepNumber}>01</span>
                <h4>Concept Development</h4>
                <p>We work with you to develop your artistic vision</p>
              </div>
              <div className={styles.productionStep}>
                <span className={styles.stepNumber}>02</span>
                <h4>Pre-Production</h4>
                <p>Arranging, demo recording, and planning</p>
              </div>
              <div className={styles.productionStep}>
                <span className={styles.stepNumber}>03</span>
                <h4>Recording</h4>
                <p>Capturing performances with attention to detail</p>
              </div>
              <div className={styles.productionStep}>
                <span className={styles.stepNumber}>04</span>
                <h4>Post-Production</h4>
                <p>Editing, mixing, and final touches</p>
              </div>
            </div>
          </div>

          <div className={styles.serviceContent}>
            <h2 className={styles.serviceTitle}>Production</h2>
            <p className={styles.serviceDescription}>
              From initial concept to final master, we guide you through every stage of the
              production process. Our production services combine technical expertise with
              creative vision to help you realize your musical ideas.
            </p>
            <p className={styles.serviceDescription}>
              We specialize in working with artists to develop their sound, whether that means
              honoring traditional Māori music styles, blending cultural elements with
              contemporary production, or exploring entirely new sonic territories.
            </p>

            <div className={styles.serviceFeatures}>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>✓</span>
                <span>Full project management</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>✓</span>
                <span>Arrangement and composition support</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>✓</span>
                <span>Session musician coordination</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>✓</span>
                <span>Cultural consultation for traditional music</span>
              </div>
            </div>

            <blockquote className={styles.testimonial}>
              <p>
                "The production team helped us find the perfect balance between honoring our
                traditional roots and creating a contemporary sound. Their cultural understanding
                made all the difference."
              </p>
              <cite>— Māori Youth Music Collective</cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to Start Your Project?</h2>
          <p className={styles.ctaText}>
            Get in touch to discuss your recording needs and receive a custom quote.
          </p>
          <Link href="/draft-design#contact" className={styles.ctaButton}>
            Contact Us
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerTop}>
            <div className={styles.footerBrand}>
              <Image
                src="/images/logo-old.png"
                alt="Taupiri Sound"
                width={100}
                height={67}
              />
              <p className={styles.footerTagline}>
                Recording Studio · Waikato · Aotearoa
              </p>
            </div>

            <div className={styles.footerLinks}>
              <div className={styles.footerColumn}>
                <h4>Studio</h4>
                <Link href="/draft-design/services">Services</Link>
                <Link href="/draft-design/the-studio">Equipment</Link>
                <Link href="/draft-design/music">Our Work</Link>
              </div>
              <div className={styles.footerColumn}>
                <h4>About</h4>
                <Link href="/draft-design/about-us">Our Story</Link>
                <Link href="/draft-design/about-us#team">Team</Link>
                <Link href="/draft-design#contact">Contact</Link>
              </div>
              <div className={styles.footerColumn}>
                <h4>Connect</h4>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a>
              </div>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p>&copy; 2024 Taupiri Sound. All rights reserved.</p>
            <div className={styles.footerLegal}>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/terms-and-conditions">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ServicesPage;