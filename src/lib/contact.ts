export type ContactChannelId =
  | "phone"
  | "telegram"
  | "email"
  | "instagram"
  | "github";

export interface ContactChannel {
  readonly id: ContactChannelId;
  readonly display: string;
  readonly href: string;
  readonly external: boolean;
}

export const CONTACT_CHANNELS: readonly ContactChannel[] = [
  {
    id: "phone",
    display: "+998 93 735 63 06",
    href: "tel:+998937356306",
    external: false,
  },
  {
    id: "telegram",
    display: "@ab123455",
    href: "https://t.me/ab123455",
    external: true,
  },
  {
    id: "email",
    display: "orishboevdavronbek@gmail.com",
    href: "mailto:orishboevdavronbek@gmail.com",
    external: false,
  },
  {
    id: "instagram",
    display: "@da_vron1427",
    href: "https://www.instagram.com/da_vron1427/",
    external: true,
  },
  {
    id: "github",
    display: "github.com/Davronbek125",
    href: "https://github.com/Davronbek125/",
    external: true,
  },
] as const;

export const TELEGRAM_DIRECT_URL = "https://t.me/ab123455";
