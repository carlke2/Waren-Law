FROM node:26.13.0-bookworm-slim AS base
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN npm install --global corepack@0.36.0 && corepack enable
WORKDIR /repo

FROM base AS build
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @waren/backend build
RUN pnpm --filter @waren/backend deploy --prod --legacy --ignore-scripts /prod/backend

# Migrations and the content import need dev tooling, so they run from this image, not the app's.
FROM build AS tools
ENV NODE_ENV=production
CMD ["pnpm", "--filter", "@waren/backend", "exec", "prisma", "migrate", "deploy"]

FROM node:26.13.0-bookworm-slim AS runtime
ENV NODE_ENV=production
ENV UPLOADS_DIR=uploads
WORKDIR /app
COPY --from=build /prod/backend ./
COPY --from=build /repo/backend/dist ./dist
RUN mkdir -p uploads && chown -R node:node uploads
USER node
EXPOSE 4000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD ["node", "-e", "fetch(`http://127.0.0.1:${process.env.PORT || 4000}/health`).then((r) => process.exit(r.ok ? 0 : 1), () => process.exit(1))"]
CMD ["node", "dist/src/main.js"]
