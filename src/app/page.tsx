"use client";

import { CSSProperties, FormEvent, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Container, Paper, Stack, Text, Title } from "@mantine/core";
import styles from "./page.module.css";

const memories = [
  {
    src: "/CIMG1481.JPG",
    title: "Cafeteria moments",
    text: "Our long talks, sharing the meals we lovingly prepared for each other, and the time we got busted by the professor.",
  },
  {
    src: "/CIMG1536.JPG",
    title: "YOU ARE THE WARMTH OF MY HEART.",
    text: "Everything I do is for you.",
  },
  {
    src: "/IMG_9642.jpeg",
    title: "YOUR NAME IS KEPT IN THE MOST BEAUTIFUL CORNER OF MY HOME",
    text: "Your name is written on my heart, engraved in my life. You are the reason I live.",
  },
  {
    src: "/short surprise.mp4",
    title: "SURPRISE CELEBRATION OF YOUR EXISTENCE",
    text: "It was forbidden to say birthday.",
  },
  {
    src: "/df69b814-7183-48fa-87e6-537bc5546d9e.jpg",
    title: "The First Halloween",
    text: "The Halloween party where even the ones who did not know finally found out.",
  },
  {
    src: "/IMG_9795.JPG",
    title: "I LOVE TO COOK FOR YOU",
    text: "I love cooking for you, especially when I see you full, happy, and enjoying every bite.",
  },
  {
    src: "/2ED9AF7F-54AF-48F7-A025-8C07FD4C4CB3_1_105_c.jpeg",
    title: "New Year 2026",
    text: "As long as you smile, every year is the best for me.",
  },
  {
    src: "/28B50310-0C0B-4039-949C-B448A416FF99_4_5005_c.jpeg",
    title: "UNEXPECTED SNOW AFTER GYM",
    text: "Anything is romantic with you.",
  },
  {
    src: "/69AA7810-ACFC-4ADC-A4D6-A29E2380C58F_1_105_c.jpeg",
    title: "First Koln Dom Selfie",
    text: "I would pluck all the stars from the sky for you.",
  },
  {
    src: "/EFE5A03E-10EF-4600-858B-2990C52B28CE_1_105_c.jpeg",
    title: "Black and Yellow",
    text: "You made me a BVB fan.",
  },
  {
    src: "/56867F7F-9361-4ABA-94D6-79AA5C064D48_1_105_c.jpeg",
    title: "First Linden Tea I Brewed for You",
    text: "I make what your body needs.",
  },
  {
    src: "/4ADDD23A-D338-4FBC-87BE-722CA234921C_1_105_c.jpeg",
    title: "Soup time!",
    text: "I am trying to get you to eat it at least once a month.",
  },
  {
    src: "/melon.mp4",
    title: "I bring your healthy meals to the uni",
    text: "Because my strong woman deserves to eat healthy and balanced.",
  },
  {
    src: "/oat meal.mp4",
    title: "OAT MEAL",
    text: "I am happy your favorite snack is my oat formula recipe.",
  },
  {
    src: "/740B0499-1BDD-4033-8591-F65F773C0AEC_1_105_c.jpeg",
    title: "OUR 70 YEARS OLD COUPLE PHOTO",
    text: "Your favorite one.",
  },
  {
    src: "/CEDEA172-07B4-4D05-BFB7-075780D5A9C2_4_5005_c.jpeg",
    title: "My favorite flowers",
    text: "I will never forget those.",
  },
  {
    src: "/F05350FA-5434-4A69-A4B7-27EF3D24ECE6_1_105_c.jpeg",
    title: "The first little gift I prepared for you",
    text: "You will publish your own books in the future and I will always be your biggest fan.",
  },
  {
    src: "/246E3B1C-805F-43CD-BF64-11CEB1C26F77_1_105_c.jpeg",
    title: "THE FIRST FLOWERS I GOT FOR YOU",
    text: "Although they were beautiful, nothing is close to your beauty.",
  },
  {
    src: "/bday restaurant.mp4",
    title: "BIRTHDAY DINNER",
    text: "You deserve the best in this life.",
  },
  {
    src: "/breakfasts.mp4",
    title: "Our breakfast times",
    text: "The world stops when we are still, and I would not trade those precious seconds for anything.",
  },
  {
    src: "/IMG_0895.mp4",
    title: "Bowling Night",
    text: "You are very talented in everything.",
  },
  {
    src: "/F794B797-6843-45E8-B2B1-5ACD1429936A_1_105_c.jpeg",
    title: "OUR FASHION GAME",
    text: "You are the most beautiful woman in every way with every style.",
  },
  {
    src: "/IMG_2083.mp4",
    title: "Football time",
    text: "You have incredible footwork.",
  },
  {
    src: "/7A294E18-9E10-4839-ABCA-A64F906267B9_1_105_c.jpeg",
    title: "OUR SUSHI GAME",
    text: "And we had to play without chopsticks.",
  },
  {
    src: "/IMG_1522.mp4",
    title: "You are my 5 star movie",
    text: "I want to watch you forever.",
  },
  {
    src: "/27E84E13-3B48-4E9C-8362-4FCD8536A5B7_1_102_o.jpeg",
    title: "We gifted German jerseys to each other",
    text: "I love to wear them together.",
  },
  {
    src: "/DB1D20DB-F64B-4DB9-8971-342AF221F6EA_1_105_c.jpeg",
    title: "I wanna grow old with you",
    text: "And I wanna take care of you forever.",
  },
];

