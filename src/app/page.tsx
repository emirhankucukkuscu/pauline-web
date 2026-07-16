"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  Container,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import styles from "./page.module.css";

const memories = [
  {
    src: "/IMG_9734.jpeg",
    title: "The look I never forget",
    text: "Bu fotoğrafta bana hep aynı şey geliyor: iyi ki hayatımda Pauline var.",
  },
  {
    src: "/CIMG1481.JPG",
    title: "Cafeteria moments",
    text: "Our long talks, sharing the meals we lovingly prepared for each other, and the time we got busted by the professor 🙈",
  },
  {
    src: "/CIMG1536.JPG",
    title: "YOU ARE THE WARMTH OF MY HEART.",
    text: "Everyting I do is for you",
  },
  {
    src: "/IMG_9642.jpeg",
    title: "Celebration of your existence",
    text: "It was forbidden to say ''birthday'' 🤭",
  },
  {
    src: "/df69b814-7183-48fa-87e6-537bc5546d9e.jpg",
    title: "The First Halloween",
    text: "The Halloween party where even the ones who didn’t know finally found out :)",
  },
  {
    src: "/IMG_9795.JPG",
    title: "A memory with a heartbeat",
    text: "Her fotoğrafın altında tek cümle var aslında: seni çok seviyorum.",
  },
];

function getPaulineAnswer(question: string) {
  const normalized = question.toLocaleLowerCase("tr-TR");

  if (normalized.includes("pauline") || normalized.includes("kim")) {
    return "Pauline, bu sayfanın kalbi. Sevildiğinde dünyayı daha yumuşak, daha sıcak ve daha güzel yapan o özel insan.";
  }

  if (normalized.includes("biz") || normalized.includes("sizi")) {
    return "Siz iki kişi değil, aynı hikayenin iki güzel cümlesi gibisiniz. Birbirinizi bulmuş, büyütmüş ve her anıya biraz daha anlam katmışsınız.";
  }

  if (normalized.includes("doğum") || normalized.includes("birthday")) {
    return "Happy Birthday Pauline. Bugün sadece doğduğun gün değil; birinin hayatına ışık olduğun bütün günlerin kutlaması.";
  }

  if (normalized.includes("romantik") || normalized.includes("sev")) {
    return "Onu seviyorsun çünkü yanında zaman daha nazik akıyor. Çünkü gülüşü ev gibi, sesi huzur gibi, varlığı iyi ki gibi.";
  }

  return "Pauline hakkında bildiğim en önemli şey şu: bu sayfayı hazırlayan kişi onu çok seviyor. Sorunu biraz daha kişisel sorarsan, cevabı da daha romantik yaparım.";
}

