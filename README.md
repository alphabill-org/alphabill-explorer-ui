# Alphabill Blockchain Explorer

A simple web application built with **React**, **TypeScript**, and **Vite**.

## Prerequisites

Make sure you have **Node.js** and **npm** installed on your machine.

```sh
node -v
npm -v
```

## Getting Started

1. **Clone the repository**

```sh
git clone <repository_url>
cd alphabill-explorer-ui
```

2. **Install dependencies**

```sh
npm install
```

3. **Start the development server**

```sh
npm run dev
```

4. **Build for production**

```sh
npm run build
```

5. **Preview the production build**

```sh
npm run preview
```

## Deployment

1. **Build the Docker image using the provided Dockerfile**

```sh
docker build -t alphabill-explorer-ui .
```

2. **Run the Docker container exposing port 80 to access the application**

```sh
docker run -p 8080:80 -e BACKEND_URL="<backend-api-url>" alphabill-explorer-ui
```

`BACKEND_URL` environment variable is injected into the container at runtime, allowing dynamic configuration of the backend API endpoint without needing to rebuild the Docker image.

## Linting

This project uses **ESLint** for code quality and formatting. Run the following commands to lint the code:

- **Lint code**: `npm run lint`
- **Fix lint issues**: `npm run lint:fix`