const PASSWORD = "pauline";
const MUSIC_PATH = "/Phillip Phillips - Dance With Me (Audio).mp3";
const floatingHearts = [
  { left: "4%", top: "10%", size: "2.6rem", duration: "16s", delay: "-2s" },
  { left: "12%", top: "28%", size: "4.2rem", duration: "22s", delay: "-8s" },
  { left: "18%", top: "62%", size: "3rem", duration: "18s", delay: "-6s" },
  { left: "24%", top: "16%", size: "2.2rem", duration: "20s", delay: "-11s" },
  { left: "28%", top: "40%", size: "5rem", duration: "25s", delay: "-4s" },
  { left: "34%", top: "76%", size: "2.8rem", duration: "19s", delay: "-13s" },
  { left: "39%", top: "12%", size: "3.6rem", duration: "24s", delay: "-7s" },
  { left: "44%", top: "52%", size: "2.4rem", duration: "17s", delay: "-9s" },
  { left: "50%", top: "22%", size: "4.6rem", duration: "21s", delay: "-5s" },
  { left: "56%", top: "68%", size: "3.1rem", duration: "18s", delay: "-10s" },
  { left: "60%", top: "36%", size: "2.2rem", duration: "23s", delay: "-3s" },
  { left: "66%", top: "8%", size: "4rem", duration: "20s", delay: "-15s" },
  { left: "72%", top: "58%", size: "2.9rem", duration: "19s", delay: "-12s" },
  { left: "76%", top: "24%", size: "5.4rem", duration: "26s", delay: "-6s" },
  { left: "82%", top: "74%", size: "2.5rem", duration: "17s", delay: "-14s" },
  { left: "88%", top: "42%", size: "3.7rem", duration: "22s", delay: "-1s" },
  { left: "8%", top: "86%", size: "2.1rem", duration: "18s", delay: "-16s" },
  { left: "20%", top: "88%", size: "3.3rem", duration: "21s", delay: "-2s" },
  { left: "48%", top: "84%", size: "2.7rem", duration: "16s", delay: "-7s" },
  { left: "70%", top: "90%", size: "3.4rem", duration: "24s", delay: "-5s" },
  { left: "92%", top: "14%", size: "2rem", duration: "18s", delay: "-9s" },
  { left: "94%", top: "60%", size: "2.8rem", duration: "20s", delay: "-12s" },
];

type ChatMessage = {
  role: "user" | "bot";
  text: string;
};

