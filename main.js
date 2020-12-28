const memory = new WebAssembly.Memory({ initial: 128 })
document.getElementById('loader').style.visibility = 'hidden'

document.getElementById('values').onkeyup = function () {

    let multiplier = parseInt(document.getElementById("multiplier-form").value) ? parseInt(document.getElementById("multiplier-form").value) : 0
    let increment = parseInt(document.getElementById("increment-form").value) ? parseInt(document.getElementById("increment-form").value) : 0
    const seed = Math.floor(Math.random() * 1000)
    console.log("Initial seed: ", seed)

    const imports_ = {
        js: {
            mem: memory,
            seed: new WebAssembly.Global({ value: 'i32', mutable: true }, seed),
            multiplier: new WebAssembly.Global({ value: 'i32', mutable: false }, multiplier),
            increment: new WebAssembly.Global({ value: 'i32', mutable: false }, increment),
            log: function (arg) {
                console.log(arg);
            },
        }
    }
    document.getElementById('loader').style.visibility = 'visible'

    WebAssembly.instantiateStreaming(fetch('main.wasm'), imports_)
        .then(obj => {
            console.log('running')
            console.log(multiplier)
            console.log(increment)
            obj.instance.exports.run()
            const byteArray = new Uint8ClampedArray(memory.buffer, 0, 1024 * 1024 * 4)
            const image = new ImageData(byteArray, 1024, 1024)
            const canvas = document.getElementById('canvas')
            const ctx = canvas.getContext('2d')
            ctx.putImageData(image, 0, 0)
            document.getElementById('loader').style.visibility = 'hidden'
        }
        )
}



