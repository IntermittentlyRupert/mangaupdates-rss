# MangaUpdates RSS

Generates a MangaUpdates RSS feed for your lists.

Supports your own public/private lists and other users' public lists.

## Usage

To run the server:

```sh
docker-compose up -d
```

This will publish the RSS feed at http://localhost:3000/rss. The endpoint
accepts the following query parameters:

- `apikey`: Must be set to the value of the `API_KEY` environment variable
  (ignored if `API_KEY` is not set).
- `list`: The name of the list to filter by (defaults to `read`).
- `id`: The ID of the user who owns the list (defaults to the logged in user).

Example requests:

```sh
# Fetch updates for manga in your Reading list
http://localhost:3000/rss?apikey=your-apikey-here

# Fetch updates for manga in user 12345's On Hold list
http://localhost:3000/rss?apikey=your-apikey-here&id=12345&list=hold
```

Note that if you specify a private list without configuring the `MU_USERNAME`
and `MU_PASSWORD` environment variables, you will always receive an empty RSS
feed.

## Configuration

- `API_KEY`: Provide an API key that must be passed in the query parameter
  `apikey` for every request (optional).
- `MU_USERNAME`: Your MangaUpdates username (optional, mandatory for private
  lists).
- `MU_PASSWORD`: Your MangaUpdates password (optional, mandatory for private
  lists).