export default function Home() {
  const pageRef = useRef<HTMLElement>(null);
  const memoryRailRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const heartLayerRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "bot",
      text: "Ask me about Pauline and Emirhan's love, future, support, or relationship and I will answer romantically.",
    },
  ]);
  const [input, setInput] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isAsking, setIsAsking] = useState(false);
  const memoryItems = useMemo(() => [...memories, ...memories], []);

  const setMemorySpeed = (speed: number) => {
    memoryRailRef.current?.getAnimations().forEach((animation) => {
      animation.playbackRate = speed;
    });
  };

  useEffect(() => {
    const page = pageRef.current;
    if (!page || isLocked) return;

    let frame = 0;
    const updateScroll = () => {
      frame = 0;
      page.style.setProperty(
        "--page-progress",
        (
          window.scrollY /
          Math.max(1, document.body.scrollHeight - window.innerHeight)
        ).toFixed(4),
      );
      heartLayerRef.current?.classList.toggle(
        styles.heartsVisible,
        window.scrollY >= window.innerHeight * 0.92,
      );
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateScroll);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.isVisible);
          }
        });
      },
      { threshold: 0.14 },
    );

    page.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isLocked]);

  useEffect(() => {
    if (isLocked) return;

    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.65;
    void audio.play().catch(() => {
      // Playback can still be blocked by browser policies in some cases.
    });
  }, [isLocked]);

  const askBot = async (value: string) => {
    const trimmed = value.trim();
    if (!trimmed || isAsking) return;

    setMessages((current) => [...current, { role: "user", text: trimmed }]);
    setChatOpen(true);
    setInput("");
    setIsAsking(true);

    try {
      const response = await fetch("/api/pauline-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = (await response.json()) as { answer?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Something went wrong.");
      }

      setMessages((current) => [
        ...current,
        {
          role: "bot",
          text:
            data.answer ??
            "I could not find the right words just now, but my heart is still with Pauline and Emirhan.",
        },
      ]);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while contacting Pauline AI.";

      setMessages((current) => [
        ...current,
        {
          role: "bot",
          text: `Pauline AI is resting for a moment: ${message}`,
        },
      ]);
    } finally {
      setIsAsking(false);
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void askBot(input);
  };

  const unlockExperience = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (passwordInput.trim() !== PASSWORD) {
      setPasswordError("Wrong password. Try again, my love.");
      return;
    }

    setPasswordError("");
    setIsLocked(false);
  };

  return (
    <>
      <audio ref={audioRef} src={MUSIC_PATH} loop preload="auto" />

      {isLocked && (
        <section className={styles.lockScreen}>
          <div className={styles.lockAura} aria-hidden="true" />
          <div className={styles.lockCard}>
            <p className={styles.lockEyebrow}>Private birthday entrance</p>
            <h1 className={styles.lockTitle}>
              Happy Birthday Pauline,
              <span>Love of My Life</span>
            </h1>
            <p className={styles.lockText}>
              Enter the password to open your surprise.
            </p>
            <form className={styles.lockForm} onSubmit={unlockExperience}>
              <input
                type="password"
                value={passwordInput}
                onChange={(event) => setPasswordInput(event.currentTarget.value)}
                placeholder="Enter password"
                aria-label="Enter password"
              />
              <button type="submit">Open the surprise</button>
            </form>
            {passwordError ? <p className={styles.lockError}>{passwordError}</p> : null}
          </div>
        </section>
      )}

      <main
        ref={pageRef}
        className={`${styles.page} ${isLocked ? styles.pageLocked : ""}`}
        onMouseMove={(event) => setCursor({ x: event.clientX, y: event.clientY })}
      >
        <div
          className={styles.cursorGlow}
          style={{ left: `${cursor.x}px`, top: `${cursor.y}px` }}
        />
        <div ref={heartLayerRef} className={styles.globalLine} aria-hidden="true">
          {floatingHearts.map((heart, index) => (
            <span
              key={`${heart.left}-${heart.top}-${index}`}
              className={styles.heartEmoji}
              style={
                {
                  left: heart.left,
                  top: heart.top,
                  fontSize: heart.size,
                  animationDuration: heart.duration,
                  animationDelay: heart.delay,
                } as CSSProperties
              }
            >
              💚
            </span>
          ))}
        </div>
        <header className={styles.nav}>
          <a href="#home" className={styles.brand}>
            Pauline
          </a>
          <nav className={styles.navLinks} aria-label="Page sections">
            <a href="#letter">Letter</a>
            <a href="#memories">Memories</a>
            <a href="#poem">Poem</a>
          </nav>
        </header>

        <section className={styles.hero}>
          <span id="home" className={styles.anchor} />
          <video
            className={styles.heroVideo}
            autoPlay
            muted
            loop
            playsInline
            poster="/IMG_9734.jpeg"
          >
            <source src="/ilksiz ve gözsüz.mp4" type="video/mp4" />
          </video>
          <div className={styles.scanlines} />
          <div className={styles.heroOverlay} />
          <Container size="xl" className={styles.heroContent}>
            <div className={styles.heroKicker}>
              <span>Birthday experience</span>
              <span>Love archive 001</span>
            </div>
            <Title className={styles.heroTitle}>
              Happy Birthday
              <span>Pauline</span>
              Love of My Life
            </Title>
            <div className={styles.heroBottom}>
              <Text className={styles.heroText}>
                A cinematic little universe built from video, memories, poetry, and all
                the ways I keep choosing you.
              </Text>
              <a href="#letter" className={styles.scrollCue}>
                Scroll to explore
              </a>
            </div>
          </Container>
        </section>

        <section className={styles.scrollStory} aria-label="Our story">
          <div className={styles.storySticky}>
            <div className={styles.storyMedia}>
              <video autoPlay muted loop playsInline poster="/IMG_9734.jpeg">
                <source src="/5fce1afe-a6ae-444b-876b-30073babe832.mp4" type="video/mp4" />
              </video>
              <Image
                src="/CIMG1536.JPG"
                alt="A memory of Pauline"
                fill
                sizes="100vw"
                className={`${styles.storyImage} ${styles.storyImageOne}`}
              />
              <Image
                src="/IMG_9795.JPG"
                alt="Pauline in a favorite memory"
                fill
                sizes="100vw"
                className={`${styles.storyImage} ${styles.storyImageTwo}`}
              />
            </div>
            <div className={styles.storyShade} />
            <div className={styles.storyProgress} aria-hidden="true">
              <span />
            </div>
            <div className={`${styles.storyBeat} ${styles.storyBeatOne}`}>
              <small>01 / The beginning</small>
              <h2>YOU ARE MY EVERYTHING</h2>
            </div>
          </div>
        </section>

        <section className={styles.letterSection}>
          <span id="letter" className={styles.anchor} />
          <Container size="xl">
            <div className={styles.splitScene}>
              <div className={styles.sceneLabel}>
                <span>01</span>
                <span>A letter for you</span>
              </div>
              <Stack gap="xl" className={styles.letterCopy}>
                <Title order={2} className={styles.sectionTitle}>
                  MY LOVE, PAULINE
                </Title>
                <Text className={styles.letterText}>
                  Happy birthday, my everything. Some people enter a life like an
                  explanation, but you came like a turning point. Since you appeared,
                  everything feels warmer and lighter, as if the world learned
                  gentleness through you.
                </Text>
                <Text className={styles.letterText}>
                  You are the most beautiful and perfect woman in the entire universe
                  for me. You are hardworking, successful, smart, and beautiful, but
                  most importantly you have such a clean soul, a pure heart, kind
                  thoughts, and the most gentle way of caring for people.
                </Text>
                <Text className={styles.letterText}>
                  May your future be filled with peace, health, and the kind of
                  happiness that feels soft and endless. I wish you a life where every
                  dream you carry becomes real. Happiest birthday to the love of my
                  life.
                </Text>
              </Stack>
            </div>
          </Container>
        </section>

        <section className={styles.memoriesSection} data-reveal>
          <span id="memories" className={styles.anchor} />
          <Container size="xl">
            <div className={styles.sceneLabel}>
              <span>02</span>
              <span>Featured memories</span>
            </div>
            <Title order={2} className={styles.sectionTitle}>
              Moments that keep moving, even when time stops.
            </Title>
          </Container>
          <div className={styles.memoryTrack}>
            <button
              type="button"
              className={`${styles.memoryArrow} ${styles.memoryArrowLeft}`}
              aria-label="Speed memories to the left"
              onMouseEnter={() => setMemorySpeed(-3.6)}
              onMouseLeave={() => setMemorySpeed(1)}
              onFocus={() => setMemorySpeed(-3.6)}
              onBlur={() => setMemorySpeed(1)}
            >
              {"\u2190"}
            </button>
            <button
              type="button"
              className={`${styles.memoryArrow} ${styles.memoryArrowRight}`}
              aria-label="Speed memories to the right"
              onMouseEnter={() => setMemorySpeed(3.6)}
              onMouseLeave={() => setMemorySpeed(1)}
              onFocus={() => setMemorySpeed(3.6)}
              onBlur={() => setMemorySpeed(1)}
            >
              {"\u2192"}
            </button>
            <div ref={memoryRailRef} className={styles.memoryRail}>
              {memoryItems.map((memory, index) => (
                <article className={styles.memoryCard} key={`${memory.src}-${index}`}>
                  <div className={styles.memoryImageWrap}>
                    {memory.src.endsWith(".mp4") ? (
                      <video
                        className={`${styles.memoryImage} ${
                          memory.src === "/breakfasts.mp4" ? styles.memoryImageTop : ""
                        }`}
                        autoPlay
                        muted
                        loop
                        playsInline
                      >
                        <source src={memory.src} type="video/mp4" />
                      </video>
                    ) : (
                      <Image
                        src={memory.src}
                        alt={memory.title}
                        fill
                        sizes="(max-width: 768px) 78vw, 360px"
                        className={styles.memoryImage}
                      />
                    )}
                  </div>
                  <div className={styles.memoryCopy}>
                    <h3>{memory.title}</h3>
                    <p>{memory.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.poemSection} data-reveal>
          <span id="poem" className={styles.anchor} />
          <Container size="lg">
            <div className={styles.sceneLabel}>
              <span>03</span>
              <span>Poem corner</span>
            </div>
            <Title order={2} className={styles.poemTitle}>
              PERFECT TO ME, FOREVER
            </Title>
            <div className={styles.poem}>
              <div className={styles.poemStanza}>
                <p>You are perfect for me, perfect, straight up, in every way,</p>
                <p>not almost, not maybe, not one day.</p>
                <p>You are the kind of perfect that breaks the scale,</p>
                <p>the kind of perfect that makes the whole world pale.</p>
              </div>
              <div className={styles.poemStanza}>
                <p>I look at you and everything goes still,</p>
                <p>like the room forgets how to breathe until it will.</p>
                <p>Your name is the word my lips repeat,</p>
                <p>and my heart runs to you on shaking feet.</p>
              </div>
              <div className={styles.poemStanza}>
                <p>I am crazy about you, soft, unstoppable fire,</p>
                <p>one look from you and I am falling higher and higher.</p>
                <p>I do not fall for you once and then call it done,</p>
                <p>I fall again at midnight, again at the sun.</p>
              </div>
              <div className={styles.poemStanza}>
                <p>You are perfect for me when you shine,</p>
                <p>perfect for me when you are tired and not feeling fine.</p>
                <p>Perfect in your silence, perfect when you talk,</p>
                <p>perfect in the way you laugh, perfect in the way you walk.</p>
              </div>
              <div className={styles.poemStanza}>
                <p>How do I love you? Like oceans love tide,</p>
                <p>like stars love the night where they cannot really hide.</p>
                <p>Like rain loves the earth when it is thirsty and dry,</p>
                <p>like wings love the wind and remember to fly.</p>
              </div>
              <div className={styles.poemStanza}>
                <p>And I will never get tired of loving you,</p>
                <p>no matter what the days try to put us through.</p>
                <p>My love does not fade, it grows and it grows,</p>
                <p>it blooms in my chest like a wild red rose.</p>
              </div>
              <div className={styles.poemStanza}>
                <p>Sometimes my heart feels too small to contain</p>
                <p>this beautiful chaos, this sweet kind of insane.</p>
                <p>I swear it could burst from how much it is true,</p>
                <p>from the endless, ridiculous love for you.</p>
              </div>
              <div className={styles.poemStanza}>
                <p>You are, and you will always be, perfect to me,</p>
                <p>not just for a while, but endlessly.</p>
                <p>If forever had a face, it would be you,</p>
                <p>and my heart would still whisper: it is you, it is you.</p>
              </div>
              <p className={styles.poemSignature}>From Your Biggest Fan</p>
            </div>
          </Container>
        </section>

        <aside className={`${styles.floatingChat} ${chatOpen ? styles.floatingChatOpen : ""}`}>
          {chatOpen && (
            <Paper className={styles.chatAnswer} shadow="xl">
              <button type="button" onClick={() => setChatOpen(false)} aria-label="Close answer">
                {"\u00D7"}
              </button>
              <span>Pauline AI</span>
              <p>{messages[messages.length - 1]?.text}</p>
            </Paper>
          )}
          <form onSubmit={onSubmit} className={styles.chatPillForm}>
            <span className={styles.onlineDot} />
            <strong>Pauline AI</strong>
            <input
              aria-label="Ask Pauline AI"
              placeholder="Ask about Pauline and Emirhan..."
              value={input}
              onChange={(event) => setInput(event.currentTarget.value)}
              disabled={isAsking}
            />
            <button type="submit" aria-label="Send message" disabled={isAsking}>
              {isAsking ? "..." : "\u2191"}
            </button>
          </form>
        </aside>
      </main>
    </>
  );
}
