import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

const DraftHomePage = () => {
  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <Link href='/draft-design' className={styles.logoLink}>
            <Image
              src='/images/logos/logo-old.png'
              alt='Taupiri Sound'
              width={120}
              height={80}
              className={styles.logo}
            />
          </Link>
          <nav className={styles.nav}>
            <Link href='/draft-design/services'>Services</Link>
            <Link href='/draft-design/music'>Music</Link>
            <Link href='/draft-design/the-studio'>The Studio</Link>
            <Link href='/draft-design/about-us'>About Us</Link>
            <Link href='#contact'>Contact</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <Image
            src='/images/samples/studio-02.jpg'
            alt='Studio background'
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroContent}>
          <div className={styles.heroLogo}>
            <Image src='/images/logos/logo-old.png' alt='Taupiri Sound' width={200} height={133} />
          </div>
          <h1 className={styles.heroTitle}>Taupiri Sound</h1>
          <p className={styles.heroSubtitle}>Recording Studio • Waikato • Aotearoa</p>
          <button className={styles.heroCta}>Explore Our Studio</button>
        </div>
      </section>

      {/* Intro Section */}
      <section className={styles.intro}>
        <div className={styles.introContainer}>
          <div className={styles.introContent}>
            <h2 className={styles.sectionTitle}>Welcome to Taupiri Sound</h2>
            <p className={styles.introParagraph}>
              Nestled in the countryside of northern Waikato, Taupiri Sound is a recording studio
              deeply rooted in the whenua (land) and culture of Aotearoa. For over a decade, we have
              been crafting sonic experiences that honor both traditional Maori values and
              contemporary music production.
            </p>
            <p className={styles.introParagraph}>
              From educational resources to works by some of Aotearoa&apos;s finest artists, we
              bring passion, expertise, and cultural authenticity to every project.
            </p>
            <div className={styles.introStats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>10+</span>
                <span className={styles.statLabel}>Years Experience</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>500+</span>
                <span className={styles.statLabel}>Projects Completed</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>100%</span>
                <span className={styles.statLabel}>Dedication</span>
              </div>
            </div>
            <button className={styles.scrollCta}>Discover More</button>
          </div>
          <div className={styles.introGraphic}>
            <div className={styles.maoriPattern}>
              {/* Decorative Māori-inspired pattern */}
              <svg viewBox='0 0 200 200' className={styles.patternSvg}>
                <path d='M100,20 Q130,50 100,80 Q70,50 100,20' fill='#900000' />
                <path d='M100,120 Q130,150 100,180 Q70,150 100,120' fill='#900000' />
                <circle cx='100' cy='100' r='15' fill='#430C08' />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.services}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Our Services</h2>
          <p className={styles.sectionSubtitle}>
            Professional recording services tailored to your vision
          </p>

          <div className={styles.servicesGrid}>
            <div className={styles.serviceCard}>
              <div className={styles.serviceImage}>
                <Image
                  src='/images/samples/studio-01.jpg'
                  alt='Mixing'
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <h3 className={styles.serviceTitle}>Mixing</h3>
              <p className={styles.serviceDescription}>
                Professional mixing services that bring balance, clarity, and depth to your
                recordings.
              </p>
              <Link href='/draft-design/services#mixing' className={styles.serviceLink}>
                Learn More
              </Link>
            </div>

            <div className={styles.serviceCard}>
              <div className={styles.serviceImage}>
                <Image
                  src='/images/samples/studio-03.jpg'
                  alt='Mastering'
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <h3 className={styles.serviceTitle}>Mastering</h3>
              <p className={styles.serviceDescription}>
                Final polish and optimization to ensure your music sounds great on any system.
              </p>
              <Link href='/draft-design/services#mastering' className={styles.serviceLink}>
                Learn More
              </Link>
            </div>

            <div className={styles.serviceCard}>
              <div className={styles.serviceImage}>
                <Image
                  src='/images/samples/studio-04.jpg'
                  alt='Live Recording'
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <h3 className={styles.serviceTitle}>Live Recording</h3>
              <p className={styles.serviceDescription}>
                Capture the energy and authenticity of live performances in our acoustically treated
                space.
              </p>
              <Link href='/draft-design/services#recording' className={styles.serviceLink}>
                Learn More
              </Link>
            </div>

            <div className={styles.serviceCard}>
              <div className={styles.serviceImage}>
                <Image
                  src='/images/samples/studio-05.jpg'
                  alt='Production'
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <h3 className={styles.serviceTitle}>Production</h3>
              <p className={styles.serviceDescription}>
                From concept to completion, we help bring your musical vision to life.
              </p>
              <Link href='/draft-design/services#production' className={styles.serviceLink}>
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Music Section */}
      <section className={styles.music}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Featured Artists & Music</h2>

          {/* Featured Artists */}
          <div className={styles.featuredArtists}>
            <h3 className={styles.subsectionTitle}>Artists We have Worked With</h3>
            <div className={styles.artistsGrid}>
              <div className={styles.artistCard}>
                <div className={styles.artistImage}>
                  <Image
                    src='/images/samples/studio-06.jpg'
                    alt='Artist Name'
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <h4 className={styles.artistName}>Hana Morrison</h4>
                <p className={styles.artistGenre}>Folk / Traditional</p>
              </div>

              <div className={styles.artistCard}>
                <div className={styles.artistImage}>
                  <Image
                    src='/images/samples/studio-01.jpg'
                    alt='Artist Name'
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <h4 className={styles.artistName}>Te Reo Collective</h4>
                <p className={styles.artistGenre}>Hip Hop / R&B</p>
              </div>

              <div className={styles.artistCard}>
                <div className={styles.artistImage}>
                  <Image
                    src='/images/samples/studio-02.jpg'
                    alt='Artist Name'
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <h4 className={styles.artistName}>Aotearoa Blues Band</h4>
                <p className={styles.artistGenre}>Blues / Rock</p>
              </div>
            </div>
          </div>

          {/* Featured Music */}
          <div className={styles.featuredMusic}>
            <h3 className={styles.subsectionTitle}>Listen to Our Work</h3>
            <div className={styles.musicGrid}>
              <div className={styles.musicPlayer}>
                <div className={styles.albumArt}>
                  <Image
                    src='/images/samples/studio-03.jpg'
                    alt='Album'
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className={styles.playerInfo}>
                  <h4 className={styles.trackTitle}>Waiata Aroha</h4>
                  <p className={styles.trackArtist}>Hana Morrison</p>
                  <div className={styles.audioPlaceholder}>🎵 Audio Player Placeholder</div>
                </div>
              </div>

              <div className={styles.musicPlayer}>
                <div className={styles.albumArt}>
                  <Image
                    src='/images/samples/studio-04.jpg'
                    alt='Album'
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className={styles.playerInfo}>
                  <h4 className={styles.trackTitle}>Urban Maori</h4>
                  <p className={styles.trackArtist}>Te Reo Collective</p>
                  <div className={styles.audioPlaceholder}>🎵 Audio Player Placeholder</div>
                </div>
              </div>
            </div>
          </div>

          <Link href='/draft-design/music' className={styles.viewAllLink}>
            View All Artists & Music
          </Link>
        </div>
      </section>

      {/* The Studio Section */}
      <section className={styles.studioSection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>The Studio</h2>

          <div className={styles.studioPreview}>
            <div className={styles.studioImageGallery}>
              <div className={styles.mainStudioImage}>
                <Image
                  src='/images/samples/studio-05.jpg'
                  alt='Studio main room'
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.studioThumbnails}>
                <div className={styles.thumbnail}>
                  <Image
                    src='/images/samples/studio-06.jpg'
                    alt='Control room'
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className={styles.thumbnail}>
                  <Image
                    src='/images/samples/studio-01.jpg'
                    alt='Recording booth'
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>

            <div className={styles.studioInfo}>
              <h3 className={styles.subsectionTitle}>A Space Built for Sound</h3>
              <p className={styles.studioDescription}>
                Located in the peaceful countryside of northern Waikato, our studio offers a unique
                recording environment. The building has been specially treated for optimal
                acoustics, featuring a main recording room, isolated vocal booth, and a control room
                equipped with industry-standard gear.
              </p>
              <div className={styles.studioHighlights}>
                <div className={styles.highlight}>
                  <span className={styles.highlightIcon}>🎙️</span>
                  <span>Professional Microphones</span>
                </div>
                <div className={styles.highlight}>
                  <span className={styles.highlightIcon}>🎸</span>
                  <span>Vintage and Modern Instruments</span>
                </div>
                <div className={styles.highlight}>
                  <span className={styles.highlightIcon}>🎚️</span>
                  <span>Analog & Digital Processing</span>
                </div>
                <div className={styles.highlight}>
                  <span className={styles.highlightIcon}>🔊</span>
                  <span>Acoustically Treated Rooms</span>
                </div>
              </div>
              <Link href='/draft-design/the-studio' className={styles.studioLink}>
                Explore Our Equipment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className={styles.about}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>About Us</h2>

          <div className={styles.teamPreview}>
            <div className={styles.teamMember}>
              <div className={styles.memberImage}>
                <Image
                  src='/images/profiles/profile-01.jpg'
                  alt='Team member'
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <h3 className={styles.memberName}>John Smith</h3>
              <p className={styles.memberRole}>Founder & Audio Engineer</p>
              <p className={styles.memberBio}>
                With over 15 years of experience in audio production and a deep connection to Maori
                culture, John brings both technical expertise and cultural authenticity.
              </p>
            </div>

            <div className={styles.teamMember}>
              <div className={styles.memberImage}>
                <Image
                  src='/images/profiles/profile-2.jpg'
                  alt='Team member'
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <h3 className={styles.memberName}>Sarah Williams</h3>
              <p className={styles.memberRole}>Producer & Sound Designer</p>
              <p className={styles.memberBio}>
                Sarah&apos;s innovative approach to production and her passion for preserving
                indigenous sounds make her an integral part of the Taupiri Sound whanau.
              </p>
            </div>
          </div>

          <div className={styles.storyPreview}>
            <h3 className={styles.subsectionTitle}>Our Story</h3>
            <p className={styles.storyText}>
              Taupiri Sound was born from a vision to create a recording space that honors the
              cultural heritage of Aotearoa while embracing modern production techniques. Our studio
              is named after Mount Taupiri, a sacred mountain that holds deep significance in Maori
              culture, symbolizing our commitment to respecting and celebrating the connection
              between people, land, and sound.
            </p>
            <Link href='/draft-design/about-us' className={styles.aboutLink}>
              Read Our Full Story
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={styles.contact} id='contact'>
        <div className={styles.contactContainer}>
          <h2 className={styles.sectionTitle}>Get In Touch</h2>
          <p className={styles.contactSubtitle}>
            Ready to start your next project? We would love to hear from you.
          </p>

          <div className={styles.contactContent}>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📧</span>
                <div>
                  <h4>Email</h4>
                  <a href='mailto:info@taupirisound.co.nz'>info@taupirisound.co.nz</a>
                </div>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📞</span>
                <div>
                  <h4>Phone</h4>
                  <a href='tel:+6491234567'>+64 9 123 4567</a>
                </div>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📍</span>
                <div>
                  <h4>Location</h4>
                  <p>Northern Waikato, Aotearoa</p>
                </div>
              </div>
            </div>

            <form className={styles.contactForm}>
              <div className={styles.formGroup}>
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' name='name' required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' name='email' required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor='phone'>Phone (optional)</label>
                <input type='tel' id='phone' name='phone' />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor='message'>Message</label>
                <textarea id='message' name='message' rows={5} required></textarea>
              </div>
              <button type='submit' className={styles.submitButton}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerTop}>
            <div className={styles.footerBrand}>
              <Image src='/images/logos/logo-old.png' alt='Taupiri Sound' width={100} height={67} />
              <p className={styles.footerTagline}>Recording Studio • Waikato • Aotearoa</p>
            </div>

            <div className={styles.footerLinks}>
              <div className={styles.footerColumn}>
                <h4>Studio</h4>
                <Link href='/draft-design/services'>Services</Link>
                <Link href='/draft-design/the-studio'>Equipment</Link>
                <Link href='/draft-design/music'>Our Work</Link>
              </div>
              <div className={styles.footerColumn}>
                <h4>About</h4>
                <Link href='/draft-design/about-us'>Our Story</Link>
                <Link href='/draft-design/about-us#team'>Team</Link>
                <Link href='#contact'>Contact</Link>
              </div>
              <div className={styles.footerColumn}>
                <h4>Connect</h4>
                <a href='https://facebook.com' target='_blank' rel='noopener noreferrer'>
                  Facebook
                </a>
                <a href='https://instagram.com' target='_blank' rel='noopener noreferrer'>
                  Instagram
                </a>
                <a href='https://youtube.com' target='_blank' rel='noopener noreferrer'>
                  YouTube
                </a>
              </div>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p>&copy; 2024 Taupiri Sound. All rights reserved.</p>
            <div className={styles.footerLegal}>
              <Link href='/privacy-policy'>Privacy Policy</Link>
              <Link href='/terms-and-conditions'>Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DraftHomePage;
