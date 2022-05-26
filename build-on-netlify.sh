set -ex
rustup toolchain install stable
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
wasm-pack build --target=web --release
npm run build
