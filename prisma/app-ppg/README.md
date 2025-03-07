# IDX Template: Prisma Postgres 

This template helps you get started with [Prisma Postgres](https://www.prisma.io/blog/announcing-prisma-postgres-early-access) on [IDX](https://idx.google.com/).

## Getting started

Follow these instructions once this project was opened in IDX.

### 1. Create Prisma Postgres database & set environment variables

First, you need to create your Prisma Postgres instance:

1. Log in to [Prisma Data Platform](https://console.prisma.io/).
1. In a [workspace](https://www.prisma.io/docs/platform/about#workspace) of your choice, click the **New project** button.
1. Type a name for your project in the **Name** field, e.g. **hello-ppg**.
1. In the **Prisma Postgres** section, click the **Get started** button.
1. In the **Region** dropdown, select the region that's closest to your current location, e.g. **US East (N. Virginia)**.
1. Click the **Create project** button.

Once the database is ready, copy the `DATABASE_URL` environment variable and set it in [`.idx/dev.nix`](.idx/dev.nix#L15).

Now, click the **Rebuild Environment** button for the environment variables to take effect.

### 2. Run a schema migration

Next, you need to create the tables in your database. You can do this by creating and executing a schema migration with the following command of the Prisma CLI:

```
npx prisma migrate dev --name init
```

This will map the `User` and `Post` models that are defined in your [Prisma schema](./prisma/schema.prisma) to your database. You can also review the SQL migration that was executed and created the tables in the newly created `prisma/migrations` directory.

### 3. Execute queries with Prisma ORM

The [`src/queries.ts`](./src/queries.ts) script contains a number of CRUD queries that will write and read data in your database. You can execute it by running the following command in your terminal:

```
npm run queries
```

Once the script has completed, you can inspect the logs in your terminal or use Prisma Studio to explore what records have been created in the database:

```
npx prisma studio
```

### 4. Explore caching with Prisma Accelerate

The [`src/caching.ts`](./src/caching.ts) script contains a sample query that uses [Stale-While-Revalidate](https://www.prisma.io/docs/accelerate/caching#stale-while-revalidate-swr) (SWR) and [Time-To-Live](https://www.prisma.io/docs/accelerate/caching#time-to-live-ttl) (TTL) to cache a database query using Prisma Accelerate. You can execute it as follows:

```
npm run caching
```

Take note of the time that it took to execute the query, e.g.:

```
The query took 2009.2467149999998ms.
```

Now, run the script again:

```
npm run caching
```

You'll notice that the time the query took will be a lot shorter this time, e.g.:

```
The query took 300.5655280000001ms.
```

## Next steps

- Check out the [Prisma docs](https://www.prisma.io/docs)
- Share your feedback on the [Prisma Discord](https://pris.ly/discord/)
- Create issues and ask questions on [GitHub](https://github.com/prisma/prisma/)

