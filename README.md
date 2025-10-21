# react-grid

## Technologies

- About
    - Repository
        - Git Hosting: GitHub
        - CI/CD: GitHub Actions
        - Hosting: Vercel
        - Monorepo: Turborepo
        - Bundler: Turbopack
        - Package Manager: pnpm
    - WEB
        - Structure: FSD
        - Language: TypeScript
        - Framework: React + NextJS
        - Styling: CSS Modules, TailwindCSS
        - dev-port: `3001`
    - API
        - Language: Python
        - Framework: FastAPI
        - ORM: SQLAlchemy
        - DB: PostgreSQL
        - Tests: Pytest
        - dev-port: `3002`
    - fake-API
        - Language: TypeScript
        - Framework: Express.js
        - dev-port: `3003`
    - DOCS
        - Language: TypeScript
        - Framework: React + NextSJ
        - Libs: Swagger
        - dev-port: `3005`
    - BOT
        - Language: Python
        - Framework: FastAPI
        - dev-port: `3009`

## File Structure

<!--
- /
    1. turbo.json
    2. package.json
    - .github/
        - workflows/
            3. ci.yml
            4. vercel-deploy.yml
    - apps/
        - web/
            - app/			<-- Next.js compatibility structure
            - pages/		<-- keep empty App Router (Next.js)
            - src/			<-- Feature-Sliced Design (FSD) structure
        - api/
        - fake-api/
        - docs/
        - bot/
-->

<ul>
    <li>/
        <ol type="1">
          <li>turbo.json</li>
          <li>package.json</li>
        </ol>
        <ul>
            <li>.github/
                <ul>
                    <li>workflows/
                        <ol type="1" start="3">
                          <li>ci.yml</li>
                          <li>vercel-deploy.yml</li>
                       </ol>
                    </li>
                </ul>
            </li>
            <li>apps/
                <ul>
                    <li>web/</li>
                    <li>api/</li>
                    <li>fake-api/</li>
                    <li>docs/</li>
                    <li>bot/</li>
                </ul>
            </li>
        </ul>
    </li>
</ul>
