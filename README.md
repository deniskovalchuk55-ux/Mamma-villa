# Villa Mamma · демо нового сайту

> Wersja demonstracyjna strony Villa Mamma (Nadarzyn). Oficjalna strona: [villamamma.pl](https://villamamma.pl).

**Сайт: https://mamma-villa.vercel.app**

Демо-версія нового сайту для залу Villa Mamma, щоб показати власнику. Це не офіційний сайт:

- угорі кожної сторінки є смужка «wersja demonstracyjna» з посиланням на villamamma.pl;
- пошуковики сайт не індексують (`X-Robots-Tag: noindex` у `vercel.json` і `robots.txt` з `Disallow: /`).

## Як це влаштовано

У репозиторії лише налаштування, фото й тексти тут не лежать. Під час збірки Vercel запускає `scripts/fetch-site.mjs`: скрипт завантажує готовий архів сайту, звіряє його контрольну суму SHA-256 і розпаковує в папку `site/`, яку Vercel і показує.

Сам сайт зібраний у проєкті Higgsfield (TanStack Start). Архів — це його статична копія з усіма сторінками, зроблена скриптом `scripts/static-export.sh` у тому проєкті.

## Публікація

Проєкт **mamma-villa** у Vercel під'єднаний до цього репозиторію: кожен новий коміт у `main` Vercel публікує сам, приблизно за хвилину.

## Права

Фото й тексти належать Villa Mamma і використані лише для демонстрації.
