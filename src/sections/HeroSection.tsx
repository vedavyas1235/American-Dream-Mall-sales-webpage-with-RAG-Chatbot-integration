import { useEffect, useRef, useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import './HeroSection.css'

export default function HeroSection() {
  const [videoReady, setVideoReady] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Fade in text after a short delay
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.25, delayChildren: 0.8 },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  }

  useEffect(() => {
    const timer = setTimeout(() => setVideoReady(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const scrollToNext = () => {
    const el = document.getElementById('scale')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="hero">
      {/* YouTube Background Video */}
      <div className={`hero__video-wrap ${videoReady ? 'hero__video-wrap--ready' : ''}`}>
        <iframe
          ref={iframeRef}
          className="hero__video"
          src="https://www.youtube.com/embed/ZsYAdM32MLw?autoplay=1&mute=1&loop=1&playlist=ZsYAdM32MLw&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1"
          allow="autoplay; fullscreen"
          title="American Dream"
          loading="lazy"
        />
      </div>

      {/* Dark gradient overlay */}
      <div className="hero__overlay" />
      <div className="hero__overlay-bottom" />

      {/* Content */}
      <motion.div
        className="hero__content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span className="hero__eyebrow" variants={itemVariants}>
          East Rutherford, NJ  ·  14 Miles from Midtown Manhattan
        </motion.span>

        <motion.h1 className="hero__headline" variants={itemVariants}>
          Not Just a<br />
          <em>Destination.</em><br />
          A New Standard.
        </motion.h1>

        <div className="gold-line" style={{ marginTop: '32px', marginBottom: '32px' }} />

        <motion.p className="hero__sub" variants={itemVariants}>
          North America's largest entertainment and retail complex.<br />
          3.5 million sq ft. 40 million annual visitors. One address.
        </motion.p>

        <motion.div className="hero__actions" variants={itemVariants}>
          <button className="hero__btn hero__btn--primary" onClick={scrollToNext}>
            Explore the Property
          </button>
          <button className="hero__btn hero__btn--ghost" onClick={() => {
            document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })
          }}>
            Partner With Us
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.button
        className="hero__scroll"
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        aria-label="Scroll down"
      >
        <span className="hero__scroll-label">Scroll</span>
        <span className="hero__scroll-line" />
      </motion.button>

      {/* Quick stats bar */}
      <motion.div
        className="hero__stats"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.9 }}
      >
        {[
          { value: '3.5M', label: 'Sq Ft' },
          { value: '450+', label: 'Stores & Restaurants' },
          { value: '16', label: 'Major Attractions' },
          { value: '40M+', label: 'Annual Visitors' },
        ].map(stat => (
          <div className="hero__stat" key={stat.label}>
            <span className="hero__stat-value">{stat.value}</span>
            <span className="hero__stat-label">{stat.label}</span>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
