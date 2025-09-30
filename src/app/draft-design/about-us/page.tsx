import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

const AboutUsPage = () => {
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
          <h1 className={styles.pageTitle}>About Us</h1>
          <p className={styles.pageSubtitle}>
            Our story, our people, and our connection to whenua and culture
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className={styles.storySection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Our Story</h2>

          <div className={styles.storyContent}>
            <div className={styles.storyText}>
              <h3 className={styles.subsectionTitle}>The Beginning</h3>
              <p className={styles.storyParagraph}>
                Taupiri Sound was born in 2010 from a simple vision: to create a recording space
                that honors both the technical excellence of modern music production and the
                cultural richness of Aotearoa. What started as a small home studio has grown into a
                fully-equipped professional facility, but the core values remain unchanged.
              </p>
              <p className={styles.storyParagraph}>
                Our founder, driven by a deep love for music and a respect for Māori culture, chose
                this location carefully. At the foot of Mount Taupiri, a sacred mountain of immense
                significance to local iwi, the studio sits in a place of spiritual and natural
                power. This connection to the land is not just symbolic—it infuses every aspect of
                our work.
              </p>
            </div>

            <div className={styles.storyImage}>
              <Image
                src='/images/about-founding.jpg'
                alt='Studio founding'
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>

          <div className={styles.storyContent}>
            <div className={styles.storyImage}>
              <Image
                src='/images/about-mountain.jpg'
                alt='Mount Taupiri'
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>

            <div className={styles.storyText}>
              <h3 className={styles.subsectionTitle}>Connection to Whenua</h3>
              <p className={styles.storyParagraph}>
                The concept of whenua in te ao Māori refers to both land and placenta—the source of
                life and nourishment. Our studio embodies this connection, providing a nurturing
                environment where artistic ideas can grow and flourish.
              </p>
              <p className={styles.storyParagraph}>
                The natural surroundings of the Waikato countryside are not just a backdrop; they
                are an active part of the creative process. The sounds of native birds, the whisper
                of wind through the trees, and the peaceful isolation from urban noise all
                contribute to the unique atmosphere that artists experience here.
              </p>
            </div>
          </div>

          <div className={styles.valuesSection}>
            <h3 className={styles.subsectionTitle}>Our Values</h3>
            <div className={styles.valuesGrid}>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>🎵</div>
                <h4 className={styles.valueTitle}>Excellence</h4>
                <p className={styles.valueDescription}>
                  We strive for the highest technical and artistic standards in every project,
                  combining cutting-edge equipment with decades of experience.
                </p>
              </div>

              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>🌿</div>
                <h4 className={styles.valueTitle}>Cultural Respect</h4>
                <p className={styles.valueDescription}>
                  Deep respect for Māori culture and traditions guides our work, especially when
                  recording traditional waiata and taonga pūoro.
                </p>
              </div>

              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>🤝</div>
                <h4 className={styles.valueTitle}>Collaboration</h4>
                <p className={styles.valueDescription}>
                  We believe the best music comes from true collaboration, working closely with
                  artists to realize their vision.
                </p>
              </div>

              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>🌍</div>
                <h4 className={styles.valueTitle}>Sustainability</h4>
                <p className={styles.valueDescription}>
                  Kaitiakitanga (guardianship) extends to our environmental practices, minimizing
                  our impact on the whenua we cherish.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={styles.teamSection} id='team'>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Our Team</h2>
          <p className={styles.sectionIntro}>
            Meet the passionate professionals behind Taupiri Sound
          </p>

          <div className={styles.teamGrid}>
            <div className={styles.teamMemberCard}>
              <div className={styles.memberImageWrapper}>
                <Image
                  src='/images/team-member-1.jpg'
                  alt='John Smith'
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.memberDetails}>
                <h3 className={styles.memberName}>John Smith</h3>
                <p className={styles.memberRole}>Founder & Lead Audio Engineer</p>

                <div className={styles.memberQualifications}>
                  <h4>Qualifications & Experience</h4>
                  <ul>
                    <li>Bachelor of Audio Engineering, SAE Institute (2005)</li>
                    <li>20+ years experience in music production</li>
                    <li>Specialist in analog and hybrid workflows</li>
                    <li>Member, Audio Engineering Society</li>
                  </ul>
                </div>

                <div className={styles.memberBio}>
                  <h4>About John</h4>
                  <p>
                    Johns journey in audio began in his teenage years, recording local bands on a
                    4-track cassette recorder. After formal training at SAE Institute, he worked at
                    several prominent Auckland studios before returning to the Waikato to establish
                    Taupiri Sound.
                  </p>
                  <p>
                    His deep connection to the local area and respect for Māori culture came from
                    growing up in the Waikato region and learning from kaumātua (elders) about the
                    significance of Mount Taupiri. This cultural understanding informs his approach
                    to recording traditional Māori music and working with indigenous artists.
                  </p>
                  <p>
                    Johns technical expertise spans from vintage analog gear to cutting-edge digital
                    systems. Hes particularly known for his ability to capture the warmth and
                    character of live performances while maintaining modern production standards.
                  </p>
                </div>

                <div className={styles.memberSpecialties}>
                  <h4>Specialties</h4>
                  <div className={styles.specialtyTags}>
                    <span>Analog Recording</span>
                    <span>Mixing</span>
                    <span>Live Recording</span>
                    <span>Traditional Māori Music</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.teamMemberCard}>
              <div className={styles.memberImageWrapper}>
                <Image
                  src='/images/team-member-2.jpg'
                  alt='Sarah Williams'
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.memberDetails}>
                <h3 className={styles.memberName}>Sarah Williams</h3>
                <p className={styles.memberRole}>Producer & Sound Designer</p>

                <div className={styles.memberQualifications}>
                  <h4>Qualifications & Experience</h4>
                  <ul>
                    <li>Master of Music Production, Victoria University (2012)</li>
                    <li>Diploma in Māori Studies</li>
                    <li>15+ years in production and composition</li>
                    <li>Award-winning sound designer for film and games</li>
                  </ul>
                </div>

                <div className={styles.memberBio}>
                  <h4>About Sarah</h4>
                  <p>
                    Sarah brings a unique blend of technical prowess and cultural sensitivity to
                    Taupiri Sound. With whakapapa (genealogy) connecting her to local iwi, she has a
                    genuine understanding of the cultural protocols and significance involved in
                    recording traditional music and taonga pūoro (traditional instruments).
                  </p>
                  <p>
                    Her work has spanned multiple mediums—from producing albums for emerging artists
                    to creating soundscapes for documentary films about Māori history and culture.
                    Sarahs innovative approach to production often incorporates field recordings
                    from the natural environment, creating rich sonic textures that reflect the
                    connection between music and whenua.
                  </p>
                  <p>
                    As a mentor and educator, Sarah is passionate about supporting young Māori
                    artists and helping preserve traditional music practices while embracing
                    contemporary production techniques.
                  </p>
                </div>

                <div className={styles.memberSpecialties}>
                  <h4>Specialties</h4>
                  <div className={styles.specialtyTags}>
                    <span>Production</span>
                    <span>Sound Design</span>
                    <span>Taonga Pūoro</span>
                    <span>Film Scoring</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className={styles.gallerySection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Our Journey in Pictures</h2>

          <div className={styles.timelineGallery}>
            <div className={styles.galleryItem}>
              <div className={styles.galleryImageWrapper}>
                <Image
                  src='/images/timeline-2010.jpg'
                  alt='2010 - The beginning'
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.galleryCaption}>
                <span className={styles.year}>2010</span>
                <p>The humble beginnings - our first studio setup</p>
              </div>
            </div>

            <div className={styles.galleryItem}>
              <div className={styles.galleryImageWrapper}>
                <Image
                  src='/images/timeline-2014.jpg'
                  alt='2014 - Major upgrade'
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.galleryCaption}>
                <span className={styles.year}>2014</span>
                <p>Major equipment upgrade and acoustic treatment</p>
              </div>
            </div>

            <div className={styles.galleryItem}>
              <div className={styles.galleryImageWrapper}>
                <Image
                  src='/images/timeline-2018.jpg'
                  alt='2018 - Award winning project'
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.galleryCaption}>
                <span className={styles.year}>2018</span>
                <p>Our first award-winning album production</p>
              </div>
            </div>

            <div className={styles.galleryItem}>
              <div className={styles.galleryImageWrapper}>
                <Image
                  src='/images/timeline-2024.jpg'
                  alt='2024 - Today'
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.galleryCaption}>
                <span className={styles.year}>2024</span>
                <p>Taupiri Sound today - a fully equipped professional studio</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Significance Section */}
      <section className={styles.cultureSection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Te Ao Māori & Our Studio</h2>

          <div className={styles.cultureContent}>
            <div className={styles.cultureText}>
              <p className={styles.cultureParagraph}>
                Our studios name and location are deeply connected to Māori culture and the
                significance of Mount Taupiri. This sacred mountain is a final resting place for
                many of the Tainui people and holds profound spiritual importance.
              </p>
              <p className={styles.cultureParagraph}>
                We acknowledge the tangata whenua (people of the land) and the cultural significance
                of this region. Working here is both a privilege and a responsibility— one we take
                seriously by:
              </p>

              <ul className={styles.cultureList}>
                <li>Consulting with local kaumātua on cultural matters</li>
                <li>Following appropriate tikanga (protocols) when recording traditional music</li>
                <li>Supporting Māori artists and music education initiatives</li>
                <li>Preserving recordings of traditional waiata and taonga pūoro</li>
                <li>Creating a space that respects and celebrates Māori culture</li>
              </ul>

              <p className={styles.cultureParagraph}>
                This cultural foundation makes Taupiri Sound more than a recording studio its a
                space where the past and present, tradition and innovation, come together to create
                something meaningful.
              </p>
            </div>

            <div className={styles.cultureImageGrid}>
              <div className={styles.cultureImage}>
                <Image
                  src='/images/culture-1.jpg'
                  alt='Cultural significance'
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.cultureImage}>
                <Image
                  src='/images/culture-2.jpg'
                  alt='Traditional instruments'
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Become Part of Our Story</h2>
          <p className={styles.ctaText}>
            Wed love to work with you and help bring your musical vision to life.
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

export default AboutUsPage;
