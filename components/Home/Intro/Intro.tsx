"use client";

import { useState } from "react";
import Image from "next/image";
import css from "./Intro.module.css";
import { useRouter } from "next/navigation";
import Button from "../Button/Button";
import { AppButton } from "@/components/ui/Button/Button";

export default function Intro() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim() === "") {
      router.push("/locations");
      return;
    }
    router.push("/locations?search=" + encodeURIComponent(query));
  };

  return (
    <section className={css.intro}>
      <Image
        src="/Header.webp"
        alt="Home page intro image"
        fill
        preload
        fetchPriority="high"
        sizes="(min-width: 1440px) 1440px, 100vw"
        className={css.bgImage}
      />
      <div className={css.overlay} aria-hidden="true" />

      <div className={css.container}>
        <h1 className={css.title}>
          Відкрий для себе Україну. Знайди ідеальне місце для відпочинку
        </h1>
        <h2 className={css.subtitle}>
          Тисячі перевірених локацій з реальними фото та відгуками від
          мандрівників.
        </h2>
        <form onSubmit={handleSubmit} className={css.searchForm}>
          <input
            className={css.searchInput}
            autoComplete="off"
            type="text"
            name="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Введіть назву, тип або регіон..."
            aria-label="Введіть назву, тип або регіон"
          />
          <AppButton
            className={css.searchButton}
            type="submit"
            aria-label="Знайти місце"
          >
            Знайти місце
          </AppButton>
        </form>
      </div>
    </section>
  );
}
