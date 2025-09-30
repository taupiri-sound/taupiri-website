import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

const TheStudioPage = () => {
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
            <Link href='/draft-design#contact'>Contact</Link>
          </nav>
        </div>
      </header>

      {/* Page Hero */}
      <section className={styles.pageHero}>
        <div className={styles.pageHeroContent}>
          <h1 className={styles.pageTitle}>The Studio</h1>
          <p className={styles.pageSubtitle}>
            A purpose-built recording space in the heart of the Waikato countryside
          </p>
        </div>
      </section>

      {/* The Space Section */}
      <section className={styles.spaceSection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>The Space</h2>

          {/* Location & Building */}
          <div className={styles.spaceContent}>
            <div className={styles.spaceText}>
              <h3 className={styles.subsectionTitle}>Location & Setting</h3>
              <p className={styles.description}>
                Nestled in the peaceful countryside of northern Waikato, Taupiri Sound is more than
                just a recording studio—its a sanctuary for creativity. Surrounded by rolling hills
                and native bush, our location provides the perfect escape from the distractions of
                city life.
              </p>
              <p className={styles.description}>
                The studio sits at the foot of Mount Taupiri, a sacred mountain of immense
                significance to local Māori. This connection to the land infuses our work with a
                sense of place and cultural depth that cant be replicated.
              </p>
            </div>
            <div className={styles.spaceImage}>
              <Image
                src='/images/studio-exterior.jpg'
                alt='Studio exterior'
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Rooms */}
          <div className={styles.roomsGrid}>
            <div className={styles.roomCard}>
              <div className={styles.roomImage}>
                <Image
                  src='/images/studio-live-room.jpg'
                  alt='Live room'
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.roomInfo}>
                <h3 className={styles.roomTitle}>Live Recording Room</h3>
                <p className={styles.roomDescription}>
                  Our main live room is 35m² of acoustically treated space with a 4-meter ceiling.
                  Custom-designed bass traps, diffusers, and absorptive panels create a balanced,
                  natural sound perfect for tracking full bands, orchestral ensembles, or intimate
                  acoustic sessions.
                </p>
                <ul className={styles.roomFeatures}>
                  <li>35m² recording space</li>
                  <li>4-meter high ceilings</li>
                  <li>Acoustic treatment throughout</li>
                  <li>Natural lighting with blackout capability</li>
                  <li>Variable acoustics</li>
                </ul>
              </div>
            </div>

            <div className={styles.roomCard}>
              <div className={styles.roomImage}>
                <Image
                  src='/images/studio-control-room.jpg'
                  alt='Control room'
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.roomInfo}>
                <h3 className={styles.roomTitle}>Control Room</h3>
                <p className={styles.roomDescription}>
                  The control room is designed to the highest standards for critical listening and
                  mixing. Featuring professionally calibrated monitoring, ergonomic workflow, and a
                  comfortable environment for long sessions.
                </p>
                <ul className={styles.roomFeatures}>
                  <li>Calibrated monitoring system</li>
                  <li>Acoustically optimized for mixing</li>
                  <li>Comfortable producers couch</li>
                  <li>Natural daylight views</li>
                  <li>Climate controlled</li>
                </ul>
              </div>
            </div>

            <div className={styles.roomCard}>
              <div className={styles.roomImage}>
                <Image
                  src='/images/studio-vocal-booth.jpg'
                  alt='Vocal booth'
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.roomInfo}>
                <h3 className={styles.roomTitle}>Isolation Booth</h3>
                <p className={styles.roomDescription}>
                  A dedicated isolation booth provides a sonically controlled space for vocals,
                  intimate instruments, and amplifier isolation. The booth can be tuned to be either
                  acoustically dead or slightly live depending on the needs of the recording.
                </p>
                <ul className={styles.roomFeatures}>
                  <li>6m² isolated space</li>
                  <li>Adjustable acoustic treatment</li>
                  <li>Visual connection to live room</li>
                  <li>Quiet ventilation system</li>
                  <li>Perfect for vocals and overdubs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Gallery */}
      <section className={styles.gallerySection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Studio Gallery</h2>
          <div className={styles.gallery}>
            <div className={styles.galleryImage}>
              <Image
                src='/images/studio-angle-1.jpg'
                alt='Studio view'
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className={styles.galleryImage}>
              <Image
                src='/images/studio-angle-2.jpg'
                alt='Studio view'
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className={styles.galleryImage}>
              <Image
                src='/images/studio-angle-3.jpg'
                alt='Studio view'
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className={styles.galleryImage}>
              <Image
                src='/images/studio-angle-4.jpg'
                alt='Studio view'
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section className={styles.equipmentSection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Equipment</h2>
          <p className={styles.sectionIntro}>
            Weve carefully curated a collection of vintage and modern gear to provide the best tools
            for capturing and shaping sound.
          </p>

          <div className={styles.equipmentCategories}>
            {/* Microphones */}
            <div className={styles.equipmentCategory}>
              <h3 className={styles.categoryTitle}>
                <span className={styles.categoryIcon}>🎙️</span>
                Microphones
              </h3>
              <div className={styles.equipmentGrid}>
                <div className={styles.equipmentItem}>
                  <h4>Neumann U87 Ai</h4>
                  <p>Classic large-diaphragm condenser</p>
                </div>
                <div className={styles.equipmentItem}>
                  <h4>AKG C414 XLS</h4>
                  <p>Versatile multi-pattern condenser</p>
                </div>
                <div className={styles.equipmentItem}>
                  <h4>Shure SM7B</h4>
                  <p>Dynamic vocal and broadcast mic</p>
                </div>
                <div className={styles.equipmentItem}>
                  <h4>Royer R-121</h4>
                  <p>Ribbon microphone for warmth</p>
                </div>
                <div className={styles.equipmentItem}>
                  <h4>Sennheiser MD421</h4>
                  <p>Dynamic workhorse for instruments</p>
                </div>
                <div className={styles.equipmentItem}>
                  <h4>Audio-Technica AT4050</h4>
                  <p>Multi-pattern studio condenser</p>
                </div>
                <div className={styles.equipmentItem}>
                  <h4>Shure SM57 (x4)</h4>
                  <p>Industry standard dynamic</p>
                </div>
                <div className={styles.equipmentItem}>
                  <h4>DPA 4011A (Pair)</h4>
                  <p>Precision matched condensers</p>
                </div>
              </div>
            </div>

            {/* Preamps & Interfaces */}
            <div className={styles.equipmentCategory}>
              <h3 className={styles.categoryTitle}>
                <span className={styles.categoryIcon}>🔌</span>
                Preamps & Interfaces
              </h3>
              <div className={styles.equipmentGrid}>
                <div className={styles.equipmentItem}>
                  <h4>Universal Audio Apollo x8p</h4>
                  <p>Thunderbolt interface with UAD processing</p>
                </div>
                <div className={styles.equipmentItem}>
                  <h4>Focusrite ISA 828</h4>
                  <p>8-channel Lundahl transformer preamps</p>
                </div>
                <div className={styles.equipmentItem}>
                  <h4>API 3124+ (4-channel)</h4>
                  <p>Classic API discrete preamps</p>
                </div>
                <div className={styles.equipmentItem}>
                  <h4>Neve 1073 (x2)</h4>
                  <p>Legendary vintage-style preamp/EQ</p>
                </div>
              </div>
            </div>

            {/* Outboard Gear */}
            <div className={styles.equipmentCategory}>
              <h3 className={styles.categoryTitle}>
                <span className={styles.categoryIcon}>🎚️</span>
                Outboard Processing
              </h3>
              <div className={styles.equipmentGrid}>
                <div className={styles.equipmentItem}>
                  <h4>1176 Compressor (Universal Audio)</h4>
                  <p>Fast FET compression</p>
                </div>
                <div className={styles.equipmentItem}>
                  <h4>LA-2A Compressor (Warm Audio)</h4>
                  <p>Smooth optical compression</p>
                </div>
                <div className={styles.equipmentItem}>
                  <h4>SSL Bus Compressor</h4>
                  <p>Mix bus glue compression</p>
                </div>
                <div className={styles.equipmentItem}>
                  <h4>API 550B EQ (x2)</h4>
                  <p>Classic discrete 3-band EQ</p>
                </div>
                <div className={styles.equipmentItem}>
                  <h4>Pultec EQP-1A</h4>
                  <p>Vintage passive EQ</p>
                </div>
                <div className={styles.equipmentItem}>
                  <h4>Lexicon PCM 96 Reverb</h4>
                  <p>High-end digital reverb</p>
                </div>
              </div>
            </div>

            {/* Monitoring */}
            <div className={styles.equipmentCategory}>
              <h3 className={styles.categoryTitle}>
                <span className={styles.categoryIcon}>🔊</span>
                Monitoring
              </h3>
              <div className={styles.equipmentGrid}>
                <div className={styles.equipmentItem}>
                  <h4>Adam A7X (Main monitors)</h4>
                  <p>Ribbon tweeter 2-way monitors</p>
                </div>
                <div className={styles.equipmentItem}>
                  <h4>Yamaha NS-10M Studio</h4>
                  <p>Industry reference nearfields</p>
                </div>
                <div className={styles.equipmentItem}>
                  <h4>Avantone MixCubes</h4>
                  <p>Small speaker reference</p>
                </div>
                <div className={styles.equipmentItem}>
                  <h4>Dangerous Music Monitor ST</h4>
                  <p>Transparent monitoring controller</p>
                </div>
              </div>
            </div>

            {/* Instruments */}
            <div className={styles.equipmentCategory}>
              <h3 className={styles.categoryTitle}>
                <span className={styles.categoryIcon}>🎸</span>
                Instruments & Amplifiers
              </h3>
              <div className={styles.equipmentGrid}>
                <div className={styles.equipmentItem}>
                  <h4>Yamaha C3 Grand Piano</h4>
                  <p>61 concert grand</p>
                </div>
                <div className={styles.equipmentItem}>
                  <h4>Fender Stratocaster (1973)</h4>
                  <p>Vintage electric guitar</p>
                </div>
                <div className={styles.equipmentItem}>
                  <h4>Gibson Les Paul Standard</h4>
                  <p>Classic electric guitar</p>
                </div>
                <div className={styles.equipmentItem}>
                  <h4>Fender Jazz Bass</h4>
                  <p>Classic bass guitar</p>
                </div>
                <div className={styles.equipmentItem}>
                  <h4>Fender Twin Reverb</h4>
                  <p>Classic guitar amplifier</p>
                </div>
                <div className={styles.equipmentItem}>
                  <h4>Vox AC30</h4>
                  <p>British-voiced tube amp</p>
                </div>
                <div className={styles.equipmentItem}>
                  <h4>Ampeg SVT Classic</h4>
                  <p>Bass amplifier</p>
                </div>
                <div className={styles.equipmentItem}>
                  <h4>Vintage drum kit collection</h4>
                  <p>Ludwig, Gretsch, Pearl kits available</p>
                </div>
              </div>
            </div>

            {/* Software & Plugins */}
            <div className={styles.equipmentCategory}>
              <h3 className={styles.categoryTitle}>
                <span className={styles.categoryIcon}>💻</span>
                Software & Plugins
              </h3>
              <div className={styles.equipmentGrid}>
                <div className={styles.equipmentItem}>
                  <h4>Pro Tools Ultimate</h4>
                  <p>Industry-standard DAW</p>
                </div>
                <div className={styles.equipmentItem}>
                  <h4>Logic Pro X</h4>
                  <p>Composition and production</p>
                </div>
                <div className={styles.equipmentItem}>
                  <h4>UAD-2 Plugin Suite</h4>
                  <p>Hardware-accelerated plugins</p>
                </div>
                <div className={styles.equipmentItem}>
                  <h4>Waves Mercury Bundle</h4>
                  <p>Comprehensive plugin collection</p>
                </div>
                <div className={styles.equipmentItem}>
                  <h4>FabFilter Total Bundle</h4>
                  <p>Modern mixing and mastering tools</p>
                </div>
                <div className={styles.equipmentItem}>
                  <h4>iZotope RX 10 Advanced</h4>
                  <p>Audio restoration and repair</p>
                </div>
                <div className={styles.equipmentItem}>
                  <h4>Melodyne Studio</h4>
                  <p>Pitch correction and manipulation</p>
                </div>
                <div className={styles.equipmentItem}>
                  <h4>Kontakt + Sample Libraries</h4>
                  <p>Virtual instruments and orchestration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Experience the Studio</h2>
          <p className={styles.ctaText}>
            Book a session or arrange a tour to see our space and equipment firsthand.
          </p>
          <Link href='/draft-design#contact' className={styles.ctaButton}>
            Get In Touch
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerTop}>
            <div className={styles.footerBrand}>
              <Image src='/images/logos/logo-old.png' alt='Taupiri Sound' width={100} height={67} />
              <p className={styles.footerTagline}>Recording Studio · Waikato · Aotearoa</p>
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
                <Link href='/draft-design#contact'>Contact</Link>
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

export default TheStudioPage;
