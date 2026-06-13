# Portfolio — Tigran Mkrtchyan

Personal portfolio built with **Next.js 16 (App Router)**, **React 19**, **HeroUI**, **Tailwind**, **Framer Motion**, **Redux Toolkit**, **next-intl** (EN/PL), **Recharts**, **Swiper**, and **react-hook-form + zod**.

## Run

```bash
npm install --legacy-peer-deps   # first time only
npm run dev                       # http://localhost:3000
npm run build && npm start        # production
```

- English lives at `/` (default locale), Polish at `/pl`.
- **Multi-page app**: each section is its own route — `/about`, `/projects`, `/skills`, `/contact`, and a dedicated page per project at `/projects/[id]`.

> Tip: if you ever run `npm run build` and then see phantom 404s in `npm run dev`,
> delete the `.next` folder once (`dev` and `build` share that cache).

---

## Где что менять (customization)

### 1. Личная информация — `src/data/profile.ts`
Имя, email, локация, путь к CV, ссылки на GitHub/LinkedIn, цифры для блока «About».

### 2. CV (резюме)
Замени файл `public/cv/cv.pdf` на свой настоящий PDF. Кнопки «Download CV / Resume» ведут на него.

### 3. Проекты — `src/data/projects.ts`
Каждый проект — объект в массиве `projects`. Главное поле — `visibility`:

- **`'public'`** — открытый проект. Заполни `liveUrl` и/или `githubUrl` — на странице проекта `/projects/[id]` появятся кнопки «Live demo» и «Source code».
- **`'private'`** — коммерческий/закрытый проект (как твой на Azure/Render). **Не указывай** `githubUrl` и публичный `liveUrl`. Покажется бейдж «Private / commercial», галерея скриншотов и поясняющая плашка. По желанию можно добавить `demoUrl` — это та самая «демо-кнопка» с ограниченным доступом.

Картинки:
- `cover` — обложка на карточке.
- `screenshots[]` — галерея на странице проекта. У каждого скриншота есть `caption` («тут то, тут сё») на двух языках.

Клик по карточке открывает **отдельную страницу проекта** `/projects/[id]` (не модалку) с полной галереей.
- Клади файлы в `public/projects/` и ссылайся как `/projects/имя.png` (png/jpg/svg).

Тексты `tagline`, `description`, `caption` — объекты `{ en, pl }` (перевод на оба языка прямо в файле).

### 4. Навыки — `src/data/skills.ts`
`skills[]` — данные для radar-графика (Recharts), `techChips[]` — теги под графиком.

### 5. Тексты интерфейса / переводы — `messages/en.json`, `messages/pl.json`
Все надписи кнопок, заголовки секций, тексты формы. Структура ключей в обоих файлах одинаковая.

### 6. Языки — `src/i18n/routing.ts`
Чтобы добавить язык: впиши код в `locales`, создай `messages/<код>.json`, добавь подпись в `LABELS` внутри `src/components/ui/LanguageSwitcher.tsx`.

### 7. Цвета / тема — `tailwind.config.ts`
Блок `heroui({ themes: { light, dark } })` — поменяй `primary`. Дефолтная тема — системная, есть переключатель (солнце/луна) в навбаре.

### 8. Перегенерировать плейсхолдеры
`node scripts/gen-assets.mjs` — пересоздаёт демо-картинки в `public/projects` и `public/cv/cv.pdf`. После добавления реальных скриншотов скрипт больше не нужен.

---

## Структура

Каждый роут — своя папка с `page.tsx` и колокированной папкой `_components`
(приватная папка `_` не создаёт роут).

```
src/
  app/[locale]/
    layout.tsx              общий каркас: Navbar + Footer + провайдеры
    template.tsx            анимация перехода между страницами (framer-motion)
    page.tsx                Главная
    _components/            Hero, FeaturedProjects
    about/      page.tsx + _components/ (Stats)
    projects/   page.tsx + _components/ (ProjectsExplorer — грид + фильтр)
      [id]/     page.tsx + _components/ (ProjectGallery, ProjectActions)
    skills/     page.tsx + _components/ (SkillsRadar, RadarChartInner, TechChips)
    contact/    page.tsx + _components/ (ContactForm, ContactInfo)
    globals.css, not-found.tsx
  components/                ОБЩИЕ компоненты (используются на разных роутах)
    layout/                 Navbar (роуты + активная ссылка), Footer
    projects/ProjectCard    карточка → переход на /projects/[id]
    ui/                     ThemeSwitcher, LanguageSwitcher
    PageHeader, Reveal
  data/                      profile, projects, skills, types
  i18n/                      routing, request, navigation
  providers/                 Redux + HeroUI + next-themes
  store/                     Redux Toolkit (фильтр категорий проектов)
  proxy.ts                   next-intl middleware (locale routing)
messages/                    en.json, pl.json
public/projects/             обложки и скриншоты
public/cv/cv.pdf             резюме
```

**Правило client/server:** компоненты, которые импортируют `@heroui/react`,
`recharts`, `framer-motion`, Redux-хуки или RHF — это `'use client'`.
Серверные `page.tsx` не импортируют HeroUI напрямую (иначе билд падает на
`createContext`); вместо этого UI вынесен в client-острова в `_components`.
