# Postgres Starter

A simple postgres starter for Project IDX.

> NOTE: You might have to reload the window once the dependencies are installed for the SQLConnection extension to work as expected


## Connect to DB

To connect to the DB, run the following command in terminal:

```
psql postgresql://user:mypassword@localhost:5432/youtube?sslmode=disable
psql (15.7)
Type "help" for help.
youtube=# select * from videos limit 2;
```

You can also instead use the SQLDriver extension (already installed) to inspect the DB.

## Next steps

Look at .idx/dev.nix to learn more on the data was loaded in the DB.

