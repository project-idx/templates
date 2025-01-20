# IDX Template: Prisma Postgres 

This template helps you get started with [Prisma Postgres](https://www.prisma.io/blog/announcing-prisma-postgres-early-access) on [IDX](https://idx.google.com/).

## Getting started

Follow these instructions once this project was opened in IDX.

### 1. Create Prisma Postgres database

First, you need to create your Prisma Postgres instance:

1. Log in to [Prisma Data Platform](https://console.prisma.io/).
1. In a [workspace](https://www.prisma.io/docs/platform/about#workspace) of your choice, click the **New project** button.
1. Type a name for your project in the **Name** field, e.g. **hello-ppg**.
1. In the **Prisma Postgres** section, click the **Get started** button.
1. In the **Region** dropdown, select the region that's closest to your current location, e.g. **US East (N. Virginia)**.
1. Click the **Create project** button.

At this point, you'll be redirected to the **Database** page where you will need to wait a few seconds while the status of your database changes from **`PROVISIONING`**, to **`ACTIVATING`** to **`CONNECTED`**.

Once that setup process has finished, move to the next step.

### 2. Set database connection URL and Pulse API key

TBD: Instructions for setting `DATABASE_URL` and `PULSE_API_KEY` as env vars.

### 4. Create database tables (with a schema migration)

Next, you need to create the tables in your database. You can do this by creating and executing a schema migration with the following command of the Prisma CLI:

```
npx prisma migrate dev --name init
```

This will map the `User` and `Post` models that are defined in your [Prisma schema](./prisma/schema.prisma) to your database. You can also review the SQL migration that was executed and created the tables in the newly created `prisma/migrations` directory.

### 5. Execute queries with Prisma ORM

The [`src/queries.ts`](./src/queries.ts) script contains a number of CRUD queries that will write and read data in your database. You can execute it by running the following command in your terminal:

```
npm run queries
```

Once the script has completed, you can inspect the logs in your terminal or use Prisma Studio to explore what records have been created in the database:

```
npx prisma studio
```

### 6. Explore caching with Prisma Accelerate

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

### 6. Observe real-time events in your database

The  [`src/realtime.ts`](./src/realtime.ts) script contains a demo for receiving real-time change [events](https://www.prisma.io/docs/pulse/database-events) from your database. You can start the script as follows:

```
npm run realtime
```

The script now created a [stream](https://www.prisma.io/docs/pulse/api-reference#stream) that will receive database events and print them to the console whenever a write-operation (i.e. _create_, _update_ or _delete_) happens on the `User` table.

To test the stream, you can open Prisma Studio:

```
npx prisma studio
```

... and make a change to the `User` table, e.g. create a new record. Once you've saved the change, you should see an output in the terminal that looks similar to this:

```
Received an event: {
  action: 'create',
  created: { id: 3, email: 'burk@prisma.io', name: 'Nikolas' },
  id: '01JAFNSZHQRDTW773BCAA9G7FJ',
  modelName: 'User'
}
```

## Next steps

- Check out the [Prisma docs](https://www.prisma.io/docs)
- Share your feedback on the [Prisma Discord](https://pris.ly/discord/)
- Create issues and ask questions on [GitHub](https://github.com/prisma/prisma/)
