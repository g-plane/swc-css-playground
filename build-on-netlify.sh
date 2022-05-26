set -ex
cargo install wasm-pack
wasm-pack build --target=web --release
pnpm build
