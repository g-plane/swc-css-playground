set -ex
rustup toolchain install stable
cargo install wasm-pack
wasm-pack build --target=web --release
pnpm build
