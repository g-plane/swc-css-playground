set -ex
rustup toolchain install stable
curl -fsSL https://deno.land/install.sh | sh
/opt/buildhome/.deno/bin/deno task wasmbuild
npm run build
