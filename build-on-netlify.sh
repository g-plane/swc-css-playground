set -ex
curl -fsSL https://deno.land/install.sh | sh
rustup toolchain install stable
/opt/buildhome/.deno/bin/deno task wasmbuild
npm run build
