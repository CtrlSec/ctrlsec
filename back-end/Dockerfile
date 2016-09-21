FROM node:6-onbuild

HEALTHCHECK --interval=2m --timeout=3s \
  CMD curl -f http://localhost/api/health || exit 1

EXPOSE ${PORT:-1337}
