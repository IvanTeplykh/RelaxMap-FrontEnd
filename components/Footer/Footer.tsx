"use client";

import Logo from "../Logo/Logo";
import css from "./Footer.module.css";
import { AppLink, Icon } from "../ui";

export const Footer = () => {
    const socialLinks = [
        { href: "https://www.facebook.com", icon: "icon-Facebook", label: "Facebook" },
        { href: "https://www.instagram.com", icon: "Instagram", label: "Instagram" },
        { href: "https://x.com", icon: "X", label: "X" },
        { href: "https://www.youtube.com", icon: "Youtube", label: "YouTube" },
    ];

    return (
        <footer className={css.footer}>
            <div className={css.container}>
                <div className={css.inner}>
                    <div className={css.logoWrapper}>
                        <Logo/>
                    </div>
                    <ul className={css.socials}>
                        {socialLinks.map(({ href, icon, label }) => (
                            <li key={label}>
                                <AppLink
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={css.socialLink}
                                >
                                    <Icon name={icon} width={24} height={24} aria-label={label} className={css.logoImg}/>
                                </AppLink>
                            </li>
                        ))}
                    </ul>

                    <ul className={css.footerNav}>
                        <li className={css.items}>
                            <AppLink href="/" className={css.itemsLink}>
                                Головна
                            </AppLink>
                        </li>
                        <li className={css.items}>
                            <AppLink href="/places" className={css.itemsLink}>
                                Місця відпочинку
                            </AppLink>
                        </li>
                    </ul>
                </div>
                <div className={css.copy}>
                    <p className={css.copyText}>
                        &copy; {new Date().getFullYear()} Природні Мандри. Усі права
                        захищені.
                    </p>
                </div>
            </div>
        </footer>
    );
}