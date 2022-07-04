set -ex
rustup toolchain install stable
curl -fsSL https://deno.land/install.sh | sh
export DENO_INSTALL="/opt/buildhome/.deno"
export PATH="$DENO_INSTALL/bin:$PATH"
deno task wasmbuild
npm run build
