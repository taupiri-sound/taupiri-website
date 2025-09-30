import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

const MusicPage = () => {
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
          <h1 className={styles.pageTitle}>Artists & Music</h1>
          <p className={styles.pageSubtitle}>
            Celebrating the diverse voices and sounds that have graced our studio
          </p>
        </div>
      </section>

      {/* Featured Artists Section */}
      <section className={styles.artistsSection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Artists Weve Worked With</h2>
          <p className={styles.sectionIntro}>
            Over the years, weve had the privilege of working with talented artists from across
            Aotearoa, each bringing their unique voice and vision to our studio.
          </p>

          <div className={styles.artistsGrid}>
            {/* Artist with full profile */}
            <div className={styles.artistCard}>
              <div className={styles.artistImageWrapper}>
                <Image
                  src='/images/artist-1.jpg'
                  alt='Hana Morrison'
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.artistInfo}>
                <h3 className={styles.artistName}>Hana Morrison</h3>
                <p className={styles.artistGenre}>Folk / Traditional Māori</p>
                <p className={styles.artistBio}>
                  Hanas music bridges traditional waiata with contemporary folk, creating a unique
                  sound that resonates with audiences across generations.
                </p>
                <div className={styles.artistLinks}>
                  <a href='https://spotify.com' target='_blank' rel='noopener noreferrer'>
                    Spotify
                  </a>
                  <a href='https://bandcamp.com' target='_blank' rel='noopener noreferrer'>
                    Bandcamp
                  </a>
                  <a href='https://instagram.com' target='_blank' rel='noopener noreferrer'>
                    Instagram
                  </a>
                </div>
              </div>
            </div>

            {/* Artist with profile */}
            <div className={styles.artistCard}>
              <div className={styles.artistImageWrapper}>
                <Image
                  src='/images/artist-2.jpg'
                  alt='Te Reo Collective'
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.artistInfo}>
                <h3 className={styles.artistName}>Te Reo Collective</h3>
                <p className={styles.artistGenre}>Hip Hop / R&B</p>
                <p className={styles.artistBio}>
                  A group of urban artists bringing te reo Māori to the forefront of modern hip hop
                  and R&B, blending cultural pride with contemporary beats.
                </p>
                <div className={styles.artistLinks}>
                  <a href='https://spotify.com' target='_blank' rel='noopener noreferrer'>
                    Spotify
                  </a>
                  <a href='https://youtube.com' target='_blank' rel='noopener noreferrer'>
                    YouTube
                  </a>
                </div>
              </div>
            </div>

            {/* Artist without image but with links */}
            <div className={styles.artistCard}>
              <div
                className={styles.artistImageWrapper}
                style={{ backgroundColor: 'var(--main-red)' }}>
                <div className={styles.artistInitials}>ABB</div>
              </div>
              <div className={styles.artistInfo}>
                <h3 className={styles.artistName}>Aotearoa Blues Band</h3>
                <p className={styles.artistGenre}>Blues / Rock</p>
                <p className={styles.artistBio}>
                  Bringing authentic blues rock with a distinctly New Zealand flavor, this band has
                  been thrilling audiences for over 15 years.
                </p>
                <div className={styles.artistLinks}>
                  <a href='https://bandcamp.com' target='_blank' rel='noopener noreferrer'>
                    Bandcamp
                  </a>
                  <a href='https://facebook.com' target='_blank' rel='noopener noreferrer'>
                    Facebook
                  </a>
                </div>
              </div>
            </div>

            {/* Artist with image but no links */}
            <div className={styles.artistCard}>
              <div className={styles.artistImageWrapper}>
                <Image
                  src='/images/artist-4.jpg'
                  alt='Kiri Williams'
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.artistInfo}>
                <h3 className={styles.artistName}>Kiri Williams</h3>
                <p className={styles.artistGenre}>Jazz / Soul</p>
                <p className={styles.artistBio}>
                  Kiris soulful voice and jazz interpretations have captivated audiences across
                  Aotearoa. Her debut album was recorded entirely at Taupiri Sound.
                </p>
              </div>
            </div>

            {/* Artist without image or links */}
            <div className={styles.artistCard}>
              <div
                className={styles.artistImageWrapper}
                style={{ backgroundColor: 'var(--primary)' }}>
                <div className={styles.artistInitials}>RS</div>
              </div>
              <div className={styles.artistInfo}>
                <h3 className={styles.artistName}>Rangi Smith</h3>
                <p className={styles.artistGenre}>Country / Folk</p>
                <p className={styles.artistBio}>
                  A storyteller through song, Rangis country-folk music tells tales of rural life in
                  Aotearoa with warmth and authenticity.
                </p>
              </div>
            </div>

            {/* Another artist with profile */}
            <div className={styles.artistCard}>
              <div className={styles.artistImageWrapper}>
                <Image
                  src='/images/artist-5.jpg'
                  alt='The Waikato Choir'
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.artistInfo}>
                <h3 className={styles.artistName}>The Waikato Choir</h3>
                <p className={styles.artistGenre}>Classical / Choral</p>
                <p className={styles.artistBio}>
                  A 40-voice choir specializing in classical and traditional Māori choral works.
                  Their recordings at Taupiri Sound have won national acclaim.
                </p>
                <div className={styles.artistLinks}>
                  <a href='https://website.com' target='_blank' rel='noopener noreferrer'>
                    Website
                  </a>
                  <a href='https://facebook.com' target='_blank' rel='noopener noreferrer'>
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Music Samples Section */}
      <section className={styles.musicSection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Listen to Our Work</h2>
          <p className={styles.sectionIntro}>
            Explore samples of music recorded, mixed, and mastered at Taupiri Sound.
          </p>

          {/* Spotify Widget Placeholder */}
          <div className={styles.musicSamples}>
            <h3 className={styles.subsectionTitle}>Featured Tracks</h3>

            <div className={styles.musicPlayersGrid}>
              <div className={styles.musicPlayer}>
                <div className={styles.albumArt}>
                  <Image
                    src='/images/album-1.jpg'
                    alt='Waiata Aroha'
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className={styles.playerInfo}>
                  <h4 className={styles.trackTitle}>Waiata Aroha</h4>
                  <p className={styles.trackArtist}>Hana Morrison</p>
                  <p className={styles.trackDetails}>Folk · 2023 · Taupiri Sound</p>
                  <div className={styles.spotifyPlaceholder}>🎵 Spotify Widget Placeholder</div>
                </div>
              </div>

              <div className={styles.musicPlayer}>
                <div className={styles.albumArt}>
                  <Image
                    src='/images/album-2.jpg'
                    alt='Urban Māori'
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className={styles.playerInfo}>
                  <h4 className={styles.trackTitle}>Urban Māori</h4>
                  <p className={styles.trackArtist}>Te Reo Collective</p>
                  <p className={styles.trackDetails}>Hip Hop · 2024 · Taupiri Sound</p>
                  <div className={styles.spotifyPlaceholder}>🎵 Spotify Widget Placeholder</div>
                </div>
              </div>

              <div className={styles.musicPlayer}>
                <div className={styles.albumArt}>
                  <Image
                    src='/images/album-3.jpg'
                    alt='Blues in the Waikato'
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className={styles.playerInfo}>
                  <h4 className={styles.trackTitle}>Blues in the Waikato</h4>
                  <p className={styles.trackArtist}>Aotearoa Blues Band</p>
                  <p className={styles.trackDetails}>Blues · 2022 · Taupiri Sound</p>
                  <div className={styles.bandcampPlaceholder}>🎵 Bandcamp Widget Placeholder</div>
                </div>
              </div>

              <div className={styles.musicPlayer}>
                <div className={styles.albumArt}>
                  <Image
                    src='/images/album-4.jpg'
                    alt='Midnight Soul'
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className={styles.playerInfo}>
                  <h4 className={styles.trackTitle}>Midnight Soul</h4>
                  <p className={styles.trackArtist}>Kiri Williams</p>
                  <p className={styles.trackDetails}>Jazz · 2023 · Taupiri Sound</p>
                  <div className={styles.audioPlaceholder}>
                    <div className={styles.audioControls}>
                      <button className={styles.playButton}>▶</button>
                      <div className={styles.audioProgress}>
                        <div className={styles.progressBar}></div>
                      </div>
                      <span className={styles.audioTime}>3:42</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Album Showcase */}
          <div className={styles.albumShowcase}>
            <h3 className={styles.subsectionTitle}>Recent Albums</h3>

            <div className={styles.albumsGrid}>
              <div className={styles.albumCard}>
                <div className={styles.albumCover}>
                  <Image
                    src='/images/album-full-1.jpg'
                    alt='Album cover'
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <h4 className={styles.albumTitle}>Whenua</h4>
                <p className={styles.albumArtist}>Hana Morrison</p>
                <p className={styles.albumYear}>2023</p>
              </div>

              <div className={styles.albumCard}>
                <div className={styles.albumCover}>
                  <Image
                    src='/images/album-full-2.jpg'
                    alt='Album cover'
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <h4 className={styles.albumTitle}>Streets of Aotearoa</h4>
                <p className={styles.albumArtist}>Te Reo Collective</p>
                <p className={styles.albumYear}>2024</p>
              </div>

              <div className={styles.albumCard}>
                <div className={styles.albumCover}>
                  <Image
                    src='/images/album-full-3.jpg'
                    alt='Album cover'
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <h4 className={styles.albumTitle}>River Blues</h4>
                <p className={styles.albumArtist}>Aotearoa Blues Band</p>
                <p className={styles.albumYear}>2022</p>
              </div>

              <div className={styles.albumCard}>
                <div className={styles.albumCover}>
                  <Image
                    src='/images/album-full-4.jpg'
                    alt='Album cover'
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <h4 className={styles.albumTitle}>Soulful Nights</h4>
                <p className={styles.albumArtist}>Kiri Williams</p>
                <p className={styles.albumYear}>2023</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className={styles.gallerySection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>In the Studio</h2>
          <p className={styles.sectionIntro}>
            Behind-the-scenes glimpses of our artists at work in Taupiri Sound.
          </p>

          <div className={styles.photoGallery}>
            <div className={styles.galleryImage}>
              <Image
                src='/images/studio-session-1.jpg'
                alt='Recording session'
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className={styles.galleryImage}>
              <Image
                src='/images/studio-session-2.jpg'
                alt='Recording session'
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className={styles.galleryImage}>
              <Image
                src='/images/studio-session-3.jpg'
                alt='Recording session'
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className={styles.galleryImage}>
              <Image
                src='/images/studio-session-4.jpg'
                alt='Recording session'
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className={styles.galleryImage}>
              <Image
                src='/images/studio-session-5.jpg'
                alt='Recording session'
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className={styles.galleryImage}>
              <Image
                src='/images/studio-session-6.jpg'
                alt='Recording session'
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to Create Your Sound?</h2>
          <p className={styles.ctaText}>
            Join the talented artists who have made Taupiri Sound their creative home.
          </p>
          <Link href='/draft-design#contact' className={styles.ctaButton}>
            Get Started
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

export default MusicPage;