export default function Home() {
  const pageRef = useRef<HTMLElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Merhaba, ben Pauline için hazırlanmış küçük aşk asistanıyım. Bana Pauline'i, sizi veya doğum gününü sorabilirsin.",
    },
  ]);
  const [input, setInput] = useState("");
  const [chatOpen, setChatOpen] = useState(false);

  const memoryItems = useMemo(() => [...memories, ...memories], []);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    let frame = 0;
    const updateScroll = () => {
      frame = 0;
      page.style.setProperty(
        "--page-progress",
        (window.scrollY / Math.max(1, document.body.scrollHeight - innerHeight)).toFixed(4),
      );
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateScroll);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add(styles.isVisible);
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
  }, []);

  const askBot = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    setMessages((current) => [
      ...current,
      { role: "user", text: trimmed },
      { role: "bot", text: getPaulineAnswer(trimmed) },
    ]);
    setChatOpen(true);
    setInput("");
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    askBot(input);
  };

  return (
    <main
      ref={pageRef}
      className={styles.page}
      onMouseMove={(event) => setCursor({ x: event.clientX, y: event.clientY })}
    >
      <div
        className={styles.cursorGlow}
        style={{ left: `${cursor.x}px`, top: `${cursor.y}px` }}
      />
      <div className={styles.globalLine} aria-hidden="true">
        <span className={styles.globalLoop} />
        <span className={styles.globalSweep} />
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
          <source src="/WhatsApp Video 2025-12-04 at 20.54.16.mp4" type="video/mp4" />
          <source src="/5fce1afe-a6ae-444b-876b-30073babe832.mp4" type="video/mp4" />
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
          <div className={styles.motionLine} aria-hidden="true">
            <span className={styles.motionLoop} />
            <span className={styles.motionSweep} />
          </div>
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
          <div className={styles.storyProgress} aria-hidden="true"><span /></div>
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
                Happy birthday, my everything.. Some people enter a life like an
                explanation, but you came like a turning point. Since you appeared,
                everything feels warmer and lighter, as if the world learned gentleness
                through you. You have a presence that changes the room and a heart that
                makes people feel safe without asking for anything back. Even silence
                feels softer around you, like everything finally has a place to rest.
              </Text>
              <Text className={styles.letterText}>
                You are the most beautiful and perfect woman in the entire universe for
                me. You are hardworking, successful, smart, and beautiful, but most
                importantly you have such a clean soul, a pure heart, kind thoughts, and
                the most gentle way of caring for people. You deserve the most beautiful
                things in life. So no matter what happens in the future, never forget
                this: the result will always become beautiful for you. You will have a
                life where you feel truly happy and where you achieve your dreams. One by
                one, you will make those priceless dreams real, and I will be the
                happiest man in the world, smiling at every success of yours.
              </Text>
              <Text className={styles.letterText}>
                May your future be filled with peace, health, and the kind of happiness
                that feels soft and endless. I wish you a life where every dream you
                carry becomes real, and every year ahead treats you as beautifully as you
                deserve. Happiest birthday to the love of my life :))
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
          <div className={styles.memoryRail}>
            {memoryItems.map((memory, index) => (
              <article className={styles.memoryCard} key={`${memory.src}-${index}`}>
                <div className={styles.memoryImageWrap}>
                  <Image
                    src={memory.src}
                    alt={memory.title}
                    fill
                    sizes="(max-width: 768px) 78vw, 360px"
                    className={styles.memoryImage}
                  />
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
              <p>not "almost," not "maybe," not "one day."</p>
              <p>You&apos;re the kind of perfect that breaks the scale,</p>
              <p>the kind of perfect that makes the whole world pale.</p>
            </div>
            <div className={styles.poemStanza}>
              <p>I look at you and everything goes still,</p>
              <p>like the room forgets how to breathe until it will.</p>
              <p>Your name is the word my lips repeat,</p>
              <p>and my heart runs to you on shaking feet.</p>
            </div>
            <div className={styles.poemStanza}>
              <p>I&apos;m crazy about you, soft, unstoppable fire,</p>
              <p>one look from you and I&apos;m falling higher and higher.</p>
              <p>I don&apos;t fall for you once and then call it done,</p>
              <p>I fall again at midnight, again at the sun.</p>
            </div>
            <div className={styles.poemStanza}>
              <p>You&apos;re perfect for me when you shine,</p>
              <p>perfect for me when you&apos;re tired and not feeling fine.</p>
              <p>Perfect in your silence, perfect when you talk,</p>
              <p>perfect in the way you laugh, perfect in the way you walk.</p>
            </div>
            <div className={styles.poemStanza}>
              <p>How do I love you? Like oceans love tide,</p>
              <p>like stars love the night where they can&apos;t really hide.</p>
              <p>Like rain loves the earth when it&apos;s thirsty and dry,</p>
              <p>like wings love the wind and remember to fly.</p>
            </div>
            <div className={styles.poemStanza}>
              <p>And I&apos;ll never get tired of loving you,</p>
              <p>no matter what the days try to put us through.</p>
              <p>My love doesn&apos;t fade, it grows and it grows,</p>
              <p>it blooms in my chest like a wild red rose.</p>
            </div>
            <div className={styles.poemStanza}>
              <p>Sometimes my heart feels too small to contain</p>
              <p>this beautiful chaos, this sweet kind of insane.</p>
              <p>I swear it could burst from how much it&apos;s true,</p>
              <p>from the endless, ridiculous love for you.</p>
            </div>
            <div className={styles.poemStanza}>
              <p>You are, and you&apos;ll always be, perfect to me,</p>
              <p>not just for a while, but endlessly.</p>
              <p>If forever had a face, it would be you,</p>
              <p>and my heart would still whisper: it&apos;s you, it&apos;s you.</p>
            </div>
            <p className={styles.poemSignature}>From Your Biggest Fan :)</p>
          </div>
        </Container>
      </section>

      <aside className={`${styles.floatingChat} ${chatOpen ? styles.floatingChatOpen : ""}`}>
        {chatOpen && (
          <Paper className={styles.chatAnswer} shadow="xl">
            <button type="button" onClick={() => setChatOpen(false)} aria-label="Close answer">×</button>
            <span>Pauline AI</span>
            <p>{messages[messages.length - 1]?.text}</p>
          </Paper>
        )}
        <form onSubmit={onSubmit} className={styles.chatPillForm}>
          <span className={styles.onlineDot} />
          <strong>Pauline AI</strong>
          <input
            aria-label="Ask Pauline AI"
            placeholder="Ask me anything..."
            value={input}
            onChange={(event) => setInput(event.currentTarget.value)}
          />
          <button type="submit" aria-label="Send message">↑</button>
        </form>
      </aside>
    </main>
  );
}
