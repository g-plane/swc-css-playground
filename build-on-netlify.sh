set -ex
curl -fsSL https://deno.land/install.sh | sh
deno task wasmbuild
npm run build
