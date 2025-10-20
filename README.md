# react-grid

## Technologies

- About
    - Repository
        - Git Hosting: GitHub
        - CI/CD: GitHub Actions
        - UI Hosting: Vercel
        - Monorepo: Turborepo
        - Bundler: Turbopack
        - Package Manager: pnpm
    - UI
        - Structure: FSD
        - Language: TypeScript
        - Framework: React + NextSJ
        - Styling: TailwindCSS
    - DOCS
        - Language: TypeScript
        - Framework: React + NextSJ
        - Libs: Swagger
    - API
        - Language: Python
        - Framework: FastAPI
        - ORM: SQLAlchemy
        - Tests: Pytest

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
        - api/
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
                </ul>
            </li>
        </ul>
    </li>
</ul>
