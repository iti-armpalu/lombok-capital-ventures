"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import styles from "./page.module.css";
import StarIcon from "../public/star.svg";
import FlowerIcon from "../public/flower.svg";

// Activate the ScrollTrigger plugin so GSAP can listen for scroll events.
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef(null);

  // Finds all elements with the .reveal class and stores them in revealContainers. This allows us to loop through each .reveal container and apply animations.
  const revealRefs = useRef([]);

  const wordsRef = useRef([
    "work",
    "relaxation",
    "living",
    "play",
    "investing",
    "exploration",
    "growth",
    "creation",
    "thriving",
    "unwinding",
    "dreaming",
    "innovation",
    "discovery",
    "connection",
    "enjoyment",
  ]);
  // const [currentWord, setCurrentWord] = useState(wordsRef.current[0]);
  // const wordIndexRef = useRef(0);

  const wordIndexRef = useRef(0);
  const wordRef = useRef(null);
  const servicesRef = useRef(null);
  const mainRef = useRef(null);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     wordIndexRef.current = (wordIndexRef.current + 1) % wordsRef.current.length;
  //     setCurrentWord(wordsRef.current[wordIndexRef.current]);
  //   }, 2000);

  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    const typeWriter = () => {
      const word = wordsRef.current[wordIndexRef.current];
      gsap.to(wordRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          wordRef.current.innerText = ""; // Clear text
          let i = 0;
          const interval = setInterval(() => {
            wordRef.current.innerText += word[i];
            i++;
            if (i === word.length) clearInterval(interval);
          }, 250); // Slow down the typing effect
          gsap.to(wordRef.current, { opacity: 1, duration: 0.5 });
        },
      });
    };

    const interval = setInterval(() => {
      wordIndexRef.current =
        (wordIndexRef.current + 1) % wordsRef.current.length;
      typeWriter();
    }, 4000); // Increase time between word transitions

    typeWriter(); // Run once on mount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Iterates through each .reveal container to apply animations individually. Ensures each element gets its own timeline and animation sequence.
    revealRefs.current.forEach((container, index) => {
      // Finds the <img> inside the .reveal container. The image has its own animation separate from the container.
      let image = container.children[0];

      // Creates a GSAP timeline and links it to a ScrollTrigger that activates when the .reveal container enters the viewport. trigger: container → Watches the .reveal container for scrolling into view. toggleActions: "restart none none reset": "restart" → Replays the animation every time the element enters the viewport. "none" → No action when scrolling past the element. "none" → No action when scrolling back up. "reset" → Resets the animation when the element scrolls out of view.
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          toggleActions: "restart none none reset",
        },
      });

      //Ensures the container is visible before animations start. autoAlpha: 1 sets opacity: 1 and visibility: visible, ensuring smooth transitions.
      tl.set(container, { autoAlpha: 1 });

      tl.from(container, {
        xPercent: -100,
        duration: 1.5,
        ease: "power2.out",
        delay: index * 0.3, // Adds a delay based on index for staggered effect
      });

      // Moves the image from the right (xPercent: 100) and scales it down from 1.3x to 1.0x. delay: -1.5 → Ensures this animation starts at the same time as the container animation.

      if (image) {
        tl.from(image, {
          xPercent: 100,
          scale: 1.3,
          duration: 1.5,
          delay: -1.5 + index * 0.3, // Ensures image animation follows container
          ease: "power2.out",
        });
      }
    });

    gsap.to(mainRef.current, {
      backgroundColor: "#00423E", // New background color when scrolling to services
      scrollTrigger: {
        trigger: servicesRef.current,
        start: "top 80%",
        end: "top 30%",
        scrub: true,
      },
    });
  }, []);

  return (
    <main ref={mainRef} className={styles.container}>
      <section className={styles.hero} ref={heroRef}>
        {/* <h1 className={styles.title}>Destination for <span className={styles.word}>{currentWord}</span></h1> */}
        <h1 className={styles.title}>
          Destination for <span ref={wordRef} className={styles.word}></span>
        </h1>

        <p className={styles.subtitle}>
          Whatever you envision, we’re here to make it happen. Work, live, and
          invest in the future of Lombok.
        </p>
      </section>
      <section className={styles.imageGrid}>
        {[
          "/images/photo-1562260466-6a54274f610b.avif",
          "/images/photo-1530960384461-fe9639e409cd.avif",
          "/images/photo-1621876449762-d2876b0e2237.avif",
          "/images/photo-1624344278269-f84bdcb6422a.avif",
        ].map((src, index) => (
          <div
            key={index}
            className={styles.reveal}
            ref={(el) => (revealRefs.current[index] = el)}
          >
            <Image
              src={src}
              alt={`Tropical Image ${index + 1}`}
              width={300}
              height={400}
              className={styles.image}
            />
          </div>
        ))}
      </section>
      <section ref={servicesRef} className={styles.services}>
        <h2 className={styles.servicesTitle}>Our Services</h2>
        <ul className={styles.servicesList}>
          <li>
            <div className={styles.serviceIcon}>
              <Image src={StarIcon} alt="Star Icon" className={styles.icon} />
            </div>
            Residential Villas & Communities
          </li>
          <li>
            <div className={styles.serviceIcon}>
              <Image
                src={FlowerIcon}
                alt="Flower Icon"
                className={styles.icon}
              />
            </div>
            Land Rental & Plot Sales
          </li>
          <li>
            <div className={styles.serviceIcon}>
              <Image src={StarIcon} alt="Star Icon" className={styles.icon} />
            </div>
            Land Development
          </li>
          <li>
            <div className={styles.serviceIcon}>
              <Image
                src={FlowerIcon}
                alt="Flower Icon"
                className={styles.icon}
              />
            </div>
            Hospitality
          </li>
        </ul>
      </section>
    </main>
  );
}
