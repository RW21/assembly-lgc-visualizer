# Linear congruential generator

A [Linear congrential generator](https://en.wikipedia.org/wiki/Linear_congruential_generator) in WebAssembly using... WebAssembly.

Check it out [here](https://rw21.github.io/assembly-lgc-visualizer/)

## Compile assembly

Use `wat2wasm` in the [WebAseembly binary toolkit]( https://github.com/WebAssembly/wabt ).

```
wat2wasm main.wat -o main.wasm
```

## Run locally

```
python3 -m http.server
```

or whatever webserver you want to use.
