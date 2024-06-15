# Pita

This project is a headless cms that works with:

- postgres
- localstack s3 (aws s3 on the localhost)
- nextjs
- docker

## How to launch it

create `.env`

```
YANDEX_CLIENT_ID=
YANDEX_CLIENT_SECRET=

GITHUB_ID=
GITHUB_SECRET=

EMAIL_SERVER_USER=
EMAIL_SERVER_PASSWORD=
EMAIL_SERVER_HOST=
EMAIL_SERVER_PORT=
EMAIL_FROM=

NEXTAUTH_SECRET=strongpassword
NEXTAUTH_URL=http://localhost:3000

PGHOST=postgres
PGPORT=5432
PGPASSWORD=strongpassword
PGDATABASE=pita

DATABASE_URL=postgres://postgres:strongpassword@postgres:5432/pita

S3_ENDPOINT=http://localstack:4566
S3_REGION=us-east-1
S3_ACCESS_KEY_ID=test
S3_SECRET_ACCESS_KEY=test
```

If you use another env variables in the dev mode you can also create `.env.local` file, for example:

How to get api keys for auth providers (at least one provider is needed):

- [email](https://next-auth.js.org/providers/email#smtp)
- [github](https://next-auth.js.org/providers/github)
- [yandex](https://next-auth.js.org/providers/yandex)

run

```bash
docker compose up prod # production mode

# or

docker compose up dev # development mode
```
