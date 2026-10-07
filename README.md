# Villa Mamma · демо нового сайту

> Wersja demonstracyjna strony Villa Mamma (Nadarzyn). Oficjalna strona: [villamamma.pl](https://villamamma.pl).

Демо-версія нового сайту для залу Villa Mamma, щоб показати власнику. Це не офіційний сайт:

- угорі кожної сторінки є смужка «wersja demonstracyjna» з посиланням на villamamma.pl;
- пошуковики сайт не індексують (`X-Robots-Tag: noindex` у `vercel.json` і `robots.txt` з `Disallow: /`).

## Як це влаштовано

У репозиторії лише налаштування, фото й тексти тут не лежать. Під час збірки Vercel запускає `scripts/fetch-site.mjs`: скрипт завантажує готовий архів сайту, звіряє його контрольну суму SHA-256 і розпаковує в папку `site/`, яку Vercel і показує.

Сам сайт зібраний у проєкті Higgsfield (TanStack Start). Архів — це його статична копія з усіма сторінками, зроблена скриптом `scripts/static-export.sh` у тому проєкті.

## Як опублікувати на Vercel

1. Зайдіть на [vercel.com](https://vercel.com) через GitHub.
2. **Add New… → Project**, знайдіть **Mamma-villa** і натисніть **Import**.
3. Нічого не змінюйте (налаштування беруться з `vercel.json`) і натисніть **Deploy**.
4. Приблизно за хвилину Vercel дасть посилання на кшталт `mamma-villa.vercel.app`.

Кожен новий коміт у `main` Vercel публікує сам.

## Права

Фото й тексти належать Villa Mamma і використані лише для демонстрації.
