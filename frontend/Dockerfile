FROM node:26.13.0-bookworm-slim AS build
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN npm install --global corepack@0.36.0 && corepack enable
WORKDIR /repo
COPY . .
RUN pnpm install --frozen-lockfile --filter @waren/frontend...

# These are fixed into the build: changing one needs a rebuild, not just a restart.
ARG API_URL
ARG PUBLIC_MEDIA_BASE_URL
ARG SITE_URL
ARG SITE_INDEXABLE=false
ARG REVALIDATE_SECONDS=300
ARG REDIRECT_CACHE_SECONDS=300
ENV API_URL=$API_URL
ENV PUBLIC_MEDIA_BASE_URL=$PUBLIC_MEDIA_BASE_URL
ENV SITE_URL=$SITE_URL
ENV SITE_INDEXABLE=$SITE_INDEXABLE
ENV REVALIDATE_SECONDS=$REVALIDATE_SECONDS
ENV REDIRECT_CACHE_SECONDS=$REDIRECT_CACHE_SECONDS
# The API isn't reachable during an image build, so pages render on first request and then cache.
ENV SKIP_PRERENDER=true
ENV NEXT_OUTPUT=standalone
RUN pnpm --filter @waren/shared build && pnpm --filter @waren/frontend build

FROM node:26.13.0-bookworm-slim AS runtime
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
WORKDIR /app
COPY --from=build /repo/frontend/.next/standalone ./
COPY --from=build /repo/frontend/.next/static ./frontend/.next/static
COPY --from=build /repo/frontend/public ./frontend/public
RUN mkdir -p frontend/.next/cache && chown -R node:node frontend/.next
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD ["node", "-e", "fetch(`http://127.0.0.1:${process.env.PORT || 3000}/brand/logo.webp`).then((r) => process.exit(r.ok ? 0 : 1), () => process.exit(1))"]
CMD ["node", "frontend/server.js"]
