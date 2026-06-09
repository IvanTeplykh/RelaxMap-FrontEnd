"use client";

import { useState } from "react";
import css from "./Intro.module.css";
import { useRouter } from "next/navigation";
import Button from "../Button/Button";

export default function Intro() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Search query:", query);
    if (query.trim() === "") {
      router.push("/locations");
      return;
    }
    router.push(`/locations?search=${encodeURIComponent(query)}`);
  };

  return (
    <section className={css.intro}>
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
          />
          <Button
            className={css.searchButton}
            type="submit"
            text="Знайти місце"
          />
        </form>
      </div>
    </section>
  );
}
