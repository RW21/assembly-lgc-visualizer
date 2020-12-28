(module
    (import "js" "mem" (memory 32))
    (import "js" "log" (func $log (param i32)))
    (global $rand (import "js" "seed") (mut i32))
    (global $increment (import "js" "increment") i32)
    (global $multiplier (import "js" "multiplier") i32)


    (func $lgc (result i32)
        ;; linear congruential generator using "Numerical Recipes" parameters
        global.get $rand
        ;; i32.const 1664525
        global.get $multiplier
        i32.mul
        ;; i32.const 1013904223
        global.get $increment
        i32.add
        i32.const 0x400000
        i32.rem_u
    )
    (func $chaosGame
        (local $cx i32)
        (local $cy i32)

        ;; first edge
       
        
        (local $iteration i32)

        i32.const 0
        local.set $iteration

        loop
            local.get $iteration
            i32.const 1024
            i32.rem_u
            local.set $cx

            local.get $iteration
            i32.const 1024
            i32.div_u
            local.set $cy

            call $lgc
            global.set $rand
            global.get $rand
            i32.const 0xff880088
            i32.store

            ;; global.get $rand
            ;; call $log

            local.get $iteration
            i32.const 4
            i32.add
            local.set $iteration


            local.get $iteration
            i32.const 50000000
            i32.lt_u
            br_if 0

        end


    )

    (export "run" (func $chaosGame)))