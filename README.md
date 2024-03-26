# PokeAPI

## node_modules - *gotta catch em all*

- express
- tsoa
- mongoose
- tsyringe
- class-validator
- swagger-ui-express

## Development

Check Makefile for docker-related commands

```zsh
# Install dependencies
npm install

# Build 
npm run build

# local development

npm run dev
```

Api docs @ `http://localhost:3000/api-docs`

## Missing

- Mongoose sanitizer?
- Tsoa config should load paths from tsconfig
- Normalize mongo ObjectId's
- Ensure pagination sort order
